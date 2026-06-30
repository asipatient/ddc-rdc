import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminTable } from "@/components/admin/AdminTable";
import { listCollection } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ q?: string; status?: string; created?: string; saved?: string; deleted?: string; error?: string }>;
};

export default async function AdminEquipePage({ searchParams }: Props) {
  const rows = [...(await listCollection("teamMembers"))].sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader
        title="Équipe"
        description="Ajouter, modifier, remplacer, publier ou supprimer les profils des membres de l'équipe."
        actionHref="/admin/equipe/new"
        actionLabel="Ajouter un membre"
      />
      <AdminNotice created={params.created} saved={params.saved} deleted={params.deleted} error={params.error} />
      <AdminTable
        rows={rows}
        collection="teamMembers"
        editBaseHref="/admin/equipe"
        q={params.q}
        status={params.status}
        deleteConfirmMessage="Êtes-vous sûr de vouloir supprimer ce membre ? Cette action est irréversible."
      />
    </AdminPage>
  );
}
