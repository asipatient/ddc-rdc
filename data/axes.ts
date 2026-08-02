import type { Axis } from "./types";

export const axes: Axis[] = [
  {
    slug: "gouvernance-citoyennete-transformation-sociale",
    title: "Gouvernance, citoyenneté et transformation sociale",
    icon: "landmark",
    image: "/images/ddc/osc-droits-socioeconomiques.jpg",
    description:
      "Des jeunes qui comprennent leurs droits, qui surveillent leurs élus, qui prennent la parole. La démocratie ne s'apprend pas dans les livres — elle se vit dans les quartiers.",
    programSlugs: ["ecole-citoyenne", "think-tank-ddc", "programme-alerte-communautaire"]
  },
  {
    slug: "autonomisation-economique-resilience",
    title: "Autonomisation économique et résilience",
    icon: "briefcase",
    image: "/images/ddc/salongo-communautaire.jpg",
    description:
      "Entreprendre à Bukavu, produire local, protéger son environnement. Parce que la richesse du Congo doit d'abord profiter aux Congolais.",
    programSlugs: ["projec", "programme-vert-climat"]
  },
  {
    slug: "identite-inclusion-capital-humain",
    title: "Identité, inclusion et capital humain",
    icon: "handshake",
    image: "/images/ddc/jeunesse-culture-echange.jpg",
    description:
      "Des enfants qui créent, des femmes qui dirigent, une culture qui rayonne. Le Congo a une âme — la DDC RDC l'entretient.",
    programSlugs: ["jasiri-leadership-feminin", "kongo-culture", "creative-child"]
  }
];
