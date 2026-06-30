#!/usr/bin/env node
/**
 * Génère un package de déploiement prêt à héberger sur Congo Cloud (cPanel
 * avec support Node.js App) ou tout hébergeur Node.js compatible.
 *
 * Usage : npm run package
 *
 * Produit : export/ddc-rdc-site_YYYYMMDD.zip
 */
import { execSync } from "child_process";
import { promises as fs } from "fs";
import path from "path";

const root = process.cwd();
const exportRoot = path.join(root, "export");
const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const packageDirName = "ddc-rdc-site";
const packageDir = path.join(exportRoot, packageDirName);
const zipName = `ddc-rdc-site_${stamp}.zip`;

async function main() {
  console.log("1/6 — Nettoyage de l'espace d'export précédent...");
  await fs.rm(exportRoot, { recursive: true, force: true });
  await fs.mkdir(packageDir, { recursive: true });

  console.log("2/6 — Build de production (next build, mode standalone)...");
  execSync("npm run build", { stdio: "inherit", cwd: root });

  const standaloneDir = path.join(root, ".next", "standalone");
  const standaloneExists = await pathExists(standaloneDir);

  if (!standaloneExists) {
    throw new Error(
      "Le dossier .next/standalone est introuvable. Vérifiez que next.config.mjs contient bien output: 'standalone'."
    );
  }

  console.log("3/6 — Copie du bundle Node.js autonome...");
  await copyDir(standaloneDir, packageDir);

  // Le mode standalone n'inclut pas .next/static ni public/ — Next.js demande
  // de les copier manuellement à côté de server.js.
  await copyDir(path.join(root, ".next", "static"), path.join(packageDir, ".next", "static"));
  await copyDir(path.join(root, "public"), path.join(packageDir, "public"));

  console.log("4/6 — Copie du schéma SQL et de la configuration...");
  await fs.mkdir(path.join(packageDir, "db"), { recursive: true });
  await fs.copyFile(
    path.join(root, "database", "admin-schema.sql"),
    path.join(packageDir, "db", "ddc_rdc_db.sql")
  );

  await fs.mkdir(path.join(packageDir, "config"), { recursive: true });
  await fs.copyFile(path.join(root, ".env.example"), path.join(packageDir, "config", ".env.example"));

  console.log("5/6 — Génération du guide de déploiement...");
  await fs.writeFile(path.join(packageDir, "DEPLOIEMENT.md"), buildDeploymentGuide(), "utf8");

  console.log("6/6 — Compression du package final...");
  execSync(`cd "${exportRoot}" && zip -r -q "${zipName}" "${packageDirName}"`, { stdio: "inherit" });

  console.log("");
  console.log(`✅ Package prêt : export/${zipName}`);
  console.log(`   Dossier source conservé pour inspection : export/${packageDirName}/`);
}

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function copyDir(source, destination) {
  if (!(await pathExists(source))) {
    return;
  }
  await fs.mkdir(destination, { recursive: true });
  await fs.cp(source, destination, { recursive: true });
}

