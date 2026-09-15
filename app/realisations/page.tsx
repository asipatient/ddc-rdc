import { buildMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { RealisationCard } from "@/components/RealisationCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getPublicRealisations } from "@/lib/realisations";

const isImpactDocumented = (impact: string[] | undefined) => {
  if (!impact || impact.length === 0) return false;
  const firstLine = impact[0].toLowerCase();
  if (firstLine.includes("compléter") || firstLine.includes("complǸter")) return false;
  return true;
};


export const metadata = buildMetadata({
  title: "Réalisations",
  description: "Les réalisations documentées de la DDC RDC : ateliers interculturels, actions citoyennes, sensibilisation et mobilisation communautaire au plus près du terrain.",
  path: "/realisations/"
});

export const dynamic = "force-dynamic";

export default async function RealisationsPage() {
  const realisations = await getPublicRealisations();

  return (
    <>
      <PageHero
        kicker="Nos réalisations"
        title="Nos réalisations concrètes sur le terrain."
        description="Cette page présente nos actions documentées auprès des communautés, des jeunes, des femmes et de la société civile."
        cta={{ label: "Agir avec nous", href: "/partenaires" }}
        image="/images/ddc/salongo-communautaire.jpg"
      />
      <section className="bg-brand-mist dark:bg-surface-muted py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell">
            <SectionHeading eyebrow="Activités et résultats" title="Réalisations documentées" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {realisations.map((realisation) => (
                <RealisationCard key={realisation.slug} realisation={realisation} />
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/publications" variant="secondary">
                Lire nos actualités
              </ButtonLink>
              <ButtonLink href="/impact" variant="ghost">
                Consulter nos résultats
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
