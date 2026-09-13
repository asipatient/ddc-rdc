import "server-only";

import { impactIndicators as staticIndicators } from "@/data/impact";
import type { IconKey, ImpactIndicator } from "@/data/types";
import { readAdminStore } from "@/lib/admin/content-store";

export async function getPublicImpactIndicators() {
  const store = await readAdminStore();
  const adminIndicators: ImpactIndicator[] = store.impactMetrics
    .filter((metric) => (metric.status || "published") === "published" && metric.isVisible !== false)
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .map((metric) => ({
      label: metric.label,
      value: metric.value,
      note: metric.description || metric.note,
      description: metric.description || metric.note,
      verificationStatus: metric.verificationStatus || "provisional",
      icon: (metric.icon || "chart") as IconKey,
      order: metric.order
    }));

  return adminIndicators.length ? adminIndicators : staticIndicators;
}

export async function getPublicImpactSection() {
  const store = await readAdminStore();
  const settings = store.siteSettings;

  return {
    title: settings.impactTitle || "Résultats de notre action",
    subtitle: settings.impactSubtitle || "Ce que notre action a produit, documenté avec rigueur.",
    text: settings.impactText || "Chaque chiffre présenté ici reflète une réalité de terrain. Nous documentons nos résultats pour garantir la transparence de notre engagement.",
    buttonLabel: settings.impactButtonLabel || "Voir l’impact",
    buttonHref: settings.impactButtonHref || "/impact"
  };
}

export function getImpactVerificationBadge(status: ImpactIndicator["verificationStatus"]) {
  if (status === "verified") {
    return null;
  }

  if (status === "incomplete") {
    return "En consolidation";
  }

  return "Provisoire";
}
