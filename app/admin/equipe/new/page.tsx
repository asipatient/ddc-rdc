import { createTeamMemberAction } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { AdminPage } from "@/lib/admin/page";

export default function NewTeamMemberPage() {
  return (
    <AdminPage>
      <AdminPageHeader title="Ajouter un membre" description="Créer un profil d'équipe et l'enregistrer dans data/admin-store.json." />
      <TeamMemberForm action={createTeamMemberAction} submitLabel="Ajouter le membre" />
    </AdminPage>
  );
}
