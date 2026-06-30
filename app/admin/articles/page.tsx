import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { listArticles } from "@/lib/admin-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  searchParams?: Promise<{ q?: string; status?: string; created?: string; saved?: string; deleted?: string; error?: string }>;
};

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage({ searchParams }: Props) {
  const articles = await listArticles();
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader
        title="Articles"
        description="Créer, modifier, publier, archiver et relire les articles d'activités de la DDC RDC ASBL."
        actionHref="/admin/articles/new"
        actionLabel="Ajouter un article"
      />
      <AdminNotice created={params.created} saved={params.saved} deleted={params.deleted} error={params.error} />
      <AdminTable
        rows={articles}
        collection="articles"
        editBaseHref="/admin/articles"
        showClassificationColumns
        showReviewColumn
        canReview
        q={params.q}
        status={params.status}
        deleteConfirmMessage="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
      />
    </AdminPage>
  );
}
