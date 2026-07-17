import { buildMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Eye, MapPin, Target } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { home, strategicPlan } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Vision & Mission",
  description:
    "Découvrez la vision et la mission de la DDC RDC : former une génération consciente, compétente et engagée au service de la transformation démocratique et sociale du Congo.",
  path: "/vision-mission/",
  ogImage: "/images/ddc/conference-citoyenne.jpg"
});

export default function VisionMissionPage() {
  return (
    <>
      <PageHero
        kicker="Vision & Mission"
        title="Former une génération consciente, compétente et engagée."
        description="La DDC RDC articule son action autour d'une vision de transformation démocratique, sociale, économique, culturelle et environnementale."
      
        image="/images/ddc/conference-citoyenne.jpg"
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
              title={strategicPlan.title}
              description={strategicPlan.note}
            />
            <div className="mt-7">
              <ButtonLink href="/documents-institutionnels" variant="secondary">
                Documents institutionnels
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {strategicPlan.items.map((item) => (
              <div key={item.title} className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm font-black leading-6 text-brand-blue">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Ancrage territorial"
            title="Zones d'intervention"
            description="La DDC RDC est ancrée localement et porte une ambition nationale."
          />
          <div className="mt-10 rounded-lg border border-slate-200 bg-brand-mist p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <MapPin aria-hidden="true" className="mt-1 h-6 w-6 flex-none text-brand-green" />
              <div>
                <h3 className="text-lg font-black text-brand-blue">Présence à Bukavu et au-delà</h3>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  Présente dans l&apos;ensemble de la ville de Bukavu, la DDC RDC compte des membres actifs dans au moins
                  8 provinces de la RDC, avec l&apos;ouverture prochaine de bureaux provinciaux.
                </p>
                <div className="mt-5">
                  <ButtonLink href="/zones-intervention" variant="secondary">
                    Voir les zones d&apos;intervention
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
