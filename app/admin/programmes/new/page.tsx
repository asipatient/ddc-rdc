import { createProgramAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { axisOptions } from "@/lib/admin/content-options";
import { AdminPage } from "@/lib/admin/page";

export default function NewProgramPage() {
  return (
    <AdminPage>
      <AdminPageHeader title="Ajouter un programme" description="Créer un programme et le relier à un axe stratégique." />
      <ContentForm
        action={createProgramAction}
        title="Informations du programme"
        fields={[
          { name: "title", label: "Nom du programme", required: true },
          { name: "slug", label: "Slug" },
          { name: "axisId", label: "Axe lié", type: "select", options: axisOptions },
          { name: "category", label: "Catégorie" },
          { name: "date", label: "Date", type: "date" },
          { name: "order", label: "Ordre d'affichage", type: "number" },
          { name: "excerpt", label: "Résumé", type: "textarea", required: true },
          { name: "content", label: "Description", type: "textarea", required: true },
          { name: "objectives", label: "Objectifs", type: "textarea" },
          { name: "targetAudience", label: "Public cible", type: "textarea" },
          { name: "activities", label: "Activités principales", type: "textarea" }
        ]}
        submitLabel="Ajouter le programme"
      />
    </AdminPage>
  );
}
