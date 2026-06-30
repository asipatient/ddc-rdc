import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
};

const variants = {
  primary: "bg-brand-gold text-brand-blue hover:bg-white dark:text-brand-blue",
  secondary: "bg-brand-blue text-white hover:bg-brand-green dark:bg-brand-blue dark:text-white dark:hover:bg-brand-green",
  outline: "border border-white/70 text-white hover:bg-white hover:text-brand-blue",
  ghost: "text-brand-blue hover:bg-brand-blueSoft dark:text-slate-100 dark:hover:bg-slate-800"
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href);
  const classes = cn(
    "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-soft active:translate-y-0",
    variants[variant],
    className
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <span>{children}</span>
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );
}
