import type { GovernanceItem, IconKey } from "./types";

export const aboutIntro = [
  "La DDC RDC est née de la conscience des défis sociaux, économiques, culturels et institutionnels qui affectent l'avenir de la jeunesse et de la femme congolaise.",
  "Elle répond à la marginalisation persistante des jeunes et des femmes dans les espaces de réflexion, de décision, de participation citoyenne, de gouvernance, d'entrepreneuriat, d'innovation et d'influence sociale.",
  "L'association considère que la jeunesse et les femmes constituent des forces essentielles pour la transformation démocratique, sociale, économique, culturelle et institutionnelle de la République Démocratique du Congo.",
  "Elle entend créer un cadre structuré permettant à la jeunesse et aux femmes congolaises de réfléchir, se former, entreprendre, innover, agir et participer activement à la construction de solutions adaptées aux réalités locales, provinciales, nationales et africaines."
];

export const interventionAreas = [
  {
    title: "Éducation civique et participation citoyenne",
    icon: "book",
    description:
      "Renforcer la compréhension des droits, devoirs, institutions et mécanismes de participation démocratique."
  },
  {
    title: "Leadership des jeunes et des femmes",
    icon: "users",
    description:
      "Former des leaders responsables, capables d'agir avec intégrité dans leurs communautés et leurs institutions."
  },
  {
    title: "Autonomisation économique et entrepreneuriat",
    icon: "briefcase",
    description:
      "Accompagner l'esprit d'initiative, l'apprentissage professionnel, l'incubation et l'accès aux opportunités."
  },
  {
    title: "Droits des femmes et lutte contre les VBG",
    icon: "shield",
    description:
      "Promouvoir l'égalité, la dignité et la prévention des violences basées sur le genre."
  },
  {
    title: "Protection de l'environnement et développement durable",
    icon: "leaf",
    description:
      "Soutenir les gestes communautaires, l'éducation environnementale et les solutions locales durables."
  },
  {
    title: "Veille citoyenne, prévention des risques et résilience",
    icon: "radar",
    description:
      "Outiller les communautés pour anticiper les risques sociaux, économiques, environnementaux et institutionnels."
  },
  {
    title: "Interventions humanitaires ponctuelles",
    icon: "heart",
    description:
      "Mobiliser des réponses ciblées face aux urgences locales et aux besoins des groupes vulnérables."
  },
  {
    title: "Encadrement des enfants et promotion des talents",
    icon: "sparkles",
    description:
      "Créer des espaces d'apprentissage, d'expression, de créativité et de protection pour les enfants."
  },
  {
    title: "Recherche, plaidoyer et politiques publiques",
    icon: "search",
    description:
      "Produire des analyses, notes et recommandations utiles à la décision publique et à l'action citoyenne."
  },
  {
    title: "Patrimoine culturel et industries créatives",
    icon: "palette",
    description:
      "Valoriser les savoirs locaux, les arts, les identités positives et les talents culturels."
  },
  {
    title: "Cohésion sociale, paix et inclusion",
    icon: "handshake",
    description:
      "Encourager le dialogue, la solidarité, la prévention des conflits et l'inclusion communautaire."
  }
] satisfies Array<{ title: string; icon: IconKey; description: string }>;

export const specificObjectives = [
  {
    title: "Renforcement de la citoyenneté et de la culture démocratique",
    icon: "landmark",
    description:
      "Développer une culture de responsabilité, de participation publique et de respect des institutions républicaines."
  },
  {
    title: "Autonomisation économique et entrepreneuriat",
    icon: "briefcase",
    description:
      "Favoriser l'accès aux compétences, au mentorat et aux cadres d'incubation pour transformer les initiatives en projets viables."
  },
  {
    title: "Protection de l'environnement et développement durable",
    icon: "leaf",
    description:
      "Promouvoir les pratiques responsables, la protection des ressources et l'engagement local pour la durabilité."
  },
  {
    title: "Prévention des risques, veille citoyenne et résilience communautaire",
    icon: "radar",
    description:
      "Mettre en place des mécanismes de veille, d'alerte, de dialogue et de réponse communautaire."
  },
  {
    title: "Promotion du leadership féminin et lutte contre les violences basées sur le genre",
    icon: "shield",
    description:
      "Renforcer la participation des femmes et la prévention des violences, avec une approche fondée sur la dignité."
  },
  {
    title: "Encadrement des enfants et promotion de leurs talents",
    icon: "child",
    description:
      "Soutenir les enfants par des activités éducatives, culturelles, citoyennes et créatives adaptées."
  },
  {
    title: "Recherche, analyse stratégique et influence des politiques publiques",
    icon: "search",
    description:
      "Produire des connaissances utiles et porter un plaidoyer sérieux auprès des décideurs et partenaires."
  },
  {
    title: "Promotion du patrimoine culturel et des industries créatives",
    icon: "palette",
    description:
      "Faire de la culture un levier d'identité, d'économie locale, de dialogue et de cohésion sociale."
  }
] satisfies Array<{ title: string; icon: IconKey; description: string }>;

