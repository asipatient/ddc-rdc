import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHero } from "@/components/PageHero";
import { PublicationFilters } from "@/components/PublicationFilters";
import { SectionHeading } from "@/components/SectionHeading";
import { getPublicPublicationCategories, getPublicPublications } from "@/lib/publications";

export const metadata: Metadata = {
  title: "Actualités / Publications",
  description: "Actualités, rapports, études, notes de plaidoyer, communiqués et événements de la DDC RDC."
};

export const dynamic = "force-dynamic";

export default async function PublicationsPage({
  searchParams
}: {
  searchParams?: Promise<{ categorie?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialCategory = resolvedSearchParams?.categorie ? decodeURIComponent(resolvedSearchParams.categorie) : "Toutes";
  const [publications, publicationCategories] = await Promise.all([getPublicPublications(), getPublicPublicationCategories()]);

  return (
    <>
      <PageHero
        kicker="Actualités / Articles"
        title="Articles d'activités, rapports, études et notes de plaidoyer."
        description="Un espace de diffusion pour documenter les initiatives, partager les apprentissages, suivre les activités réalisées et soutenir le plaidoyer citoyen."
        cta={{ label: "Documents institutionnels", href: "/documents-institutionnels" }}
      image="/images/ddc/osc-droits-socioeconomiques.jpg"
      />
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell">
          <SectionHeading
            eyebrow="Bibliothèque"
            title="Explorer les contenus publiés par la DDC RDC."
            description="Les articles issus des données annexes sont marqués à relire lorsque les chiffres, photos, partenaires ou documents doivent encore être consolidés."
          />
          <div className="mt-10">
            <PublicationFilters initialCategory={initialCategory} publications={publications} publicationCategories={publicationCategories} />
          </div>
        </div>
      </ScrollReveal>

      </section>
    </>
  );
}
