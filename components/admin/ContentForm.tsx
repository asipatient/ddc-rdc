import type { ContentStatus } from "@/lib/admin/types";

type Field = {
  name: string;
  label: string;
  type?: "text" | "date" | "textarea" | "select" | "url" | "number" | "checkbox";
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
  defaultValue?: string | number | boolean;
};

export function ContentForm({
  action,
  title,
  fields,
  defaultStatus = "draft",
  defaultValues,
  submitLabel = "Enregistrer",
  showImageUpload = true,
  showDocumentUpload = false
}: {
  action: (formData: FormData) => Promise<void>;
  title: string;
  fields: Field[];
  defaultStatus?: ContentStatus;
  defaultValues?: Record<string, string | number | boolean | undefined>;
  submitLabel?: string;
  showImageUpload?: boolean;
  showDocumentUpload?: boolean;
}) {
  return (
    <form action={action} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-black text-brand-blue dark:text-white">{title}</h2>
      {defaultValues?.id ? <input type="hidden" name="id" value={String(defaultValues.id)} /> : null}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <FieldControl key={field.name} field={{ ...field, defaultValue: field.defaultValue ?? defaultValues?.[field.name] }} />
        ))}
        <div>
          <label htmlFor="status" className="text-sm font-bold text-brand-blue dark:text-slate-100">
            Statut
          </label>
          <select
            id="status"
            name="status"
            defaultValue={String(defaultValues?.status || defaultStatus)}
            className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
        {showImageUpload ? (
          <div>
            <label htmlFor="image" className="text-sm font-bold text-brand-blue dark:text-slate-100">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="text"
              defaultValue={defaultValues?.image ? String(defaultValues.image) : undefined}
              placeholder="/images/ddc/photo.jpg ou URL"
              className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
            />
            <input
              id="imageUpload"
              name="imageUpload"
              type="file"
              accept="image/*"
              className="focus-ring mt-3 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
            />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Upload local actif. Supabase Storage pourra prendre le relais avec les variables d&apos;environnement.
            </p>
          </div>
        ) : null}
        {showDocumentUpload ? (
          <div>
            <label htmlFor="fileUpload" className="text-sm font-bold text-brand-blue dark:text-slate-100">
              Fichier PDF / document
            </label>
            <input
              id="fileUpload"
              name="fileUpload"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
            />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Les fichiers sont sauvegardés dans public/uploads/documents en mode local.
            </p>
          </div>
        ) : null}
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

function FieldControl({ field }: { field: Field }) {
  const baseClasses =
    "focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950";
  const defaultValue = typeof field.defaultValue === "boolean" ? String(field.defaultValue) : field.defaultValue;

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 self-end rounded-lg border border-slate-200 p-4 text-sm font-bold text-brand-blue dark:border-slate-800 dark:text-slate-100">
        <input
          type="checkbox"
          name={field.name}
          defaultChecked={field.defaultValue === true || field.defaultValue === "true"}
          className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
        />
        {field.label}
      </label>
    );
  }

  return (
    <div className={field.type === "textarea" ? "md:col-span-2" : undefined}>
      <label htmlFor={field.name} className="text-sm font-bold text-brand-blue dark:text-slate-100">
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={field.name}
          name={field.name}
          rows={8}
          required={field.required}
          placeholder={field.placeholder}
          defaultValue={defaultValue}
          className={`${baseClasses} py-3`}
        />
      ) : field.type === "select" ? (
        <select
          id={field.name}
          name={field.name}
          required={field.required}
          defaultValue={defaultValue}
          className={`${baseClasses} min-h-11`}
        >
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.name}
          name={field.name}
          type={field.type || "text"}
          required={field.required}
          placeholder={field.placeholder}
          defaultValue={defaultValue}
          className={`${baseClasses} min-h-11`}
        />
      )}
    </div>
  );
}
