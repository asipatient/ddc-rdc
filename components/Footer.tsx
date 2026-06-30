import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { footerColumns, site } from "@/lib/site-data";
import { NewsletterForm } from "@/components/NewsletterForm";

const socialIcons = {
  Facebook,
  LinkedIn: Linkedin,
  X: Mail,
  YouTube: Youtube
};

type FooterSiteConfig = typeof site & { footerText?: string };

export function Footer({ siteConfig = site }: { siteConfig?: FooterSiteConfig }) {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="section-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src={siteConfig.logo} alt="Logo DDC RDC" width={64} height={64} className="h-16 w-16 rounded-md bg-[#ffffff] object-contain p-1" />
              <div>
                <p className="text-lg font-black">{siteConfig.shortName}</p>
                <p className="text-sm font-semibold text-white/70">{siteConfig.legalName}</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/80">{siteConfig.slogan}</p>
            <a
              href={siteConfig.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-gold px-5 py-3 text-sm font-bold text-brand-blue transition hover:bg-white"
            >
              Faire un don
            </a>
            <div className="mt-6 grid gap-3 text-sm text-white/75">
              <p className="flex items-center gap-3">
                <MapPin aria-hidden="true" className="h-4 w-4 text-brand-gold" />
                {siteConfig.contact.address}
              </p>
              <p className="flex items-center gap-3">
                <Phone aria-hidden="true" className="h-4 w-4 text-brand-gold" />
                {siteConfig.contact.phone}
              </p>
              <p className="flex items-center gap-3">
                <Mail aria-hidden="true" className="h-4 w-4 text-brand-gold" />
                {siteConfig.contact.email}
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-black uppercase tracking-[0.12em] text-brand-gold">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus-ring rounded-md text-sm text-white/75 transition hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="focus-ring rounded-md text-sm text-white/75 transition hover:text-white">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-[1fr_0.9fr]">
          <NewsletterForm compact />
          <div className="lg:text-right">
            <p className="text-sm font-bold">Réseaux sociaux</p>
            <div className="mt-4 flex gap-3 lg:justify-end">
              {siteConfig.contact.social.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons] ?? Mail;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white transition hover:bg-white hover:text-brand-blue"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
            <p className="mt-5 text-xs text-white/60">
              © {new Date().getFullYear()} {siteConfig.legalName} - {siteConfig.footerText || "Tous droits réservés."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
