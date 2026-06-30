import { createImpactMetricAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { iconOptions, impactVerificationOptions } from "@/lib/admin/content-options";
import { AdminPage } from "@/lib/admin/page";

export default function NewImpactMetricPage() {
  return (
    <AdminPage>
      <AdminPageHeader title="Ajouter un indicateur" description="Créer un chiffre d'impact visible sur le site." />
      <ContentForm
        action={createImpactMetricAction}
        title="Informations de l'indicateur"
        fields={[
          { name: "label", label: "Libellé", required: true },
          { name: "value", label: "Chiffre", required: true },
          { name: "verificationStatus", label: "Statut de vérification", type: "select", options: impactVerificationOptions, defaultValue: "provisional" },
          { name: "icon", label: "Icône", type: "select", options: iconOptions },
          { name: "order", label: "Ordre", type: "number" },
          { name: "isVisible", label: "Afficher sur le site", type: "checkbox", defaultValue: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "internalNotes", label: "Notes internes", type: "textarea", defaultValue: "Donnée à consolider avec les rapports d’activités, listes de présence, photos, comptes rendus ou documents administratifs." },
          { name: "source", label: "Source", defaultValue: "Archives internes DDC RDC." },
          { name: "internalComment", label: "Commentaire interne", type: "textarea", defaultValue: "Ne pas utiliser dans les supports officiels avant validation." }
        ]}
        showImageUpload={false}
        submitLabel="Ajouter l'indicateur"
      />
    </AdminPage>
  );
}
