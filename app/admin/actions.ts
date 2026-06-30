"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import {
  canPublish,
  clearAdminSession,
  getAdminSession,
  setAdminSession,
  verifyAdminCredentials
} from "@/lib/admin/auth";
import {
  createCollectionItem,
  deleteCollectionItem,
  nowIso,
  readAdminStore,
  slugify,
  updateCollectionItem,
  updateSiteSettings
} from "@/lib/admin/content-store";
import type {
  AdminArticle,
  AdminAxis,
  AdminDocument,
  AdminProgram,
  AdminRealisation,
  CollectionKey,
  ImpactMetric,
  ImpactVerificationStatus,
  MessageStatus,
  NewsPost,
  Partner,
  SiteSettings,
  SubscriberStatus,
  TeamMember,
  Testimonial
} from "@/lib/admin/types";

const collectionPaths: Record<CollectionKey, string> = {
  articles: "/admin/articles",
  newsPosts: "/admin/actualites",
  realisations: "/admin/realisations",
  programs: "/admin/programmes",
  axes: "/admin/axes",
  teamMembers: "/admin/equipe",
  documents: "/admin/documents",
  testimonials: "/admin/temoignages",
  partners: "/admin/partenaires",
  impactMetrics: "/admin/impact",
  messages: "/admin/messages",
  newsletterSubscribers: "/admin/newsletter"
};

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const session = verifyAdminCredentials(email, password);

  if (!session) {
    redirect("/admin/login?error=1");
  }

  await setAdminSession(session);
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

function getStatus(formData: FormData, roleCanPublish: boolean) {
  if (!roleCanPublish) {
    return "draft";
  }

  const status = String(formData.get("status") || "draft");
  return status === "published" || status === "archived" ? status : "draft";
}

async function baseContentFromForm(formData: FormData, roleCanPublish: boolean) {
  const title = String(formData.get("title") || "Titre a completer");
  const status = getStatus(formData, roleCanPublish);
  const createdAt = nowIso();
  const uploadedImage = await saveUploadedFile(formData, "imageUpload", "images", ["jpg", "jpeg", "png", "webp", "gif"]);

  return {
    id: String(formData.get("id") || `${Date.now()}`),
    title,
    slug: slugify(String(formData.get("slug") || title)),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    category: String(formData.get("category") || ""),
    image: uploadedImage || String(formData.get("image") || ""),
    date: String(formData.get("date") || new Date().toISOString().slice(0, 10)),
    status,
    createdAt,
    updatedAt: createdAt,
    publishedAt: status === "published" ? createdAt : undefined
  };
}

function contentClassificationFromForm(formData: FormData) {
  const relatedAxis = String(formData.get("relatedAxis") || formData.get("axisId") || "");
  const relatedProgram = String(formData.get("relatedProgram") || formData.get("programId") || "");

  return {
    impact: String(formData.get("impact") || ""),
    relatedAxis,
    relatedProgram,
    author: String(formData.get("author") || "DDC RDC ASBL"),
    partners: String(formData.get("partners") || ""),
    location: String(formData.get("location") || ""),
    gallery: linesFromForm(formData, "gallery"),
    needsReview: booleanFromForm(formData, "needsReview"),
    featured: booleanFromForm(formData, "featured")
  };
}

