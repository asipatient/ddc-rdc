import "server-only";

import { publications as staticPublications } from "@/data/publications";
import type { Publication } from "@/data/types";
import { readAdminStore } from "@/lib/admin/content-store";

const accents = ["blue", "green", "gold", "red"] as const;

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
        category: article.category || "Articles",
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
        category: post.category || "Actualités",
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
        category: realisation.category || "Réalisations",
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
      bySlug.set(publication.slug, publication);
    }
  });

  return Array.from(bySlug.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPublicPublicationBySlug(slug: string) {
  const publications = await getPublicPublications();
  return publications.find((publication) => publication.slug === slug) || null;
}

export async function getPublicPublicationCategories() {
  const publications = await getPublicPublications();
  return ["Toutes", ...Array.from(new Set(publications.map((publication) => publication.category)))];
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
