import "server-only";

import { site } from "@/data/site";
import type { SocialLink } from "@/data/site";
import { readAdminStore } from "@/lib/admin/content-store";

export async function getPublicSiteConfig() {
  const store = await readAdminStore();
  const settings = store.siteSettings;

  // Les socialLinks du store admin peuvent encore être dans l'ancien format {label, href}
  // On normalise vers le nouveau format SocialLink si nécessaire
  const socialLinks: SocialLink[] = settings.socialLinks?.length
    ? (settings.socialLinks as unknown as SocialLink[])
    : (site.contact.social as SocialLink[]);

  return {
    ...site,
    shortName: settings.siteName || site.shortName,
    slogan: settings.slogan || site.slogan,
    description: settings.shortDescription || site.description,
    logo: settings.logo || site.logo,
    favicon: settings.favicon || site.favicon,
    donationUrl: settings.paypalUrl || site.donationUrl,
    contact: {
      ...site.contact,
      address: settings.address || site.contact.address,
      phone: settings.phone || site.contact.phone,
      email: settings.email || site.contact.email,
      social: socialLinks
    },
    footerText: settings.footerText || "Tous droits réservés."
  };
}

export type PublicSiteConfig = Awaited<ReturnType<typeof getPublicSiteConfig>>;
