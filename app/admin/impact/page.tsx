import { updateImpactSectionAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { readAdminStore } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  searchParams?: Promise<{ q?: string; status?: string; created?: string; saved?: string; deleted?: string; error?: string }>;
};

export const dynamic = "force-dynamic";

export default async function AdminImpactPage({ searchParams }: Props) {
  const store = await readAdminStore();
  const rows = [...store.impactMetrics].sort((a, b) => (a.order || 999) - (b.order || 999));
  const settings = store.siteSettings;
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader
        title="Impact"
        description="Ajouter, modifier, publier et organiser les chiffres d'impact."
        actionHref="/admin/impact/new"
        actionLabel="Ajouter un indicateur"
      />
      <AdminNotice created={params.created} saved={params.saved} deleted={params.deleted} error={params.error} />
      <form action={updateImpactSectionAction} className="mb-6 grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-black text-brand-blue dark:text-white">Texte de la section publique</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Ces champs contrôlent le bloc “Notre impact” de l’accueil et le texte d’introduction de la page Impact.
          </p>
        </div>
        <Field name="impactTitle" label="Titre" defaultValue={settings.impactTitle || "Notre impact"} />
        <Field name="impactButtonLabel" label="Bouton" defaultValue={settings.impactButtonLabel || "Voir l’impact"} />
        <Field name="impactSubtitle" label="Sous-titre" defaultValue={settings.impactSubtitle || "Des indicateurs prêts à être consolidés et publiés."} wide />
        <Field
          name="impactText"
          label="Texte"
          defaultValue={settings.impactText || "Les valeurs provisoires sont clairement identifiées afin d’éviter toute annonce non vérifiée."}
          textarea
          wide
        />
        <Field name="impactButtonHref" label="Lien du bouton" defaultValue={settings.impactButtonHref || "/impact"} wide />
        <div className="md:col-span-2">
          <button type="submit" className="focus-ring inline-flex min-h-11 items-center rounded-md bg-brand-blue px-5 py-3 text-sm font-bold text-white hover:bg-brand-green">
            Sauvegarder le texte d’impact
          </button>
        </div>
      </form>
      <AdminTable rows={rows} collection="impactMetrics" editBaseHref="/admin/impact" q={params.q} status={params.status} />
    </AdminPage>
  );
}

function Field({
  name,
  label,
  defaultValue,
  textarea = false,
  wide = false
}: {
  name: string;
  label: string;
  defaultValue: string;
  textarea?: boolean;
  wide?: boolean;
}) {
  return (
    <label className={`block text-sm font-bold text-brand-blue dark:text-slate-100 ${wide ? "md:col-span-2" : ""}`}>
      {label}
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={4}
          className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
        />
      )}
    </label>
  );
}
