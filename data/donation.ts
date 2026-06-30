import type { IconKey, SupportArgument } from "./types";

export const paypalDonationUrl =
  process.env.NEXT_PUBLIC_PAYPAL_DONATION_URL || "https://www.paypal.com/donate/?hosted_button_id=DN5YLHV58TCDE";

export const donationPage = {
  title: "Soutenir la DDC RDC ASBL",
  trustMessage:
    "Soutenir la DDC RDC ASBL, c’est investir dans une jeunesse responsable, des femmes autonomes, des communautés résilientes, une culture démocratique forte et un Congo plus juste, inclusif et durable.",
  description:
    "Chaque contribution aide la DDC RDC ASBL à renforcer ses programmes de citoyenneté, leadership, autonomisation économique, protection, culture, environnement, recherche citoyenne et développement communautaire.",
  fundUse:
    "Les fonds mobilisés servent à organiser des formations, accompagner des initiatives locales, produire des contenus de plaidoyer, documenter les résultats, soutenir les activités communautaires et renforcer progressivement les mécanismes de suivi, transparence et redevabilité.",
  uses: [
    { title: "Formation citoyenne", text: "Ateliers, écoles citoyennes, leadership, mentorat et engagement communautaire.", icon: "graduation" },
    { title: "Leadership des femmes", text: "Autonomisation économique, participation citoyenne, protection et renforcement des capacités.", icon: "shield" },
    { title: "Enfants et talents", text: "Encadrement, expression créative, éducation aux valeurs et espaces de développement des talents.", icon: "sparkles" },
    { title: "Paix et résilience", text: "Cohésion sociale, alerte communautaire, dialogue, solidarité et réponse ponctuelle aux besoins locaux.", icon: "handshake" },
    { title: "Recherche et plaidoyer", text: "Notes, analyses, propositions de politiques publiques et documentation des réalités de terrain.", icon: "search" },
    { title: "Culture et environnement", text: "Valorisation culturelle, protection de l'environnement et initiatives communautaires durables.", icon: "leaf" }
  ] satisfies Array<{ title: string; text: string; icon: IconKey }>,
  contributionExamples: [
    "Une session de formation pour jeunes leaders.",
    "Un atelier d'autonomisation économique pour femmes.",
    "Une activité d'encadrement des enfants et talents.",
    "Une campagne de sensibilisation communautaire.",
    "Une note de plaidoyer ou une publication citoyenne.",
    "Une initiative locale de protection de l'environnement."
  ],
  transparency: [
    "Rapports d'activités à publier.",
    "Rapports financiers à publier.",
    "Comptes rendus d'activités à consolider.",
    "Documentation institutionnelle à compléter.",
    "Mécanismes de suivi et redevabilité à renforcer progressivement."
  ],
  institutionalPartnership:
    "Pour les dons institutionnels, appuis techniques, subventions, conventions ou partenariats pluriannuels, la DDC RDC ASBL invite les organisations intéressées à prendre contact avec l'équipe de coordination."
};

export const whySupportDdc: SupportArgument[] = [
  {
    title: "Soutenir l'éveil citoyen de la jeunesse congolaise",
    description: "Former des jeunes conscients de leurs droits, devoirs et responsabilités dans la transformation démocratique du pays.",
    icon: "graduation"
  },
  {
    title: "Renforcer le leadership des femmes",
    description: "Valoriser la participation des femmes, leur influence positive et leur capacité à agir dans les communautés.",
    icon: "users"
  },
  {
    title: "Promouvoir l'autonomisation économique",
    description: "Accompagner l'entrepreneuriat, les compétences professionnelles et les initiatives économiques locales.",
    icon: "briefcase"
  },
  {
    title: "Protéger les enfants et développer leurs talents",
    description: "Créer des espaces d'encadrement, d'expression et de découverte du potentiel créatif des enfants.",
    icon: "child"
  },
  {
    title: "Soutenir la paix et la résilience communautaire",
    description: "Renforcer la cohésion sociale, l'alerte communautaire, la solidarité et la prévention des risques.",
    icon: "handshake"
  },
  {
    title: "Encourager la recherche citoyenne",
    description: "Produire des analyses, notes de plaidoyer et propositions utiles aux politiques publiques.",
    icon: "search"
  },
  {
    title: "Protéger l'environnement",
    description: "Appuyer l'éducation environnementale, les pratiques écologiques et les solutions locales durables.",
    icon: "leaf"
  },
  {
    title: "Valoriser la culture congolaise et africaine",
    description: "Faire de la culture un levier d'identité, de dialogue, de créativité et de cohésion sociale.",
    icon: "palette"
  }
];
