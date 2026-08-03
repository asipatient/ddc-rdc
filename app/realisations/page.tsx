import { buildMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { RealisationCard } from "@/components/RealisationCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getPublicRealisations } from "@/lib/realisations";

export const metadata = buildMetadata({
  title: "Réalisations",
  description: "Les réalisations documentées de la DDC RDC : ateliers interculturels, activités citoyennes, sensibilisation des enfants et mobilisation communautaire à Bukavu.",
  path: "/realisations/"
});

export const dynamic = "force-dynamic";

export default async function RealisationsPage() {
  const realisations = await getPublicRealisations();

  return (
    <>
      <PageHero
        kicker="Nos réalisations"
        title="Ce que nous avons fait. Ce que nous continuons de construire."
        description="Cette page rassemble les actions déjà menées par la DDC RDC avec les communautés, les jeunes, les femmes, les enfants et les organisations de la société civile."
        cta={{ label: "Agir avec nous", href: "/partenaires" }}
        image="/images/ddc/IMG-20260131-WA0150.jpg"
      />
      <section className="bg-brand-mist py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell">
            <SectionHeading eyebrow="Galerie d'activités" title="Cartes de réalisations avec photos disponibles." />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {realisations.map((realisation) => (
                <RealisationCard key={realisation.slug} realisation={realisation} />
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/publications" variant="secondary">
                Voir les actualités
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
