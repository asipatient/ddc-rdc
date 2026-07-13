import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "section-heading max-w-3xl",
        align === "center" && "section-heading--center mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <span aria-hidden="true" className="section-heading-ghost">
          {eyebrow}
        </span>
      ) : null}
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-black leading-tight text-brand-blue sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-slate-600">{description}</p> : null}
    </div>
  );
}
