import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { AdminSession, UserRole } from "@/lib/admin/types";

const SESSION_COOKIE = "ddc_admin_session";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "development-secret-change-me";
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function encodeSession(session: AdminSession) {
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decodeSession(value: string): AdminSession | null {
  const [payload, signature] = value.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
  } catch {
    return null;
  }
}

function hashPassword(password: string) {
  return createHmac("sha256", getSecret()).update(password).digest("hex");
}

export function verifyAdminCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminRole = (process.env.ADMIN_ROLE || "super_admin") as UserRole;

  if (!adminEmail || (!adminPasswordHash && !adminPassword)) {
    return null;
  }

  const expectedHash = adminPasswordHash || hashPassword(adminPassword || "");
  const passwordHash = hashPassword(password);

  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() || passwordHash !== expectedHash) {
    return null;
  }

  return {
    email: adminEmail,
    role: adminRole,
    issuedAt: Date.now()
  } satisfies AdminSession;
}

export async function setAdminSession(session: AdminSession) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;

  if (!value) {
    return null;
  }

  return decodeSession(value);
}

export function canPublish(role: UserRole) {
  return role === "super_admin" || role === "editor";
}
