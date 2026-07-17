import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconRenderer } from "@/components/IconRenderer";
import type { Program } from "@/lib/site-data";

export function ProgramCard({ program }: { program: Program }) {
  const learnMoreHref = `/axes-intervention#${program.axisSlug}`;

  return (
    <article id={program.slug} className="card group flex h-full flex-col p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-blueSoft text-brand-blue transition-colors duration-300 group-hover:bg-brand-gold group-hover:text-white">
        <IconRenderer icon={program.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-black leading-tight text-brand-blue">{program.title}</h3>
      {program.targetAudience?.length ? (
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-brand-green">
          {program.targetAudience.join(" · ")}
        </p>
      ) : null}
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{program.description}</p>
      <Link
        href={learnMoreHref}
        className="focus-ring mt-5 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-brand-green hover:text-brand-blue"
      >
        En savoir plus
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </article>
  );
}
