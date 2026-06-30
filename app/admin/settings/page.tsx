import { updateSettingsAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { readAdminStore } from "@/lib/admin/content-store";
import { AdminPage } from "@/lib/admin/page";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ saved?: string; error?: string }>;
};

export default async function AdminSettingsPage({ searchParams }: Props) {
  const { siteSettings } = await readAdminStore();
  const params = searchParams ? await searchParams : {};

  return (
    <AdminPage>
      <AdminPageHeader title="Réglages du site" description="Modifier l'identité du site, les contacts officiels, le lien PayPal, le logo, le favicon, le footer et les réseaux sociaux." />
      <AdminNotice saved={params.saved} error={params.error} />
      <form action={updateSettingsAction} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
        <Field name="siteName" label="Nom du site" defaultValue={siteSettings.siteName} />
        <Field name="email" label="Email officiel" defaultValue={siteSettings.email} />
        <Field name="phone" label="Téléphone" defaultValue={siteSettings.phone} />
        <Field name="address" label="Adresse" defaultValue={siteSettings.address} wide />
        <Field name="paypalUrl" label="Lien PayPal" defaultValue={siteSettings.paypalUrl} wide />
        <Field name="logo" label="Logo" defaultValue={siteSettings.logo} wide />
        <Field name="favicon" label="Favicon" defaultValue={siteSettings.favicon} wide />
        <Field name="slogan" label="Slogan" defaultValue={siteSettings.slogan} wide />
        <Textarea name="shortDescription" label="Description courte" defaultValue={siteSettings.shortDescription} />
        <Textarea name="footerText" label="Texte du footer" defaultValue={siteSettings.footerText} />
        <Textarea
          name="socialLinks"
          label="Réseaux sociaux"
          defaultValue={siteSettings.socialLinks.map((item) => `${item.label}|${item.href}`).join("\n")}
          placeholder="Facebook|https://..."
        />
        <div className="md:col-span-2">
          <button type="submit" className="focus-ring min-h-11 rounded-md bg-brand-blue px-5 text-sm font-bold text-white">
            Sauvegarder les réglages
          </button>
        </div>
      </form>
    </AdminPage>
  );
}

function Field({ name, label, defaultValue, wide = false }: { name: string; label: string; defaultValue?: string; wide?: boolean }) {
  return (
    <label className={`block text-sm font-bold text-brand-blue dark:text-slate-100 ${wide ? "md:col-span-2" : ""}`}>
      {label}
      <input
        name={name}
        defaultValue={defaultValue}
        className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4 dark:border-slate-700 dark:bg-slate-950"
      />
    </label>
  );
}

function Textarea({ name, label, defaultValue, placeholder }: { name: string; label: string; defaultValue?: string; placeholder?: string }) {
  return (
    <label className="block text-sm font-bold text-brand-blue dark:text-slate-100 md:col-span-2">
      {label}
      <textarea
        name={name}
        rows={5}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
      />
    </label>
  );
}
