import { updateSubscriberStatusAction } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { readAdminStore } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const store = await readAdminStore();

  return (
    <AdminPage>
      <AdminPageHeader title="Newsletter" description="Consulter les inscriptions à la newsletter et désactiver un abonné si nécessaire." />
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-950">
            <tr>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Nom</th>
              <th className="px-5 py-4">Source</th>
              <th className="px-5 py-4">Statut</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {store.newsletterSubscribers.map((subscriber) => (
              <tr key={subscriber.id}>
                <td className="px-5 py-4 font-bold text-brand-blue dark:text-white">{subscriber.email}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{subscriber.name || "À compléter"}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{subscriber.source}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{subscriber.status}</td>
                <td className="px-5 py-4 text-right">
                  <form action={updateSubscriberStatusAction.bind(null, subscriber.id, subscriber.status === "active" ? "inactive" : "active")}>
                    <button type="submit" className="focus-ring rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-brand-blue dark:border-slate-700 dark:text-slate-100">
                      {subscriber.status === "active" ? "Désactiver" : "Réactiver"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {store.newsletterSubscribers.length === 0 ? <p className="p-6 text-sm text-slate-600 dark:text-slate-300">Aucun abonné pour le moment.</p> : null}
      </div>
    </AdminPage>
  );
}
