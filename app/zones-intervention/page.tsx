import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { IconRenderer } from "@/components/IconRenderer";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { zonesIntervention } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Zones d'intervention",
  description: "Ancrage territorial de la DDC RDC ASBL à Bukavu, Sud-Kivu, et vocation d'expansion."
};

export default function ZonesInterventionPage() {
  return (
    <>
      <PageHero
        kicker="Zones d'intervention"
        title={zonesIntervention.title}
        description={zonesIntervention.description}
        cta={{ label: "Proposer une initiative", href: "/contact?type=Projet%20communautaire" }}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex min-h-96 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-brand-mist p-8 text-center">
            <div>
              <IconRenderer icon="map" className="mx-auto h-12 w-12 text-brand-green" />
              <h2 className="mt-4 text-2xl font-black text-brand-blue">Carte placeholder</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                Carte de la République Démocratique du Congo, de Bukavu et du Sud-Kivu à intégrer.
              </p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Ancrage territorial"
              title="Des initiatives adaptées aux réalités locales."
              description="La DDC RDC ASBL part de l'expérience communautaire locale pour construire des actions extensibles, documentées et partenaires."
            />
            <div className="mt-8 grid gap-4">
              {zonesIntervention.levels.map((level) => (
                <div key={level} className="flex items-start gap-3 rounded-lg border border-slate-200 p-5">
                  <MapPin aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-brand-green" />
                  <p className="text-sm font-bold leading-7 text-brand-blue">{level}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/programmes" variant="secondary">
                Voir les programmes
              </ButtonLink>
              <ButtonLink href="/partenaires" variant="ghost">
                Devenir partenaire
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
