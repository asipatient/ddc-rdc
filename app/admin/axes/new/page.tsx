import { createAxisAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { iconOptions } from "@/lib/admin/content-options";
import { AdminPage } from "@/lib/admin/page";

export default function NewAxisPage() {
  return (
    <AdminPage>
      <AdminPageHeader title="Ajouter un axe" description="Créer ou documenter un axe stratégique." />
      <ContentForm
        action={createAxisAction}
        title="Informations de l'axe"
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
        submitLabel="Ajouter l'axe"
      />
    </AdminPage>
  );
}
