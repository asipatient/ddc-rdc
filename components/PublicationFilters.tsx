"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PublicationCard } from "@/components/PublicationCard";
import type { Publication } from "@/data/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

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
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const byCategory = active === "Toutes" ? publications : publications.filter((item) => item.category === active);
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return byCategory;
    }

    return byCategory.filter(
      (item) => item.title.toLowerCase().includes(normalizedQuery) || item.excerpt.toLowerCase().includes(normalizedQuery)
    );
  }, [active, publications, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleCategoryChange(category: string) {
    setActive(category);
    setPage(1);

    const url = new URL(window.location.href);
    if (category === "Toutes") {
      url.searchParams.delete("categorie");
    } else {
      url.searchParams.set("categorie", category);
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" aria-label="Filtrer les publications">
        {publicationCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryChange(category)}
            aria-pressed={active === category}
            className={cn(
              "focus-ring rounded-md border px-4 py-2 text-sm font-bold transition",
              active === category
                ? "border-foreground bg-foreground text-background ring-2 ring-brand ring-offset-2 ring-offset-background"
                : "border-border bg-surface text-foreground hover:border-brand"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="relative mt-6 max-w-md">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
        <input
          type="search"
          value={query}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Rechercher un article..."
          aria-label="Rechercher un article"
          className="focus-ring w-full rounded-md border border-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-foreground-subtle"
        />
      </div>

      {paginated.length ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginated.map((publication) => (
            <PublicationCard key={publication.slug} publication={publication} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-border bg-surface-muted p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-elevated text-foreground shadow-sm">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="mt-6 text-xl font-black text-foreground">Aucune publication trouvée</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-muted">
            Nous n'avons pas trouvé de document correspondant à votre recherche. Essayez de modifier vos filtres ou de revenir à la liste complète.
          </p>
          <button
            type="button"
            onClick={() => { setQuery(""); handleCategoryChange("Toutes"); }}
            className="focus-ring mt-6 rounded-md bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-brand transition-colors"
          >
            Voir toutes les publications
          </button>
        </div>
      )}

      {totalPages > 1 ? <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} /> : null}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onChange
}: {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="focus-ring rounded-md border border-border px-4 py-2 text-sm font-bold text-foreground hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
      >
        Précédent
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onChange(pageNumber)}
          aria-current={pageNumber === currentPage ? "page" : undefined}
          className={cn(
            "focus-ring min-w-10 rounded-md border px-3 py-2 text-sm font-bold transition",
            pageNumber === currentPage
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-surface text-foreground hover:border-brand"
          )}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="focus-ring rounded-md border border-border px-4 py-2 text-sm font-bold text-foreground hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
      >
        Suivant
      </button>
    </nav>
  );
}
