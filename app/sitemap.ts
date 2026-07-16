import type { MetadataRoute } from "next";
import { site } from "@/lib/site-data";
import { getPublicPublications } from "@/lib/publications";

const staticRoutes = [
  "",
  "/a-propos",
  "/notre-histoire",
  "/profil-president-fondateur",
  "/vision-mission",
  "/equipe",
  "/gouvernance",
  "/principes-directeurs",
  "/axes-intervention",
  "/domaines-intervention",
  "/programmes",
  "/moyens-action",
  "/beneficiaires",
  "/zones-intervention",
  "/realisations",
  "/impact",
  "/publications",
  "/documents-institutionnels",
  "/presse",
  "/opportunites",
  "/partenaires",
  "/faire-un-don",
  "/devenir-membre-benevole",
  "/contact"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const publications = await getPublicPublications();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now
    })),
    ...publications.map((publication) => ({
      url: `${site.url}/publications/${publication.slug}`,
      lastModified: new Date(publication.date)
    }))
  ];
}
