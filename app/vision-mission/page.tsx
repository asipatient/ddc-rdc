import type { Metadata } from "next";
import { Eye, Target } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { home, strategicPlan } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description: "Vision, mission et espace plan stratégique de la DDC RDC ASBL."
};

export default function VisionMissionPage() {
  return (
    <>
      <PageHero
        kicker="Vision & Mission"
        title="Former une génération consciente, compétente et engagée."
        description="La DDC RDC ASBL articule son action autour d'une vision de transformation démocratique, sociale, économique, culturelle et environnementale."
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
              title="Une structure prête pour le plan stratégique complet."
              description="Le contenu détaillé pourra être ajouté sans modifier l'architecture du site."
            />
            <div className="mt-7">
              <ButtonLink href="/documents-institutionnels" variant="secondary">
                Documents institutionnels
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[...strategicPlan.axes, ...strategicPlan.sections].map((item) => (
              <div key={item} className="rounded-lg bg-white p-5 text-sm font-bold leading-7 text-brand-blue shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
