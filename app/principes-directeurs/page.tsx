import { buildMetadata } from "@/lib/metadata";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { principles } from "@/lib/site-data";

export const metadata = buildMetadata("/principes-directeurs/", {
  title: "Principes directeurs",
  description:
    "Intégrité, inclusion, redevabilité : découvrez les principes directeurs et valeurs institutionnelles qui guident l'action de la DDC RDC au Sud-Kivu."
});

export default function PrinciplesPage() {
  return (
    <>
      <PageHero
        kicker="Principes directeurs"
        title="Les repères éthiques qui guident l'action de la DDC RDC."
        description="Chaque initiative doit respecter la dignité humaine, l'inclusion, la transparence, la paix, la justice sociale et la neutralité politique partisane."
      />
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle} className="flex items-start gap-3 rounded-lg bg-white p-5 shadow-sm">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-brand-green" />
              <p className="text-sm font-bold leading-7 text-brand-blue">{principle}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
