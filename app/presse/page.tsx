import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Mail, Download } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { DocumentRow } from "@/components/DocumentRow";
import { CopyBoilerplate } from "@/components/CopyBoilerplate";
import { getPublicPublications } from "@/lib/publications";
import { officialContact } from "@/data/contact";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Espace Presse & Médias | DDC RDC",
  description: "Contacts médias, communiqués officiels et ressources de la Dynamique Debout Congolais (DDC RDC)."
};

export const dynamic = "force-dynamic";

export default async function PressPage() {
  const publications = await getPublicPublications();
  const communiques = publications.filter(p => p.category === "Communiqués");

  return (
    <>
      <PageHero
        kicker="Presse et médias"
        title="Espace Presse & Médias"
        description="Retrouvez les informations officielles de la DDC RDC, nos communiqués et les ressources utiles aux médias."
        image="/images/ddc/App-1.JPG"
      />
      <section className="bg-background py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell">
            <SectionHeading eyebrow="Contact" title="Contact presse" />
            <p className="mt-4 text-foreground-muted max-w-3xl">
              Pour une demande d'interview, d'information ou de mise en relation, contactez-nous directement.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3 rounded-lg bg-surface-elevated p-6 shadow-sm flex-1 sm:max-w-md">
                <Mail aria-hidden="true" className="h-6 w-6 text-brand-blue dark:text-brand-gold shrink-0" />
                <a href={`mailto:${officialContact.email}`} className="text-lg font-bold text-foreground hover:text-brand transition-colors">
                  {officialContact.email}
                </a>
              </div>
              <div className="flex items-center">
                <ButtonLink href="/contact?type=Presse" variant="primary">
                  Formulaire de contact
                </ButtonLink>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20 border-y border-border">
        <ScrollReveal>
          <div className="section-shell">
            <SectionHeading eyebrow="Officiel" title="Communiqués de presse" />
            <p className="mt-4 mb-10 text-foreground-muted max-w-3xl">
              Retrouvez ici les prises de parole et informations officielles de la DDC RDC destinées aux médias.
            </p>
            
            {communiques.length === 0 ? (
              <div className="rounded-xl border border-border bg-background p-10 text-center">
                <p className="text-foreground-subtle font-medium">Aucun communiqué de presse n'est actuellement publié.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {communiques.map((publication) => (
                  <DocumentRow key={publication.slug} publication={publication} />
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell">
            <SectionHeading eyebrow="Kit média" title="Ressources pour les médias" />
            <p className="mt-4 mb-10 text-foreground-muted max-w-3xl">
              Ressources en libre accès pour présenter la DDC RDC dans vos publications.
            </p>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">À propos de la DDC RDC</h3>
                <CopyBoilerplate text={site.description} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">Logo officiel</h3>
                <div className="rounded-lg border border-border bg-white p-8 flex items-center justify-center min-h-[160px]">
                  <Image 
                    src="/images/logos/ddc-logo-rect.svg" 
                    alt="Logo Dynamique Debout Congolais" 
                    width={240} 
                    height={80} 
                    className="w-auto h-auto max-w-[200px]"
                  />
                </div>
                <div className="flex justify-end">
                  <a 
                    href="/images/logos/ddc-logo-rect.svg" 
                    download
                    className="focus-ring inline-flex items-center gap-2 rounded-md bg-surface-elevated px-4 py-2 text-sm font-bold text-foreground hover:bg-brand-blue hover:text-white transition-colors dark:hover:bg-brand-gold dark:hover:text-brand-blue shadow-sm border border-border"
                  >
                    <Download aria-hidden="true" className="h-4 w-4" />
                    Télécharger le logo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
