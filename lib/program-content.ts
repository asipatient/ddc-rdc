import "server-only";

import { axes as staticAxes } from "@/data/axes";
import { flagshipPrograms as staticPrograms } from "@/data/programs";
import type { Axis, IconKey, Program } from "@/data/types";
import { readAdminStore, slugify } from "@/lib/admin/content-store";

export async function getPublicProgramContent() {
  const store = await readAdminStore();
  const adminAxes: Axis[] = store.axes
    .filter((axis) => axis.status === "published")
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .map((axis) => ({
      slug: axis.slug,
      title: axis.title,
      description: axis.content || axis.excerpt || "Description à compléter.",
      icon: normalizeIcon(axis.icon, "target"),
      image: axis.image || "/images/ddc/conference-citoyenne.jpg",
      programSlugs: (axis.programIds || []).map((program) => slugify(program)),
      order: axis.order
    }));
  const axisSlugByKey = new Map<string, string>();
  adminAxes.forEach((axis) => {
    axisSlugByKey.set(axis.slug, axis.slug);
    axisSlugByKey.set(slugify(axis.title), axis.slug);
  });
  const adminPrograms: Program[] = store.programs
    .filter((program) => program.status === "published")
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .map((program) => ({
      slug: program.slug,
      title: program.title,
      shortTitle: program.title,
      description: program.content || program.excerpt || "Description à compléter.",
      excerpt: program.excerpt,
      icon: normalizeIcon(program.icon, "book"),
      axisSlug: axisSlugByKey.get(slugify(program.axisId || "")) || slugify(program.axisId || ""),
      objectives: splitList(program.objectives),
      targetAudience: splitList(program.targetAudience || program.beneficiaries),
      activities: splitList(program.activities),
      image: program.image,
      order: program.order
    }));

  return {
    axes: adminAxes.length ? adminAxes : staticAxes,
    programs: adminPrograms.length ? adminPrograms : staticPrograms
  };
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

function normalizeIcon(value: unknown, fallback: IconKey): IconKey {
  return (typeof value === "string" && value ? value : fallback) as IconKey;
}
