import { notFound } from "next/navigation";
import { markContentReviewedAction, setItemStatusAction, updateItemAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteItemForm } from "@/components/admin/DeleteItemForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { axisOptions, programOptions } from "@/lib/admin/content-options";
import { readAdminStore } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ saved?: string; error?: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditActualitePage({ params, searchParams }: Props) {
  const { id } = await params;
  const notices = searchParams ? await searchParams : {};
  const store = await readAdminStore();
  const actualite = store.newsPosts.find((item) => item.id === id);

  if (!actualite) {
    notFound();
  }

  return (
    <AdminPage>
      <AdminPageHeader title="Modifier l'actualité" description="Mettre à jour l'actualité et sauvegarder les changements dans data/admin-store.json." />
      <AdminNotice saved={notices.saved} error={notices.error} />
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <StatusBadge status={actualite.status} />
        {actualite.needsReview ? (
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            À relire
          </span>
        ) : (
          <span className="text-xs font-bold text-slate-500">Relu</span>
        )}
        <div className="ml-auto flex flex-wrap gap-2">
          <form action={setItemStatusAction.bind(null, "newsPosts", actualite.id, "published")}>
            <button type="submit" className="focus-ring rounded-md bg-brand-green px-4 py-2 text-xs font-bold text-white">
              Publier
            </button>
          </form>
          <form action={setItemStatusAction.bind(null, "newsPosts", actualite.id, "draft")}>
            <button type="submit" className="focus-ring rounded-md border border-slate-200 px-4 py-2 text-xs font-bold text-brand-blue dark:border-slate-700 dark:text-slate-100">
              Mettre en brouillon
            </button>
          </form>
          <form action={markContentReviewedAction.bind(null, "newsPosts", actualite.id)}>
            <button type="submit" className="focus-ring rounded-md border border-slate-200 px-4 py-2 text-xs font-bold text-brand-blue dark:border-slate-700 dark:text-slate-100">
              Marquer comme relu
            </button>
          </form>
          <DeleteItemForm collection="newsPosts" id={actualite.id} confirmMessage="Êtes-vous sûr de vouloir supprimer cette actualité ? Cette action est irréversible." />
        </div>
      </div>
      <ContentForm
        action={updateItemAction.bind(null, "newsPosts", actualite.id)}
        title="Informations de l'actualité"
        defaultValues={{ ...actualite, gallery: (actualite.gallery || []).join("\n") }}
        fields={[
          { name: "title", label: "Titre", required: true },
          { name: "slug", label: "Slug" },
          { name: "category", label: "Catégorie", required: true },
          { name: "date", label: "Date", type: "date", required: true },
          { name: "author", label: "Auteur" },
          { name: "location", label: "Lieu" },
          { name: "relatedProgram", label: "Programme lié", type: "select", options: programOptions },
          { name: "relatedAxis", label: "Axe lié", type: "select", options: axisOptions },
          { name: "needsReview", label: "À relire", type: "checkbox" },
          { name: "featured", label: "Mettre en avant", type: "checkbox" },
          { name: "excerpt", label: "Résumé", type: "textarea", required: true },
          {
            name: "impact",
            label: "Impact",
            type: "textarea",
            placeholder: "Plus de 100 femmes, jeunes filles et hommes mobilisés et sensibilisés."
          },
          { name: "partners", label: "Partenaires", type: "textarea", placeholder: "Un partenaire par ligne." },
          { name: "gallery", label: "Galerie d'images", type: "textarea", placeholder: "Une image par ligne." },
          { name: "content", label: "Contenu", type: "textarea", required: true }
        ]}
        submitLabel="Sauvegarder les changements"
      />
    </AdminPage>
  );
}
