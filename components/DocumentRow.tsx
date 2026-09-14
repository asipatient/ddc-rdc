import Link from "next/link";
import { ArrowRight, CalendarDays, FileText } from "lucide-react";
import type { Publication } from "@/data/types";

export function DocumentRow({ publication }: { publication: Publication }) {
  const date = new Intl.DateTimeFormat("fr-CD", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(publication.date));

  const displayDate = publication.period || date;

  return (
    <article className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-xl border border-border bg-surface-muted p-5 transition-all hover:bg-surface-elevated hover:border-brand">
      <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-lg bg-surface-elevated text-brand-blue dark:text-brand shadow-sm">
        <FileText className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground-subtle mb-1">
          <span className="text-brand">{publication.category}</span>
          <span className="hidden sm:inline" aria-hidden="true">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
            <time dateTime={publication.date}>{displayDate}</time>
          </span>
        </div>
        <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2">
          {publication.title}
        </h3>
        <p className="mt-1 text-sm text-foreground-muted line-clamp-2 leading-relaxed">
          {publication.excerpt}
        </p>
      </div>
      <div className="mt-4 sm:mt-0 shrink-0">
        <Link
          href={`/publications/${publication.slug}`}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-brand-blue text-white hover:bg-brand-green dark:bg-foreground dark:text-background dark:hover:bg-brand px-4 py-2.5 text-sm font-bold transition-colors"
        >
          <span>Consulter</span>
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
