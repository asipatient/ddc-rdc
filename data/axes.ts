import type { Axis } from "./types";

export const axes: Axis[] = [
  {
    slug: "gouvernance-citoyennete-transformation-sociale",
    title: "Gouvernance, citoyenneté et transformation sociale",
    icon: "landmark",
    image: "/images/ddc/conference-citoyenne.jpg",
    description:
      "Cet axe renforce la culture démocratique, l'engagement citoyen, le leadership responsable, la veille citoyenne, la recherche et la capacité des communautés à prévenir et gérer les crises.",
    programSlugs: ["ecole-citoyenne", "think-tank-ddc", "programme-alerte-communautaire"]
  },
  {
    slug: "autonomisation-economique-resilience",
    title: "Autonomisation économique et résilience",
    icon: "briefcase",
    image: "/images/ddc/jifa-2025.jpg",
    description:
      "Cet axe promeut la production locale, l'innovation, l'entrepreneuriat, l'apprentissage professionnel, la protection de l'environnement et la résilience économique des jeunes et des femmes.",
    programSlugs: ["projec", "programme-vert-climat"]
  },
  {
    slug: "identite-inclusion-capital-humain",
    title: "Identité, inclusion et capital humain",
    icon: "handshake",
    image: "/images/ddc/culture-africaine.jpg",
    description:
      "Cet axe renforce la cohésion sociale, la valorisation culturelle, l'inclusion, la protection, l'encadrement des enfants et le développement du capital humain.",
    programSlugs: ["jasiri-leadership-feminin", "kongo-culture", "creative-child"]
  }
];