function linesFromForm(formData: FormData, key: string) {
  return String(formData.get(key) || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function numberFromForm(formData: FormData, key: string, fallback = 0) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : fallback;
}

function booleanFromForm(formData: FormData, key: string) {
  return formData.get(key) === "on" || String(formData.get(key) || "") === "true";
}

function impactVerificationStatusFromForm(formData: FormData): ImpactVerificationStatus {
  const value = String(formData.get("verificationStatus") || "provisional");
  const allowed: ImpactVerificationStatus[] = ["verified", "provisional", "incomplete", "to_verify", "consolidating"];
  return allowed.includes(value as ImpactVerificationStatus) ? (value as ImpactVerificationStatus) : "provisional";
}

export async function createNewsAction(formData: FormData) {
  const session = await requireAdmin();
  await createCollectionItem("newsPosts", {
    ...(await baseContentFromForm(formData, canPublish(session.role))),
    ...contentClassificationFromForm(formData)
  } as NewsPost);
  redirect("/admin/actualites?created=1");
}

export async function createArticleAction(formData: FormData) {
  const session = await requireAdmin();
  const item = {
    ...(await baseContentFromForm(formData, canPublish(session.role))),
    period: String(formData.get("period") || ""),
    objectives: String(formData.get("objectives") || ""),
    targetAudience: String(formData.get("targetAudience") || ""),
    ...contentClassificationFromForm(formData),
    linkedDocuments: linesFromForm(formData, "linkedDocuments"),
    testimonials: linesFromForm(formData, "testimonials")
  } as AdminArticle;
  await createCollectionItem("articles", item);
  redirect("/admin/articles?created=1");
}

export async function createRealisationAction(formData: FormData) {
  const session = await requireAdmin();
  const classification = contentClassificationFromForm(formData);
  const item = {
    ...(await baseContentFromForm(formData, canPublish(session.role))),
    ...classification,
    axisId: String(formData.get("axisId") || classification.relatedAxis),
    programId: String(formData.get("programId") || classification.relatedProgram),
    images: linesFromForm(formData, "images")
  } as AdminRealisation;
  await createCollectionItem("realisations", item);
  redirect("/admin/realisations?created=1");
}

export async function createProgramAction(formData: FormData) {
  const session = await requireAdmin();
  const item = {
    ...(await baseContentFromForm(formData, canPublish(session.role))),
    objectives: String(formData.get("objectives") || ""),
    axisId: String(formData.get("axisId") || ""),
    beneficiaries: String(formData.get("beneficiaries") || ""),
    targetAudience: String(formData.get("targetAudience") || ""),
    activities: String(formData.get("activities") || ""),
    ctaLabel: String(formData.get("ctaLabel") || ""),
    ctaHref: String(formData.get("ctaHref") || ""),
    order: numberFromForm(formData, "order")
  } as AdminProgram;
  await createCollectionItem("programs", item);
  redirect("/admin/programmes?created=1");
}

export async function createDocumentAction(formData: FormData) {
  const session = await requireAdmin();
  const uploadedDocument = await saveUploadedFile(formData, "fileUpload", "documents", ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"]);
  const item = {
    ...(await baseContentFromForm(formData, canPublish(session.role))),
    fileUrl: uploadedDocument || String(formData.get("fileUrl") || ""),
    documentType: String(formData.get("documentType") || "")
  } as AdminDocument;
  await createCollectionItem("documents", item);
  redirect("/admin/documents?created=1");
}

export async function createAxisAction(formData: FormData) {
  const session = await requireAdmin();
  const item = {
    ...(await baseContentFromForm(formData, canPublish(session.role))),
    programIds: linesFromForm(formData, "programIds"),
    icon: String(formData.get("icon") || ""),
    order: numberFromForm(formData, "order")
  } as AdminAxis;
  await createCollectionItem("axes", item);
  redirect("/admin/axes?created=1");
}

export async function createTeamMemberAction(formData: FormData) {
  const session = await requireAdmin();
  const now = nowIso();
  const uploadedPhoto = await saveUploadedFile(formData, "imageUpload", "team", ["jpg", "jpeg", "png", "webp"]);
  const status = getStatus(formData, canPublish(session.role));
  const item = {
    id: String(formData.get("id") || `${Date.now()}`),
    name: String(formData.get("name") || "Nom à compléter"),
    role: String(formData.get("role") || "Fonction à compléter"),
    photo: uploadedPhoto || String(formData.get("photo") || ""),
    shortBiography: String(formData.get("shortBiography") || ""),
    biography: String(formData.get("biography") || ""),
    fullBiography: String(formData.get("fullBiography") || ""),
    institutionalRole: String(formData.get("institutionalRole") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    facebookUrl: String(formData.get("facebookUrl") || ""),
    linkedinUrl: String(formData.get("linkedinUrl") || ""),
    socialUrl: String(formData.get("socialUrl") || ""),
    displayOrder: numberFromForm(formData, "displayOrder"),
    showOnHome: booleanFromForm(formData, "showOnHome"),
    status,
    createdAt: now,
    updatedAt: now
  } as TeamMember;
  await createCollectionItem("teamMembers", item);
  redirect("/admin/equipe?created=1");
}

export async function createPartnerAction(formData: FormData) {
  const session = await requireAdmin();
  const now = nowIso();
  const uploadedLogo = await saveUploadedFile(formData, "imageUpload", "partners", ["jpg", "jpeg", "png", "webp", "svg"]);
  const item = {
    id: String(formData.get("id") || `${Date.now()}`),
    name: String(formData.get("name") || "Partenaire à compléter"),
    partnershipType: String(formData.get("partnershipType") || ""),
    logo: uploadedLogo || String(formData.get("logo") || formData.get("image") || ""),
    website: String(formData.get("websiteUrl") || ""),
    description: String(formData.get("description") || ""),
    status: getStatus(formData, canPublish(session.role)),
    createdAt: now,
    updatedAt: now
  } as Partner;
  await createCollectionItem("partners", item);
  redirect("/admin/partenaires?created=1");
}

export async function createTestimonialAction(formData: FormData) {
  const session = await requireAdmin();
  const now = nowIso();
  const uploadedPhoto = await saveUploadedFile(formData, "imageUpload", "testimonials", ["jpg", "jpeg", "png", "webp"]);
  const item = {
    id: String(formData.get("id") || `${Date.now()}`),
    name: String(formData.get("name") || "Nom à compléter"),
    role: String(formData.get("role") || ""),
    audience: String(formData.get("audience") || ""),
    photo: uploadedPhoto || String(formData.get("photo") || formData.get("image") || ""),
    quote: String(formData.get("quote") || ""),
    status: getStatus(formData, canPublish(session.role)),
    createdAt: now,
    updatedAt: now
  } as Testimonial;
  await createCollectionItem("testimonials", item);
  redirect("/admin/temoignages?created=1");
}

export async function createImpactMetricAction(formData: FormData) {
  const session = await requireAdmin();
  const now = nowIso();
  const item = {
    id: String(formData.get("id") || `${Date.now()}`),
    label: String(formData.get("label") || "Indicateur à compléter"),
    value: String(formData.get("value") || "+000"),
    note: String(formData.get("note") || formData.get("description") || "Données en cours de consolidation"),
    description: String(formData.get("description") || formData.get("note") || ""),
    verificationStatus: impactVerificationStatusFromForm(formData),
    internalNotes: String(formData.get("internalNotes") || ""),
    source: String(formData.get("source") || ""),
    internalComment: String(formData.get("internalComment") || ""),
    icon: String(formData.get("icon") || "chart"),
    order: numberFromForm(formData, "order"),
    isVisible: booleanFromForm(formData, "isVisible"),
    status: getStatus(formData, canPublish(session.role)),
    updatedAt: now
  } as ImpactMetric;
  await createCollectionItem("impactMetrics", item);
  redirect("/admin/impact?created=1");
}

export async function updateItemAction(collection: CollectionKey, id: string, formData: FormData) {
  const session = await requireAdmin();
  const store = await readAdminStore();
  const existing = (store[collection] as Array<{ id: string; createdAt?: string }>).find((item) => item.id === id);
  const now = nowIso();

  if (!existing) {
    redirect(`/admin/${collection}`);
  }

  if (collection === "teamMembers") {
    const uploadedPhoto = await saveUploadedFile(formData, "imageUpload", "team", ["jpg", "jpeg", "png", "webp"]);
    await updateCollectionItem(collection, id, {
      name: String(formData.get("name") || ""),
      role: String(formData.get("role") || ""),
      photo: uploadedPhoto || String(formData.get("photo") || ""),
      shortBiography: String(formData.get("shortBiography") || ""),
      biography: String(formData.get("biography") || ""),
      fullBiography: String(formData.get("fullBiography") || ""),
      institutionalRole: String(formData.get("institutionalRole") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      facebookUrl: String(formData.get("facebookUrl") || ""),
      linkedinUrl: String(formData.get("linkedinUrl") || ""),
      socialUrl: String(formData.get("socialUrl") || ""),
      displayOrder: numberFromForm(formData, "displayOrder"),
      showOnHome: booleanFromForm(formData, "showOnHome"),
      status: getStatus(formData, canPublish(session.role)),
      updatedAt: now
    } as never);
    redirect("/admin/equipe?saved=1");
  }

  if (collection === "partners") {
    const uploadedLogo = await saveUploadedFile(formData, "imageUpload", "partners", ["jpg", "jpeg", "png", "webp", "svg"]);
    await updateCollectionItem(collection, id, {
      name: String(formData.get("name") || ""),
      partnershipType: String(formData.get("partnershipType") || ""),
      logo: uploadedLogo || String(formData.get("logo") || formData.get("image") || ""),
      website: String(formData.get("websiteUrl") || ""),
      description: String(formData.get("description") || ""),
      status: getStatus(formData, canPublish(session.role)),
      updatedAt: now
    } as never);
    redirect("/admin/partenaires?saved=1");
  }

  if (collection === "testimonials") {
    const uploadedPhoto = await saveUploadedFile(formData, "imageUpload", "testimonials", ["jpg", "jpeg", "png", "webp"]);
    await updateCollectionItem(collection, id, {
      name: String(formData.get("name") || ""),
      role: String(formData.get("role") || ""),
      audience: String(formData.get("audience") || ""),
      photo: uploadedPhoto || String(formData.get("photo") || formData.get("image") || ""),
      quote: String(formData.get("quote") || ""),
      status: getStatus(formData, canPublish(session.role)),
      updatedAt: now
    } as never);
    redirect("/admin/temoignages?saved=1");
  }

  if (collection === "impactMetrics") {
    await updateCollectionItem(collection, id, {
      label: String(formData.get("label") || ""),
      value: String(formData.get("value") || ""),
      note: String(formData.get("note") || formData.get("description") || ""),
      description: String(formData.get("description") || formData.get("note") || ""),
      verificationStatus: impactVerificationStatusFromForm(formData),
      internalNotes: String(formData.get("internalNotes") || ""),
      source: String(formData.get("source") || ""),
      internalComment: String(formData.get("internalComment") || ""),
      icon: String(formData.get("icon") || "chart"),
      order: numberFromForm(formData, "order"),
      isVisible: booleanFromForm(formData, "isVisible"),
      status: getStatus(formData, canPublish(session.role)),
      updatedAt: now
    } as never);
    redirect("/admin/impact?saved=1");
  }

  const base = await baseContentFromForm(formData, canPublish(session.role));
  const patch = {
    ...base,
    id,
    createdAt: existing.createdAt || base.createdAt,
    updatedAt: now,
    publishedAt: base.status === "published" ? now : undefined
  };

  if (collection === "articles") {
    await updateCollectionItem(collection, id, {
      ...patch,
      period: String(formData.get("period") || ""),
      objectives: String(formData.get("objectives") || ""),
      targetAudience: String(formData.get("targetAudience") || ""),
      ...contentClassificationFromForm(formData),
      linkedDocuments: linesFromForm(formData, "linkedDocuments"),
      testimonials: linesFromForm(formData, "testimonials")
    } as never);
    redirect("/admin/articles?saved=1");
  }

  if (collection === "newsPosts") {
    await updateCollectionItem(collection, id, {
      ...patch,
      ...contentClassificationFromForm(formData)
    } as never);
    redirect("/admin/actualites?saved=1");
  }

  if (collection === "realisations") {
    const classification = contentClassificationFromForm(formData);
    await updateCollectionItem(collection, id, {
      ...patch,
      ...classification,
      axisId: String(formData.get("axisId") || classification.relatedAxis),
      programId: String(formData.get("programId") || classification.relatedProgram),
      images: linesFromForm(formData, "images")
    } as never);
    redirect("/admin/realisations?saved=1");
  }

  if (collection === "programs") {
    await updateCollectionItem(collection, id, {
      ...patch,
      objectives: String(formData.get("objectives") || ""),
      axisId: String(formData.get("axisId") || ""),
      beneficiaries: String(formData.get("beneficiaries") || ""),
      targetAudience: String(formData.get("targetAudience") || ""),
      activities: String(formData.get("activities") || ""),
      ctaLabel: String(formData.get("ctaLabel") || ""),
      ctaHref: String(formData.get("ctaHref") || ""),
      order: numberFromForm(formData, "order")
    } as never);
    redirect("/admin/programmes?saved=1");
  }

  if (collection === "documents") {
    const uploadedDocument = await saveUploadedFile(formData, "fileUpload", "documents", ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"]);
    await updateCollectionItem(collection, id, {
      ...patch,
      fileUrl: uploadedDocument || String(formData.get("fileUrl") || ""),
      documentType: String(formData.get("documentType") || "")
    } as never);
    redirect("/admin/documents?saved=1");
  }

  if (collection === "axes") {
    await updateCollectionItem(collection, id, {
      ...patch,
      programIds: linesFromForm(formData, "programIds"),
      icon: String(formData.get("icon") || ""),
      order: numberFromForm(formData, "order")
    } as never);
    redirect("/admin/axes?saved=1");
  }

  await updateCollectionItem(collection, id, patch as never);
  redirect(`${collectionPaths[collection] || "/admin/dashboard"}?saved=1`);
}

export async function updateMessageStatusAction(id: string, status: MessageStatus) {
  await requireAdmin();
  const patch = {
    status,
    readAt: status === "lu" || status === "traite" ? nowIso() : undefined,
    archivedAt: status === "archive" ? nowIso() : undefined
  };
  await updateCollectionItem("messages", id, patch as never);
}

export async function updateSubscriberStatusAction(id: string, status: SubscriberStatus) {
  await requireAdmin();
  await updateCollectionItem("newsletterSubscribers", id, { status } as never);
}

export async function updateSettingsAction(formData: FormData) {
  const session = await requireAdmin();

  if (session.role !== "super_admin") {
    redirect("/admin/settings?error=forbidden");
  }

  const store = await readAdminStore();
  const settings = {
    ...store.siteSettings,
    siteName: String(formData.get("siteName") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    address: String(formData.get("address") || ""),
    paypalUrl: String(formData.get("paypalUrl") || ""),
    slogan: String(formData.get("slogan") || ""),
    shortDescription: String(formData.get("shortDescription") || ""),
    logo: String(formData.get("logo") || ""),
    favicon: String(formData.get("favicon") || ""),
    footerText: String(formData.get("footerText") || ""),
    socialLinks: String(formData.get("socialLinks") || "")
      .split("\n")
      .map((line) => {
        const [label, href] = line.split("|").map((value) => value.trim());
        return label && href ? { label, href } : null;
      })
      .filter(Boolean) as Array<{ label: string; href: string }>,
    updatedAt: nowIso()
  } satisfies SiteSettings;

  await updateSiteSettings(settings);
  redirect("/admin/settings?saved=1");
}

export async function updateImpactSectionAction(formData: FormData) {
  await requireAdmin();
  const store = await readAdminStore();

  await updateSiteSettings({
    ...store.siteSettings,
    impactTitle: String(formData.get("impactTitle") || "Notre impact"),
    impactSubtitle: String(formData.get("impactSubtitle") || "Des indicateurs prêts à être consolidés et publiés."),
    impactText: String(formData.get("impactText") || "Les valeurs provisoires sont clairement identifiées afin d’éviter toute annonce non vérifiée."),
    impactButtonLabel: String(formData.get("impactButtonLabel") || "Voir l’impact"),
    impactButtonHref: String(formData.get("impactButtonHref") || "/impact"),
    updatedAt: nowIso()
  });

  redirect("/admin/impact?saved=1");
}

export async function deleteItemAction(collection: CollectionKey, id: string) {
  await requireAdmin();
  await deleteCollectionItem(collection, id);
  redirect(`${collectionPaths[collection] || "/admin/dashboard"}?deleted=1`);
}

export async function setItemStatusAction(collection: CollectionKey, id: string, status: "draft" | "published" | "archived") {
  const session = await requireAdmin();

  if (!canPublish(session.role) && status !== "draft") {
    redirect(`${collectionPaths[collection] || "/admin/dashboard"}?error=forbidden`);
  }

  const now = nowIso();
  await updateCollectionItem(collection, id, {
    status,
    updatedAt: now,
    publishedAt: status === "published" ? now : undefined
  } as never);
  redirect(`${collectionPaths[collection] || "/admin/dashboard"}?saved=1`);
}

export async function markContentReviewedAction(collection: CollectionKey, id: string) {
  await requireAdmin();
  await updateCollectionItem(collection, id, {
    needsReview: false,
    updatedAt: nowIso()
  } as never);
  redirect(`${collectionPaths[collection] || "/admin/dashboard"}?saved=1`);
}

export async function setArticleStatusAction(id: string, status: "draft" | "published" | "archived") {
  const session = await requireAdmin();

  if (!canPublish(session.role) && status !== "draft") {
    redirect("/admin/articles");
  }

  const now = nowIso();
  await updateCollectionItem("articles", id, {
    status,
    updatedAt: now,
    publishedAt: status === "published" ? now : undefined
  } as never);
  redirect(`/admin/articles/${id}/edit?saved=1`);
}

export async function markArticleReviewedAction(id: string) {
  await requireAdmin();
  await updateCollectionItem("articles", id, {
    needsReview: false,
    updatedAt: nowIso()
  } as never);
  redirect(`/admin/articles/${id}/edit?saved=1`);
}

export async function deleteArticleAction(id: string) {
  await requireAdmin();
  await deleteCollectionItem("articles", id);
  redirect("/admin/articles?deleted=1");
}

async function saveUploadedFile(formData: FormData, fieldName: string, folder: string, allowedExtensions: string[]) {
  const file = formData.get(fieldName);

  if (!(file instanceof File) || file.size === 0) {
    return "";
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Le fichier dépasse la limite de 10 Mo.");
  }

  const originalName = file.name || "fichier";
  const extension = originalName.split(".").pop()?.toLowerCase() || "";

  if (!allowedExtensions.includes(extension)) {
    throw new Error("Type de fichier non autorisé.");
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadsDir, { recursive: true });

  const filename = `${Date.now()}-${slugify(originalName.replace(/\.[^.]+$/, ""))}.${extension}`;
  const destination = path.join(uploadsDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(destination, buffer);

  return `/uploads/${folder}/${filename}`;
}

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
