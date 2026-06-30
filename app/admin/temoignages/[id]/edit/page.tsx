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

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;
  const store = await readAdminStore();
  const testimonial = store.testimonials.find((item) => item.id === id);

  if (!testimonial) {
    notFound();
  }

  return (
    <AdminPage>
      <AdminPageHeader title="Modifier le témoignage" description="Modifier le texte, la photo et le statut du témoignage." />
      <ContentForm
        action={updateItemAction.bind(null, "testimonials", testimonial.id)}
        title="Informations du témoignage"
        defaultValues={{ ...testimonial, image: testimonial.photo }}
        fields={[
          { name: "name", label: "Nom", required: true },
          { name: "role", label: "Fonction / rôle" },
          { name: "audience", label: "Public concerné" },
          { name: "quote", label: "Témoignage", type: "textarea", required: true }
        ]}
        submitLabel="Sauvegarder les changements"
      />
    </AdminPage>
  );
}
