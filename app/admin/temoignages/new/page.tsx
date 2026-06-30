import { createTestimonialAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPage } from "@/lib/admin/page";

export default function NewTestimonialPage() {
  return (
    <AdminPage>
      <AdminPageHeader title="Ajouter un témoignage" description="Ajouter un témoignage à publier sur le site." />
      <ContentForm
        action={createTestimonialAction}
        title="Informations du témoignage"
        fields={[
          { name: "name", label: "Nom", required: true },
          { name: "role", label: "Fonction / rôle" },
          { name: "audience", label: "Public concerné" },
          { name: "quote", label: "Témoignage", type: "textarea", required: true }
        ]}
        submitLabel="Ajouter le témoignage"
      />
    </AdminPage>
  );
}
