import { updateMessageStatusAction } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { readAdminStore } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";
import type { MessageStatus } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

const statuses: Array<{ label: string; value: MessageStatus }> = [
  { label: "Lu", value: "lu" },
  { label: "Traité", value: "traite" },
  { label: "Archiver", value: "archive" }
];

export default async function AdminMessagesPage() {
  const store = await readAdminStore();

  return (
    <AdminPage>
      <AdminPageHeader title="Messages reçus" description="Consulter et suivre les messages envoyés depuis les formulaires publics." />
      <div className="grid gap-4">
        {store.messages.map((message) => (
          <article key={message.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-green">{message.requestType}</p>
                <h2 className="mt-2 text-xl font-black text-brand-blue dark:text-white">{message.subject}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {message.name} · {message.email} {message.phone ? `· ${message.phone}` : ""}
                </p>
                {message.organization ? <p className="mt-1 text-sm text-slate-500">{message.organization}</p> : null}
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {message.status}
              </span>
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-300">{message.message}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <form key={status.value} action={updateMessageStatusAction.bind(null, message.id, status.value)}>
                  <button type="submit" className="focus-ring rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-brand-blue dark:border-slate-700 dark:text-slate-100">
                    {status.label}
                  </button>
                </form>
              ))}
            </div>
          </article>
        ))}
        {store.messages.length === 0 ? <EmptyState text="Aucun message reçu pour le moment." /> : null}
      </div>
    </AdminPage>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{text}</p>;
}
