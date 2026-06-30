import { createDocumentAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPage } from "@/lib/admin/page";

export default function NewDocumentPage() {
  return (
    <AdminPage>
      <AdminPageHeader title="Ajouter un document" description="Ajouter un document PDF ou institutionnel à publier." />
      <ContentForm
        action={createDocumentAction}
        title="Informations du document"
        fields={[
          { name: "title", label: "Titre", required: true },
          { name: "slug", label: "Slug" },
          { name: "category", label: "Catégorie", required: true },
          { name: "documentType", label: "Type de document" },
          { name: "date", label: "Date", type: "date" },
          { name: "excerpt", label: "Résumé", type: "textarea", required: true },
          { name: "content", label: "Description", type: "textarea" },
          { name: "fileUrl", label: "Fichier PDF actuel ou URL" }
        ]}
        showImageUpload={false}
        showDocumentUpload
        submitLabel="Ajouter le document"
      />
    </AdminPage>
  );
}
