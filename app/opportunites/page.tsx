import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CalendarDays } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { opportunities } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Appels à projets / Opportunités",
  description: "Appels à candidatures, formations, bénévolat, partenariats, consultations communautaires et événements de la DDC RDC."
};

export default function OpportunitiesPage() {
  return (
    <>
      <PageHero
        kicker="Opportunités"
        title="Appels, formations, bénévolat, partenariats et événements."
        description="Cette page permettra de publier les opportunités pour les jeunes, les femmes, les bénévoles, les partenaires et les communautés locales."
        cta={{ label: "Rejoindre la DDC", href: "/devenir-membre-benevole" }}
      image="/images/ddc/IMG-20260131-WA0181.jpg"
      />
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell">
          <SectionHeading
            eyebrow="Appels à projets / Opportunités"
            title="Espaces prêts pour les publications à venir."
            description="Aucune opportunité ouverte en ce moment. Suivez-nous sur Facebook et X (@ddcrdc) pour être informé en premier des prochaines opportunités."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {opportunities.map((opportunity) => (
              <article key={opportunity.title} className="rounded-lg border border-slate-200 p-6 shadow-sm">
                <CalendarDays aria-hidden="true" className="h-7 w-7 text-brand-green" />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{opportunity.audience}</p>
                <h2 className="mt-2 text-lg font-black text-brand-blue">{opportunity.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{opportunity.description}</p>
                <p className="mt-4 inline-flex rounded-md bg-brand-goldSoft px-3 py-2 text-xs font-black text-brand-blue">{opportunity.status}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/devenir-membre-benevole" variant="secondary">
              Devenir membre / bénévole
            </ButtonLink>
            <ButtonLink href="/partenaires" variant="ghost">
              Proposer un partenariat
            </ButtonLink>
          </div>
        </div>
      </ScrollReveal>

      </section>
    </>
  );
}
