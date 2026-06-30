import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { listCollection } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  searchParams?: Promise<{ q?: string; status?: string; created?: string; saved?: string; deleted?: string; error?: string }>;
};

export const dynamic = "force-dynamic";

export default async function AdminTemoignagesPage({ searchParams }: Props) {
  const rows = await listCollection("testimonials");
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader
        title="Témoignages"
        description="Ajouter, modifier, publier ou supprimer les témoignages du site."
        actionHref="/admin/temoignages/new"
        actionLabel="Ajouter un témoignage"
      />
      <AdminNotice created={params.created} saved={params.saved} deleted={params.deleted} error={params.error} />
      <AdminTable rows={rows} collection="testimonials" editBaseHref="/admin/temoignages" q={params.q} status={params.status} />
    </AdminPage>
  );
}
