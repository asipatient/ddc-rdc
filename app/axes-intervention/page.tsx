import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { IconRenderer } from "@/components/IconRenderer";
import { PageHero } from "@/components/PageHero";
import { ProgramCard } from "@/components/ProgramCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getPublicProgramContent } from "@/lib/program-content";

export const metadata: Metadata = {
  title: "Axes d'intervention",
  description: "Les trois axes d'intervention de la DDC RDC et les programmes associés."
};

export const dynamic = "force-dynamic";

export default async function AxesInterventionPage() {
  const { axes, programs } = await getPublicProgramContent();

  return (
    <>
      <PageHero
        kicker="Axes d'intervention"
        title="Trois axes pour structurer l'action de la DDC RDC."
        description="Ces axes organisent les interventions autour de la gouvernance citoyenne, de la résilience économique et du développement du capital humain."
        cta={{ label: "Voir les programmes", href: "/programmes" }}
      image="/images/ddc/activisme-vbg.jpg"
      />
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell space-y-12">
          {axes.map((axis, index) => {
            const axisPrograms = programs.filter((program) => program.axisSlug === axis.slug || axis.programSlugs.includes(program.slug));

            return (
              <article
                key={axis.slug}
                id={axis.slug}
                className="grid gap-8 rounded-lg border border-slate-200 bg-white p-5 shadow-soft lg:grid-cols-[0.9fr_1.1fr] lg:p-8"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <div className="relative min-h-72 overflow-hidden rounded-lg bg-brand-blueSoft">
                    <Image src={axis.image} alt={axis.title} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
                  </div>
                </div>
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-goldSoft text-brand-blue">
                    <IconRenderer icon={axis.icon} className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-brand-green">Axe {index + 1}</p>
                  <h2 className="mt-3 text-3xl font-black leading-tight text-brand-blue">{axis.title}</h2>
                  <p className="mt-4 leading-8 text-slate-600">{axis.description}</p>
                  <div className="mt-7 grid gap-4">
                    {axisPrograms.map((program) => (
                      <div key={program.slug} className="rounded-lg bg-brand-mist p-5">
                        <h3 className="text-lg font-black text-brand-blue">{program.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{program.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </ScrollReveal>

      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell">
          <SectionHeading eyebrow="Programmes phares" title="Les huit programmes associés aux axes." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/contact?type=Projet%20communautaire" variant="secondary">
              Proposer une initiative communautaire
            </ButtonLink>
          </div>
        </div>
      </ScrollReveal>

      </section>
    </>
  );
}
