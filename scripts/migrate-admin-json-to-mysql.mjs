import { promises as fs } from "fs";
import path from "path";
import mysql from "mysql2/promise";

const root = process.cwd();
await loadEnvFile(path.join(root, ".env.local"));

const contentTable = "ddc_admin_content_items";
const settingsTable = "ddc_admin_site_settings";
const collectionKeys = [
  "articles",
  "newsPosts",
  "realisations",
  "programs",
  "axes",
  "teamMembers",
  "documents",
  "testimonials",
  "partners",
  "impactMetrics",
  "messages",
  "newsletterSubscribers"
];

const storePath = path.join(root, "data", "admin-store.json");
const rawStore = await fs.readFile(storePath, "utf8");
const store = JSON.parse(rawStore);
const pool = createPool();
const connection = await pool.getConnection();

try {
  await ensureSchema(connection);
  await connection.beginTransaction();
  await connection.execute(`DELETE FROM ${contentTable}`);

  let inserted = 0;

  for (const collection of collectionKeys) {
    const items = Array.isArray(store[collection]) ? store[collection] : [];

    for (const [index, item] of items.entries()) {
      const sortOrder = Number(item.displayOrder ?? item.order ?? index);
      await connection.execute(
        `INSERT INTO ${contentTable} (collection_key, item_id, data, sort_order, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE data = VALUES(data), sort_order = VALUES(sort_order), updated_at = VALUES(updated_at)`,
        [
          collection,
          String(item.id),
          JSON.stringify(item),
          Number.isFinite(sortOrder) ? sortOrder : index,
          toMysqlDate(item.createdAt),
          toMysqlDate(item.updatedAt)
        ]
      );
      inserted += 1;
    }
  }

  const settings = store.siteSettings || {
    siteName: "",
    email: "",
    phone: "",
    address: "",
    paypalUrl: "",
    slogan: "",
    shortDescription: "",
    logo: "",
    favicon: "",
    footerText: "",
    socialLinks: [],
    updatedAt: new Date().toISOString()
  };

  await connection.execute(
    `INSERT INTO ${settingsTable} (id, data, updated_at)
     VALUES (1, ?, ?)
     ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = VALUES(updated_at)`,
    [JSON.stringify(settings), toMysqlDate(settings.updatedAt)]
  );

  await connection.commit();
  console.log(`Migration terminee: ${inserted} contenus et les reglages du site ont ete envoyes vers MySQL.`);
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  connection.release();
  await pool.end();
}

function createPool() {
  const url = getEnv("DATABASE_URL", "MYSQL_URL");

  if (url) {
    return mysql.createPool({ uri: url, ...sslOption() });
  }

  const host = getEnv("MYSQL_HOST", "DB_HOST");
  const database = getEnv("MYSQL_DATABASE", "MYSQL_DB", "DB_NAME");
  const user = getEnv("MYSQL_USER", "DB_USER");

  if (!host || !database || !user) {
    throw new Error("Configuration MySQL manquante. Renseignez DATABASE_URL ou MYSQL_HOST/MYSQL_DATABASE/MYSQL_USER.");
  }

  return mysql.createPool({
    host,
    port: Number(getEnv("MYSQL_PORT", "DB_PORT") || 3306),
    database,
    user,
    password: getEnv("MYSQL_PASSWORD", "DB_PASSWORD") || "",
    waitForConnections: true,
    connectionLimit: Number(getEnv("MYSQL_CONNECTION_LIMIT") || 10),
    charset: "utf8mb4",
    timezone: "Z",
    ...sslOption(),
    ...sslOption(),
    ...sslOption()
  });
}

async function ensureSchema(connection) {
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS ${contentTable} (
      collection_key VARCHAR(64) NOT NULL,
      item_id VARCHAR(191) NOT NULL,
      data LONGTEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
      PRIMARY KEY (collection_key, item_id),
      INDEX idx_ddc_admin_content_collection_order (collection_key, sort_order),
      INDEX idx_ddc_admin_content_collection_updated (collection_key, updated_at)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS ${settingsTable} (
      id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
      data LONGTEXT NOT NULL,
      updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);
}

async function loadEnvFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        continue;
      }

      const [key, ...rest] = trimmed.split("=");
      if (!process.env[key]) {
        process.env[key] = rest.join("=").replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    return undefined;
  }
}

function getEnv(...keys) {
  for (const key of keys) {
    if (process.env[key]) {
      return process.env[key];
    }
  }

  return "";
}

function toMysqlDate(value) {
  const date = value ? new Date(value) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  return safeDate.toISOString().slice(0, 23).replace("T", " ");
}

function sslOption() {
  const mode = process.env.MYSQL_SSL;

  if (mode !== "true" && mode !== "no-verify") {
    return {};
  }

  return { ssl: { minVersion: "TLSv1.2", rejectUnauthorized: mode === "true" } };
}

function sslOption() {
  const mode = process.env.MYSQL_SSL;

  if (mode !== "true" && mode !== "no-verify") {
    return {};
  }

  return { ssl: { minVersion: "TLSv1.2", rejectUnauthorized: mode === "true" } };
}

function sslOption() {
  const mode = process.env.MYSQL_SSL;

  if (mode !== "true" && mode !== "no-verify") {
    return {};
  }

  return { ssl: { minVersion: "TLSv1.2", rejectUnauthorized: mode === "true" } };
}
