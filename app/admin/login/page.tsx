import type { Metadata } from "next";
import { loginAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Connexion Admin"
};

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <form action={loginAction} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-green">Administration</p>
        <h1 className="mt-3 text-3xl font-black text-brand-blue">Connexion Admin DDC RDC</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Accès réservé aux personnes autorisées à gérer les contenus, messages, documents et paramètres du site.
        </p>
        <div className="mt-6 grid gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-bold text-brand-blue">
              Email
            </label>
            <input id="email" name="email" type="email" required className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-brand-blue">
              Mot de passe
            </label>
            <input id="password" name="password" type="password" required className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4" />
          </div>
        </div>
        {params?.error === "blocked" ? (
          <p className="mt-4 rounded-md bg-red-50 p-4 text-sm font-semibold text-red-700">
            Trop de tentatives échouées. Réessayez dans 15 minutes.
          </p>
        ) : params?.error ? (
          <p className="mt-4 rounded-md bg-red-50 p-4 text-sm font-semibold text-red-700">
            Identifiants incorrects ou compte non configuré.
          </p>
        ) : null}
        <button
          type="submit"
          className="focus-ring mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-brand-blue px-5 py-3 text-sm font-bold text-white hover:bg-brand-green"
        >
          Se connecter
        </button>
        <p className="mt-4 text-xs leading-6 text-slate-500">
          Les identifiants se configurent dans les variables d&apos;environnement `ADMIN_EMAIL`, `ADMIN_PASSWORD` et `ADMIN_SESSION_SECRET`.
        </p>
      </form>
    </main>
  );
}
