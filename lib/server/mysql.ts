import "server-only";

import mysql, { type Pool, type PoolOptions } from "mysql2/promise";

declare global {
  var ddcMysqlPool: Pool | undefined;
}

export function isMysqlConfigured() {
  return Boolean(getMysqlUrl() || (getEnv("MYSQL_HOST", "DB_HOST") && getEnv("MYSQL_DATABASE", "MYSQL_DB", "DB_NAME") && getEnv("MYSQL_USER", "DB_USER")));
}

export function getMysqlPool() {
  if (!isMysqlConfigured()) {
    throw new Error("MySQL n'est pas configure. Renseignez DATABASE_URL ou MYSQL_HOST/MYSQL_DATABASE/MYSQL_USER.");
  }

  if (!globalThis.ddcMysqlPool) {
    const url = getMysqlUrl();
    globalThis.ddcMysqlPool = url ? mysql.createPool(url) : mysql.createPool(getMysqlOptions());
  }

  return globalThis.ddcMysqlPool;
}

function getMysqlUrl() {
  return getEnv("DATABASE_URL", "MYSQL_URL");
}

function getMysqlOptions(): PoolOptions {
  return {
    host: getEnv("MYSQL_HOST", "DB_HOST"),
    port: Number(getEnv("MYSQL_PORT", "DB_PORT") || 3306),
    database: getEnv("MYSQL_DATABASE", "MYSQL_DB", "DB_NAME"),
    user: getEnv("MYSQL_USER", "DB_USER"),
    password: getEnv("MYSQL_PASSWORD", "DB_PASSWORD") || "",
    waitForConnections: true,
    connectionLimit: Number(getEnv("MYSQL_CONNECTION_LIMIT") || 10),
    charset: "utf8mb4",
    timezone: "Z"
  };
}

function getEnv(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (value) {
      return value;
    }
  }

  return "";
}
