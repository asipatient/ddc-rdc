import "server-only";

import { realisations as staticRealisations } from "@/data/realisations";
import type { Realisation } from "@/data/types";
import { readAdminStore } from "@/lib/admin/content-store";

const AXIS_TAXONOMY_MAP: Record<string, string> = {
  "Gouvernance, citoyenneté et transformation sociale": "Citoyenneté & leadership",
  "Autonomisation économique et résilience": "Autonomie & entrepreneuriat",
  "Identité, inclusion et capital humain": "Culture & inclusion"
};

function mapTaxonomy(relatedAxis?: string): string {
  if (!relatedAxis) return "";
  // Gérer les cas où plusieurs axes sont séparés par " / "
  return relatedAxis
    .split(" / ")
    .map((axis) => AXIS_TAXONOMY_MAP[axis.trim()] || axis.trim())
    .join(" / ");
}

export async function getPublicRealisations() {
  const store = await readAdminStore();
  const adminRealisations = store.realisations
    .filter((realisation) => realisation.status === "published" && !realisation.needsReview)
    .map((realisation): Realisation => ({
      slug: realisation.slug,
      dateLabel: realisation.date || realisation.publishedAt || realisation.createdAt,
      dateIso: realisation.date || realisation.publishedAt || realisation.createdAt,
      title: realisation.title,
      category: realisation.category || "Réalisations",
      description: realisation.excerpt || "",
      image: realisation.image || "/images/ddc/groupe-partenaires-ddc.jpg",
      impact: splitList(realisation.impact),
      relatedAxis: mapTaxonomy(realisation.relatedAxis || realisation.axisId),
      relatedProgram: realisation.relatedProgram || realisation.programId
    }));

  const bySlug = new Map<string, Realisation>();
  [...adminRealisations, ...staticRealisations].forEach((realisation) => {
    if (!bySlug.has(realisation.slug)) {
      // Pour les réalisations statiques, on s'assure d'appliquer le même mapping public
      const mappedRealisation = {
        ...realisation,
        relatedAxis: mapTaxonomy(realisation.relatedAxis)
      };
      bySlug.set(realisation.slug, mappedRealisation);
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
