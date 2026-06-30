import { notFound } from "next/navigation";
import {
  markArticleReviewedAction,
  setArticleStatusAction,
  updateItemAction
} from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { DeleteItemForm } from "@/components/admin/DeleteItemForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getArticleById } from "@/lib/admin-store";
import { AdminPage } from "@/lib/admin/page";

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ saved?: string; error?: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditAdminArticlePage({ params, searchParams }: Props) {
  const { id } = await params;
  const notices = searchParams ? await searchParams : {};
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <AdminPage>
      <AdminPageHeader
        title="Modifier l'article"
        description="Sauvegarder les changements, publier, remettre en brouillon, marquer comme relu ou supprimer l'article."
      />
      <AdminNotice saved={notices.saved} error={notices.error} />

      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <StatusBadge status={article.status} />
        {article.needsReview ? (
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            À relire
          </span>
        ) : (
          <span className="text-xs font-bold text-slate-500">Relu</span>
        )}
        <div className="ml-auto flex flex-wrap gap-2">
          <form action={setArticleStatusAction.bind(null, article.id, "published")}>
            <button type="submit" className="focus-ring rounded-md bg-brand-green px-4 py-2 text-xs font-bold text-white">
              Publier
            </button>
          </form>
          <form action={setArticleStatusAction.bind(null, article.id, "draft")}>
            <button type="submit" className="focus-ring rounded-md border border-slate-200 px-4 py-2 text-xs font-bold text-brand-blue dark:border-slate-700 dark:text-slate-100">
              Remettre en brouillon
            </button>
          </form>
          <form action={markArticleReviewedAction.bind(null, article.id)}>
            <button type="submit" className="focus-ring rounded-md border border-slate-200 px-4 py-2 text-xs font-bold text-brand-blue dark:border-slate-700 dark:text-slate-100">
              Marquer comme relu
            </button>
          </form>
          <DeleteItemForm
            collection="articles"
            id={article.id}
            confirmMessage="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
          />
        </div>
      </div>

      <ArticleForm action={updateItemAction.bind(null, "articles", article.id)} article={article} submitLabel="Sauvegarder les changements" />
    </AdminPage>
  );
}
