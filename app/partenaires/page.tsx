import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { ContentImage } from "@/components/ContentImage";
import { IconRenderer } from "@/components/IconRenderer";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { partnerCategories, partnerPlaceholders, partnersPage } from "@/lib/site-data";
import { getPublicPartners } from "@/lib/partner-content";
import { getPublicSiteConfig } from "@/lib/site-settings";

export const metadata: Metadata = {
 title:"Partenaires",
 description:"Partenariats institutionnels, techniques, financiers, académiques et communautaires de la DDC RDC."
};

export const dynamic ="force-dynamic";

export default async function PartnersPage() {
 const partners = await getPublicPartners();
 const site = await getPublicSiteConfig();

 return (
 <>
  <PageHero
    kicker="Partenaires et bailleurs"
    title="S’allier pour amplifier l’impact."
    description={partnersPage.intro}
    cta={{ label:"Proposer un partenariat", href:"#formulaire-partenaire" }}
    image="/images/ddc/groupe-partenaires-ddc.jpg"
  />
  <section className="bg-background py-16 sm:py-20">
    <ScrollReveal>
      <div className="section-shell">
        <SectionHeading title="Nos partenaires actuels" />
        <div className="mt-10">
          {partners.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {partners.map((partner) => (
                <article key={partner.name} className="flex flex-col items-center rounded-lg border border-border bg-surface-elevated p-6 text-center shadow-sm">
                  {partner.logo ? (
                    <div className="relative mb-5 flex h-28 w-full items-center justify-center rounded-md bg-white p-4 shadow-sm">
                      <ContentImage src={partner.logo} alt={`Logo de ${partner.name}`} fill sizes="(max-width: 768px) 100vw, 300px" className="object-contain p-2" />
                    </div>
                  ) : null}
                  <h2 className="text-lg font-bold text-brand-blue dark:text-foreground">{partner.name}</h2>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-brand-green dark:text-brand-gold">{partner.partnershipType}</p>
                  {partner.description ? <p className="mt-4 text-sm leading-6 text-foreground-muted">{partner.description}</p> : null}
                  {partner.website ? (
                    <a href={partner.website} className="focus-ring mt-4 inline-flex rounded-md text-sm font-bold text-brand-blue dark:text-foreground-muted hover:text-brand-green">
                      Visiter le site web
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-foreground-muted">
              Nous structurons actuellement notre réseau de partenaires institutionnels, techniques et financiers. Utilisez le formulaire ci-dessous pour nous contacter et construire avec nous des solutions durables.
            </p>
          )}
        </div>
      </div>
    </ScrollReveal>
  </section>

  <section className="bg-brand-mist py-16 dark:bg-surface-muted sm:py-20">
    <ScrollReveal>
      <div className="section-shell">
        <SectionHeading
          eyebrow="Ouverture à de nouvelles collaborations"
          title="S'associer à une dynamique de changement durable."
          description={partnersPage.promise}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {partnerCategories.map((category) => (
            <article key={category.title} className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <IconRenderer icon={category.icon} className="h-7 w-7 text-brand-green dark:text-brand-gold" />
              <h2 className="mt-5 text-xl font-bold text-brand-blue dark:text-foreground">{category.title}</h2>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">{category.description}</p>
            </article>
          ))}
        </div>
      </div>
    </ScrollReveal>
  </section>
 <section className="bg-brand-blue py-16 text-white sm:py-20">
 <ScrollReveal>
 <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
 <div>
 <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">Contact institutionnel</p>
 <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Échanger avec la DDC RDC.</h2>
 <div className="mt-6 grid gap-3 text-sm text-white/80">
 <p className="flex items-center gap-3">
 <MapPin aria-hidden="true" className="h-4 w-4 text-brand-gold" />
 {site.contact.address}
 </p>
 <p className="flex items-center gap-3">
 <Phone aria-hidden="true" className="h-4 w-4 text-brand-gold" />
 {site.contact.phone}
 </p>
 <p className="flex items-center gap-3">
 <Mail aria-hidden="true" className="h-4 w-4 text-brand-gold" />
 {site.contact.email}
 </p>
 </div>
 </div>
 <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
 <ButtonLink href="#formulaire-partenaire">Proposer un partenariat</ButtonLink>
 <ButtonLink href={site.donationUrl} variant="outline">
 Faire un don
 </ButtonLink>
 </div>
 </div>
 </ScrollReveal>

 </section>
 <section id="formulaire-partenaire" className="bg-background py-16 sm:py-20">
 <ScrollReveal>
 <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
 <div>
 <SectionHeading
 eyebrow="Formulaire d'intérêt"
 title="Présenter une proposition de partenariat."
 description="Indiquez votre organisation, le type de partenariat recherché, les objectifs et les modalités souhaitées."
 />
 <div className="mt-7">
 <ButtonLink href="/documents-institutionnels" variant="secondary">
 Voir la documentation
 </ButtonLink>
 </div>
 </div>
 <ContactForm title="Demande de partenariat" defaultType="Partenariat" idPrefix="partner-contact" />
 </div>
 </ScrollReveal>

 </section>
 </>
 );
}
