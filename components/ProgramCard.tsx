import Link from"next/link";
import { ArrowRight } from"lucide-react";
import { IconRenderer } from"@/components/IconRenderer";
import type { Program } from"@/lib/site-data";

export function ProgramCard({ program }: { program: Program }) {
 const learnMoreHref = `/axes-intervention#${program.axisSlug}`;

 return (
 <article id={program.slug} className="card group flex h-full flex-col p-6 rounded-2xl border border-border bg-surface-elevated hover:border-brand-blue/30 shadow-sm hover:shadow-md transition-all">
 <div className="flex items-center gap-4">
 <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-mist text-brand-blue transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
 <IconRenderer icon={program.icon} className="h-7 w-7" />
 </div>
 <h3 className="text-xl font-black leading-tight text-brand-blue">{program.title}</h3>
 </div>
 {program.targetAudience?.length ? (
 <div className="mt-5 flex flex-wrap gap-2">
 {program.targetAudience.map((audience) => (
 <span key={audience} className="inline-flex items-center rounded-md bg-brand-green/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-brand-green">
 {audience}
 </span>
 ))}
 </div>
 ) : null}
 <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground-muted">{program.description}</p>
 {program.objectives?.length ? (
 <div className="mt-5 border-t border-slate-100 pt-5">
 <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-gold">Objectifs</p>
 <ul className="mt-3 space-y-2">
 {program.objectives.map((obj) => (
 <li key={obj} className="text-sm text-foreground-muted flex gap-2">
 <span className="text-brand-green font-black mt-0.5">•</span>
 <span>{obj}</span>
 </li>
 ))}
 </ul>
 </div>
 ) : null}

 <Link
 href={learnMoreHref}
 className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-brand-green group-hover:text-brand-blue transition-colors"
 >
 En savoir plus sur l'axe
 <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
 </Link>
 </article>
 );
}
