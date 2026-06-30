import type { ContentStatus } from "@/lib/admin/types";

export function StatusBadge({ status }: { status: ContentStatus }) {
  if (status === "archived") {
    return <span className={archivedClasses}>Archivé</span>;
  }

  return (
    <span className={status === "published" ? publishedClasses : draftClasses}>
      {status === "published" ? "Publié" : "Brouillon"}
    </span>
  );
}

const publishedClasses =
  "inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-800 dark:bg-green-900/40 dark:text-green-200";
const draftClasses =
  "inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800 dark:bg-amber-900/40 dark:text-amber-200";
const archivedClasses =
  "inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-700 dark:bg-slate-800 dark:text-slate-200";
