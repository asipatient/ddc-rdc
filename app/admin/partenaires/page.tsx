import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { listCollection } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  searchParams?: Promise<{ q?: string; status?: string; created?: string; saved?: string; deleted?: string; error?: string }>;
};

export const dynamic = "force-dynamic";

export default async function AdminPartenairesPage({ searchParams }: Props) {
  const rows = await listCollection("partners");
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader
        title="Partenaires"
        description="Ajouter, modifier, publier ou supprimer les partenaires et catégories de partenariat."
        actionHref="/admin/partenaires/new"
        actionLabel="Ajouter un partenaire"
      />
      <AdminNotice created={params.created} saved={params.saved} deleted={params.deleted} error={params.error} />
      <AdminTable rows={rows} collection="partners" editBaseHref="/admin/partenaires" q={params.q} status={params.status} />
    </AdminPage>
  );
}
