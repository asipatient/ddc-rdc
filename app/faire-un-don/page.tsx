import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ExternalButton } from "@/components/ExternalButton";
import { IconRenderer } from "@/components/IconRenderer";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { donationPage } from "@/lib/site-data";
import { getPublicSiteConfig } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Faire un don",
  description: "Soutenir les actions citoyennes, économiques, environnementales et communautaires de la DDC RDC ASBL."
};

export const dynamic = "force-dynamic";

export default async function DonatePage() {
  const site = await getPublicSiteConfig();
  const paypalDonationUrl = site.donationUrl;

  return (
    <>
      <PageHero
        kicker="Faire un don"
        title={donationPage.title}
        description={donationPage.trustMessage}
        cta={{ label: "Faire un don via PayPal", href: "#paypal" }}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-96 overflow-hidden rounded-lg bg-brand-blueSoft">
            <Image
              src="/images/ddc/jifa-2025.jpg"
              alt="Activité DDC RDC avec des femmes et jeunes entrepreneurs"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Message de confiance"
              title="Votre contribution soutient des programmes concrets."
              description={donationPage.description}
            />
            <p className="mt-5 leading-8 text-slate-600">{donationPage.fundUse}</p>
            <div id="paypal" className="mt-8">
              <ExternalButton href={paypalDonationUrl} variant="secondary">
                Faire un don via PayPal
              </ExternalButton>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Votre contribution peut soutenir" title="Des domaines liés aux priorités institutionnelles." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {donationPage.uses.map((use) => (
              <article key={use.title} className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-goldSoft text-brand-blue">
                  <IconRenderer icon={use.icon} className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-black text-brand-blue">{use.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{use.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Utilisation des fonds"
              title="Des appuis orientés vers la formation, l'accompagnement et la redevabilité."
            />
            <div className="mt-8 grid gap-3">
              {donationPage.contributionExamples.map((item) => (
                <p key={item} className="flex items-start gap-3 rounded-lg bg-brand-mist p-4 text-sm font-semibold leading-7 text-slate-700">
                  <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-brand-green" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Transparence et redevabilité"
              title="Des documents publics à consolider."
              description="La DDC RDC ASBL prévoit de renforcer progressivement ses mécanismes de suivi, documentation, rapportage et redevabilité."
            />
            <div className="mt-8 grid gap-3">
              {donationPage.transparency.map((item) => (
                <p key={item} className="rounded-lg border border-slate-200 p-4 text-sm font-bold leading-7 text-brand-blue">
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-7">
              <ButtonLink href="/documents-institutionnels" variant="secondary">
                Voir les documents
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-brand-blue py-16 text-white sm:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">Partenariats institutionnels</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Dons institutionnels, subventions et conventions.</h2>
            <p className="mt-5 max-w-3xl leading-8 text-white/80">{donationPage.institutionalPartnership}</p>
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
            <ExternalButton href={paypalDonationUrl}>Faire un don via PayPal</ExternalButton>
            <ButtonLink href="/partenaires" variant="outline">
              Devenir partenaire
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
