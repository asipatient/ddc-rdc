"use client";

import { Trash2 } from "lucide-react";
import { deleteItemAction } from "@/app/admin/actions";
import type { CollectionKey } from "@/lib/admin/types";

export function DeleteItemForm({
  collection,
  id,
  label = "Supprimer",
  confirmMessage = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
}: {
  collection: CollectionKey;
  id: string;
  label?: string;
  confirmMessage?: string;
}) {
  return (
    <form
      action={deleteItemAction.bind(null, collection, id)}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="focus-ring inline-flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950"
      >
        <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
        {label}
      </button>
    </form>
  );
}
