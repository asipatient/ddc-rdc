import { notFound } from "next/navigation";
import { updateItemAction } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { readAdminStore } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({ params }: Props) {
  const { id } = await params;
  const store = await readAdminStore();
  const member = store.teamMembers.find((item) => item.id === id);

  if (!member) {
    notFound();
  }

  return (
    <AdminPage>
      <AdminPageHeader title="Modifier le membre" description="Modifier ou remplacer le profil, la fonction, la photo et les informations du membre." />
      <TeamMemberForm action={updateItemAction.bind(null, "teamMembers", member.id)} member={member} submitLabel="Sauvegarder les changements" />
    </AdminPage>
  );
}
