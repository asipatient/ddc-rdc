import "server-only";

import { publications as staticPublications } from "@/data/publications";
import type { Publication } from "@/data/types";
import { readAdminStore } from "@/lib/admin/content-store";

const accents = ["blue", "green", "gold", "red"] as const;

export const PUBLICATION_CATEGORIES = ["Actualités", "Événements", "Rapports", "Notes de plaidoyer", "Communiqués"] as const;

const DIACRITICS_PATTERN = /[\u0300-\u036f]/g;

function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(DIACRITICS_PATTERN, "").toLowerCase().trim();
}

function normalizeCategory(value?: string): string {
  const normalized = stripDiacritics(String(value || ""));

  if (normalized.includes("plaidoyer")) return "Notes de plaidoyer";
  if (normalized.includes("communique")) return "Communiqués";
  if (normalized.includes("rapport") || normalized.includes("etude") || normalized.includes("recherche")) return "Rapports";
  if (normalized.includes("evenement")) return "Événements";
  if (normalized.includes("actualite")) return "Actualités";

  return (
    (PUBLICATION_CATEGORIES as readonly string[]).find((category) => stripDiacritics(category) === normalized) || "Actualités"
  );
}

export async function getPublicPublications() {
  const store = await readAdminStore();
  const adminArticles = store.articles
    .filter((article) => article.status === "published")
    .map((article, index): Publication => {
      const body = splitParagraphs(article.content);

      return {
        slug: article.slug,
        title: article.title,
        date: article.date || article.publishedAt || article.createdAt,
        category: normalizeCategory(article.category),
        excerpt: article.excerpt || "Résumé à compléter.",
        body: body.length ? body : ["Contenu à compléter."],
        accent: accents[index % accents.length],
        image: article.image || undefined,
        status: "published",
        needsReview: article.needsReview,
        objectives: splitList(article.objectives),
        targetAudience: splitList(article.targetAudience),
        impact: splitList(article.impact),
        location: article.location,
        partners: splitList(article.partners),
        relatedAxis: article.relatedAxis,
        relatedProgram: article.relatedProgram,
        gallery: article.gallery
      };
    });
  const adminNews = store.newsPosts
    .filter((post) => post.status === "published")
    .map((post, index): Publication => {
      const body = splitParagraphs(post.content);

      return {
        slug: post.slug,
        title: post.title,
        date: post.date || post.publishedAt || post.createdAt,
        category: normalizeCategory(post.category),
        excerpt: post.excerpt || "Résumé à compléter.",
        body: body.length ? body : ["Contenu à compléter."],
        accent: accents[(index + adminArticles.length) % accents.length],
        image: post.image || undefined,
        status: "published",
        needsReview: post.needsReview,
        location: post.location,
        partners: splitList(post.partners),
        impact: splitList(post.impact),
        relatedAxis: post.relatedAxis,
        relatedProgram: post.relatedProgram,
        gallery: post.gallery
      };
    });
  const adminRealisations = store.realisations
    .filter((realisation) => realisation.status === "published")
    .map((realisation, index): Publication => {
      const body = splitParagraphs(realisation.content);

      return {
        slug: realisation.slug,
        title: realisation.title,
        date: realisation.date || realisation.publishedAt || realisation.createdAt,
        category: normalizeCategory(realisation.category),
        excerpt: realisation.excerpt || "Résumé à compléter.",
        body: body.length ? body : ["Contenu à compléter."],
        accent: accents[(index + adminArticles.length + adminNews.length) % accents.length],
        image: realisation.image || undefined,
        status: "published",
        needsReview: realisation.needsReview,
        location: realisation.location,
        partners: splitList(realisation.partners),
        impact: splitList(realisation.impact),
        relatedAxis: realisation.relatedAxis || realisation.axisId,
        relatedProgram: realisation.relatedProgram || realisation.programId,
        gallery: realisation.gallery?.length ? realisation.gallery : realisation.images
      };
    });
  const adminPublications = [...adminArticles, ...adminNews, ...adminRealisations];

  const bySlug = new Map<string, Publication>();
  [...adminPublications, ...staticPublications].forEach((publication) => {
    if (!bySlug.has(publication.slug)) {
      bySlug.set(publication.slug, { ...publication, category: normalizeCategory(publication.category) });
    }
  });

  return Array.from(bySlug.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPublicPublicationBySlug(slug: string) {
  const publications = await getPublicPublications();
  return publications.find((publication) => publication.slug === slug) || null;
}

export async function getPublicPublicationCategories() {
  return ["Toutes", ...PUBLICATION_CATEGORIES];
}

function splitParagraphs(value?: string) {
  return String(value || "")
    .split(/\r?\n\s*\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitList(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  return String(value || "")
    .split(/\r?\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}
