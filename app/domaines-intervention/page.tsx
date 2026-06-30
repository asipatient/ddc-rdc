import type { Metadata } from "next";
import { AxisCard } from "@/components/AxisCard";
import { ButtonLink } from "@/components/ButtonLink";
import { IconCard } from "@/components/IconCard";
import { PageHero } from "@/components/PageHero";
import { axes, flagshipPrograms, interventionAreas } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Domaines d'intervention",
  description: "Les domaines d'intervention de la DDC RDC : citoyenneté, leadership, autonomisation, environnement, paix et culture."
};

export default function DomainsPage() {
  return (
    <>
      <PageHero
        kicker="Ce que nous faisons"
        title="Onze domaines d'intervention pour une action communautaire intégrée."
        description="La DDC RDC relie éducation civique, leadership, autonomisation économique, environnement, droits, recherche et cohésion sociale."
        cta={{ label: "Proposer une initiative communautaire", href: "/contact?type=Projet%20communautaire" }}
      />
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interventionAreas.map((area) => (
            <IconCard key={area.title} {...area} />
          ))}
        </div>
        <div className="section-shell mt-10">
          <div className="rounded-lg bg-brand-green p-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="text-2xl font-black">Travailler avec nous sur un domaine prioritaire</h2>
              <p className="mt-3 max-w-3xl leading-8 text-white/80">
                Les partenaires peuvent contribuer à la conception, au financement, à la documentation ou à la mise en oeuvre des initiatives.
              </p>
            </div>
            <div className="mt-6 sm:mt-0">
              <ButtonLink href="/partenaires">Devenir partenaire</ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow">Lecture stratégique</p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-brand-blue sm:text-4xl">
                Les domaines sont organisés autour de trois axes d&apos;intervention.
              </h2>
            </div>
            <ButtonLink href="/axes-intervention" variant="secondary">
              Voir les axes
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {axes.map((axis) => (
              <AxisCard
                key={axis.slug}
                axis={axis}
                programs={flagshipPrograms.filter((program) => axis.programSlugs.includes(program.slug))}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
