import { createArticleAction } from "@/app/admin/actions";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPage } from "@/lib/admin/page";

export default function NewAdminArticlePage() {
  return (
    <AdminPage>
      <AdminPageHeader
        title="Nouvel article"
        description="Créer un article d'activité, choisir son statut et l'enregistrer durablement dans data/admin-store.json."
      />
      <ArticleForm action={createArticleAction} submitLabel="Créer l'article" />
    </AdminPage>
  );
}
