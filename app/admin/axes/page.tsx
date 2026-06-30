import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminTable } from "@/components/admin/AdminTable";
import { listCollection } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ q?: string; status?: string; created?: string; saved?: string; deleted?: string; error?: string }>;
};

export default async function AdminAxesPage({ searchParams }: Props) {
  const rows = [...(await listCollection("axes"))].sort((a, b) => (a.order || 999) - (b.order || 999));
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader
        title="Axes d'intervention"
        description="Modifier les axes stratégiques, leur ordre, leur image et les programmes associés."
        actionHref="/admin/axes/new"
        actionLabel="Ajouter un axe"
      />
      <AdminNotice created={params.created} saved={params.saved} deleted={params.deleted} error={params.error} />
      <AdminTable rows={rows} collection="axes" editBaseHref="/admin/axes" q={params.q} status={params.status} />
    </AdminPage>
  );
}
