import type { DocumentItem, Opportunity } from "./types";

export const transparencyDocuments: DocumentItem[] = [
  {
    title: "Rapport annuel à publier",
    category: "Rapports d'activités",
    status: "À publier",
    description: "Espace réservé aux rapports annuels de la DDC RDC ASBL."
  },
  {
    title: "Rapport financier à publier",
    category: "Rapports financiers",
    status: "À publier",
    description: "Espace réservé aux rapports financiers et états de redevabilité."
  },
  {
    title: "Notes de plaidoyer à compléter",
    category: "Notes de plaidoyer",
    status: "À compléter",
    description: "Espace réservé aux analyses et recommandations institutionnelles."
  },
  {
    title: "Comptes rendus d'activités à compléter",
    category: "Comptes rendus",
    status: "À compléter",
    description: "Espace destiné aux comptes rendus publics des activités réalisées."
  },
  {
    title: "Documents institutionnels à compléter",
    category: "Documentation institutionnelle",
    status: "À compléter",
    description: "Statuts, règlement intérieur, brochures et documents de présentation."
  },
  {
    title: "Politique de protection à compléter",
    category: "Politiques internes",
    status: "À compléter",
    description: "Espace réservé aux politiques de sauvegarde et protection."
  }
];

export const institutionalDocuments: DocumentItem[] = [
  { title: "Statuts", category: "Gouvernance", status: "Document à ajouter", description: "Statuts officiels de l'association." },
  { title: "Règlement intérieur", category: "Gouvernance", status: "Document à ajouter", description: "Règles internes de fonctionnement." },
  { title: "Rapports", category: "Redevabilité", status: "Dossier à compléter", description: "Rapports d'activités, financiers et thématiques." },
  { title: "Plans stratégiques", category: "Stratégie", status: "Document à publier", description: "Plan stratégique et priorités programmatiques." },
  { title: "Politiques internes", category: "Éthique", status: "Dossier à compléter", description: "Politiques de protection, données, anti-corruption et sauvegarde." },
  { title: "Documents de plaidoyer", category: "Plaidoyer", status: "Dossier à compléter", description: "Notes, recommandations et propositions de politiques publiques." },
  { title: "Brochures", category: "Communication", status: "Fichiers à ajouter", description: "Brochures institutionnelles et supports de présentation." },
  { title: "Communiqués", category: "Presse", status: "À publier", description: "Communiqués officiels et déclarations publiques." }
];

export const protectionEthicsDocuments: DocumentItem[] = [
  { title: "Politique de protection de l'enfant", category: "Protection", status: "À compléter", description: "Document interne à développer." },
  { title: "Politique de prévention des VBG", category: "Protection", status: "À compléter", description: "Référentiel de prévention et réponse aux violences basées sur le genre." },
  { title: "Politique de protection des données", category: "Données", status: "À compléter", description: "Cadre de gestion responsable des données collectées." },
  { title: "Code d'éthique", category: "Éthique", status: "À compléter", description: "Principes de conduite des membres, bénévoles et partenaires." },
  { title: "Politique anti-corruption", category: "Redevabilité", status: "À compléter", description: "Mécanismes de prévention des conflits d'intérêts et abus." },
  { title: "Mécanisme de signalement", category: "Signalement", status: "À compléter", description: "Canaux et procédures de signalement sécurisé." },
  { title: "Politique de sauvegarde", category: "Sauvegarde", status: "À compléter", description: "Cadre global de protection des bénéficiaires et équipes." }
];

export const pressResources: DocumentItem[] = [
  { title: "Communiqués", category: "Presse", status: "À publier", description: "Communiqués officiels de la DDC RDC ASBL." },
  { title: "Dossiers de presse", category: "Presse", status: "À compléter", description: "Dossier institutionnel, éléments de langage et informations clés." },
  { title: "Photos officielles", category: "Médias", status: "À ajouter", description: "Photos validées pour usage presse et communication." },
  { title: "Contacts presse", category: "Médias", status: "Disponible via contact officiel", description: "Canal de contact pour journalistes et médias." },
  { title: "Interventions médiatiques", category: "Médias", status: "À documenter", description: "Radio, télévision, presse écrite, podcasts et plateformes numériques." },
  { title: "Articles parlant de la DDC", category: "Revue de presse", status: "À compléter", description: "Liens et références aux mentions médiatiques." }
];

export const opportunities: Opportunity[] = [
  {
    title: "Appels à candidatures",
    audience: "Jeunes, femmes, communautés",
    status: "Aucun appel ouvert pour le moment",
    description: "Espace réservé aux candidatures pour formations, programmes et parcours de leadership."
  },
  {
    title: "Formations ouvertes",
    audience: "Jeunes et femmes",
    status: "À annoncer",
    description: "Espace destiné aux sessions de formation citoyenne, économique, culturelle et environnementale."
  },
  {
    title: "Opportunités pour jeunes",
    audience: "Jeunes leaders",
    status: "À compléter",
    description: "Mentorat, clubs citoyens, initiatives locales, volontariat et propositions d'actions."
  },
  {
    title: "Opportunités pour femmes",
    audience: "Femmes leaders",
    status: "À compléter",
    description: "Leadership, autonomisation économique, protection, plaidoyer et participation citoyenne."
  },
  {
    title: "Appels à bénévoles",
    audience: "Citoyens et diaspora",
    status: "Candidatures spontanées possibles",
    description: "Appui aux activités, communication, recherche, logistique et mobilisation communautaire."
  },
  {
    title: "Appels à partenariats",
    audience: "Institutions et organisations",
    status: "Ouvert",
    description: "Collaboration technique, financière, académique, communautaire, média, culturelle ou environnementale."
  },
  {
    title: "Consultations communautaires",
    audience: "Communautés locales",
    status: "À programmer",
    description: "Espaces de dialogue pour identifier les priorités, besoins et propositions locales."
  },
  {
    title: "Événements",
    audience: "Publics cibles et partenaires",
    status: "Calendrier à publier",
    description: "Conférences, forums, ateliers, panels, expositions et activités communautaires."
  }
];
