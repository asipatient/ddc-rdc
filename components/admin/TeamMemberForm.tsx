import type { TeamMember } from "@/lib/admin/types";

type TeamMemberFormProps = {
  action: (formData: FormData) => Promise<void>;
  member?: TeamMember;
  submitLabel?: string;
};

export function TeamMemberForm({ action, member, submitLabel = "Enregistrer le membre" }: TeamMemberFormProps) {
  return (
    <form action={action} encType="multipart/form-data" className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {member?.id ? <input type="hidden" name="id" value={member.id} /> : null}
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="name" label="Nom complet" required defaultValue={member?.name} />
        <Field name="role" label="Fonction" required defaultValue={member?.role} />
        <Field name="institutionalRole" label="Rôle institutionnel" defaultValue={member?.institutionalRole} />
        <Field name="displayOrder" label="Ordre d'affichage" type="number" defaultValue={String(member?.displayOrder ?? "")} />
        <Field name="photo" label="Photo actuelle ou URL" defaultValue={member?.photo} placeholder="/images/team/photo.jpg" />
        <FileField name="imageUpload" label="Changer la photo" />
        <Field name="email" label="Email facultatif" type="email" defaultValue={member?.email} />
        <Field name="phone" label="Téléphone facultatif" defaultValue={member?.phone} />
        <Field name="facebookUrl" label="Lien Facebook facultatif" type="url" defaultValue={member?.facebookUrl} />
        <Field name="linkedinUrl" label="Lien LinkedIn facultatif" type="url" defaultValue={member?.linkedinUrl} />
        <Textarea name="shortBiography" label="Courte biographie" defaultValue={member?.shortBiography || member?.biography} />
        <Textarea name="biography" label="Biographie" defaultValue={member?.biography} />
        <Textarea name="fullBiography" label="Biographie complète" defaultValue={member?.fullBiography} />
        <div>
          <label htmlFor="status" className="text-sm font-bold text-brand-blue dark:text-slate-100">
            Statut
          </label>
          <select
            id="status"
            name="status"
            defaultValue={member?.status || "draft"}
            className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </div>
        <label className="flex items-center gap-3 self-end rounded-lg border border-slate-200 p-4 text-sm font-bold text-brand-blue dark:border-slate-800 dark:text-slate-100">
          <input
            type="checkbox"
            name="showOnHome"
            defaultChecked={member?.showOnHome ?? true}
            className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
          />
          Afficher sur la page d&apos;accueil
        </label>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-brand-blue px-5 py-3 text-sm font-bold text-white hover:bg-brand-green">
          {submitLabel}
        </button>
        <button type="reset" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 px-5 py-3 text-sm font-bold text-brand-blue hover:bg-brand-blueSoft dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
          Réinitialiser
        </button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
  placeholder
}: {
  name: string;
  label: string;
  type?: "text" | "email" | "url" | "number";
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

function FileField({ name, label }: { name: string; label: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-bold text-brand-blue dark:text-slate-100">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
      />
    </div>
  );
}

function Textarea({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string }) {
  return (
    <div className="md:col-span-2">
      <label htmlFor={name} className="text-sm font-bold text-brand-blue dark:text-slate-100">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={5}
        defaultValue={defaultValue}
        className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
      />
    </div>
  );
}
