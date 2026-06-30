import type { PartnerCategory } from "./types";

export const partnersPage = {
  intro:
    "La DDC RDC ASBL est ouverte aux partenariats avec les institutions publiques, les organisations de la société civile, les agences de coopération, les bailleurs de fonds, les universités, les médias, les entreprises sociales, les acteurs culturels, les structures communautaires et les organisations internationales partageant ses valeurs.",
  promise:
    "Chaque partenariat recherché doit renforcer l'impact local, la transparence, la participation inclusive et la capacité des jeunes, des femmes et des communautés à agir durablement."
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
