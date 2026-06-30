import "server-only";

import { institutionalDocuments as staticDocuments } from "@/data/documents";
import type { DocumentItem } from "@/data/types";
import { readAdminStore } from "@/lib/admin/content-store";

export async function getPublicDocuments() {
  const store = await readAdminStore();
  const adminDocuments: DocumentItem[] = store.documents
    .filter((document) => document.status === "published")
    .map((document) => ({
      title: document.title,
      category: document.category || document.documentType || "Document",
      status: document.fileUrl ? "Disponible" : "À compléter",
      description: document.excerpt || document.content || "Description à compléter.",
      href: document.fileUrl
    }));

  return adminDocuments.length ? adminDocuments : staticDocuments;
}
