import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { readMysqlAdminStore, writeMysqlAdminStore } from "@/lib/admin/mysql-store";
import type { AdminStore, CollectionKey, SiteSettings } from "@/lib/admin/types";
import { isMysqlConfigured } from "@/lib/server/mysql";

const storePath = path.join(process.cwd(), "data", "admin-store.json");

export async function readAdminStore(): Promise<AdminStore> {
  if (isMysqlConfigured()) {
    return readMysqlAdminStore();
  }

  const raw = await fs.readFile(storePath, "utf8");
  const store = JSON.parse(raw) as AdminStore;
  return {
    articles: store.articles || [],
    newsPosts: store.newsPosts || [],
    realisations: store.realisations || [],
    programs: store.programs || [],
    axes: store.axes || [],
    teamMembers: store.teamMembers || [],
    documents: store.documents || [],
    testimonials: store.testimonials || [],
    partners: store.partners || [],
    impactMetrics: store.impactMetrics || [],
    messages: store.messages || [],
    newsletterSubscribers: store.newsletterSubscribers || [],
    siteSettings: store.siteSettings
  };
}

export async function writeAdminStore(store: AdminStore) {
  if (isMysqlConfigured()) {
    await writeMysqlAdminStore(store);
    return;
  }

  await fs.writeFile(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export async function listCollection<T extends CollectionKey>(collection: T): Promise<AdminStore[T]> {
  const store = await readAdminStore();
  return store[collection];
}

export async function createCollectionItem<T extends CollectionKey>(collection: T, item: AdminStore[T][number]) {
  const store = await readAdminStore();
  const items = store[collection] as AdminStore[T][number][];
  items.unshift(item);
  await writeAdminStore(store);
  revalidateAdminAndSite();
}

export async function updateCollectionItem<T extends CollectionKey>(
  collection: T,
  id: string,
  patch: Partial<AdminStore[T][number]>
) {
  const store = await readAdminStore();
  const items = store[collection] as Array<{ id: string }>;
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  items[index] = { ...items[index], ...patch } as (typeof items)[number];
  await writeAdminStore(store);
  revalidateAdminAndSite();
}

export async function deleteCollectionItem(collection: CollectionKey, id: string) {
  const store = await readAdminStore();
  const items = store[collection] as Array<{ id: string }>;
  const nextItems = items.filter((item) => item.id !== id);
  (store[collection] as Array<{ id: string }>) = nextItems;
  await writeAdminStore(store);
  revalidateAdminAndSite();
}

export async function updateSiteSettings(settings: SiteSettings) {
  const store = await readAdminStore();
  store.siteSettings = settings;
  await writeAdminStore(store);
  revalidateAdminAndSite();
}

export async function getDashboardStats() {
  const store = await readAdminStore();
  return {
    articles: store.articles.length,
    newsPosts: store.newsPosts.length,
    realisations: store.realisations.length,
    programs: store.programs.length,
    documents: store.documents.length,
    partners: store.partners.length,
    testimonials: store.testimonials.length,
    messages: store.messages.length,
    newsletterSubscribers: store.newsletterSubscribers.length,
    unreadMessages: store.messages.filter((item) => item.status === "nouveau").length,
    draftCount: [
      ...store.articles,
      ...store.newsPosts,
      ...store.realisations,
      ...store.programs,
      ...store.axes,
      ...store.documents
    ].filter((item) => item.status === "draft").length
  };
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function nowIso() {
  return new Date().toISOString();
}

function revalidateAdminAndSite() {
  revalidatePath("/");
  revalidatePath("/admin", "layout");
  revalidatePath("/actualites");
  revalidatePath("/axes-intervention");
  revalidatePath("/documents-institutionnels");
  revalidatePath("/equipe");
  revalidatePath("/impact");
  revalidatePath("/partenaires");
  revalidatePath("/programmes");
  revalidatePath("/publications");
  revalidatePath("/publications/[slug]", "page");
  revalidatePath("/realisations");
}
