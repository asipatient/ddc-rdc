import type { Metadata } from "next";
import { IconRenderer } from "@/components/IconRenderer";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { home, specificObjectives } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Objectifs",
  description: "Objectif général et objectifs spécifiques de la DDC RDC ASBL."
};

export default function ObjectivesPage() {
  return (
    <>
      <PageHero
        kicker="Objectifs"
        title="Des objectifs clairs pour relier la conscience citoyenne à l'impact local."
        description="La DDC RDC ASBL structure son action autour d'un objectif général et de huit objectifs spécifiques."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <div className="rounded-lg bg-brand-blue p-8 text-white sm:p-10">
            <SectionHeading
              eyebrow="Objectif général"
              title="Faire émerger une jeunesse et une femme congolaise responsables, compétentes et engagées."
              description={home.generalObjective}
              className="[&_h2]:text-white [&_p:not(.eyebrow)]:text-white/80"
            />
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {specificObjectives.map((objective, index) => (
              <article key={objective.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-goldSoft text-brand-blue">
                    <IconRenderer icon={objective.icon} className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-[0.16em] text-brand-green">Objectif {index + 1}</span>
                </div>
                <h2 className="mt-5 text-xl font-black text-brand-blue">{objective.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{objective.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
