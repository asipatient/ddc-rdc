// scripts/update-content.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// --- PROGRAMMES ---

const programmes = [
  {
    slug: 'projec',
    title: 'PROJEC',
    subtitle: 'Programme Jeunes pour l’Éveil Économique',
    description:
      'Émerger une génération de jeunes capables de créer, gérer et développer des activités productives grâce à la formation, à l’incubation et à l’accès aux équipements. Le programme répond au chômage structurel et à la dépendance aux importations.',
    axe: 'Jeunesse, entrepreneuriat et économie productive',
  },
  {
    slug: 'ecole-citoyenne-clac',
    title: 'École Citoyenne / CLAC',
    subtitle: 'Collège des Leaders Associatifs et Communautaires',
    description:
      'Cadre stratégique d’incubation du leadership citoyen, il identifie, forme et met en réseau les jeunes porteurs d’initiatives d’émancipation. Il fournit des outils de gouvernance, de gestion de projets et de mobilisation communautaire.',
    axe: 'Citoyenneté, gouvernance et leadership communautaire',
  },
  {
    slug: 'jasiri',
    title: 'JASIRI',
    subtitle: 'Leadership féminin et autonomisation',
    description:
      'Le programme vise à prévenir les violences basées sur le genre et à renforcer le pouvoir d’agir des femmes congolaises. Il s’appuie sur des espaces sûrs d’expression, de formation et d’accompagnement.',
    axe: 'Genre, autonomisation et protection',
  },
  {
    slug: 'vert-et-climat',
    title: 'Vert et Climat',
    subtitle: 'Protection environnementale',
    description:
      'Face à la déforestation, à la pollution plastique et à la vulnérabilité climatique du Sud‑Kivu, le programme mobilise les jeunes comme acteurs de la transition verte locale. Il encourage aussi l’action écologique concrète sur le terrain.',
    axe: 'Environnement, climat et résilience',
  },
  {
    slug: 'alerte-precoce',
    title: 'Alerte Précoce',
    subtitle: 'Prévention et intervention humanitaire',
    description:
      'Le programme met en place des mécanismes communautaires de prévention, de détection précoce et de réponse coordonnée aux crises sociales, sécuritaires et humanitaires. Il s’appuie sur des réseaux de veille locaux, la formation de sentinelles communautaires et la coordination avec les acteurs institutionnels.',
    axe: 'Prévention des crises et action humanitaire',
  },
  {
    slug: 'creative-child',
    title: 'Creative Child',
    subtitle: 'Talents créatifs dès l’enfance',
    description:
      'Ce programme identifie, encadre et oriente stratégiquement les talents créatifs et innovants des enfants de moins de 18 ans. Il valorise l’expression, l’imagination et la découverte dès le plus jeune âge.',
    axe: 'Enfance, créativité et développement du potentiel',
  },
  {
    slug: 'kongo-culture',
    title: 'Kongo Culture',
    subtitle: 'Patrimoine culturel',
    description:
      'Le programme valorise la mémoire collective, le dialogue intergénérationnel et l’expression artistique congolaise et africaine. Il les considère comme des leviers de cohésion sociale et de construction identitaire.',
    axe: 'Culture, identité et patrimoine',
  },
  {
    slug: 'think-tank-ddc',
    title: 'Think Tank DDC',
    subtitle: 'Recherche et production d’idées',
    description:
      'Il produit des analyses prospectives, des notes de positionnement et des propositions de réformes à l’intention des décideurs, des OSC et du grand public. Il alimente la réflexion stratégique et le plaidoyer de DDC RDC.',
    axe: 'Recherche, analyse et plaidoyer',
  },
];

// --- VISION & MISSION ---

