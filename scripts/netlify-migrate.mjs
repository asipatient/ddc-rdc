/**
 * Migration conditionnelle pendant le build (Netlify / Vercel).
 * - MIGRATE_ON_BUILD=true  → toujours migrer
 * - Vercel + DATABASE_URL  → migrer pour synchroniser admin-store.json → MySQL
 *   (sinon le CMS MySQL en prod reste figé sur d'anciennes bios / contenus)
 */

const shouldMigrate =
  process.env.MIGRATE_ON_BUILD === "true" ||
  (Boolean(process.env.VERCEL) && Boolean(process.env.DATABASE_URL || process.env.MYSQL_URL));

if (shouldMigrate) {
  console.log("[netlify-migrate] Migration admin-store.json → MySQL...");
  await import("./migrate-admin-json-to-mysql.mjs");
} else {
  console.log("[netlify-migrate] Migration ignoree (pas de MIGRATE_ON_BUILD / DATABASE_URL Vercel).");
}
