import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type ExternalButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

const variants = {
  primary: "bg-brand-gold text-brand-blue hover:bg-white dark:text-brand-blue",
  secondary: "bg-brand-blue text-white hover:bg-brand-green dark:bg-brand-blue dark:text-white dark:hover:bg-brand-green",
  outline: "border border-white/70 text-white hover:bg-white hover:text-brand-blue"
};

export function ExternalButton({ href, children, variant = "primary", className }: ExternalButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition",
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      <ExternalLink aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}
