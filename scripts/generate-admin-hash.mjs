#!/usr/bin/env node
/**
 * Génère les secrets de production pour l'espace admin DDC RDC.
 *
 * Usage :
 *   node scripts/generate-admin-hash.mjs "MonMotDePasseTresLong"
 *
 * Sortie : les valeurs ADMIN_PASSWORD_HASH et ADMIN_SESSION_SECRET
 * à copier dans les variables d'environnement de Congo Cloud (cPanel).
 */

import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error('Usage : node scripts/generate-admin-hash.mjs "VotreMotDePasse"');
  process.exit(1);
}

if (password.length < 12) {
  console.error("Le mot de passe doit contenir au moins 12 caractères (20+ recommandé).");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log("\nCopiez ces valeurs dans vos variables d'environnement de production :\n");
console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString("hex")}:${hash.toString("hex")}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(48).toString("base64url")}`);
console.log("\nNe définissez PAS ADMIN_PASSWORD en production : le hash suffit.\n");
