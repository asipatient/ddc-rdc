import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ZonesMapLoader } from "@/components/ZonesMapLoader";
import { zonesIntervention } from "@/lib/site-data";

import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Zones d'intervention",
  description:
    "La DDC RDC inscrit son action dans une ambition nationale et compte des membres actifs dans plusieurs provinces de la République Démocratique du Congo.",
  path: "/zones-intervention",
});

export default function ZonesInterventionPage() {
 return (
 <>
 <PageHero
 kicker="Zones d'intervention"
 title={zonesIntervention.title}
 description={zonesIntervention.description}
 cta={{ label:"Proposer une initiative", href:"/contact?type=Projet%20communautaire" }}
 image="/images/ddc/App-1 (23).jpg"
 />
 <section className="bg-background py-16 sm:py-20">
 <ScrollReveal>
 <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
 <div className="overflow-hidden rounded-lg border border-border shadow-sm">
 <ZonesMapLoader />
 </div>
 <div>
  <SectionHeading
    eyebrow="Notre présence territoriale"
    title="Une présence qui se construit dans les territoires"
    description="La DDC RDC compte des membres actifs dans au moins 8 provinces de la République Démocratique du Congo : Sud-Kivu, Kinshasa, Nord-Kivu, Kongo Central, Ituri, Haut-Katanga, Maniema et Tanganyika."
  />
  <p className="mt-4 max-w-3xl text-base leading-8 text-foreground-muted">
    L’ouverture prochaine de bureaux provinciaux viendra renforcer
    progressivement cette présence territoriale.
  </p>
  <div className="mt-8 grid gap-4">
    {zonesIntervention.levels.map((level) => (
      <div
        key={level.title}
        className="flex items-start gap-3 rounded-lg border border-border p-5"
      >
        <MapPin
          aria-hidden="true"
          className="mt-1 h-5 w-5 flex-none text-brand-green dark:text-brand-gold"
        />
        <div>
          <h3 className="text-sm font-bold leading-7 text-brand-blue dark:text-foreground">
            {level.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-foreground-muted">
            {level.description}
          </p>
        </div>
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
 </ScrollReveal>

 </section>
 </>
 );
}
