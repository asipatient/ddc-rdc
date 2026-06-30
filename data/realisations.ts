import { publishedActivityArticles } from "./articles";
import type { Realisation } from "./types";

export const realisations: Realisation[] = publishedActivityArticles
  .map((article) => ({
    slug: article.slug,
    dateLabel: article.period,
    dateIso: article.date,
    title: article.title,
    category: article.category,
    description: article.excerpt,
    image: article.image
  }))
  .sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime());
