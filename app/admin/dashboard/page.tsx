import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPage } from "@/lib/admin/page";
import { getDashboardStats } from "@/lib/admin/content-store";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const cards = [
    ["Articles", stats.articles],
    ["Réalisations", stats.realisations],
    ["Programmes", stats.programs],
    ["Documents", stats.documents],
    ["Partenaires", stats.partners],
    ["Messages", stats.messages],
    ["Messages non lus", stats.unreadMessages],
    ["Abonnés newsletter", stats.newsletterSubscribers],
    ["Brouillons", stats.draftCount]
  ];

  return (
    <AdminPage>
      <AdminPageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de la gestion de contenu, des messages reçus et des inscriptions newsletter."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value]) => (
          <article key={label} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-3 text-4xl font-black text-brand-blue dark:text-white">{value}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-900">
        Version actuelle : sauvegarde locale durable dans `data/admin-store.json`, upload local dans `public/uploads`, et préparation Supabase/Resend via variables d&apos;environnement.
      </div>
    </AdminPage>
  );
}
