import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { foundingQuote, historyIntro, historyTimeline } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Notre histoire",
  description: "Évolution de l'engagement citoyen ayant conduit à la création et à la structuration de la DDC RDC."
};

export default function HistoryPage() {
  return (
    <>
      <PageHero
        kicker="Notre histoire"
        title="Une organisation née d'une conviction, construite par des actes."
        description={historyIntro}
        cta={{ label: "Voir les réalisations", href: "/realisations" }}
        image="/images/ddc/jeunesse-culture-echange.jpg"
      />

      <section className="bg-brand-blue py-16 text-white sm:py-20">
        <ScrollReveal className="section-shell max-w-3xl">
          <p className="eyebrow text-brand-gold">Notre origine</p>
          <blockquote className="mt-5 text-2xl font-black leading-tight sm:text-3xl">
            « {foundingQuote.text} »
          </blockquote>
          <p className="mt-6 border-t border-white/20 pt-4 text-sm font-bold">
            — {foundingQuote.author}, Fondateur
          </p>
        </ScrollReveal>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell max-w-3xl">
            <SectionHeading eyebrow="Timeline" title="Une trajectoire construite par étapes." />
            <div className="mt-10 border-l-2 border-brand-gold pl-6">
              {historyTimeline.map((item) => (
                <article key={`${item.period}-${item.title}`} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-brand-green shadow" />
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-green">{item.period}</p>
                  <h2 className="mt-2 text-2xl font-black text-brand-blue">{item.title}</h2>
                  <p className="mt-3 leading-8 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-brand-mist py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <SectionHeading
              eyebrow="Structuration"
              title="Des initiatives vers des programmes durables."
              description="La DDC organise progressivement ses actions autour de la citoyenneté, du leadership féminin, de l'entrepreneuriat, de la culture, de l'environnement, de la recherche, de la protection communautaire et de l'innovation locale."
            />
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/programmes" variant="secondary">
                Découvrir les programmes
              </ButtonLink>
              <ButtonLink href="/impact" variant="ghost">
                Voir l&apos;impact
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
