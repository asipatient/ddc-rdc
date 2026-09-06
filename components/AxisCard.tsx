"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentImage } from "@/components/ContentImage";
import { IconRenderer } from "@/components/IconRenderer";
import { useReveal } from "@/hooks/useReveal";
import type { Axis, Program } from "@/lib/site-data";

export function AxisCard({ axis, programs }: { axis: Axis; programs: Program[] }) {
 const { ref, isVisible } = useReveal<HTMLDivElement>();

 return (
 <article className="card group flex h-full flex-col overflow-hidden card-interactive">
 <div ref={ref} className={`img-reveal relative aspect-[16/10] overflow-hidden ${isVisible ?"visible" :""}`}>
 <ContentImage
 src={axis.image}
 alt={axis.title}
 fill
 sizes="(min-width: 1024px) 33vw, 100vw"
 className="object-cover transition duration-500 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-brand-blue/25" />
 </div>
 <div className="flex flex-1 flex-col p-6">
 <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-goldSoft text-brand-blue transition-colors duration-300 group-hover:bg-brand-gold group-hover:text-white">
 <IconRenderer icon={axis.icon} className="h-6 w-6" />
 </div>
 <h3 className="mt-5 text-xl font-semibold leading-tight text-brand-blue dark:text-foreground">{axis.title}</h3>
 <p className="mt-3 text-sm leading-7 text-foreground-muted">{axis.description}</p>
 {(axis.problem || axis.action || axis.result) && (
 <div className="mt-6 flex-1 space-y-3 text-sm">
 {axis.problem && (
 <p><strong className="text-brand-gold">Le problème :</strong> <span className="text-foreground-muted">{axis.problem}</span></p>
 )}
 {axis.action && (
 <p><strong className="text-brand-green">Notre action :</strong> <span className="text-foreground-muted">{axis.action}</span></p>
 )}
 {axis.result && (
 <p><strong className="text-brand-blue dark:text-foreground-muted">Le résultat :</strong> <span className="text-foreground-muted">{axis.result}</span></p>
 )}
 </div>
 )}

 <div className="mt-6 border-t border-slate-100 pt-5">
 <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">Programmes associés</p>
 <ul className="mt-3 space-y-2">
 {programs.map((program) => (
 <li key={program.slug} className="text-sm font-semibold text-foreground-muted">
 {program.shortTitle}
 </li>
 ))}
 </ul>
 </div>
 <Link
 href={`/axes-intervention#${axis.slug}`}
 className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-brand-green dark:text-brand-green hover:text-brand-blue dark:hover:text-foreground"
 >
 Découvrir cet axe
 <ArrowRight aria-hidden="true" className="h-4 w-4" />
 </Link>
 </div>
 </article>
 );
}
