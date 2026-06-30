import { createPartnerAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPage } from "@/lib/admin/page";

export default function NewPartnerPage() {
  return (
    <AdminPage>
      <AdminPageHeader title="Ajouter un partenaire" description="Ajouter un partenaire, son logo et son type de partenariat." />
      <ContentForm
        action={createPartnerAction}
        title="Informations du partenaire"
        fields={[
          { name: "name", label: "Nom", required: true },
          { name: "partnershipType", label: "Type de partenariat", required: true },
          { name: "websiteUrl", label: "Site web", type: "url" },
          { name: "description", label: "Description", type: "textarea", required: true }
        ]}
        submitLabel="Ajouter le partenaire"
      />
    </AdminPage>
  );
}
