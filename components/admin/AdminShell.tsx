import Link from "next/link";
import {
  BarChart3,
  FileText,
  FolderKanban,
  Gauge,
  Handshake,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Settings,
  ShieldCheck,
  Star,
  Target,
  UserRound,
  Users
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import type { AdminSession } from "@/lib/admin/types";

const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Articles", href: "/admin/articles", icon: Newspaper },
  { label: "Actualités", href: "/admin/actualites", icon: Newspaper },
  { label: "Réalisations", href: "/admin/realisations", icon: Star },
  { label: "Programmes", href: "/admin/programmes", icon: FolderKanban },
  { label: "Axes", href: "/admin/axes", icon: Target },
  { label: "Équipe", href: "/admin/equipe", icon: Users },
  { label: "Documents", href: "/admin/documents", icon: FileText },
  { label: "Partenaires", href: "/admin/partenaires", icon: Handshake },
  { label: "Témoignages", href: "/admin/temoignages", icon: UserRound },
  { label: "Impact", href: "/admin/impact", icon: BarChart3 },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Newsletter", href: "/admin/newsletter", icon: Gauge },
  { label: "Réglages", href: "/admin/settings", icon: Settings }
];

export function AdminShell({ children, session }: { children: React.ReactNode; session: AdminSession }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <Link href="/admin/dashboard" className="focus-ring flex items-center gap-3 rounded-md">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-blue text-white">
            <ShieldCheck aria-hidden="true" className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-black text-brand-blue dark:text-white">Admin DDC RDC</span>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Gestion de contenu</span>
          </span>
        </Link>

        <nav className="mt-8 grid gap-1" aria-label="Navigation admin">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring flex items-center gap-3 rounded-md px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-brand-blueSoft hover:text-brand-blue dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-brand-gold"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green dark:text-brand-gold">Administration</p>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {session.email} · {roleLabel(session.role)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 px-4 text-sm font-bold text-brand-blue hover:bg-brand-blueSoft dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Voir le site
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-brand-blue px-4 text-sm font-bold text-white hover:bg-brand-green"
                >
                  <LogOut aria-hidden="true" className="h-4 w-4" />
                  Déconnexion
                </button>
              </form>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Navigation admin mobile">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring whitespace-nowrap rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <div className="px-5 py-8 sm:px-8">{children}</div>
      </div>
    </div>
  );
}

function roleLabel(role: AdminSession["role"]) {
  if (role === "super_admin") return "Super Admin";
  if (role === "editor") return "Éditeur";
  return "Contributeur";
}
