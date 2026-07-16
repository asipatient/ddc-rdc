import type { IconKey } from "@/lib/site-data";
import { IconRenderer } from "@/components/IconRenderer";

type IconCardProps = {
  title: string;
  description: string;
  icon: IconKey;
};

export function IconCard({ title, description, icon }: IconCardProps) {
  return (
    <article className="card group h-full p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-blueSoft text-brand-blue transition-colors duration-300 group-hover:bg-brand-gold group-hover:text-white">
        <IconRenderer icon={icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-extrabold leading-snug text-brand-blue">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}
