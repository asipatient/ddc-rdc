import type { Metadata } from "next";
import { site } from "@/data/site";

const BASE_URL = site.url;
const DEFAULT_OG_IMAGE = "/images/ddc/hero-reel-ddc.jpg";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
};

/**
 * Construit un objet Metadata Next.js avec canonical, hreflang, OG et Twitter
 * correctement configurés pour chaque page.
 *
 * Usage : export const metadata = buildMetadata({ title: "...", description: "...", path: "/vision-mission/" });
 */
export function buildMetadata({ title, description, path, ogImage }: BuildMetadataOptions): Metadata {
  const canonical = `${BASE_URL}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        fr: canonical,
        "x-default": canonical
      }
    },
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description,
      url: canonical,
      siteName: site.shortName,
      locale: "fr_CD",
      type: "website",
      images: [{ url: image, width: 1600, height: 900, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      site: "@ddcrdc",
      title: `${title} | ${site.shortName}`,
      description,
      images: [image]
    }
  };
}
