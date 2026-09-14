import type { PartnerCategory } from "./types";

export const partnersPage = {
  intro:
    "La DDC RDC s'entoure d'institutions, d'organisations de la société civile et de partenaires techniques engagés pour déployer des actions concrètes et durables sur le terrain.",
  promise:
    "Nous sommes ouverts à de nouvelles collaborations permettant de renforcer l'impact local, la transparence et la capacité d'action des communautés."
};

export const partnerCategories: PartnerCategory[] = [
  { title: "Partenariat technique", description: "Expertise, formation, outils méthodologiques, accompagnement de programmes et suivi-évaluation.", icon: "clipboard" },
  { title: "Partenariat financier", description: "Subventions, dons, cofinancement d'activités, appui institutionnel et soutien aux initiatives locales.", icon: "donate" },
  { title: "Partenariat institutionnel", description: "Cadres de collaboration avec institutions publiques, ONG, agences de coopération et organisations internationales.", icon: "landmark" },
  { title: "Partenariat académique", description: "Recherche, stages, publications, conférences, données de terrain et propositions de politiques publiques.", icon: "graduation" },
  { title: "Partenariat communautaire", description: "Initiatives locales, consultations, mobilisation, sensibilisation et accompagnement de structures de base.", icon: "users" },
  { title: "Partenariat média", description: "Visibilité, communiqués, reportages, campagnes de mobilisation et diffusion des messages citoyens.", icon: "newspaper" },
  { title: "Partenariat culturel", description: "Valorisation du patrimoine, industries créatives, événements culturels et dialogue intergénérationnel.", icon: "palette" },
  { title: "Partenariat humanitaire", description: "Réponses ponctuelles, protection des groupes vulnérables et appuis ciblés en contexte de crise.", icon: "heart" },
  { title: "Partenariat environnemental", description: "Éducation écologique, initiatives vertes, protection des ressources et résilience climatique.", icon: "leaf" }
];

export const partnerPlaceholders = [
  "Logo partenaire à ajouter",
  "Logo bailleur à ajouter",
  "Logo institution à ajouter",
  "Logo réseau communautaire à ajouter"
];
