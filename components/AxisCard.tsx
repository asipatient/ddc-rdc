"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconRenderer } from "@/components/IconRenderer";
import { useReveal } from "@/hooks/useReveal";
import type { Axis, Program } from "@/lib/site-data";

export function AxisCard({ axis, programs }: { axis: Axis; programs: Program[] }) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      <div ref={ref} className={`img-reveal relative aspect-[16/10] overflow-hidden ${isVisible ? "visible" : ""}`}>
        <Image
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
        <h3 className="mt-5 text-xl font-black leading-tight text-brand-blue">{axis.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{axis.description}</p>
        <div className="mt-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-green">Programmes associés</p>
          <ul className="mt-3 space-y-2">
            {programs.map((program) => (
              <li key={program.slug} className="text-sm font-semibold text-slate-700">
                {program.shortTitle}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={`/axes-intervention#${axis.slug}`}
          className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-brand-green hover:text-brand-blue"
        >
          Découvrir cet axe
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
