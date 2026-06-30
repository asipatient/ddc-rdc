import { createRealisationAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/ContentForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { axisOptions, programOptions } from "@/lib/admin/content-options";
import { AdminPage } from "@/lib/admin/page";

export default function NewRealisationPage() {
  return (
    <AdminPage>
      <AdminPageHeader title="Nouvelle réalisation" description="Créer une réalisation et l'enregistrer dans data/admin-store.json." />
      <ContentForm
        action={createRealisationAction}
        title="Informations de la réalisation"
        fields={[
          { name: "title", label: "Titre", required: true },
          { name: "slug", label: "Slug" },
          { name: "category", label: "Catégorie", required: true },
          { name: "date", label: "Date", type: "date", required: true },
          { name: "author", label: "Auteur" },
          { name: "location", label: "Lieu" },
          { name: "relatedProgram", label: "Programme lié", type: "select", options: programOptions },
          { name: "relatedAxis", label: "Axe lié", type: "select", options: axisOptions },
          { name: "needsReview", label: "À relire", type: "checkbox", defaultValue: true },
          { name: "featured", label: "Mettre en avant", type: "checkbox" },
          { name: "excerpt", label: "Résumé", type: "textarea", required: true },
          {
            name: "impact",
            label: "Impact",
            type: "textarea",
            placeholder: "Plus de 100 femmes, jeunes filles et hommes mobilisés et sensibilisés."
          },
          { name: "partners", label: "Partenaires", type: "textarea", placeholder: "Un partenaire par ligne." },
          { name: "gallery", label: "Galerie d'images", type: "textarea", placeholder: "Une image par ligne." },
          { name: "content", label: "Contenu", type: "textarea", required: true },
          { name: "images", label: "Images complémentaires", type: "textarea", placeholder: "Une image par ligne." }
        ]}
        submitLabel="Créer la réalisation"
      />
    </AdminPage>
  );
}
