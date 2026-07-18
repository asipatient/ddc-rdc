"use client";

import { useMemo, useState, useCallback, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const safeInitial = publicationCategories.includes(initialCategory) ? initialCategory : "Toutes";
  const [active, setActive] = useState(safeInitial);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const handleCategory = useCallback(
    (category: string) => {
      setActive(category);
      setPage(1);
      const params = new URLSearchParams(searchParams.toString());
      if (category === "Toutes") {
        params.delete("categorie");
      } else {
        params.set("categorie", encodeURIComponent(category));
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const handleQuery = useCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, []);

  const filtered = useMemo(() => {
    let result = active === "Toutes" ? publications : publications.filter((item) => item.category === active);
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q)
      );
    }
    return result;
  }, [active, query, publications]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const goToPage = useCallback(
    (next: number) => {
      setPage(next);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  return (
    <div ref={topRef}>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les publications par catégorie">
        {publicationCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategory(category)}
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

      {/* Search */}
      <div className="relative mt-5 max-w-md">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
          placeholder="Rechercher un article…"
          aria-label="Rechercher un article"
          className="focus-ring w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm text-slate-700 placeholder:text-slate-400"
        />
        {query ? (
          <button
            type="button"
            onClick={() => handleQuery("")}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {/* Results */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginated.map((publication) => (
          <PublicationCard key={publication.slug} publication={publication} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <p className="mt-8 rounded-lg bg-brand-mist p-5 text-sm font-semibold text-slate-600">
          {query
            ? "Aucun article ne correspond à votre recherche."
            : "Aucun contenu n’est encore publié dans cette catégorie."}
        </p>
      ) : null}

      {/* Pagination */}
      {totalPages > 1 ? (
        <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
          <button
            type="button"
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 1}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-brand-blue transition hover:border-brand-gold disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Page précédente"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => goToPage(p)}
              className={cn(
                "focus-ring flex h-9 w-9 items-center justify-center rounded-md border text-sm font-bold transition",
                p === safePage
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-slate-200 bg-white text-brand-blue hover:border-brand-gold"
              )}
              aria-current={p === safePage ? "page" : undefined}
              aria-label={`Page ${p}`}
            >
              {p}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage === totalPages}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-brand-blue transition hover:border-brand-gold disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Page suivante"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      ) : null}

      {filtered.length > 0 ? (
        <p className="mt-4 text-center text-xs text-slate-400">
          {filtered.length} article{filtered.length > 1 ? "s" : ""}
          {active !== "Toutes" || query ? " trouvé" + (filtered.length > 1 ? "s" : "") : ""}
        </p>
      ) : null}
    </div>
  );
}
