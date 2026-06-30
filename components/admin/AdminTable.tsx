import Link from "next/link";
import { CheckCircle2, Eye, Pencil } from "lucide-react";
import { markContentReviewedAction, setItemStatusAction } from "@/app/admin/actions";
import { DeleteItemForm } from "@/components/admin/DeleteItemForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { CollectionKey, ContentStatus } from "@/lib/admin/types";

type Row = {
  id: string;
  title?: string;
  name?: string;
  label?: string;
  role?: string;
  partnershipType?: string;
  documentType?: string;
  audience?: string;
  value?: string;
  note?: string;
  category?: string;
  date?: string;
  displayOrder?: number;
  order?: number;
  impact?: string;
  relatedAxis?: string;
  relatedProgram?: string;
  axisId?: string;
  programId?: string;
  status?: ContentStatus;
  needsReview?: boolean;
  updatedAt?: string;
};

export function AdminTable({
  rows,
  collection,
  editBaseHref,
  showClassificationColumns = false,
  showReviewColumn = false,
  q = "",
  status = "all",
  canReview = false,
  canChangeStatus = true,
  deleteConfirmMessage
}: {
  rows: Row[];
  collection: CollectionKey;
  editBaseHref?: string;
  showClassificationColumns?: boolean;
  showReviewColumn?: boolean;
  q?: string;
  status?: string;
  canReview?: boolean;
  canChangeStatus?: boolean;
  deleteConfirmMessage?: string;
}) {
  const filteredRows = filterRows(rows, q, status);

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <form className="grid gap-3 border-b border-slate-200 p-4 dark:border-slate-800 sm:grid-cols-[1fr_220px_auto]" method="get">
        <label className="text-sm font-bold text-brand-blue dark:text-slate-100">
          Recherche
          <input
            name="q"
            defaultValue={q}
            placeholder="Titre, nom, catégorie..."
            className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
          />
        </label>
        <label className="text-sm font-bold text-brand-blue dark:text-slate-100">
          Statut
          <select
            name="status"
            defaultValue={status}
            className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="all">Tous</option>
            <option value="published">Publié</option>
            <option value="draft">Brouillon</option>
            <option value="archived">Archivé</option>
          </select>
        </label>
        <div className="flex items-end gap-2">
          <button type="submit" className="focus-ring min-h-11 rounded-md bg-brand-blue px-4 text-sm font-bold text-white">
            Filtrer
          </button>
          <Link href="?" className="focus-ring inline-flex min-h-11 items-center rounded-md border border-slate-200 px-4 text-sm font-bold text-brand-blue dark:border-slate-700 dark:text-slate-100">
            Réinitialiser
          </Link>
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className={`w-full text-left text-sm ${showClassificationColumns ? "min-w-[1040px]" : "min-w-[760px]"}`}>
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr>
              <th className="px-5 py-4">Titre / Nom</th>
              <th className="px-5 py-4">Catégorie</th>
              <th className="px-5 py-4">Date</th>
              {showClassificationColumns ? <th className="px-5 py-4">Impact</th> : null}
              {showClassificationColumns ? <th className="px-5 py-4">Programme / Axe</th> : null}
              <th className="px-5 py-4">Statut</th>
              {showReviewColumn ? <th className="px-5 py-4">Relecture</th> : null}
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td className="px-5 py-4 font-bold text-brand-blue dark:text-white">{row.title || row.name || row.label}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{row.category || row.role || row.partnershipType || row.documentType || row.audience || row.value || "À compléter"}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{row.date || row.updatedAt || "À compléter"}</td>
                {showClassificationColumns ? (
                  <td className="max-w-[260px] px-5 py-4 text-slate-600 dark:text-slate-300">{row.impact || "À compléter"}</td>
                ) : null}
                {showClassificationColumns ? (
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    <p className="font-semibold text-brand-blue dark:text-slate-100">{row.relatedProgram || row.programId || "À compléter"}</p>
                    <p className="mt-1 text-xs">{row.relatedAxis || row.axisId || "À compléter"}</p>
                  </td>
                ) : null}
                <td className="px-5 py-4">{row.status ? <StatusBadge status={row.status} /> : "À compléter"}</td>
                {showReviewColumn ? (
                  <td className="px-5 py-4">
                    {row.needsReview ? (
                      <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                        À relire
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-500">Relu</span>
                    )}
                  </td>
                ) : null}
                <td className="px-5 py-4">
                  <div className="flex flex-wrap justify-end gap-2">
                    {editBaseHref ? (
                      <Link
                        href={`${editBaseHref}/${row.id}/edit`}
                        className="focus-ring inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-brand-blue hover:bg-brand-blueSoft dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                      >
                        <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
                        Modifier
                      </Link>
                    ) : null}
                    {canChangeStatus && row.status !== "published" ? (
                      <form action={setItemStatusAction.bind(null, collection, row.id, "published")}>
                        <button type="submit" className="focus-ring inline-flex items-center gap-1 rounded-md border border-green-200 px-3 py-2 text-xs font-bold text-green-700 hover:bg-green-50 dark:border-green-900 dark:text-green-300 dark:hover:bg-green-950">
                          <Eye aria-hidden="true" className="h-3.5 w-3.5" />
                          Publier
                        </button>
                      </form>
                    ) : null}
                    {canChangeStatus && row.status === "published" ? (
                      <form action={setItemStatusAction.bind(null, collection, row.id, "draft")}>
                        <button type="submit" className="focus-ring rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-brand-blue hover:bg-brand-blueSoft dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
                          Mettre en brouillon
                        </button>
                      </form>
                    ) : null}
                    {canReview && row.needsReview ? (
                      <form action={markContentReviewedAction.bind(null, collection, row.id)}>
                        <button type="submit" className="focus-ring inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-brand-blue hover:bg-brand-blueSoft dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
                          <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
                          Relu
                        </button>
                      </form>
                    ) : null}
                    <DeleteItemForm collection={collection} id={row.id} confirmMessage={deleteConfirmMessage} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredRows.length === 0 ? <p className="p-6 text-sm text-slate-600 dark:text-slate-300">Aucun contenu pour le moment.</p> : null}
    </div>
  );
}

function filterRows(rows: Row[], q: string, status: string) {
  const normalizedQuery = q.trim().toLowerCase();

  return rows.filter((row) => {
    const statusMatches = status === "all" || !status || row.status === status;
    const searchText = [
      row.title,
      row.name,
      row.label,
      row.role,
      row.partnershipType,
      row.documentType,
      row.audience,
      row.value,
      row.note,
      row.category,
      row.date,
      row.impact,
      row.relatedAxis,
      row.relatedProgram,
      row.axisId,
      row.programId
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return statusMatches && (!normalizedQuery || searchText.includes(normalizedQuery));
  });
}
