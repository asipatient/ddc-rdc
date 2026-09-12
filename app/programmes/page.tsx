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
 description: "JASIRI, PROJEC, École Citoyenne, Programme d'Alerte Communautaire — découvrez les 8 programmes de la DDC RDC pour la jeunesse, les femmes et les communautés en RDC.",
 path: "/programmes/"
});

export const dynamic ="force-dynamic";

export default async function ProgramsPage() {
 const { axes, programs } = await getPublicProgramContent();

 return (
 <>
 <PageHero
 kicker="Programmes"
 title="Nos 8 programmes d'action."
 description="La DDC RDC déploie huit programmes sur le terrain pour former, accompagner et mobiliser les jeunes, les femmes et les communautés."
 cta={{ label:"Nous soutenir", href: paypalDonationUrl }}
 image="/images/ddc/activite-formation-ddc.webp"
 />
 <section className="bg-brand-mist dark:bg-surface-muted py-16 sm:py-20">
 <ScrollReveal>
 <div className="section-shell space-y-12">
 {axes.map((axis) => {
 const axisPrograms = programs.filter((program) => program.axisSlug === axis.slug || axis.programSlugs.includes(program.slug));

 return (
 <div key={axis.slug} id={axis.slug}>
 <SectionHeading eyebrow="Axe d'intervention" title={axis.shortTitle || axis.title} description={axis.description} />
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
 <section className="bg-background py-16 sm:py-20">
 <ScrollReveal>
 <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
 <div>
 <SectionHeading
 eyebrow="Moyens d'action"
 title="Former, mobiliser et appuyer les initiatives locales."
 />
 <div className="mt-7 flex flex-col gap-3 sm:flex-row">
 <ButtonLink href="/devenir-membre-benevole" variant="secondary">
 Rejoindre la DDC
 </ButtonLink>
 </div>
 </div>
 <div className="grid gap-3">
 {actionMeans.map((mean) => (
 <div key={mean} className="rounded-lg border border-border p-4 text-sm font-semibold leading-7 text-foreground-muted">
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
