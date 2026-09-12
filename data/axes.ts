import type { Axis } from "./types";

export const axes: Axis[] = [
  {
    slug: "gouvernance-citoyennete-transformation-sociale",
    shortTitle: "Citoyenneté & leadership",
    title: "Citoyenneté, démocratie et implication citoyenne",
    icon: "landmark",
    image: "/images/ddc/osc-droits-socioeconomiques.jpg",
    description:
      "Encourager les jeunes, les femmes et les leaders locaux à comprendre leurs droits, participer aux décisions et exercer un contrôle citoyen responsable au sein de leurs communautés.",
    problem: "Une citoyenneté peu engagée et des institutions souvent distantes des réalités locales.",
    action: "Nous formons les jeunes et les femmes à la prise de parole, au leadership et au contrôle citoyen.",
    result: "Des communautés capables d'exiger la redevabilité et de participer activement aux décisions.",
    programSlugs: ["ecole-citoyenne", "think-tank-ddc", "programme-alerte-communautaire"]
  },
  {
    slug: "autonomisation-economique-resilience",
    shortTitle: "Autonomie & entrepreneuriat",
    title: "Autonomisation économique, entrepreneuriat et solutions écologiques",
    icon: "briefcase",
    image: "/images/ddc/salongo-communautaire.jpg",
    description:
      "Soutenir l'entrepreneuriat local, l'autonomisation économique des femmes et des jeunes, et développer des solutions écologiques pour renforcer la résilience des communautés face aux défis climatiques.",
    problem: "Précarité économique, manque d'opportunités et vulnérabilité face aux changements climatiques.",
    action: "Nous soutenons l'entrepreneuriat local et les initiatives de protection de l'environnement.",
    result: "Des initiatives génératrices de revenus durables et des communautés plus résilientes.",
    programSlugs: ["projec", "programme-vert-climat"]
  },
  {
    slug: "identite-inclusion-capital-humain",
    shortTitle: "Culture & inclusion",
    title: "Culture, inclusion et développement des capacités",
    icon: "handshake",
    image: "/images/ddc/jeunesse-culture-echange.jpg",
    description:
      "Valoriser le patrimoine culturel, renforcer l’inclusion et développer les capacités des enfants, des femmes et des communautés pour contribuer à une société congolaise plus cohésive.",
    problem: "Marginalisation de certains groupes et dévalorisation du patrimoine culturel local.",
    action: "Nous promouvons l'inclusion, l'éducation de qualité et la valorisation culturelle.",
    result: "Une société plus cohésive, fière de son identité et offrant des chances égales à tous.",
    programSlugs: ["jasiri-leadership-feminin", "kongo-culture", "creative-child"]
  }
];
