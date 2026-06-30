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

export default async function EditPartnerPage({ params }: Props) {
  const { id } = await params;
  const store = await readAdminStore();
  const partner = store.partners.find((item) => item.id === id);

  if (!partner) {
    notFound();
  }

  return (
    <AdminPage>
      <AdminPageHeader title="Modifier le partenaire" description="Modifier le logo, le site web, le type de partenariat et le statut." />
      <ContentForm
        action={updateItemAction.bind(null, "partners", partner.id)}
        title="Informations du partenaire"
        defaultValues={{ ...partner, image: partner.logo, websiteUrl: partner.website }}
        fields={[
          { name: "name", label: "Nom", required: true },
          { name: "partnershipType", label: "Type de partenariat", required: true },
          { name: "websiteUrl", label: "Site web", type: "url" },
          { name: "description", label: "Description", type: "textarea", required: true }
        ]}
        submitLabel="Sauvegarder les changements"
      />
    </AdminPage>
  );
}
