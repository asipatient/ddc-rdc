import { notFound } from "next/navigation";
import { updateItemAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { axisOptions } from "@/lib/admin/content-options";
import { readAdminStore } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditProgramPage({ params }: Props) {
  const { id } = await params;
  const store = await readAdminStore();
  const program = store.programs.find((item) => item.id === id);

  if (!program) {
    notFound();
  }

  return (
    <AdminPage>
      <AdminPageHeader title="Modifier le programme" description="Mettre à jour le programme, son image, son axe et son statut." />
      <ContentForm
        action={updateItemAction.bind(null, "programs", program.id)}
        title="Informations du programme"
        defaultValues={{ ...program }}
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
        submitLabel="Sauvegarder les changements"
      />
    </AdminPage>
  );
}