export const principles = [
  "Apolitisme : aucune affiliation, instruction ou financement partisan",
  "Non-confessionnalisme : ouverte à toutes les croyances, sans en promouvoir aucune",
  "Non-discrimination : égale dignité pour toutes et tous",
  "Indépendance : liberté totale vis-à-vis de tout pouvoir extérieur",
  "Transparence & redevabilité : comptes ouverts à nos membres et partenaires",
  "Inclusion & équité de genre : priorité aux femmes et aux jeunes dans nos organes",
  "Dignité humaine",
  "Participation inclusive",
  "Responsabilité citoyenne",
  "Intégrité",
  "Solidarité",
  "Justice sociale",
  "Paix et cohésion sociale",
  "Protection de l'environnement",
  "Innovation",
  "Respect des lois et institutions de la République",
  "Respect des cultures, identités locales et savoirs communautaires compatibles avec les droits humains"
];

export const beneficiaries = [
  {
    title: "Jeunes filles et garçons",
    description: "Formation civique, leadership, mentorat, orientation et participation communautaire."
  },
  {
    title: "Femmes",
    description: "Leadership, autonomisation économique, droits, protection et participation aux décisions."
  },
  {
    title: "Enfants",
    description: "Encadrement, éveil des talents, éducation aux valeurs et espaces d'expression."
  },
  {
    title: "Personnes et groupes vulnérables",
    description: "Accompagnement ciblé, inclusion, accès à l'information et initiatives de solidarité."
  },
  {
    title: "Communautés marginalisées ou défavorisées",
    description: "Dialogue, projets locaux, mobilisation citoyenne et appui aux priorités communautaires."
  },
  {
    title: "Leaders communautaires",
    description: "Outils de médiation, gouvernance locale, redevabilité et mobilisation responsable."
  },
  {
    title: "Organisations de jeunes et de femmes",
    description: "Réseautage, structuration, renforcement organisationnel et co-construction d'initiatives."
  },
  {
    title: "Structures locales de participation citoyenne",
    description: "Espaces de dialogue, veille citoyenne et mécanismes de concertation."
  },
  {
    title: "Communautés affectées par les crises",
    description: "Réponses ponctuelles, résilience et accompagnement social face aux crises multiples."
  }
];

export const actionMeans = [
  "Formations, conférences, ateliers, séminaires, forums et consultations communautaires",
  "Programmes d'éducation civique, leadership, mentorat, incubation et apprentissage professionnel",
  "Études, recherches, enquêtes, publications, notes de plaidoyer et propositions de politiques publiques",
  "Création de clubs, cellules, cadres de dialogue, réseaux, plateformes et espaces d'innovation",
  "Projets économiques, sociaux, culturels, éducatifs, environnementaux, humanitaires et communautaires",
  "Appui aux initiatives locales",
  "Sensibilisation, mobilisation sociale, communication et plaidoyer",
  "Promotion des arts, de la culture, des talents et des savoirs locaux",
  "Partenariats institutionnels, nationaux et internationaux",
  "Mobilisation de ressources financières, matérielles, techniques et humaines"
];

export const legalIdentity = {
  denomination: "Dynamique Debout Congolais",
  sigle: "DDC RDC",
  statutJuridique: "Association Sans But Lucratif (ASBL) — Droit congolais",
  dateFondation: "5 janvier 2022",
  siegeSocial: "Av. Nyarwizimia 019, Quartier Panzi, Commune d'Ibanda, Bukavu, Sud-Kivu",
  zoneIntervention: "Ensemble du territoire de la République Démocratique du Congo — ancrage prioritaire au Sud-Kivu"
};

export const governanceItems: GovernanceItem[] = [
  {
    title: "Assemblée générale",
    description: "Organe souverain de l'association, elle réunit les membres et statue sur les orientations majeures de la DDC RDC.",
    status: "Organe souverain"
  },
  {
    title: "Président Fondateur",
    description:
      "Garant de la mission : statut permanent et protégé par les Statuts, droit de veto suspensif et certification de la conformité des programmes avec la vision de l'association.",
    status: "Garant de la mission"
  },
  {
    title: "Conseil d'administration",
    description: "Organe de direction de l'association, il oriente et supervise la mise en œuvre des programmes.",
    status: "Organe de direction"
  },
  {
    title: "Bureau exécutif",
    description:
      "Organe d'exécution : assure la gestion quotidienne et la représentation légale. Ses membres sont élus par le Conseil d'administration pour un mandat de trois (3) ans renouvelable.",
    status: "Organe d'exécution"
  },
  {
    title: "Commissaires aux comptes",
    description: "Contrôle financier de l'association et vérification de la bonne tenue des comptes.",
    status: "Contrôle financier"
  }
];
