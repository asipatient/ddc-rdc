import { notFound } from "next/navigation";
import { updateItemAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { readAdminStore } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditDocumentPage({ params }: Props) {
  const { id } = await params;
  const store = await readAdminStore();
  const document = store.documents.find((item) => item.id === id);

  if (!document) {
    notFound();
  }

  return (
    <AdminPage>
      <AdminPageHeader title="Modifier le document" description="Modifier le titre, remplacer le fichier et gérer la publication." />
      <ContentForm
        action={updateItemAction.bind(null, "documents", document.id)}
        title="Informations du document"
        defaultValues={{ ...document }}
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
        submitLabel="Sauvegarder les changements"
      />
    </AdminPage>
  );
}
