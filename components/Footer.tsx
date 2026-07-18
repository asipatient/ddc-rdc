import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { footerColumns, site } from "@/lib/site-data";
import { NewsletterForm } from "@/components/NewsletterForm";
import type { SocialLink } from "@/data/site";

// Icône X (Twitter) — Lucide n'a pas d'icône X native, on utilise un SVG inline léger
function XIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  x: XIcon,
  youtube: Youtube,
  linkedin: Linkedin,
  instagram: Instagram,
  tiktok: ({ className }) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.21 8.21 0 004.84 1.56V6.84a4.85 4.85 0 01-1.07-.15z" />
    </svg>
  )
};

type FooterSiteConfig = typeof site & { footerText?: string };

export function Footer({ siteConfig = site }: { siteConfig?: FooterSiteConfig }) {
  const activeSocials = (siteConfig.contact.social as SocialLink[]).filter((s) => s.active);

  return (
    <footer className="bg-brand-blue text-white">
      <div className="section-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr]">
          <div>
            <Link href="/" className="focus-ring inline-flex rounded-md" aria-label="Accueil DDC RDC">
              <Image src={siteConfig.logo} alt="Logo DDC RDC" width={64} height={64} className="h-16 w-16 rounded-md object-contain brightness-0 invert" />
            </Link>
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
            {activeSocials.length > 0 && (
              <>
                <p className="text-sm font-bold">Réseaux sociaux</p>
                <div className="mt-4 flex gap-3 lg:justify-end">
                  {activeSocials.map((social) => {
                    const Icon = socialIconMap[social.platform] ?? Mail;
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        title={social.label}
                        className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </>
            )}
            <p className="mt-5 text-xs text-white/60">
              © {new Date().getFullYear()} {siteConfig.legalName} — {siteConfig.footerText ?? "Tous droits réservés."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
