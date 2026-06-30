import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminTable } from "@/components/admin/AdminTable";
import { listCollection } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ q?: string; status?: string; created?: string; saved?: string; deleted?: string; error?: string }>;
};

export default async function AdminProgrammesPage({ searchParams }: Props) {
  const rows = [...(await listCollection("programs"))].sort((a, b) => (a.order || 999) - (b.order || 999));
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader
        title="Programmes"
        description="Ajouter, modifier, publier ou dépublier les programmes structurants de la DDC RDC."
        actionHref="/admin/programmes/new"
        actionLabel="Ajouter un programme"
      />
      <AdminNotice created={params.created} saved={params.saved} deleted={params.deleted} error={params.error} />
      <AdminTable rows={rows} collection="programs" editBaseHref="/admin/programmes" q={params.q} status={params.status} />
    </AdminPage>
  );
}
