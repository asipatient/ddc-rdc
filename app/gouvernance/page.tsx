import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { governanceItems, legalIdentity, principles } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Gouvernance interne",
  description: "Structure de gouvernance de la DDC RDC : dénomination, statut juridique et organes statutaires."
};

export default function GovernancePage() {
  return (
    <>
      <PageHero
        kicker="Gouvernance interne"
        title="Cinq organes complémentaires, chacun avec un rôle clair et distinct."
        description="La gouvernance de la DDC RDC repose sur ses statuts : une architecture rigoureuse qui sépare la souveraineté, la garantie de mission, la direction, l'exécution et le contrôle financier."

        image="/images/ddc/osc-droits-socioeconomiques.jpg"
      />
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell">
          <SectionHeading
            eyebrow="Identité institutionnelle"
            title="Dénomination & statut"
          />
          <div className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {[
              ["Dénomination", legalIdentity.denomination],
              ["Sigle", legalIdentity.sigle],
              ["Statut juridique", legalIdentity.statutJuridique],
              ["Date de fondation", legalIdentity.dateFondation],
              ["Siège social", legalIdentity.siegeSocial],
              ["Zone d'intervention", legalIdentity.zoneIntervention]
            ].map(([label, value]) => (
              <div key={label} className="border-t border-slate-200 pt-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
                <p className="mt-1 text-base font-bold text-brand-blue">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell">
          <SectionHeading
            eyebrow="Structure"
            title="Cinq organes complémentaires, prévus par les statuts."
            description="Chaque organe a un rôle clair et distinct, de l'Assemblée générale souveraine au contrôle financier des Commissaires aux comptes."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {governanceItems.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-green">{item.status}</p>
                <h2 className="mt-3 text-xl font-black text-brand-blue">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>

      </section>
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Principes directeurs"
              title="Une gouvernance guidée par l'intégrité, la transparence et la redevabilité."
            />
            <div className="mt-7">
              <ButtonLink href="/documents-institutionnels" variant="secondary">
                Documents institutionnels
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {principles.slice(0, 10).map((principle) => (
              <div key={principle} className="rounded-lg bg-brand-mist p-4 text-sm font-bold leading-7 text-brand-blue shadow-sm">
                {principle}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      </section>
    </>
  );
}
