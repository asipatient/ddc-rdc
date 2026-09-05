import type { Axis } from "./types";

export const axes: Axis[] = [
  {
    slug: "gouvernance-citoyennete-transformation-sociale",
    title: "Gouvernance, citoyenneté et transformation sociale",
    icon: "landmark",
    image: "/images/ddc/osc-droits-socioeconomiques.jpg",
    description:
      "Des jeunes qui comprennent leurs droits, qui surveillent leurs élus, qui prennent la parole. La démocratie ne s'apprend pas dans les livres — elle se vit dans les quartiers.",
    problem: "Une citoyenneté peu engagée et des institutions souvent distantes des réalités locales.",
    action: "Nous formons les jeunes et les femmes à la prise de parole, au leadership et au contrôle citoyen.",
    result: "Des communautés capables d'exiger la redevabilité et de participer activement aux décisions.",
    programSlugs: ["ecole-citoyenne", "think-tank-ddc", "programme-alerte-communautaire"]
  },
  {
    slug: "autonomisation-economique-resilience",
    title: "Autonomisation économique et résilience",
    icon: "briefcase",
    image: "/images/ddc/salongo-communautaire.jpg",
    description:
      "Entreprendre local, produire congolais, protéger son environnement. Parce que la richesse du Congo doit d'abord profiter aux Congolais.",
    problem: "Précarité économique, manque d'opportunités et vulnérabilité face aux changements climatiques.",
    action: "Nous soutenons l'entrepreneuriat local et les initiatives de protection de l'environnement.",
    result: "Des initiatives génératrices de revenus durables et des communautés plus résilientes.",
    programSlugs: ["projec", "programme-vert-climat"]
  },
  {
    slug: "identite-inclusion-capital-humain",
    title: "Identité, inclusion et capital humain",
    icon: "handshake",
    image: "/images/ddc/jeunesse-culture-echange.jpg",
    description:
      "Des enfants qui créent, des femmes qui dirigent, une culture qui rayonne. Le Congo a une âme — la DDC RDC l'entretient.",
    problem: "Marginalisation de certains groupes et dévalorisation du patrimoine culturel local.",
    action: "Nous promouvons l'inclusion, l'éducation de qualité et la valorisation culturelle.",
    result: "Une société plus cohésive, fière de son identité et offrant des chances égales à tous.",
    programSlugs: ["jasiri-leadership-feminin", "kongo-culture", "creative-child"]
  }
];
