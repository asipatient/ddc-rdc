import type { AdminArticle } from "@/lib/admin/types";
import { axisOptions, programOptions } from "@/lib/admin/content-options";

type ArticleFormProps = {
  action: (formData: FormData) => Promise<void>;
  article?: AdminArticle;
  submitLabel?: string;
};

export function ArticleForm({ action, article, submitLabel = "Enregistrer l'article" }: ArticleFormProps) {
  return (
    <form action={action} encType="multipart/form-data" className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {article?.id ? <input type="hidden" name="id" value={article.id} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <TextField name="title" label="Titre" required defaultValue={article?.title} placeholder="Titre de l'article" />
        <TextField name="slug" label="Slug" defaultValue={article?.slug} placeholder="genere automatiquement si vide" />
        <TextField name="category" label="Catégorie" required defaultValue={article?.category} placeholder="Citoyenneté, Leadership..." />
        <TextField name="date" label="Date" type="date" required defaultValue={article?.date} />
        <TextField name="author" label="Auteur" defaultValue={article?.author || "DDC RDC ASBL"} />
        <TextField name="image" label="Image principale" defaultValue={article?.image} placeholder="/images/ddc/photo.jpg ou URL" />
        <FileField name="imageUpload" label="Remplacer l'image principale" accept="image/*" />
        <TextField name="location" label="Lieu" defaultValue={article?.location} placeholder="Bukavu, RDC" />
        <SelectField name="relatedProgram" label="Programme lié" defaultValue={article?.relatedProgram} options={programOptions} />
        <SelectField name="relatedAxis" label="Axe lié" defaultValue={article?.relatedAxis} options={axisOptions} />

        <div>
          <label htmlFor="status" className="text-sm font-bold text-brand-blue dark:text-slate-100">
            Statut
          </label>
          <select
            id="status"
            name="status"
            defaultValue={article?.status || "draft"}
            className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>

        <div className="grid content-end gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
          <CheckboxField name="needsReview" label="À relire" defaultChecked={article?.needsReview ?? false} />
          <CheckboxField name="featured" label="Mettre en avant" defaultChecked={article?.featured ?? false} />
        </div>

        <TextareaField
          name="excerpt"
          label="Résumé"
          required
          defaultValue={article?.excerpt}
          placeholder="Résumé court affiché sur les cartes et listes."
        />
        <TextareaField
          name="impact"
          label="Impact"
          defaultValue={article?.impact}
          placeholder="Plus de 100 femmes, jeunes filles et hommes mobilisés et sensibilisés."
        />
        <TextareaField
          name="partners"
          label="Partenaires"
          defaultValue={article?.partners}
          placeholder="Un partenaire par ligne ou séparé par point-virgule."
        />
        <TextareaField
          name="content"
          label="Contenu"
          required
          rows={12}
          defaultValue={article?.content}
          placeholder="Texte complet. Sépare les paragraphes par une ligne vide."
        />
        <TextareaField
          name="gallery"
          label="Galerie"
          defaultValue={(article?.gallery || []).join("\n")}
          placeholder="Une image par ligne."
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-brand-blue px-5 py-3 text-sm font-bold text-white hover:bg-brand-green"
        >
          {submitLabel}
        </button>
        <button
          type="reset"
          className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 px-5 py-3 text-sm font-bold text-brand-blue hover:bg-brand-blueSoft dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Réinitialiser
        </button>
      </div>
    </form>
  );
}

function TextField({
  name,
  label,
  type = "text",
  required = false,
  defaultValue,
  placeholder
}: {
  name: string;
  label: string;
  type?: "text" | "date";
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-bold text-brand-blue dark:text-slate-100">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
      />
    </div>
  );
}

function FileField({ name, label, accept }: { name: string; label: string; accept?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-bold text-brand-blue dark:text-slate-100">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
      />
    </div>
  );
}

function SelectField({
  name,
  label,
  defaultValue,
  options
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-bold text-brand-blue dark:text-slate-100">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
      >
        {options.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  name,
  label,
  required = false,
  rows = 5,
  defaultValue,
  placeholder
}: {
  name: string;
  label: string;
  required?: boolean;
  rows?: number;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div className="md:col-span-2">
      <label htmlFor={name} className="text-sm font-bold text-brand-blue dark:text-slate-100">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
      />
    </div>
  );
}

function CheckboxField({ name, label, defaultChecked }: { name: string; label: string; defaultChecked: boolean }) {
  return (
    <label className="flex items-center gap-3 text-sm font-bold text-brand-blue dark:text-slate-100">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
      />
      {label}
    </label>
  );
}
