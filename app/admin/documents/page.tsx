import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminTable } from "@/components/admin/AdminTable";
import { listCollection } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ q?: string; status?: string; created?: string; saved?: string; deleted?: string; error?: string }>;
};

export default async function AdminDocumentsPage({ searchParams }: Props) {
  const rows = await listCollection("documents");
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader
        title="Documents"
        description="Ajouter, modifier, remplacer, publier ou supprimer les documents institutionnels."
        actionHref="/admin/documents/new"
        actionLabel="Ajouter un document"
      />
      <AdminNotice created={params.created} saved={params.saved} deleted={params.deleted} error={params.error} />
      <AdminTable rows={rows} collection="documents" editBaseHref="/admin/documents" q={params.q} status={params.status} />
    </AdminPage>
  );
}
