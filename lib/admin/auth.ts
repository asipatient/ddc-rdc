import "server-only";

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
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

const SCRYPT_KEYLEN = 64;
const SCRYPT_PREFIX = "scrypt:";

function legacyHashPassword(password: string) {
  return createHmac("sha256", getSecret()).update(password).digest("hex");
}

/**
 * Génère un hash scrypt salé au format `scrypt:<salt_hex>:<hash_hex>`.
 * Utilisé par scripts/generate-admin-hash.mjs pour produire ADMIN_PASSWORD_HASH.
 */
export function hashPasswordScrypt(password: string, salt?: Buffer) {
  const usedSalt = salt ?? randomBytes(16);
  const derived = scryptSync(password, usedSalt, SCRYPT_KEYLEN);
  return `${SCRYPT_PREFIX}${usedSalt.toString("hex")}:${derived.toString("hex")}`;
}

function safeEqualHex(a: string, b: string) {
  const bufferA = Buffer.from(a, "hex");
  const bufferB = Buffer.from(b, "hex");
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

function verifyPassword(password: string, expectedHash: string) {
  if (expectedHash.startsWith(SCRYPT_PREFIX)) {
    const [saltHex, hashHex] = expectedHash.slice(SCRYPT_PREFIX.length).split(":");
    if (!saltHex || !hashHex) {
      return false;
    }
    const derived = scryptSync(password, Buffer.from(saltHex, "hex"), SCRYPT_KEYLEN);
    return safeEqualHex(derived.toString("hex"), hashHex);
  }

  // Rétrocompatibilité avec les hash HMAC-SHA256 existants.
  return safeEqualHex(legacyHashPassword(password), expectedHash);
}

export function verifyAdminCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminRole = (process.env.ADMIN_ROLE || "super_admin") as UserRole;

  if (!adminEmail || (!adminPasswordHash && !adminPassword)) {
    return null;
  }

  const expectedHash = adminPasswordHash || legacyHashPassword(adminPassword || "");
  const emailMatches = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
  const passwordMatches = verifyPassword(password, expectedHash);

  if (!emailMatches || !passwordMatches) {
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
