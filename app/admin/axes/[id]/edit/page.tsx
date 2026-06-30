import { notFound } from "next/navigation";
import { updateItemAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { iconOptions } from "@/lib/admin/content-options";
import { readAdminStore } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditAxisPage({ params }: Props) {
  const { id } = await params;
  const store = await readAdminStore();
  const axis = store.axes.find((item) => item.id === id);

  if (!axis) {
    notFound();
  }

  return (
    <AdminPage>
      <AdminPageHeader title="Modifier l'axe" description="Modifier l'axe stratégique, ses programmes associés, son image et son statut." />
      <ContentForm
        action={updateItemAction.bind(null, "axes", axis.id)}
        title="Informations de l'axe"
        defaultValues={{ ...axis, programIds: (axis.programIds || []).join("\n") }}
        fields={[
          { name: "title", label: "Titre", required: true },
          { name: "slug", label: "Slug" },
          { name: "category", label: "Catégorie" },
          { name: "date", label: "Date", type: "date" },
          { name: "order", label: "Ordre d'affichage", type: "number" },
          { name: "icon", label: "Icône", type: "select", options: iconOptions },
          { name: "excerpt", label: "Résumé", type: "textarea", required: true },
          { name: "content", label: "Description", type: "textarea", required: true },
          { name: "programIds", label: "Programmes associés", type: "textarea", placeholder: "Un programme par ligne." }
        ]}
        submitLabel="Sauvegarder les changements"
      />
    </AdminPage>
  );
}
