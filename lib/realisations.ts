import "server-only";

import { realisations as staticRealisations } from "@/data/realisations";
import type { Realisation } from "@/data/types";
import { readAdminStore } from "@/lib/admin/content-store";

export async function getPublicRealisations() {
  const store = await readAdminStore();
  const adminRealisations = store.realisations
    .filter((realisation) => realisation.status === "published")
    .map((realisation): Realisation => ({
      slug: realisation.slug,
      dateLabel: realisation.date || realisation.publishedAt || realisation.createdAt,
      dateIso: realisation.date || realisation.publishedAt || realisation.createdAt,
      title: realisation.title,
      category: realisation.category || "Réalisations",
      description: realisation.excerpt || "Résumé à compléter.",
      image: realisation.image || "/images/ddc/hero-reel-ddc.jpg",
      impact: splitList(realisation.impact),
      relatedAxis: realisation.relatedAxis || realisation.axisId,
      relatedProgram: realisation.relatedProgram || realisation.programId
    }));

  const bySlug = new Map<string, Realisation>();
  [...adminRealisations, ...staticRealisations].forEach((realisation) => {
    if (!bySlug.has(realisation.slug)) {
      bySlug.set(realisation.slug, realisation);
    }
  });

  return Array.from(bySlug.values()).sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime());
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
