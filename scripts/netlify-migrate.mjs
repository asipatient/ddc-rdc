/**
 * Migration conditionnelle exécutée pendant le build Netlify.
 * Ne fait RIEN sauf si la variable d'environnement MIGRATE_ON_BUILD=true.
 */

if (process.env.MIGRATE_ON_BUILD === "true") {
  console.log("[netlify-migrate] MIGRATE_ON_BUILD=true -> migration du contenu vers MySQL...");
  await import("./migrate-admin-json-to-mysql.mjs");
} else {
  console.log("[netlify-migrate] MIGRATE_ON_BUILD absent -> migration ignoree.");
}
