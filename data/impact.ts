import type { ImpactIndicator, SupportArgument } from "./types";

export const impactIndicators: ImpactIndicator[] = [
  {
    label: "Bénéficiaires et participants documentés",
    value: "+970",
    note:
      "Estimation minimale basée uniquement sur les données chiffrées fournies. Données en cours de consolidation.",
    icon: "chart"
  },
  { label: "Jeunes formés", value: "+20", note: "Donnée historique 2016 à consolider avec les archives.", icon: "graduation" },
  { label: "Femmes accompagnées", value: "+50", note: "Femmes formées à l'entrepreneuriat local en 2024.", icon: "users" },
  { label: "Enfants sensibilisés", value: "+300", note: "Élèves sensibilisés entre octobre et novembre 2025.", icon: "child" },
  { label: "Activités réalisées", value: "+000", note: "Données en cours de consolidation", icon: "calendar" },
  { label: "Communautés touchées", value: "+000", note: "Données en cours de consolidation", icon: "map" },
  { label: "Partenaires mobilisés", value: "+000", note: "Données en cours de consolidation", icon: "handshake" },
  { label: "Publications produites", value: "+000", note: "Données en cours de consolidation", icon: "file" },
  { label: "Initiatives communautaires soutenues", value: "+000", note: "Données en cours de consolidation", icon: "sparkles" }
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
    "La DDC RDC entend renforcer progressivement ses mécanismes de suivi, d'évaluation, d'apprentissage et de redevabilité afin de mesurer les résultats de ses actions, capitaliser les expériences, documenter les changements et améliorer continuellement ses programmes.",
  blocks: [
    { title: "Indicateurs d'impact", description: "Tableaux de suivi à compléter au fur et à mesure de la consolidation des données.", icon: "chart" },
    { title: "Rapports périodiques", description: "Rapports d'activités, notes de synthèse et bilans de programmes à publier.", icon: "file" },
    { title: "Témoignages", description: "Récits de jeunes, femmes, partenaires et leaders communautaires à documenter.", icon: "users" },
    { title: "Études de cas", description: "Capitalisation des initiatives porteuses de changement local.", icon: "search" },
    { title: "Photos d'activités", description: "Galeries et archives visuelles à organiser par activité et programme.", icon: "newspaper" },
    { title: "Données de terrain", description: "Collecte progressive d'informations quantitatives et qualitatives.", icon: "clipboard" },
    { title: "Capitalisation", description: "Analyse des apprentissages pour améliorer les actions futures.", icon: "layers" }
  ] satisfies SupportArgument[]
};

export const testimonials = [
  { title: "Jeune bénéficiaire", text: "Témoignage à compléter." },
  { title: "Femme accompagnée", text: "Témoignage à compléter." },
  { title: "Partenaire", text: "Témoignage à compléter." },
  { title: "Participant à une activité", text: "Témoignage à compléter." },
  { title: "Leader communautaire", text: "Témoignage à compléter." }
];

export const zonesIntervention = {
  title: "Ancrage à Bukavu, ambition nationale et africaine",
  description:
    "Ancrée à Bukavu, au Sud-Kivu, la DDC RDC développe des initiatives adaptées aux réalités locales tout en portant une ambition nationale et africaine en matière de citoyenneté, leadership, innovation sociale, culture, environnement et développement communautaire.",
  levels: [
    "Bukavu et Sud-Kivu",
    "Expansion locale et provinciale",
    "Vocation nationale en République Démocratique du Congo",
    "Ouverture africaine autour de la citoyenneté, culture et innovation sociale"
  ]
};

export const strategicPlan = {
  title: "Plan stratégique à consolider",
  axes: [
    {
      title: "Gouvernance, citoyenneté et transformation sociale",
      description:
        "Renforcer la culture démocratique, la participation citoyenne et la redevabilité au sein des communautés congolaises."
    },
    {
      title: "Autonomisation économique et résilience",
      description:
        "Développer l'entrepreneuriat jeune, la production locale et les capacités économiques des femmes via les programmes PROJEC et JASIRI."
    },
    {
      title: "Identité, inclusion et capital humain",
      description:
        "Valoriser la culture congolaise, promouvoir l'inclusion et investir dans la formation des ressources humaines de l'association."
    }
  ],
  sections: [
    {
      title: "Priorités stratégiques",
      description: "Jeunesse, femmes, environnement, citoyenneté et alerte communautaire — cinq axes au cœur de l'action 2026–2029."
    },
    {
      title: "Résultats attendus",
      description:
        "Des communautés plus résilientes, des jeunes autonomes, des femmes leaders et un tissu associatif renforcé à Bukavu et au-delà."
    },
    {
      title: "Indicateurs",
      description: "Nombre de bénéficiaires formés, initiatives créées, alertes traitées, femmes autonomisées et partenariats conclus."
    },
    {
      title: "Zones d'intervention",
      description:
        "Bukavu, Commune Ibanda et Panzi, Sud-Kivu — avec une ambition d'expansion progressive vers d'autres territoires de la RDC."
    },
    {
      title: "Publics cibles",
      description: "Jeunes de 15 à 35 ans, femmes leaders communautaires, membres d'OSC, enseignants et acteurs de la société civile."
    },
    {
      title: "Approche méthodologique",
      description:
        "Participation communautaire, formation par les pairs, ancrage local, suivi-évaluation rigoureux et apprentissage continu."
    },
    {
      title: "Partenaires recherchés",
      description: "Coopération suisse, ONGs internationales, institutions publiques, secteur privé local et diaspora congolaise engagée."
    }
  ],
  note: "Structure prête pour l'intégration du plan stratégique complet."
};
