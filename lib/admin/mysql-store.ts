import "server-only";

import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "@/lib/server/mysql";
import type { AdminStore, CollectionKey, SiteSettings } from "@/lib/admin/types";

const contentTable = "ddc_admin_content_items";
const settingsTable = "ddc_admin_site_settings";

const collectionKeys: CollectionKey[] = [
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

type ContentRow = RowDataPacket & {
  collection_key: CollectionKey;
  data: string | Buffer | Record<string, unknown>;
};

type SettingsRow = RowDataPacket & {
  data: string | Buffer | SiteSettings;
};

export async function readMysqlAdminStore(): Promise<AdminStore> {
  await ensureMysqlSchema();

  const pool = getMysqlPool();
  const [contentRows] = await pool.execute<ContentRow[]>(`SELECT collection_key, data FROM ${contentTable}`);
  const [settingsRows] = await pool.execute<SettingsRow[]>(`SELECT data FROM ${settingsTable} WHERE id = 1 LIMIT 1`);
  const store = createEmptyStore();

  for (const row of contentRows) {
    if (!collectionKeys.includes(row.collection_key)) {
      continue;
    }

    const item = parseJson(row.data) as AdminStore[CollectionKey][number];
    (store[row.collection_key] as AdminStore[CollectionKey][number][]).push(item);
  }

  store.siteSettings = settingsRows[0]?.data ? (parseJson(settingsRows[0].data) as SiteSettings) : createEmptySiteSettings();
  return store;
}

export async function writeMysqlAdminStore(store: AdminStore) {
  await ensureMysqlSchema();

  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute(`DELETE FROM ${contentTable}`);

    for (const collection of collectionKeys) {
      const items = store[collection] as Array<{ id: string; order?: number; displayOrder?: number; updatedAt?: string; createdAt?: string }>;

      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];
        const sortOrder = Number(item.displayOrder ?? item.order ?? index);
        await connection.execute(
          `INSERT INTO ${contentTable} (collection_key, item_id, data, sort_order, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE data = VALUES(data), sort_order = VALUES(sort_order), updated_at = VALUES(updated_at)`,
          [
            collection,
            item.id,
            JSON.stringify(item),
            Number.isFinite(sortOrder) ? sortOrder : index,
            toMysqlDate(item.createdAt),
            toMysqlDate(item.updatedAt)
          ]
        );
      }
    }

    await upsertSiteSettings(connection, store.siteSettings || createEmptySiteSettings());
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function upsertSiteSettings(connection: PoolConnection, settings: SiteSettings) {
  await connection.execute(
    `INSERT INTO ${settingsTable} (id, data, updated_at)
     VALUES (1, ?, ?)
     ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = VALUES(updated_at)`,
    [JSON.stringify(settings), toMysqlDate(settings.updatedAt)]
  );
}

async function ensureMysqlSchema() {
  const pool = getMysqlPool();
  await pool.execute(`
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

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS ${settingsTable} (
      id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
      data LONGTEXT NOT NULL,
      updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  `);
}

function createEmptyStore(): AdminStore {
  return {
    articles: [],
    newsPosts: [],
    realisations: [],
    programs: [],
    axes: [],
    teamMembers: [],
    documents: [],
    testimonials: [],
    partners: [],
    impactMetrics: [],
    messages: [],
    newsletterSubscribers: [],
    siteSettings: createEmptySiteSettings()
  };
}

function createEmptySiteSettings(): SiteSettings {
  return {
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
    updatedAt: new Date(0).toISOString()
  };
}

function parseJson(value: string | Buffer | Record<string, unknown>) {
  if (Buffer.isBuffer(value)) {
    return JSON.parse(value.toString("utf8"));
  }

  if (typeof value === "string") {
    return JSON.parse(value);
  }

  return value;
}

function toMysqlDate(value?: string) {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) {
    return formatMysqlDate(new Date());
  }

  return formatMysqlDate(date);
}

function formatMysqlDate(date: Date) {
  return date.toISOString().slice(0, 23).replace("T", " ");
}
