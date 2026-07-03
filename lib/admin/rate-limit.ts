import "server-only";

/**
 * Limiteur de tentatives de connexion en mémoire.
 * Adapté à un déploiement Node.js monoprocessus (Congo Cloud / cPanel).
 * 5 tentatives échouées par IP, fenêtre glissante de 15 minutes.
 */

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

type AttemptRecord = {
  count: number;
  firstAttemptAt: number;
};

declare global {
  var ddcLoginAttempts: Map<string, AttemptRecord> | undefined;
}

function getStore() {
  if (!globalThis.ddcLoginAttempts) {
    globalThis.ddcLoginAttempts = new Map();
  }
  return globalThis.ddcLoginAttempts;
}

function prune(store: Map<string, AttemptRecord>, now: number) {
  store.forEach((record, key) => {
    if (now - record.firstAttemptAt > WINDOW_MS) {
      store.delete(key);
    }
  });
}

export function isLoginBlocked(ip: string) {
  const store = getStore();
  const now = Date.now();
  prune(store, now);

  const record = store.get(ip);
  return Boolean(record && record.count >= MAX_ATTEMPTS);
}

export function registerFailedLogin(ip: string) {
  const store = getStore();
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now - record.firstAttemptAt > WINDOW_MS) {
    store.set(ip, { count: 1, firstAttemptAt: now });
    return;
  }

  record.count += 1;
}

export function resetLoginAttempts(ip: string) {
  getStore().delete(ip);
}