const visionMission = {
  vision:
    'Une RDC où la jeunesse et les femmes sont compétents et acteurs du développement durable, pleinement reconnus, valorisés et intégrés dans les processus de gouvernance et de transformation sociale, économique et culturelle de la Nation.',
  mission:
    'Transformer les idées en initiatives, et les initiatives en impact social. Offrir aux jeunes et aux femmes un espace d’expression, d’apprentissage, d’action, de recherche et de capacitation en leadership responsable, pour contribuer durablement à la transformation de la RDC.',
  piliers: [
    {
      titre: 'Culture structurante',
      desc: 'La culture comme socle de cohésion sociale et d’identité.',
    },
    {
      titre: 'Expertise scientifique',
      desc: 'La recherche et l’analyse au service de l’action.',
    },
    {
      titre: 'Action communautaire',
      desc: 'L’ancrage local et l’engagement de terrain.',
    },
  ],
  tuiles: [
    'Fondation officielle à Bukavu — Assemblée générale constituante.',
    'Première assemblée générale ordinaire — bilan et orientations 2023.',
    'Salongo Panzi — débouchage des caniveaux de la RN5 avec plus de 50 volontaires.',
    'Conférence-débat sur le rôle des OSC en période de crise institutionnelle.',
    'Panel-Expo JIFA 2025 — valorisation des femmes entrepreneures.',
    'Atelier scientifique OSC/VBG à l’UEA.',
    'Clôture du projet Talents d’Enfance à l’UEA.',
    'Conférence des 16 jours d’activisme contre les VBG au CERDAF.',
    'Conférence citoyenne du 65e anniversaire.',
    'Journée mondiale de la culture africaine — Kongo Culture.',
  ],
};

// --- FONCTIONS UTILITAIRES ---

function readJSON(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function findFileByPattern(dir, pattern) {
  const files = fs.readdirSync(dir);
  return files.find((f) => f.toLowerCase().includes(pattern));
}

// --- MISE À JOUR DES PROGRAMMES ---

function updateProgrammes() {
  const programmesDir = path.join(ROOT, 'src', 'data', 'programmes');
  if (!fs.existsSync(programmesDir)) {
    console.log('⚠️  Aucun dossier src/data/programmes trouvé. Adaptation nécessaire.');
    return;
  }

  // Supprimer les anciens fichiers
  fs.readdirSync(programmesDir)
    .filter((f) => f.endsWith('.json'))
    .forEach((f) => fs.rmSync(path.join(programmesDir, f)));

  programmes.forEach((p, i) => {
    const filename = `${String(i + 1).padStart(2, '0')}-${p.slug}.json`;
    const data = {
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      axe: p.axe,
    };
    writeJSON(path.join(programmesDir, filename), data);
  });

  console.log('✅ Programmes mis à jour.');
}

// --- MISE À JOUR VISION & MISSION ---

function updateVisionMission() {
  const visionPath = path.join(ROOT, 'src', 'data', 'vision-mission.json');
  if (fs.existsSync(visionPath)) {
    const data = readJSON(visionPath);
    data.vision = visionMission.vision;
    data.mission = visionMission.mission;
    data.piliers = visionMission.piliers;
    data.tuiles = visionMission.tuiles;
    writeJSON(visionPath, data);
    console.log('✅ Vision & Mission mises à jour.');
  } else {
    console.log('⚠️  Aucun fichier src/data/vision-mission.json trouvé.');
  }
}

// --- CORRECTION SITECONFIG ---

function updateSiteConfig() {
  const configPath = path.join(ROOT, 'src', 'config', 'siteConfig.json');
  if (fs.existsSync(configPath)) {
    const data = readJSON(configPath);
    // Remplace dans tous les champs string
    JSON.stringify(data, null, 2)
      .replace(/Tous droits reserves\./g, 'Tous droits réservés.');
    const corrected = JSON.parse(JSON.stringify(data, null, 2).replace(/Tous droits reserves\./g, 'Tous droits réservés.'));
    writeJSON(configPath, corrected);
    console.log('✅ SiteConfig corrigé ("Tous droits réservés").');
  } else {
    console.log('⚠️  Aucun fichier src/config/siteConfig.json trouvé.');
  }
}

// --- MAIN ---

updateProgrammes();
updateVisionMission();
updateSiteConfig();

console.log('✨ Contenu mis à jour. Tu peux maintenant committer et pousser.');
