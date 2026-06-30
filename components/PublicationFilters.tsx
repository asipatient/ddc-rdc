"use client";

import { useMemo, useState } from "react";
import { PublicationCard } from "@/components/PublicationCard";
import type { Publication } from "@/data/types";
import { cn } from "@/lib/utils";

export function PublicationFilters({
  initialCategory = "Toutes",
  publications,
  publicationCategories
}: {
  initialCategory?: string;
  publications: Publication[];
  publicationCategories: string[];
}) {
  const safeInitial = publicationCategories.includes(initialCategory) ? initialCategory : "Toutes";
  const [active, setActive] = useState(safeInitial);
  const filtered = useMemo(
    () => (active === "Toutes" ? publications : publications.filter((item) => item.category === active)),
    [active, publications]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" aria-label="Filtrer les publications">
        {publicationCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "focus-ring rounded-md border px-4 py-2 text-sm font-bold transition",
              active === category
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-slate-200 bg-white text-brand-blue hover:border-brand-gold"
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((publication) => (
          <PublicationCard key={publication.slug} publication={publication} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-8 rounded-lg bg-brand-mist p-5 text-sm font-semibold text-slate-600">
          Aucun contenu n&apos;est encore publié dans cette catégorie.
        </p>
      ) : null}
    </div>
  );
}
