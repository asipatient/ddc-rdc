import { notFound } from "next/navigation";
import { updateItemAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { iconOptions, impactVerificationOptions } from "@/lib/admin/content-options";
import { readAdminStore } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditImpactMetricPage({ params }: Props) {
  const { id } = await params;
  const store = await readAdminStore();
  const metric = store.impactMetrics.find((item) => item.id === id);

  if (!metric) {
    notFound();
  }

  return (
    <AdminPage>
      <AdminPageHeader title="Modifier l'indicateur" description="Modifier le libellé, le chiffre, l'icône, l'ordre et le statut." />
      <ContentForm
        action={updateItemAction.bind(null, "impactMetrics", metric.id)}
        title="Informations de l'indicateur"
        defaultValues={{ ...metric, description: metric.description || metric.note }}
        fields={[
          { name: "label", label: "Libellé", required: true },
          { name: "value", label: "Chiffre", required: true },
          { name: "verificationStatus", label: "Statut de vérification", type: "select", options: impactVerificationOptions },
          { name: "icon", label: "Icône", type: "select", options: iconOptions },
          { name: "order", label: "Ordre", type: "number" },
          { name: "isVisible", label: "Afficher sur le site", type: "checkbox" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "internalNotes", label: "Notes internes", type: "textarea" },
          { name: "source", label: "Source" },
          { name: "internalComment", label: "Commentaire interne", type: "textarea" }
        ]}
        showImageUpload={false}
        submitLabel="Sauvegarder les changements"
      />
    </AdminPage>
  );
}
