import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { listCollection } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ q?: string; status?: string; created?: string; saved?: string; deleted?: string; error?: string }>;
};

export default async function AdminActualitesPage({ searchParams }: Props) {
  const rows = await listCollection("newsPosts");
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader
        title="Actualités"
        description="Gérer les actualités institutionnelles publiées sur le site."
        actionHref="/admin/actualites/new"
        actionLabel="Ajouter une actualité"
      />
      <AdminNotice created={params.created} saved={params.saved} deleted={params.deleted} error={params.error} />
      <AdminTable
        rows={rows}
        collection="newsPosts"
        editBaseHref="/admin/actualites"
        showClassificationColumns
        showReviewColumn
        canReview
        q={params.q}
        status={params.status}
        deleteConfirmMessage="Êtes-vous sûr de vouloir supprimer cette actualité ? Cette action est irréversible."
      />
    </AdminPage>
  );
}
