import type { ImpactIndicator, SupportArgument } from "./types";

export const impactIndicators: ImpactIndicator[] = [
  {
    label: "Bénéficiaires et participants documentés",
    value: "+970",
    note:
      "Estimation minimale basée uniquement sur les données chiffrées fournies. Données en cours de consolidation.",
    icon: "chart"
  },
  { label: "Jeunes formés", value: "+20", note: "Première cohorte formée en 2016, incluse dans le total de +970 bénéficiaires documentés depuis.", icon: "graduation" },
  { label: "Femmes accompagnées", value: "+50", note: "Femmes formées à l'entrepreneuriat local en 2024.", icon: "users" },
  { label: "Enfants sensibilisés", value: "+300", note: "Élèves sensibilisés entre octobre et novembre 2025.", icon: "child" },
  { label: "Activités réalisées", value: "+10", note: "Données en cours de consolidation.", icon: "calendar" }
];

export const documentedImpactFacts = [
  "20 jeunes formés en informatique et anglais en 2016.",
  "Plus de 50 jeunes et femmes formés sur les droits et devoirs du citoyen en janvier 2023.",
  "Plus de 300 jeunes et femmes sensibilisés sur le processus électoral et l'importance du vote en septembre 2023.",
  "50 femmes formées à l'entrepreneuriat local, notamment fabrication de savons bleus et briquettes écologiques, en 2024.",
  "50 acteurs de la société civile capacités sur le rôle des OSC dans la défense des droits socio-économiques en juin 2025.",
  "120 jeunes, autorités locales et leaders d'opinion mobilisés lors de la conférence citoyenne du 30 juin 2025.",
  "Plus de 100 femmes, jeunes filles et hommes mobilisés et sensibilisés lors du lancement du Programme JASIRI en juillet 2025.",
  "Plus de 300 élèves sensibilisés à la valorisation des talents créatifs et innovants entre octobre et novembre 2025."
];

export const interventionApproach: SupportArgument[] = [
  { title: "Formation", description: "Renforcer les connaissances, compétences et réflexes citoyens.", icon: "graduation" },
  { title: "Sensibilisation", description: "Porter des messages clairs auprès des jeunes, femmes et communautés.", icon: "megaphone" },
  { title: "Recherche", description: "Documenter les réalités de terrain et nourrir le plaidoyer.", icon: "search" },
  { title: "Encadrement", description: "Accompagner les bénéficiaires dans des parcours suivis et utiles.", icon: "shield" },
  { title: "Incubation", description: "Faire évoluer les idées locales vers des initiatives structurées.", icon: "briefcase" },
  { title: "Mobilisation communautaire", description: "Créer des dynamiques collectives autour de priorités locales.", icon: "users" },
  { title: "Plaidoyer", description: "Transformer les constats en recommandations et dialogue institutionnel.", icon: "scale" },
  { title: "Accompagnement", description: "Soutenir les porteurs d'initiatives dans la durée.", icon: "hands" },
  { title: "Partenariats", description: "Relier les acteurs techniques, financiers, académiques et communautaires.", icon: "network" },
  { title: "Innovation locale", description: "Valoriser les solutions adaptées aux réalités congolaises.", icon: "sparkles" },
  { title: "Action humanitaire ponctuelle", description: "Répondre de façon ciblée aux vulnérabilités locales.", icon: "heart" },
  { title: "Suivi-évaluation", description: "Mesurer, apprendre et améliorer progressivement les programmes.", icon: "chart" }
];

export const monitoringLearning = {
  intro:
    "La DDC RDC documente progressivement ses résultats à travers des rapports d'activités, des témoignages de bénéficiaires et des études de cas. Notre engagement : mesurer pour mieux agir.",
  blocks: [
    { title: "Collecte continue", description: "Enregistrement systématique des participations, évaluations pré/post formation et recueil de témoignages qualitatifs.", icon: "clipboard" },
    { title: "Analyse de terrain", description: "Évaluation périodique des changements concrets dans la vie des bénéficiaires et l'évolution de leurs initiatives.", icon: "chart" },
    { title: "Transparence et redevabilité", description: "Partage régulier des données consolidées avec les parties prenantes, les donateurs et le public via nos rapports.", icon: "search" }
  ] as SupportArgument[]
};

export const zonesIntervention = {
  title: "Une présence nationale, au plus près des communautés",
  description:
    "La DDC RDC inscrit son action dans une ambition nationale, avec des membres actifs dans plusieurs provinces et un ancrage historique à Bukavu. Notre présence territoriale se construit progressivement au plus près des réalités et des initiatives des communautés.",
  levels: [
    {
      title: "Action à ambition nationale",
      description: "Une vision qui inscrit les actions de la DDC RDC dans les enjeux et les dynamiques de la République Démocratique du Congo."
    },
    {
      title: "Membres actifs dans plusieurs provinces",
      description: "Une présence humaine qui s'étend aujourd'hui à au moins 8 provinces de la RDC."
    },
    {
      title: "Ancrage institutionnel à Bukavu",
      description: "Le siège social est établi à Bukavu, dans la province du Sud-Kivu."
    },
    {
      title: "Renforcement progressif",
      description: "L'ouverture prochaine de bureaux provinciaux doit permettre de structurer progressivement la présence territoriale de la DDC RDC."
    }
  ]
};

export const strategicPlan = {
  title: "Plan stratégique 2026–2029",
  note: "Dix priorités qui structurent la feuille de route triennale de la DDC RDC.",
  items: [
    {
      title: "Citoyenneté & leadership",
      description:
        "Renforcer la culture démocratique, la participation citoyenne et la redevabilité au sein des communautés congolaises."
    },
    {
      title: "Autonomie & entrepreneuriat",
      description:
        "Développer l'entrepreneuriat jeune, la production locale et les capacités économiques des femmes via les programmes PROJEC et JASIRI."
    },
    {
      title: "Culture & inclusion",
      description:
        "Valoriser la culture congolaise, promouvoir l'inclusion et investir dans la formation des ressources humaines de l'association."
    },
    {
      title: "Priorités stratégiques",
      description:
        "Jeunesse, femmes, environnement, citoyenneté et alerte communautaire — cinq axes au cœur de l'action 2026–2029."
    },
    {
      title: "Résultats attendus",
      description:
        "Des communautés plus résilientes, des jeunes autonomes, des femmes leaders et un tissu associatif renforcé à Bukavu et au-delà."
    },
    {
      title: "Indicateurs",
      description:
        "Nombre de bénéficiaires formés, initiatives créées, alertes traitées, femmes autonomisées et partenariats conclus."
    },
    {
      title: "Zones d'intervention",
      description:
        "Avec un ancrage à Bukavu (Sud-Kivu) et une présence active dans 8 provinces, notre horizon stratégique vise un déploiement dans les 26 provinces de la RDC."
    },
    {
      title: "Publics cibles",
      description:
        "Jeunes de 15 à 35 ans, femmes leaders communautaires, membres d'OSC, enseignants et acteurs de la société civile."
    },
    {
      title: "Approche méthodologique",
      description:
        "Participation communautaire, formation par les pairs, ancrage local, suivi-évaluation rigoureux et apprentissage continu."
    },
    {
      title: "Partenaires recherchés",
      description:
        "Coopération internationale, ONGs, institutions publiques, secteur privé local et diaspora congolaise engagée."
    }
  ]
};
