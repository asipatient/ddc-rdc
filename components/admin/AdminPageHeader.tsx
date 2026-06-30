import Link from "next/link";
import { Plus } from "lucide-react";

export function AdminPageHeader({
  title,
  description,
  actionHref,
  actionLabel
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-black text-brand-blue dark:text-white">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-gold px-4 py-2 text-sm font-bold text-brand-blue hover:bg-white"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
