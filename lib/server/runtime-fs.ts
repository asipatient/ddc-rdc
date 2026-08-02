import "server-only";

/**
 * Vercel / Netlify (et Lambdas) exposent un FS projet en lecture seule.
 * Seul /tmp est writable, et il est éphémère — inutilisable pour un store durable
 * ou des uploads servis en statique.
 */
export function isProjectFilesystemWritable() {
  return !process.env.VERCEL && !process.env.NETLIFY && !process.env.AWS_LAMBDA_FUNCTION_NAME;
}
