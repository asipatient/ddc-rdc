import type { Publication } from "./types";
import { publishedActivityArticles } from "./articles";

const institutionalPublications: Publication[] = [
  {
    slug: "lancement-officiel-ddc-rdc-asbl",
    title: "Lancement officiel de la DDC RDC ASBL",
    date: "2026-05-17",
    category: "Actualités",
    accent: "blue",
    excerpt:
      "La Dynamique Debout Congolais présente son cadre d'action citoyenne au service des jeunes, des femmes et des communautés.",
    body: [
      "La DDC RDC ASBL inaugure officiellement son cadre institutionnel autour d'une conviction simple : les jeunes et les femmes doivent être au centre de la transformation durable du pays.",
      "Cette étape marque le début d'un programme de mobilisation, de formation et d'accompagnement communautaire fondé sur la citoyenneté responsable, l'intégrité et la solidarité."
    ]
  },
  {
    slug: "programme-education-civique-jeunes",
    title: "Programme d'éducation civique des jeunes",
    date: "2026-04-28",
    category: "Événements",
    accent: "green",
    excerpt:
      "Un cycle de rencontres pour renforcer la participation des jeunes à la vie publique locale et nationale.",
    body: [
      "Le programme propose des ateliers pratiques sur les droits et devoirs citoyens, le fonctionnement des institutions et les mécanismes de participation.",
      "Il privilégie une approche communautaire, accessible et orientée action afin que chaque participant puisse devenir relais de civisme dans son environnement."
    ]
  },
  {
    slug: "initiative-femmes-leadership-autonomisation",
    title: "Initiative femmes, leadership et autonomisation économique",
    date: "2026-03-12",
    category: "Actualités",
    accent: "gold",
    excerpt:
      "Une initiative dédiée au leadership féminin, au mentorat et au développement de projets économiques locaux.",
    body: [
      "L'initiative réunit formation, mentorat, accompagnement de projets et accès à des réseaux de solidarité économique.",
      "Elle vise à renforcer la confiance, les compétences et l'influence positive des femmes dans leurs communautés."
    ]
  },
  {
    slug: "note-plaidoyer-participation-jeunes",
    title: "Note de plaidoyer sur la participation des jeunes",
    date: "2026-02-20",
    category: "Notes de plaidoyer",
    accent: "red",
    excerpt:
      "Des recommandations pour mieux intégrer les jeunes dans les cadres de dialogue et de décision publique.",
    body: [
      "Cette note identifie des leviers pour renforcer la place des jeunes dans les politiques locales et nationales.",
      "Elle propose des mécanismes simples : consultations structurées, représentation inclusive et suivi citoyen des engagements publics."
    ]
  },
  {
    slug: "rapport-annuel-perspectives",
    title: "Rapport institutionnel et perspectives",
    date: "2026-01-30",
    category: "Rapports",
    accent: "blue",
    excerpt:
      "Un document de référence pour présenter les priorités, les méthodes de travail et les perspectives programmatiques.",
    body: [
      "Le rapport synthétise l'approche institutionnelle de la DDC RDC et les axes prioritaires de travail.",
      "Il sert de base de dialogue avec les partenaires, les communautés et les institutions publiques."
    ]
  },
  {
    slug: "etude-resilience-communautaire",
    title: "Étude exploratoire sur la résilience communautaire",
    date: "2025-12-15",
    category: "Études",
    accent: "green",
    excerpt:
      "Une analyse des besoins locaux en matière de prévention des risques, cohésion sociale et solidarité communautaire.",
    body: [
      "L'étude explore les facteurs de vulnérabilité et les capacités locales de réponse face aux crises sociales et environnementales.",
      "Elle nourrit la conception de programmes plus proches des réalités vécues par les communautés."
    ]
  }
];

const activityPublications: Publication[] = publishedActivityArticles.map((article, index) => ({
  slug: article.slug,
  title: article.title,
  date: article.date,
  period: article.period,
  category: article.category,
  excerpt: article.excerpt,
  body: article.content,
  accent: (["blue", "green", "gold", "red"] as const)[index % 4],
  image: article.image,
  status: article.status,
  needsReview: article.needsReview,
  objectives: article.objectives,
  targetAudience: article.targetAudience,
  impact: article.impact,
  location: article.location,
  partners: article.partners,
  relatedAxis: article.relatedAxis,
  relatedProgram: article.relatedProgram,
  gallery: article.gallery
}));

export const publications: Publication[] = [...activityPublications, ...institutionalPublications].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export const publicationCategories = ["Toutes", ...Array.from(new Set(publications.map((publication) => publication.category)))];
