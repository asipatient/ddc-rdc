import { buildMetadata } from "@/lib/metadata";
import { CircleDot } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { actionMeans, interventionApproach } from "@/lib/site-data";

export const metadata = buildMetadata("/moyens-action/", {
  title: "Moyens d'action",
  description:
    "Formations, plaidoyer, recherche et mobilisation communautaire : découvrez les moyens d'action de la DDC RDC pour transformer les communautés du Congo."
});

export default function MoyensActionPage() {
  return (
    <>
      <PageHero
        kicker="Moyens d'action"
        title="Des outils concrets pour passer de l'idée à l'action communautaire."
        description="La DDC RDC mobilise plusieurs moyens complémentaires pour former, documenter, accompagner, sensibiliser et soutenir les initiatives locales."
        cta={{ label: "Proposer une initiative", href: "/contact?type=Projet%20communautaire" }}
      />
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Méthodes" title="Les leviers opérationnels de la DDC RDC." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {actionMeans.map((mean) => (
              <div key={mean} className="flex gap-3 rounded-lg bg-white p-5 shadow-sm">
                <CircleDot aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-brand-green" />
                <p className="text-sm font-semibold leading-7 text-slate-700">{mean}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/programmes" variant="secondary">
              Voir les programmes
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Approche d'intervention" title="Formation, recherche, incubation, plaidoyer, partenariats et suivi-évaluation." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {interventionApproach.map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 p-5">
                <h2 className="text-base font-black text-brand-blue">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
