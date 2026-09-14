"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PublicationCard } from "@/components/PublicationCard";
import { DocumentRow } from "@/components/DocumentRow";
import type { Publication } from "@/data/types";
import { cn } from "@/lib/utils";

export function PublicationBoard({
  publications
}: {
  publications: Publication[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return publications;
    }
    return publications.filter(
      (item) =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.excerpt.toLowerCase().includes(normalizedQuery)
    );
  }, [publications, query]);

  // Séparation du flux en deux : Ressources et Actualités
  const resourcesCategories = ["Rapports", "Notes de plaidoyer", "Communiqués"];
  
  const resources = filtered.filter(item => resourcesCategories.includes(item.category));
  const activities = filtered.filter(item => !resourcesCategories.includes(item.category));

  return (
    <div>
      {/* Recherche */}
      <div className="relative max-w-xl mx-auto mb-16">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-subtle" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une publication, un rapport, une actualité..."
          aria-label="Rechercher"
          className="focus-ring w-full rounded-xl border-2 border-border bg-surface py-4 pl-12 pr-4 text-base text-foreground placeholder:text-foreground-subtle hover:border-brand-mist/50 transition-colors"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface-muted p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-elevated text-foreground shadow-sm">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="mt-6 text-xl font-bold text-foreground">Aucun résultat trouvé</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-muted">
            Nous n'avons pas trouvé de document correspondant à "{query}". Essayez avec d'autres mots-clés.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="focus-ring mt-6 rounded-md bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-brand transition-colors"
          >
            Réinitialiser la recherche
          </button>
        </div>
      ) : (
        <div className="space-y-20">
          {/* Section Ressources */}
          {resources.length > 0 && (
            <section>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground">Ressources et contenus de référence</h2>
                <p className="mt-2 text-foreground-muted">Rapports, études et notes de plaidoyer produits par la DDC RDC.</p>
              </div>
              <div className="flex flex-col gap-4">
                {resources.map((publication) => (
                  <DocumentRow key={publication.slug} publication={publication} />
                ))}
              </div>
            </section>
          )}

          {/* Section Actualités */}
          {activities.length > 0 && (
            <section>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground">Actualités et activités</h2>
                <p className="mt-2 text-foreground-muted">Les actions menées sur le terrain et la vie de l'association.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activities.map((publication) => (
                  <PublicationCard key={publication.slug} publication={publication} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
