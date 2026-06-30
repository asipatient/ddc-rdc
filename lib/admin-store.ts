import "server-only";

import {
  createCollectionItem,
  deleteCollectionItem,
  nowIso,
  readAdminStore,
  slugify,
  updateCollectionItem
} from "@/lib/admin/content-store";
import type { AdminArticle, ContentStatus } from "@/lib/admin/types";

export type ArticleStatus = ContentStatus;
export type AdminArticleRecord = AdminArticle;

export async function listArticles() {
  const store = await readAdminStore();
  return [...store.articles].sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());
}

export async function listPublishedArticles() {
  const articles = await listArticles();
  return articles.filter((article) => article.status === "published");
}

export async function getArticleById(id: string) {
  const store = await readAdminStore();
  return store.articles.find((article) => article.id === id) || null;
}

export async function getArticleBySlug(slug: string) {
  const store = await readAdminStore();
  return store.articles.find((article) => article.slug === slug) || null;
}

export async function createArticle(article: Partial<AdminArticle>) {
  const now = nowIso();
  const title = article.title?.trim() || "Article à compléter";
  const status = normalizeStatus(article.status);
  const nextArticle: AdminArticle = {
    id: article.id || `${Date.now()}`,
    title,
    slug: article.slug?.trim() || slugify(title),
    category: article.category || "À compléter",
    date: article.date || new Date().toISOString().slice(0, 10),
    excerpt: article.excerpt || "",
    content: article.content || "",
    image: article.image || "",
    gallery: article.gallery || [],
    author: article.author || "DDC RDC ASBL",
    impact: article.impact || "",
    location: article.location || "",
    partners: article.partners || "",
    relatedAxis: article.relatedAxis || "",
    relatedProgram: article.relatedProgram || "",
    status,
    needsReview: article.needsReview ?? false,
    featured: article.featured ?? false,
    createdAt: article.createdAt || now,
    updatedAt: now,
    publishedAt: status === "published" ? article.publishedAt || now : undefined
  };

  await createCollectionItem("articles", nextArticle);
  return nextArticle;
}

export async function updateArticle(id: string, patch: Partial<AdminArticle>) {
  const status = patch.status ? normalizeStatus(patch.status) : undefined;
  const now = nowIso();
  await updateCollectionItem("articles", id, {
    ...patch,
    status,
    updatedAt: now,
    publishedAt: status === "published" ? patch.publishedAt || now : patch.publishedAt
  } as never);
}

export async function deleteArticle(id: string) {
  await deleteCollectionItem("articles", id);
}

function normalizeStatus(status: unknown): ContentStatus {
  return status === "published" || status === "archived" ? status : "draft";
}
