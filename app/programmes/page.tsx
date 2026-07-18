import { buildMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { ProgramCard } from "@/components/ProgramCard";
import { SectionHeading } from "@/components/SectionHeading";
import { actionMeans, paypalDonationUrl } from "@/lib/site-data";
import { getPublicProgramContent } from "@/lib/program-content";

export const metadata = buildMetadata({
  title: "Programmes",
  description: "JASIRI, PROJEC, École Citoyenne, Alerte Précoce — découvrez les 8 programmes fondateurs de la DDC RDC pour la jeunesse, les femmes et les communautés du Congo.",
  path: "/programmes/"
});

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  const { axes, programs } = await getPublicProgramContent();

  return (
    <>
      <PageHero
        kicker="Programmes"
        title="Huit programmes phares alignés sur les trois axes d'intervention."
        description="Les programmes de la DDC RDC transforment les priorités institutionnelles en parcours de formation, recherche, incubation, alerte, culture, inclusion et action communautaire."
        cta={{ label: "Soutenir nos actions", href: paypalDonationUrl }}
      
        image="/images/ddc/activisme-vbg.jpg"
      />
      <section className="bg-brand-mist py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell space-y-12">
          {axes.map((axis) => {
            const axisPrograms = programs.filter((program) => program.axisSlug === axis.slug || axis.programSlugs.includes(program.slug));

            return (
              <div key={axis.slug} id={axis.slug}>
                <SectionHeading eyebrow="Axe d'intervention" title={axis.title} description={axis.description} />
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {axisPrograms.map((program) => (
                    <ProgramCard key={program.slug} program={program} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      </section>
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Moyens d'action"
              title="Former, documenter, mobiliser, créer des réseaux et appuyer les initiatives locales."
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/moyens-action" variant="secondary">
                Voir tous les moyens d&apos;action
              </ButtonLink>
              <ButtonLink href="/devenir-membre-benevole" variant="ghost">
                Rejoindre la DDC
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-3">
            {actionMeans.map((mean) => (
              <div key={mean} className="rounded-lg border border-slate-200 p-4 text-sm font-semibold leading-7 text-slate-700">
                {mean}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      </section>
    </>
  );
}
