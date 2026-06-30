import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import type { Publication } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const accentClasses = {
  blue: "from-brand-blue to-brand-green",
  gold: "from-brand-gold to-brand-green",
  green: "from-brand-green to-brand-blue",
  red: "from-brand-red to-brand-blue"
};

export function PublicationCard({ publication }: { publication: Publication }) {
  const date = new Intl.DateTimeFormat("fr-CD", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(publication.date));

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className={cn("relative flex aspect-[16/10] items-end overflow-hidden p-5 text-white", !publication.image && `bg-gradient-to-br ${accentClasses[publication.accent]}`)}>
        {publication.image ? (
          <>
            <Image src={publication.image} alt={publication.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-brand-blue/55" />
          </>
        ) : null}
        <div className="relative flex flex-wrap gap-2">
          <span className="rounded-md bg-white/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur">
            {publication.category}
          </span>
          {publication.needsReview ? (
            <span className="rounded-md bg-brand-gold px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-brand-blue">
              À relire
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <CalendarDays aria-hidden="true" className="h-4 w-4" />
          <time dateTime={publication.date}>{publication.period || date}</time>
        </div>
        <h3 className="mt-3 text-xl font-black leading-tight text-brand-blue">{publication.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{publication.excerpt}</p>
        <Link
          href={`/publications/${publication.slug}`}
          className="focus-ring mt-5 inline-flex w-fit rounded-md text-sm font-bold text-brand-green hover:text-brand-blue"
        >
          Lire l&apos;article
        </Link>
      </div>
    </article>
  );
}
