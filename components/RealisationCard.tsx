import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { Realisation } from "@/lib/site-data";

export function RealisationCard({ realisation, compact = false }: { realisation: Realisation; compact?: boolean }) {
  return (
    <article id={realisation.slug} className="card flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-blueSoft">
        <Image
          src={realisation.image}
          alt={realisation.title}
          fill
          sizes={compact ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
          className="object-cover transition duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-brand-green">
          <CalendarDays aria-hidden="true" className="h-4 w-4" />
          {realisation.dateLabel}
        </p>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{realisation.category}</p>
        <h3 className="mt-3 text-xl font-black leading-tight text-brand-blue">{realisation.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{realisation.description}</p>
        {realisation.relatedProgram || realisation.relatedAxis ? (
          <dl className="mt-4 space-y-2 text-xs leading-6 text-slate-600">
            {realisation.relatedProgram ? (
              <div>
                <dt className="font-black text-brand-blue">Programme lié</dt>
                <dd>{realisation.relatedProgram}</dd>
              </div>
            ) : null}
            {realisation.relatedAxis ? (
              <div>
                <dt className="font-black text-brand-blue">Axe lié</dt>
                <dd>{realisation.relatedAxis}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
        {realisation.impact ? (
          <p className="mt-4 rounded-md bg-brand-mist p-3 text-xs font-semibold leading-6 text-slate-600">
            <span className="font-black text-brand-blue">Impact : </span>
            {realisation.impact.length ? realisation.impact.join(" ") : "À compléter"}
          </p>
        ) : null}
        <Link
          href={`/publications/${realisation.slug}`}
          className="focus-ring mt-5 inline-flex w-fit rounded-md text-sm font-bold text-brand-green hover:text-brand-blue"
        >
          Lire la fiche
        </Link>
      </div>
    </article>
  );
}
