import { cn } from"@/lib/utils";

type SectionHeadingProps = {
 eyebrow?: string;
 title: string;
 description?: string;
 align?:"left" |"center";
 className?: string;
};

export function SectionHeading({ eyebrow, title, description, align ="left", className }: SectionHeadingProps) {
 return (
 <div className={cn("max-w-3xl", align ==="center" &&"mx-auto text-center", className)}>
 {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
 <h2 className="mt-3 text-3xl font-bold leading-tight text-brand-blue dark:text-foreground sm:text-4xl">{title}</h2>
 {description ? <p className="mt-4 text-base leading-8 text-foreground-muted">{description}</p> : null}
 </div>
 );
}
