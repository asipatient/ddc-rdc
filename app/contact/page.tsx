import type { Metadata } from "next";
import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { contactIntro } from "@/lib/site-data";
import { getPublicSiteConfig } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter la DDC RDC, proposer une initiative communautaire, devenir membre, bénévole, donateur ou partenaire."
};

const socialIcons = {
  Facebook,
  LinkedIn: Linkedin,
  X: Mail,
  YouTube: Youtube
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const site = await getPublicSiteConfig();

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Entrer en relation avec la DDC RDC ASBL."
        description={contactIntro}
        cta={{ label: "Faire un don", href: site.donationUrl }}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow="Coordonnées officielles" title="Une équipe disponible pour orienter les demandes." />
            <div className="mt-8 space-y-4 rounded-lg bg-brand-mist p-6">
              <p className="flex items-start gap-3 text-sm font-semibold leading-7 text-slate-700">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-brand-green" />
                {site.contact.address}
              </p>
              <p className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <Phone aria-hidden="true" className="h-5 w-5 text-brand-green" />
                {site.contact.phone}
              </p>
              <p className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <Mail aria-hidden="true" className="h-5 w-5 text-brand-green" />
                {site.contact.email}
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-black text-brand-blue">Réseaux sociaux</h2>
              <div className="mt-4 flex gap-3">
                {site.contact.social.map((social) => {
                  const Icon = socialIcons[social.label as keyof typeof socialIcons] ?? Mail;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-brand-blue transition hover:bg-brand-blue hover:text-white"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <ContactForm idPrefix="contact-page" />
        </div>
      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <div>
              <MapPin aria-hidden="true" className="mx-auto h-10 w-10 text-brand-green" />
              <h2 className="mt-4 text-2xl font-black text-brand-blue">Carte de localisation</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                Emplacement réservé pour intégrer une carte interactive de l&apos;adresse officielle à Bukavu, Sud-Kivu.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
