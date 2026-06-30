"use server";

import { readAdminStore, nowIso, writeAdminStore } from "@/lib/admin/content-store";
import type { IncomingMessage, NewsletterSubscriber } from "@/lib/admin/types";
import { sendAdminEmail } from "@/lib/server/email";
import { supabaseInsert } from "@/lib/server/supabase-rest";

export type PublicFormState = {
  ok: boolean;
  message: string;
};

const successMessage = "Votre message a bien été envoyé. L'équipe de la DDC RDC vous répondra dès que possible.";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function guardSpam(formData: FormData) {
  return value(formData, "website") === "";
}

function validateRequired(fields: Array<[string, string]>) {
  for (const [label, content] of fields) {
    if (!content) {
      return `${label} est obligatoire.`;
    }
  }

  return null;
}

export async function submitContactForm(_previousState: PublicFormState, formData: FormData): Promise<PublicFormState> {
  if (!guardSpam(formData)) {
    return { ok: true, message: successMessage };
  }

  const now = nowIso();
  const message: IncomingMessage = {
    id: createId("msg"),
    name: value(formData, "name"),
    email: value(formData, "email").toLowerCase(),
    phone: value(formData, "phone"),
    organization: value(formData, "organization"),
    requestType: value(formData, "requestType") || "Autre",
    subject: value(formData, "subject"),
    message: value(formData, "message"),
    sourceForm: value(formData, "sourceForm") || "Formulaire public",
    status: "nouveau",
    createdAt: now
  };

  const requiredError = validateRequired([
    ["Nom complet", message.name],
    ["Email", message.email],
    ["Type de demande", message.requestType],
    ["Sujet", message.subject],
    ["Message", message.message]
  ]);

  if (requiredError) {
    return { ok: false, message: requiredError };
  }

  if (!isValidEmail(message.email)) {
    return { ok: false, message: "Veuillez saisir une adresse email valide." };
  }

  await persistMessage(message);
  await notifyMessage(message);

  return { ok: true, message: successMessage };
}

export async function submitMembershipForm(_previousState: PublicFormState, formData: FormData): Promise<PublicFormState> {
  if (!guardSpam(formData)) {
    return { ok: true, message: successMessage };
  }

  const firstName = value(formData, "firstName");
  const lastName = value(formData, "lastName");
  const email = value(formData, "email").toLowerCase();
  const now = nowIso();
  const requestType = value(formData, "membershipType") || "Adhésion / bénévolat";
  const motivation = value(formData, "motivation");
  const experience = value(formData, "experience") || "À compléter";
  const message: IncomingMessage = {
    id: createId("msg"),
    name: `${firstName} ${lastName}`.trim(),
    email,
    phone: value(formData, "phone"),
    organization: value(formData, "city"),
    requestType,
    subject: `Candidature - ${value(formData, "interestDomain") || "Domaine à compléter"}`,
    message: [
      `Ville : ${value(formData, "city") || "À compléter"}`,
      `Âge : ${value(formData, "age") || "À compléter"}`,
      `Domaine d'intérêt : ${value(formData, "interestDomain") || "À compléter"}`,
      `Disponibilité : ${value(formData, "availability") || "À compléter"}`,
      `Motivation : ${motivation}`,
      `Expérience éventuelle : ${experience}`
    ].join("\n"),
    sourceForm: "Devenir membre / bénévole",
    status: "nouveau",
    createdAt: now
  };

  const requiredError = validateRequired([
    ["Nom", lastName],
    ["Prénom", firstName],
    ["Email", email],
    ["Téléphone", message.phone || ""],
    ["Ville", value(formData, "city")],
    ["Domaine d'intérêt", value(formData, "interestDomain")],
    ["Disponibilité", value(formData, "availability")],
    ["Motivation", motivation]
  ]);

  if (requiredError) {
    return { ok: false, message: requiredError };
  }

  if (!isValidEmail(email)) {
    return { ok: false, message: "Veuillez saisir une adresse email valide." };
  }

  await persistMessage(message);
  await notifyMessage(message);

  return { ok: true, message: "Votre candidature a bien été envoyée. L'équipe de la DDC RDC vous répondra dès que possible." };
}

export async function submitNewsletterForm(_previousState: PublicFormState, formData: FormData): Promise<PublicFormState> {
  if (!guardSpam(formData)) {
    return { ok: true, message: "Inscription enregistrée." };
  }

  const email = value(formData, "email").toLowerCase();
  const name = value(formData, "name");
  const source = value(formData, "source") || "Newsletter publique";

  if (!email) {
    return { ok: false, message: "L'adresse email est obligatoire." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, message: "Veuillez saisir une adresse email valide." };
  }

  const store = await readAdminStore();
  const existing = store.newsletterSubscribers.find((subscriber) => subscriber.email.toLowerCase() === email);

  if (existing) {
    if (existing.status !== "active") {
      existing.status = "active";
      existing.confirmedAt = existing.confirmedAt || nowIso();
      await writeAdminStore(store);
    }

    return { ok: true, message: "Cette adresse est déjà inscrite à la newsletter." };
  }

  const now = nowIso();
  const subscriber: NewsletterSubscriber = {
    id: createId("sub"),
    email,
    name,
    status: "active",
    source,
    createdAt: now,
    confirmedAt: now
  };

  store.newsletterSubscribers.unshift(subscriber);
  await writeAdminStore(store);
  await supabaseInsert("newsletter_subscribers", {
    email: subscriber.email,
    name: subscriber.name || null,
    status: subscriber.status,
    source: subscriber.source,
    created_at: subscriber.createdAt,
    confirmed_at: subscriber.confirmedAt
  });
  await sendAdminEmail({
    subject: "Nouvelle inscription newsletter - DDC RDC",
    text: [`Email : ${subscriber.email}`, `Nom : ${subscriber.name || "À compléter"}`, `Source : ${subscriber.source}`, `Date : ${subscriber.createdAt}`].join("\n")
  });

  return { ok: true, message: "Votre inscription à la newsletter a bien été enregistrée." };
}

async function persistMessage(message: IncomingMessage) {
  const store = await readAdminStore();
  store.messages.unshift(message);
  await writeAdminStore(store);
  await supabaseInsert("messages", {
    name: message.name,
    email: message.email,
    phone: message.phone || null,
    organization: message.organization || null,
    request_type: message.requestType,
    subject: message.subject,
    message: message.message,
    source_form: message.sourceForm,
    status: message.status,
    created_at: message.createdAt,
    read_at: message.readAt || null,
    archived_at: message.archivedAt || null
  });
}

async function notifyMessage(message: IncomingMessage) {
  await sendAdminEmail({
    subject: `[DDC RDC] ${message.requestType} - ${message.subject}`,
    text: [
      `Nom : ${message.name}`,
      `Email : ${message.email}`,
      `Téléphone : ${message.phone || "À compléter"}`,
      `Organisation / Ville : ${message.organization || "À compléter"}`,
      `Type de demande : ${message.requestType}`,
      `Sujet : ${message.subject}`,
      `Source : ${message.sourceForm}`,
      `Date : ${message.createdAt}`,
      "",
      message.message
    ].join("\n")
  });
}
