import { IconRenderer } from "@/components/IconRenderer";
import type { Program } from "@/lib/site-data";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article id={program.slug} className="card h-full p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-blueSoft text-brand-blue">
        <IconRenderer icon={program.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-black leading-tight text-brand-blue">{program.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{program.description}</p>
    </article>
  );
}
