import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHero } from "@/components/PageHero";
import { PublicationBoard } from "@/components/PublicationBoard";
import { SectionHeading } from "@/components/SectionHeading";
import { ButtonLink } from "@/components/ButtonLink";
import { getPublicPublications } from "@/lib/publications";

export const metadata: Metadata = {
  title: "Publications & Actualités",
  description: "Rapports, études, notes de plaidoyer, actualités et événements de la DDC RDC."
};

export const dynamic = "force-dynamic";

export default async function PublicationsPage() {
  const allPublications = await getPublicPublications();
  const publications = allPublications.filter(p => p.category !== "Communiqués");

  return (
    <>
      <PageHero
        kicker="Centre éditorial"
        title="Publications & actualités"
        description="Un espace de diffusion pour documenter nos initiatives, partager nos ressources et suivre la vie de l'association."
        image="/images/ddc/jeunesse-culture-echange.jpg"
      />
      <section className="bg-background py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell">
            <PublicationBoard publications={publications} />
            
            <div className="mt-24 border-t border-border pt-16 text-center">
              <h2 className="text-2xl font-bold text-foreground">Vous souhaitez aller plus loin ?</h2>
              <p className="mt-4 max-w-2xl mx-auto text-foreground-muted leading-relaxed">
                Rejoignez la DDC RDC en tant que membre ou bénévole pour participer directement à nos actions sur le terrain.
              </p>
              <div className="mt-8 flex justify-center">
                <ButtonLink href="/devenir-membre-benevole" variant="primary">
                  S'engager avec nous
                </ButtonLink>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
