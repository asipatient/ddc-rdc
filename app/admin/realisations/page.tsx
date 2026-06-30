import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { listCollection } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ q?: string; status?: string; created?: string; saved?: string; deleted?: string; error?: string }>;
};

export default async function AdminRealisationsPage({ searchParams }: Props) {
  const rows = await listCollection("realisations");
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader
        title="Réalisations"
        description="Gérer les activités, réalisations et initiatives documentées."
        actionHref="/admin/realisations/new"
        actionLabel="Ajouter une réalisation"
      />
      <AdminNotice created={params.created} saved={params.saved} deleted={params.deleted} error={params.error} />
      <AdminTable
        rows={rows}
        collection="realisations"
        editBaseHref="/admin/realisations"
        showClassificationColumns
        showReviewColumn
        canReview
        q={params.q}
        status={params.status}
        deleteConfirmMessage="Êtes-vous sûr de vouloir supprimer cette réalisation ? Cette action est irréversible."
      />
    </AdminPage>
  );
}
