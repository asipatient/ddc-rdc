import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { IconRenderer } from "@/components/IconRenderer";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { partnerCategories, partnerPlaceholders, partnersPage } from "@/lib/site-data";
import { getPublicPartners } from "@/lib/partner-content";
import { getPublicSiteConfig } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Partenaires",
  description: "Partenariats institutionnels, techniques, financiers, académiques et communautaires de la DDC RDC."
};

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const partners = await getPublicPartners();
  const site = await getPublicSiteConfig();

  return (
    <>
      <PageHero
        kicker="Partenaires et bailleurs"
        title="Construire des partenariats sérieux, transparents et orientés impact."
        description={partnersPage.intro}
        cta={{ label: "Proposer un partenariat", href: "#formulaire-partenaire" }}
      
        image="/images/ddc/jifa-2025.jpg"
      />
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell">
          <SectionHeading
            eyebrow="Catégories de partenariat"
            title="Une collaboration ouverte aux institutions, bailleurs, universités, médias et acteurs communautaires."
            description={partnersPage.promise}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {partnerCategories.map((category) => (
              <article key={category.title} className="rounded-lg border border-slate-200 p-6 shadow-sm">
                <IconRenderer icon={category.icon} className="h-7 w-7 text-brand-green" />
                <h2 className="mt-5 text-xl font-black text-brand-blue">{category.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>

      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell">
          <SectionHeading eyebrow="Partenaires et bailleurs" title="Espace réservé aux logos et références validées." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.length
              ? partners.map((partner) => (
                  <article key={partner.name} className="rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <div className="relative mx-auto flex h-20 w-32 items-center justify-center rounded-md bg-brand-mist">
                      {partner.logo ? <Image src={partner.logo} alt={partner.name} fill sizes="128px" className="object-contain p-3" /> : null}
                    </div>
                    <h2 className="mt-4 text-base font-black text-brand-blue">{partner.name}</h2>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-brand-green">{partner.partnershipType}</p>
                    {partner.description ? <p className="mt-3 text-sm leading-6 text-slate-600">{partner.description}</p> : null}
                    {partner.website ? (
                      <a href={partner.website} className="focus-ring mt-3 inline-flex rounded-md text-sm font-bold text-brand-blue hover:text-brand-green">
                        Site web
                      </a>
                    ) : null}
                  </article>
                ))
              : partnerPlaceholders.map((partner) => (
                  <div key={partner} className="flex h-28 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-5 text-center text-sm font-bold text-slate-500">
                    {partner}
                  </div>
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
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Échanger avec la DDC RDC.</h2>
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
      <section id="formulaire-partenaire" className="bg-white py-16 sm:py-20">
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
