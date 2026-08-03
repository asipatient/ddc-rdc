import { buildMetadata } from "@/lib/metadata";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ZonesMapLoader } from "@/components/ZonesMapLoader";
import { contactIntro } from "@/lib/site-data";
import { getPublicSiteConfig } from "@/lib/site-settings";
import type { SocialLink } from "@/data/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contactez la DDC RDC à Bukavu, Sud-Kivu. Av. Nyarwizimia 019, Quartier Panzi, Commune d'Ibanda. Téléphone, email et formulaire en ligne disponibles.",
  path: "/contact/"
});

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const site = await getPublicSiteConfig();
  const activeSocials = (site.contact.social as SocialLink[]).filter((s) => s.active);

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Entrer en relation avec la DDC RDC."
        description={contactIntro}
        cta={{ label: "Faire un don", href: site.donationUrl }}
        image="/images/ddc/hero-reel-ddc.jpg"
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
            {activeSocials.length > 0 ? (
              <div className="mt-8">
                <h2 className="text-lg font-black text-brand-blue">Réseaux sociaux</h2>
                <div className="mt-4 flex gap-3">
                  {activeSocials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-brand-blue transition hover:bg-brand-blue hover:text-white"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Mail aria-hidden="true" className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <ContactForm idPrefix="contact-page" />
        </div>
      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <ZonesMapLoader
            zoom={14}
            popupText="DDC RDC — Av. Nyarwizimia 019, Commune d'Ibanda, Bukavu"
          />
        </div>
      </section>
    </>
  );
}
