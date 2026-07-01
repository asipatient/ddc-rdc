import type { Metadata } from "next";
import { site } from "@/data/site";

const DEFAULT_OG_IMAGE = "/images/ddc/hero-reel-ddc.jpg";

type MetadataOverrides = {
  title?: string;
  description?: string;
  ogImage?: string;
};

function normalizePath(path: string): string {
  if (path === "/" || path === "") {
    return "/";
  }

  const trimmed = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return `/${trimmed}/`;
}

export function buildMetadata(path: string, overrides: MetadataOverrides = {}): Metadata {
  const normalizedPath = normalizePath(path);
  const canonicalUrl = `${site.url}${normalizedPath}`;
  const englishUrl = `${site.url}/en${normalizedPath}`;
  const description = overrides.description ?? site.description;
  const ogImage = overrides.ogImage ?? DEFAULT_OG_IMAGE;
  const ogTitle = overrides.title ? `${overrides.title} | ${site.shortName}` : `${site.shortName} - ${site.slogan}`;

  return {
    ...(overrides.title ? { title: overrides.title } : {}),
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: canonicalUrl,
        en: englishUrl
      }
    },
    openGraph: {
      type: "website",
      title: ogTitle,
      description,
      url: canonicalUrl,
      locale: "fr_CD",
      siteName: site.shortName,
      images: [{ url: ogImage, width: 1600, height: 900 }]
    },
    twitter: {
      card: "summary_large_image",
      site: "@ddcrdc",
      title: ogTitle,
      description,
      images: [ogImage]
    }
  };
}
