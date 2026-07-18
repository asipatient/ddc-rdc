import type { ActivityArticle } from "./types";

const reviewDate = "2026-05-18T00:00:00.000Z";

export const activityArticles: ActivityArticle[] = [
  {
    id: "article-001",
    title: "Formation communautaire sur les droits et devoirs du citoyen",
    slug: "formation-droits-devoirs-citoyen-janvier-2023",
    date: "2023-01-03",
    period: "03 - 04 janvier 2023",
    category: "Événements",
    excerpt:
      "Formation de deux jours à Bukavu destinée aux jeunes et aux femmes, portant sur les droits, devoirs citoyens et mécanismes de participation responsable à la vie communautaire.",
    content: [
      "Cette activité a permis d'ouvrir un espace d'éducation civique destiné aux jeunes et aux femmes de Bukavu. Elle a porté sur les droits, les devoirs et les formes de participation responsable à la vie communautaire.",
      "La démarche a privilégié un langage accessible, des échanges directs et une orientation pratique afin d'encourager les participants à devenir des relais de citoyenneté dans leurs milieux de vie.",
      "Les informations chiffrées disponibles indiquent que plus de 50 jeunes et femmes ont été outillés. Les supports, photos et rapports détaillés seront publiés au fil de la consolidation des archives."
    ],
    objectives: [
      "Renforcer la compréhension des droits et devoirs citoyens.",
      "Encourager une participation communautaire responsable.",
      "Outiller des jeunes et des femmes comme relais de civisme."
    ],
    targetAudience: ["Jeunes", "Femmes", "Citoyens engagés"],
    impact: ["Plus de 50 jeunes et femmes outillés.", "Données en cours de consolidation."],
    location: "Bukavu, RDC",
    partners: [],
    relatedAxis: "Gouvernance, citoyenneté et transformation sociale",
    relatedProgram: "École Citoyenne",
    image: "/images/ddc/osc-droits-socioeconomiques.jpg",
    gallery: ["/images/ddc/osc-droits-socioeconomiques.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-002",
    title: "Sensibilisation sur le processus électoral et l'importance du vote",
    slug: "sensibilisation-processus-electoral-vote-septembre-2023",
    date: "2023-09-03",
    period: "03 septembre 2023",
    category: "Événements",
    excerpt:
      "Conférence de sensibilisation organisée à Panzi pour renforcer la compréhension du processus électoral et encourager la participation citoyenne responsable.",
    content: [
      "La conférence a réuni des jeunes et des femmes autour des enjeux de participation électorale, de responsabilité citoyenne et de compréhension du processus démocratique.",
      "L'activité a été menée dans une logique non partisane, centrée sur l'information, la citoyenneté et l'importance d'un vote responsable.",
      "Les données disponibles mentionnent plus de 300 jeunes et femmes sensibilisés. Les éléments de rapportage, listes de présence et visuels seront ajoutés au fil de la consolidation des archives."
    ],
    objectives: [
      "Renforcer la compréhension du processus électoral.",
      "Encourager une participation démocratique responsable.",
      "Mobiliser les jeunes et les femmes autour de la citoyenneté active."
    ],
    targetAudience: ["Jeunes", "Femmes", "Leaders communautaires"],
    impact: ["Plus de 300 jeunes et femmes sensibilisés.", "Données en cours de consolidation."],
    location: "Panzi, Bukavu",
    partners: [
      "Jeunesse de l'Église CEPAC Hebroni Panzi",
      "Conseil Provincial de la Jeunesse du Sud-Kivu",
      "GENU ASBL"
    ],
    relatedAxis: "Gouvernance, citoyenneté et transformation sociale",
    relatedProgram: "École Citoyenne",
    image: "/images/ddc/osc-droits-socioeconomiques.jpg",
    gallery: ["/images/ddc/osc-droits-socioeconomiques.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-003",
    title: "Initiative communautaire de sécurité et plaidoyer pour la protection des populations à Panzi",
    slug: "initiative-securite-protection-populations-panzi-2024",
    date: "2024-01-01",
    period: "2024",
    category: "Événements",
    excerpt:
      "Mobilisation de jeunes leaders, sages, notables, acteurs de la société civile et autorités locales autour de la protection communautaire et de l'amélioration des conditions de vie à Panzi.",
    content: [
      "Cette initiative a mobilisé des jeunes leaders, sages, notables, acteurs de la société civile et autorités locales autour des défis de protection communautaire à Panzi.",
      "La démarche a mis l'accent sur la prévention, le dialogue, le plaidoyer, la collaboration communautaire et la recherche de solutions adaptées aux réalités locales.",
      "Les aspects sensibles liés à l'insécurité communautaire sont abordés avec prudence et dignité. Les détails opérationnels, les chiffres et les documents de suivi seront publiés progressivement."
    ],
    objectives: [
      "Renforcer la mobilisation citoyenne autour de la protection des populations.",
      "Favoriser la collaboration entre acteurs communautaires et autorités locales.",
      "Porter un plaidoyer sobre sur les besoins prioritaires de Panzi."
    ],
    targetAudience: ["Communautés locales", "Jeunes leaders", "Autorités locales", "Société civile"],
    impact: ["Mobilisation communautaire documentée.", "Chiffres en cours de consolidation."],
    location: "Panzi, Bukavu",
    partners: ["Acteurs communautaires à documenter", "Autorités locales à documenter"],
    relatedAxis: "Gouvernance, citoyenneté et transformation sociale",
    relatedProgram: "Programme d'Alerte Communautaire",
    image: "/images/ddc/hero-reel-ddc.jpg",
    gallery: ["/images/ddc/hero-reel-ddc.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-004",
    title: "Quel avenir pour Panzi avec tous ses potentiels ? Prospective 2024-2028",
    slug: "avenir-panzi-potentiels-prospective-2024-2028",
    date: "2024-05-17",
    period: "17 mai 2024",
    category: "Événements",
    excerpt:
      "Conférence magistrale organisée autour des perspectives de développement du quartier Panzi et d'un plaidoyer sur les services essentiels, les infrastructures et la reconnaissance institutionnelle.",
    content: [
      "Organisée au Centre d'Excellence Denis Mukwege à Panzi, cette conférence a ouvert une réflexion prospective sur les potentiels de développement local de Panzi.",
      "Les échanges ont porté sur l'accès à l'eau, l'électricité, les routes, la sécurité, les infrastructures et la reconnaissance institutionnelle de Panzi.",
      "Une information mentionne la proclamation de Panzi comme commune en octobre 2025. Cette donnée doit être vérifiée et documentée avant toute publication définitive."
    ],
    objectives: [
      "Mettre en débat les priorités de développement de Panzi.",
      "Sensibiliser les autorités, acteurs communautaires et médias.",
      "Porter un plaidoyer local sur les services essentiels et infrastructures."
    ],
    targetAudience: ["Autorités locales", "Acteurs communautaires", "Médias", "Jeunes leaders"],
    impact: [
      "Sensibilisation des autorités, acteurs communautaires et médias.",
      "Information sur le statut institutionnel de Panzi à vérifier/documenter."
    ],
    location: "Centre d'Excellence Denis Mukwege, Panzi",
    partners: [],
    relatedAxis: "Gouvernance, citoyenneté et transformation sociale",
    relatedProgram: "",
    image: "/images/ddc/hero-reel-ddc.jpg",
    gallery: ["/images/ddc/hero-reel-ddc.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-005",
    title: "Participation au Transformative Impact Summit Africa",
    slug: "participation-transformative-impact-summit-africa-2024",
    date: "2024-06-07",
    period: "07 - 09 juin 2024",
    category: "Événements",
    excerpt:
      "Participation à un sommet africain consacré à l'impact, au leadership, aux enjeux socioéconomiques, climatiques, technologiques et à l'innovation sociale.",
    content: [
      "Cette activité relève principalement du parcours du Président Fondateur. Elle témoigne d'une ouverture vers les réseaux africains d'impact, de leadership et d'innovation sociale.",
      "Elle doit être intégrée avec prudence dans le profil du fondateur ou dans la page Notre histoire, et non comme réalisation institutionnelle principale de la DDC sans validation complémentaire."
    ],
    objectives: ["Renforcer l'ouverture vers les réseaux africains d'impact.", "Capitaliser des apprentissages utiles à l'action citoyenne locale."],
    targetAudience: ["Profil du Président Fondateur"],
    impact: ["Impact en cours de documentation."],
    location: "Zanzibar, Tanzanie",
    partners: [],
    relatedAxis: "À clarifier",
    relatedProgram: "À clarifier",
    image: "/images/team/patient-asifiwe.jpg",
    gallery: ["/images/team/patient-asifiwe.jpg"],
    status: "draft",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-006",
    title: "Formation des femmes à l'entrepreneuriat local",
    slug: "formation-femmes-entrepreneuriat-local-2024",
    date: "2024-06-01",
    period: "Juin - août 2024",
    category: "Événements",
    excerpt:
      "Sessions de formation des femmes à l'entrepreneuriat local, notamment dans la fabrication de savons bleus et de briquettes écologiques.",
    content: [
      "Cette activité a accompagné des femmes dans l'apprentissage de pratiques d'entrepreneuriat local et de production à petite échelle.",
      "Les sessions ont notamment abordé la fabrication de savons bleus et de briquettes écologiques, en lien avec l'autonomisation économique et les solutions locales durables.",
      "Les données disponibles indiquent 50 femmes formées. Les fiches techniques, témoignages et photos seront ajoutés progressivement."
    ],
    objectives: [
      "Renforcer les compétences entrepreneuriales des femmes.",
      "Promouvoir des activités économiques locales et accessibles.",
      "Encourager des pratiques utiles à la résilience économique et environnementale."
    ],
    targetAudience: ["Femmes", "Jeunes femmes", "Porteuses d'initiatives locales"],
    impact: ["50 femmes formées.", "Données en cours de consolidation."],
    location: "Bukavu, RDC",
    partners: [],
    relatedAxis: "Autonomisation économique et résilience",
    relatedProgram: "PROJEC / Programme Vert et Climat",
    image: "/images/ddc/IMG-20260131-WA0150.jpg",
    gallery: ["/images/ddc/IMG-20260131-WA0150.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-007",
    title: "Activité d'assainissement communautaire à Panzi",
    slug: "assainissement-communautaire-panzi-septembre-2024",
    date: "2024-09-01",
    period: "Septembre 2024",
    category: "Événements",
    excerpt:
      "Mobilisation communautaire pour le débouchage des caniveaux, l'amélioration du cadre de vie, la prévention des risques d'inondation et la sensibilisation environnementale.",
    content: [
      "Cette activité a mobilisé des habitants et acteurs communautaires autour de l'assainissement, du débouchage des caniveaux et de l'amélioration du cadre de vie à Panzi.",
      "Elle s'inscrit dans une logique de prévention des risques, de sensibilisation environnementale et de responsabilité collective.",
      "L'impact potentiel concerne plusieurs centaines de personnes exposées aux risques liés aux débordements des eaux et à l'insalubrité. Les chiffres précis restent à consolider."
    ],
    objectives: [
      "Améliorer le cadre de vie communautaire.",
      "Prévenir les risques liés aux eaux de ruissellement et à l'insalubrité.",
      "Sensibiliser à la responsabilité environnementale locale."
    ],
    targetAudience: ["Communautés locales", "Jeunes", "Leaders communautaires"],
    impact: ["Plusieurs centaines de personnes potentiellement protégées.", "Données à consolider."],
    location: "Panzi, Bukavu",
    partners: [],
    relatedAxis: "Autonomisation économique et résilience",
    relatedProgram: "Programme Vert et Climat",
    image: "/images/ddc/hero-reel-ddc.jpg",
    gallery: ["/images/ddc/hero-reel-ddc.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-008",
    title: "Atelier sur le rôle des OSC dans la défense des droits socio-économiques en période de crise",
    slug: "atelier-osc-droits-socioeconomiques-crise-juin-2025",
    date: "2025-06-20",
    period: "20 juin 2025",
    category: "Événements",
    excerpt:
      "Atelier destiné à renforcer les capacités des organisations de la société civile dans la défense des droits socio-économiques en contexte de crise institutionnelle.",
    content: [
      "L'atelier a réuni des acteurs de la société civile afin de réfléchir au rôle des OSC dans la défense des droits socio-économiques en période de crise.",
      "Les échanges ont porté sur le repositionnement des organisations, la responsabilité citoyenne et les formes de plaidoyer adaptées aux réalités locales.",
      "Les données disponibles mentionnent 50 acteurs de la société civile capacités."
    ],
    objectives: [
      "Renforcer les capacités des OSC.",
      "Documenter les enjeux de droits socio-économiques.",
      "Encourager un plaidoyer citoyen responsable."
    ],
    targetAudience: ["Organisations de la société civile", "Chercheurs", "Acteurs communautaires"],
    impact: ["50 acteurs de la société civile capacités.", "Données en cours de consolidation."],
    location: "Bukavu, RDC",
    partners: [],
    relatedAxis: "Gouvernance, citoyenneté et transformation sociale",
    relatedProgram: "Think Tank DDC",
    image: "/images/ddc/osc-droits-socioeconomiques.jpg",
    gallery: ["/images/ddc/osc-droits-socioeconomiques.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-009",
    title: "Conférence citoyenne 30 juin, mémoire, lucidité et renaissance citoyenne",
    slug: "conference-citoyenne-30-juin-2025",
    date: "2025-06-30",
    period: "30 juin 2025",
    category: "Événements",
    excerpt:
      "Conférence-débat organisée à l'occasion de la Journée nationale de l'indépendance de la RDC, autour de la paix, de la mémoire nationale et de la responsabilité générationnelle.",
    content: [
      "Cette conférence citoyenne a été organisée à l'occasion de la Journée nationale de l'indépendance de la RDC.",
      "Elle a proposé un cadre de réflexion sur la paix, la mémoire nationale, la responsabilité générationnelle et la gouvernance responsable.",
      "Les données disponibles indiquent 120 jeunes, autorités locales et leaders d'opinion mobilisés."
    ],
    objectives: [
      "Renforcer la mémoire citoyenne.",
      "Encourager la responsabilité générationnelle.",
      "Mobiliser des jeunes et leaders autour de la gouvernance responsable."
    ],
    targetAudience: ["Jeunes", "Autorités locales", "Leaders d'opinion"],
    impact: ["120 jeunes, autorités locales et leaders d'opinion mobilisés.", "Données en cours de consolidation."],
    location: "Bukavu, RDC",
    partners: [],
    relatedAxis: "Gouvernance, citoyenneté et transformation sociale",
    relatedProgram: "École Citoyenne",
    image: "/images/ddc/osc-droits-socioeconomiques.jpg",
    gallery: ["/images/ddc/osc-droits-socioeconomiques.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-010",
    title: "Panel-Expo de la Journée Internationale de la Femme Africaine #JIFA2025",
    slug: "panel-expo-jifa-2025",
    date: "2025-07-31",
    period: "31 juillet 2025",
    category: "Événements",
    excerpt:
      "Lancement du Programme JASIRI à travers une conférence, un panel et une exposition valorisant l'apport économique, culturel et social des femmes entrepreneures congolaises.",
    content: [
      "Le Panel-Expo organisé pour la Journée Internationale de la Femme Africaine a marqué le lancement du Programme JASIRI.",
      "L'activité a valorisé l'apport économique, culturel et social des femmes entrepreneures congolaises autour du thème : Entre héritage et modernité, quel modèle d'émancipation pour la femme africaine ?",
      "Les données disponibles mentionnent plus de 100 femmes, jeunes filles et hommes mobilisés et sensibilisés."
    ],
    objectives: [
      "Lancer le Programme JASIRI.",
      "Valoriser le leadership féminin et l'entrepreneuriat.",
      "Créer un espace de dialogue entre héritage, modernité et émancipation."
    ],
    targetAudience: ["Femmes", "Jeunes filles", "Hommes alliés", "Entrepreneures"],
    impact: ["Plus de 100 femmes, jeunes filles et hommes mobilisés et sensibilisés.", "Données en cours de consolidation."],
    location: "Bukavu, RDC",
    partners: [],
    relatedAxis: "Identité, inclusion et capital humain",
    relatedProgram: "JASIRI",
    image: "/images/ddc/IMG-20260131-WA0150.jpg",
    gallery: ["/images/ddc/IMG-20260131-WA0150.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-011",
    title: "Atelier de coopération entre chercheurs et OSC contre les VBG",
    slug: "atelier-cooperation-chercheurs-osc-vbg-septembre-2025",
    date: "2025-09-12",
    period: "12 septembre 2025",
    category: "Événements",
    excerpt:
      "Atelier de coopération entre chercheurs, scientifiques et acteurs de la société civile pour renforcer l'action collective contre les violences basées sur le genre.",
    content: [
      "Cet atelier a créé un cadre de dialogue entre chercheurs, scientifiques et acteurs de la société civile autour de la prévention et de la lutte contre les violences basées sur le genre.",
      "La démarche a privilégié la coopération, la production de connaissances utiles et le renforcement des stratégies d'action collective.",
      "Les informations d'impact seront enrichies au fil des données validées, supports et comptes rendus."
    ],
    objectives: [
      "Renforcer la coopération entre recherche et société civile.",
      "Améliorer les stratégies collectives contre les VBG.",
      "Encourager une approche fondée sur les données et la dignité des personnes."
    ],
    targetAudience: ["Chercheurs", "Organisations de la société civile", "Acteurs communautaires"],
    impact: ["Données en cours de consolidation."],
    location: "Bukavu, RDC",
    partners: [],
    relatedAxis: "Gouvernance, citoyenneté et transformation sociale / Identité, inclusion et capital humain",
    relatedProgram: "Think Tank DDC / JASIRI",
    image: "/images/ddc/activisme-vbg.jpg",
    gallery: ["/images/ddc/activisme-vbg.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-012",
    title: "Formation sur le Plan de Protection Communautaire",
    slug: "formation-plan-protection-communautaire-octobre-2025",
    date: "2025-10-14",
    period: "14 - 15 octobre 2025",
    category: "Événements",
    excerpt:
      "Participation à une formation sur le Plan de Protection Communautaire organisée par le HCR et exécutée par INTERSOS, visant le renforcement des compétences en protection communautaire et gouvernance locale.",
    content: [
      "Cette activité concerne le renforcement des capacités du leadership et doit être intégrée avec prudence dans le profil institutionnel ou la page Notre histoire.",
      "Elle peut nourrir l'approche de la DDC en matière de protection communautaire, de gouvernance locale et de redevabilité."
    ],
    objectives: ["Renforcer les compétences en protection communautaire.", "Capitaliser les apprentissages utiles à l'action locale."],
    targetAudience: ["Leadership institutionnel"],
    impact: ["Impact en cours de documentation."],
    location: "Bukavu, RDC",
    partners: ["HCR", "INTERSOS"],
    relatedAxis: "Gouvernance, citoyenneté et transformation sociale",
    relatedProgram: "Programme d'Alerte Communautaire",
    image: "/images/ddc/hero-reel-ddc.jpg",
    gallery: ["/images/ddc/hero-reel-ddc.jpg"],
    status: "draft",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-013",
    title: "Projet de sensibilisation sur les talents créatifs et innovants des enfants",
    slug: "sensibilisation-talents-creatifs-innovants-enfants-2025",
    date: "2025-10-30",
    period: "30 octobre - 20 novembre 2025",
    category: "Événements",
    excerpt:
      "Projet de sensibilisation sur la valorisation des talents créatifs et innovants des jeunes dès l'enfance, mené dans des écoles de Bukavu.",
    content: [
      "Le projet a sensibilisé des élèves à la valorisation des talents créatifs et innovants dès l'enfance.",
      "Menée dans des écoles de Bukavu, l'activité a mis en avant la confiance, la créativité, l'expression des talents et l'orientation positive des enfants.",
      "Les données disponibles mentionnent plus de 300 élèves sensibilisés."
    ],
    objectives: [
      "Identifier et valoriser les talents des enfants.",
      "Encourager la créativité et l'innovation dès l'enfance.",
      "Sensibiliser les écoles à l'importance de l'encadrement des talents."
    ],
    targetAudience: ["Élèves", "Enfants", "Écoles"],
    impact: ["Plus de 300 élèves sensibilisés.", "Données en cours de consolidation."],
    location: "Écoles de Bukavu",
    partners: ["Écoles à documenter"],
    relatedAxis: "Identité, inclusion et capital humain",
    relatedProgram: "Creative Child",
    image: "/images/ddc/IMG-20260131-WA0181.jpg",
    gallery: ["/images/ddc/IMG-20260131-WA0181.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-014",
    title: "Activité culturelle et scientifique sur les VBG facilitées par la technologie",
    slug: "activite-culturelle-scientifique-vbg-technologie-decembre-2025",
    date: "2025-12-05",
    period: "05 décembre 2025",
    category: "Événements",
    excerpt:
      "Activité culturelle et scientifique organisée pendant les 16 jours d'activisme contre les violences basées sur le genre, portant sur les violences facilitées par la technologie.",
    content: [
      "Organisée dans le cadre des 16 jours d'activisme contre les violences basées sur le genre, cette activité a abordé les formes de violences facilitées par la technologie.",
      "La rencontre a mis l'accent sur la prévention, la dignité, l'adaptation des mécanismes de protection et la compréhension des réalités numériques en RDC.",
      "Les données d'impact seront enrichies à partir des rapports et supports validés."
    ],
    objectives: [
      "Sensibiliser sur les risques de violences facilitées par la technologie.",
      "Adapter les messages de prévention aux usages numériques.",
      "Renforcer le dialogue entre culture, recherche et protection."
    ],
    targetAudience: ["Femmes", "Jeunes filles", "Jeunes", "Acteurs de protection"],
    impact: ["Données en cours de consolidation."],
    location: "Bukavu, RDC",
    partners: [],
    relatedAxis: "Identité, inclusion et capital humain",
    relatedProgram: "JASIRI",
    image: "/images/ddc/activisme-vbg.jpg",
    gallery: ["/images/ddc/activisme-vbg.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-015",
    title: "Atelier interculturel et intergénérationnel - Journée Mondiale de la Culture Africaine",
    slug: "atelier-interculturel-journee-mondiale-culture-africaine-2026",
    date: "2026-01-24",
    period: "24 - 25 janvier 2026",
    category: "Événements",
    excerpt:
      "Atelier de deux jours organisé à Bukavu pour renforcer le dialogue interculturel et intergénérationnel, valoriser la mémoire collective et promouvoir la culture comme levier de paix.",
    content: [
      "Cet atelier de deux jours a réuni des participants autour du dialogue interculturel et intergénérationnel.",
      "L'activité a valorisé la mémoire collective, les identités positives et la culture comme levier de paix, de cohésion sociale et de vivre-ensemble communautaire.",
      "Les données d'impact seront enrichies à partir des rapports, photos et témoignages."
    ],
    objectives: [
      "Renforcer le dialogue interculturel et intergénérationnel.",
      "Valoriser la mémoire collective et les identités positives.",
      "Promouvoir la culture comme levier de paix et de cohésion sociale."
    ],
    targetAudience: ["Jeunes", "Acteurs culturels", "Leaders communautaires", "Communautés locales"],
    impact: ["Données en cours de consolidation."],
    location: "Bukavu, RDC",
    partners: [],
    relatedAxis: "Identité, inclusion et capital humain",
    relatedProgram: "Kongo Culture",
    image: "/images/ddc/jeunesse-culture-echange.jpg",
    gallery: ["/images/ddc/jeunesse-culture-echange.jpg"],
    status: "published",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  },
  {
    id: "article-016",
    title: "Mise en place de PROSE DIGITAL",
    slug: "mise-en-place-prose-digital-fevrier-2026",
    date: "2026-02-01",
    period: "Février 2026",
    category: "Événements",
    excerpt:
      "Initiative orientée vers la formation des jeunes et des femmes au digital, au e-commerce, au marketing digital, aux solutions technologiques et à l'intelligence artificielle adaptée aux réalités africaines.",
    content: [
      "PROSE DIGITAL est une initiative orientée vers la formation au digital, au e-commerce, au marketing digital, aux solutions technologiques et à l'intelligence artificielle adaptée aux réalités africaines.",
      "Son statut doit être clarifié avant publication définitive : programme de la DDC, initiative partenaire, initiative personnelle du Président Fondateur ou structure distincte.",
      "En attendant validation, cette fiche est conservée comme initiative à clarifier ou partenaire stratégique potentiel."
    ],
    objectives: [
      "Clarifier le statut institutionnel de PROSE DIGITAL.",
      "Préparer un éventuel partenariat stratégique autour du digital et de l'innovation.",
      "Identifier les contenus de formation à documenter."
    ],
    targetAudience: ["Jeunes", "Femmes", "Entrepreneurs locaux"],
    impact: ["Statut à clarifier."],
    location: "",
    partners: ["PROSE DIGITAL - statut à clarifier"],
    relatedAxis: "À clarifier",
    relatedProgram: "Initiative à clarifier",
    image: "/images/ddc/hero-reel-ddc.jpg",
    gallery: ["/images/ddc/hero-reel-ddc.jpg"],
    status: "draft",
    needsReview: true,
    createdAt: reviewDate,
    updatedAt: reviewDate
  }
];

export const publishedActivityArticles = activityArticles.filter((article) => article.status === "published");
