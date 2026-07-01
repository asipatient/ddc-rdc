import type { Metadata } from "next";
import { Eye, Target } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { home, strategicPlan } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description:
    "Découvrez la vision et la mission de la DDC RDC : former une génération consciente, compétente et engagée au service de la transformation démocratique et sociale du Congo."
};

export default function VisionMissionPage() {
  return (
    <>
      <PageHero
        kicker="Vision & Mission"
        title="Former une génération consciente, compétente et engagée."
        description="La DDC RDC articule son action autour d'une vision de transformation démocratique, sociale, économique, culturelle et environnementale."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-2">
          <article className="rounded-lg bg-brand-blue p-8 text-white sm:p-10">
            <Eye aria-hidden="true" className="h-10 w-10 text-brand-gold" />
            <h2 className="mt-5 text-3xl font-black">Notre vision</h2>
            <p className="mt-5 leading-8 text-white/80">{home.vision}</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
            <Target aria-hidden="true" className="h-10 w-10 text-brand-green" />
            <h2 className="mt-5 text-3xl font-black text-brand-blue">Notre mission</h2>
            <p className="mt-5 leading-8 text-slate-600">{home.mission}</p>
          </article>
        </div>
      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Plan stratégique"
              title="Un plan stratégique structuré autour de trois axes et sept dimensions clés."
              description="Chaque axe et chaque dimension sont documentés pour orienter l'action de la DDC RDC et informer ses partenaires."
            />
            <div className="mt-7">
              <ButtonLink href="/documents-institutionnels" variant="secondary">
                Documents institutionnels
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[...strategicPlan.axes, ...strategicPlan.sections].map((item) => (
              <div key={item.title} className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm font-bold leading-7 text-brand-blue">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