function buildDeploymentGuide() {
  return `# Déploiement — Site officiel DDC RDC

Guide de mise en ligne sur **Congo Cloud** (hébergement cPanel avec support
Node.js App). Ce site utilise des routes dynamiques (panneau d'administration,
formulaires, contenus servis depuis MySQL) : il nécessite un environnement
**Node.js actif en production**, pas un simple hébergement de fichiers
statiques.

## 1. Prérequis

- Accès cPanel chez Congo Cloud
- Application Node.js disponible dans cPanel (rubrique « Setup Node.js App »
  ou équivalent — vérifier la disponibilité auprès du support Congo Cloud si
  l'option n'apparaît pas)
- Accès à phpMyAdmin pour la création de la base de données

## 2. Création de la base de données MySQL

1. Dans cPanel, ouvrir **MySQL® Databases**.
2. Créer une base nommée par exemple \`ddc_rdc_db\` (le préfixe cPanel sera
   ajouté automatiquement, ex. \`utilisateur_ddc_rdc_db\`).
3. Créer un utilisateur MySQL dédié et lui attribuer **tous les privilèges**
   sur cette base.
4. Ouvrir **phpMyAdmin**, sélectionner la base créée, puis **Importer**
   le fichier \`db/ddc_rdc_db.sql\` fourni dans ce package.
5. **Important** : dans les options d'import phpMyAdmin, vérifier que
   l'encodage de la base est bien **utf8mb4** (et non latin1) — c'est
   indispensable pour préserver les accents français et les caractères
   spéciaux du contenu.

## 3. Configuration de l'environnement

1. Copier \`config/.env.example\` vers un fichier \`.env\` à la racine de
   l'application (à créer manuellement via le gestionnaire de fichiers cPanel
   ou en ligne de commande SSH si disponible).
2. Renseigner au minimum :
   - \`ADMIN_EMAIL\` et \`ADMIN_PASSWORD\` (ou \`ADMIN_PASSWORD_HASH\` pour plus
     de sécurité) — identifiants de connexion au panneau d'administration
   - \`ADMIN_SESSION_SECRET\` — une chaîne aléatoire longue et unique
   - Les variables MySQL : soit \`DATABASE_URL\`, soit le quatuor
     \`MYSQL_HOST\` / \`MYSQL_DATABASE\` / \`MYSQL_USER\` / \`MYSQL_PASSWORD\`
     (utiliser les identifiants créés à l'étape 2)
3. Ne **jamais** committer ou partager ce fichier \`.env\` rempli — il contient
   des informations sensibles.

## 4. Déploiement de l'application Node.js

1. Dans cPanel, ouvrir **Setup Node.js App** et créer une nouvelle
   application :
   - Version de Node.js : 18.x ou plus récente
   - Mode d'application : Production
   - Racine de l'application : dossier où sera uploadé le contenu de ce
     package (par exemple \`ddc-rdc-app\`)
   - Fichier de démarrage : \`server.js\`
2. Uploader l'intégralité du contenu de ce package (hors \`db/\`, \`config/\` et
   ce guide, qui ne sont pas nécessaires à l'exécution) dans la racine de
   l'application définie ci-dessus, en conservant la structure des dossiers
   (\`.next/\`, \`node_modules/\`, \`public/\`, \`server.js\`, \`package.json\`).
3. Déposer le fichier \`.env\` complété (étape 3) à la racine de cette même
   application.
4. Dans l'interface Node.js App de cPanel, définir les variables
   d'environnement si l'interface le permet (alternative ou complément au
   fichier \`.env\`), puis cliquer sur **Restart** pour démarrer l'application.

## 5. Vérifications post-déploiement

- Ouvrir le domaine dans un navigateur : la page d'accueil doit s'afficher
  avec les couleurs institutionnelles (bleu, blanc, or) et les animations au
  défilement.
- Se connecter sur \`/admin/login\` avec les identifiants définis dans
  \`.env\` et vérifier l'accès au tableau de bord.
- Créer un contenu de test depuis l'admin (par exemple une actualité) et
  confirmer son apparition côté site public — cela valide que la connexion
  MySQL fonctionne correctement de bout en bout.
- Consulter les journaux d'erreur de l'application Node.js depuis cPanel en
  cas de page blanche ou d'erreur 500.

## 6. Migration des données existantes (si applicable)

Si du contenu a déjà été saisi en local via le store JSON
(\`data/admin-store.json\`) avant la bascule vers MySQL, exécuter une fois,
en local ou via SSH sur le serveur, avec les variables MySQL de production
renseignées dans \`.env.local\` ou \`.env\` :

\`\`\`bash
npm run db:migrate:admin
\`\`\`

Ce script est idempotent : il peut être relancé sans dupliquer les données.

## 7. Mises à jour ultérieures

Pour déployer une nouvelle version du site, régénérer un package avec
\`npm run package\` depuis le poste de développement, puis répéter l'étape 4
(upload + redémarrage de l'application Node.js). La base de données et le
fichier \`.env\` de production n'ont pas besoin d'être touchés sauf
changement de schéma ou de configuration.
`;
}

main().catch((error) => {
  console.error("❌ Échec de la génération du package :", error.message);
  process.exit(1);
});
