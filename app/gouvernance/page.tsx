import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { governanceItems, principles } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Gouvernance interne",
  description: "Structure de gouvernance interne prévue pour la DDC RDC ASBL."
};

export default function GovernancePage() {
  return (
    <>
      <PageHero
        kicker="Gouvernance interne"
        title="Une structure institutionnelle claire, modifiable et prête à documenter."
        description="La DDC RDC ASBL prévoit un espace de gouvernance pouvant accueillir les organes, responsabilités, politiques et documents validés."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Structure"
            title="Organes et fonctions à compléter selon les textes institutionnels."
            description="Aucun organe définitif n'est inventé ici : la structure reste volontairement modifiable jusqu'à validation documentaire."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {governanceItems.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-green">{item.status}</p>
                <h2 className="mt-3 text-xl font-black text-brand-blue">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
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
              <div key={principle} className="rounded-lg bg-white p-4 text-sm font-bold leading-7 text-brand-blue shadow-sm">
                {principle}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
