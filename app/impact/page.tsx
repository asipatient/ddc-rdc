import { buildMetadata } from "@/lib/metadata";
import { CountUp } from "@/components/CountUp";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { IconRenderer } from "@/components/IconRenderer";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { paypalDonationUrl, whySupportDdc, monitoringLearning } from "@/lib/site-data";
import { getImpactVerificationBadge, getPublicImpactIndicators, getPublicImpactSection } from "@/lib/impact-content";
import { getPublicTestimonials } from "@/lib/testimonials-content";

export const metadata = buildMetadata({
  title: "Impact",
  description: "Découvrez les résultats d'impact de la DDC RDC : bénéficiaires formés, femmes autonomisées, enfants sensibilisés et initiatives communautaires réalisées à Bukavu.",
  path: "/impact/"
});

export const dynamic = "force-dynamic";

export default async function ImpactPage() {
  const impactIndicators = await getPublicImpactIndicators();
  const impactSection = await getPublicImpactSection();
  const testimonials = await getPublicTestimonials();

  return (
    <>
      <PageHero
        kicker="Notre impact"
        title={impactSection.subtitle}
        description={impactSection.text}
        cta={{ label: "Soutenir l'impact", href: paypalDonationUrl }}
        image="/images/ddc/osc-droits-socioeconomiques.jpg"
      />
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell">
            <SectionHeading
              eyebrow="Indicateurs"
              title={impactSection.title}
              description="Les chiffres disponibles sont présentés avec prudence. Les badges indiquent clairement les données provisoires, à vérifier ou en consolidation."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {impactIndicators.map((indicator) => (
                <article key={indicator.label} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-goldSoft text-brand-blue">
                    <IconRenderer icon={indicator.icon} className="h-6 w-6" />
                  </div>
                  <p className="mt-6 text-6xl font-black text-brand-blue tracking-tighter">
                    <CountUp value={indicator.value} />
                  </p>
                  <h2 className="mt-2 text-base font-black text-brand-blue">{indicator.label}</h2>
                  {getImpactVerificationBadge(indicator.verificationStatus) ? (
                    <p className="mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                      {getImpactVerificationBadge(indicator.verificationStatus)}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-6 text-slate-500">{indicator.note}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
      <section className="bg-brand-mist py-16 sm:py-24">
        <ScrollReveal>
          <div className="section-shell">
            <div className="max-w-3xl">
              <SectionHeading
                eyebrow="Comment nous mesurons"
                title="Notre approche de suivi, d'évaluation et d'apprentissage."
                description={monitoringLearning.intro}
              />
            </div>
            
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {monitoringLearning.blocks.map((block) => (
                <article key={block.title} className="relative pl-16">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-brand-green">
                    <IconRenderer icon={block.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black text-brand-blue">{block.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{block.description}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell">
            <SectionHeading eyebrow="Pourquoi soutenir la DDC ?" title="Des priorités lisibles pour orienter les appuis." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {whySupportDdc.map((item) => (
                <article key={item.title} className="rounded-lg border border-slate-200 p-5">
                  <IconRenderer icon={item.icon} className="h-5 w-5 text-brand-green" />
                  <h2 className="mt-4 text-base font-black text-brand-blue">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={paypalDonationUrl} variant="secondary">
                Faire un don
              </ButtonLink>
              <ButtonLink href="/partenaires" variant="ghost">
                Devenir partenaire
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>
      </section>
      {testimonials.length > 0 ? (
        <section className="bg-brand-blue py-16 text-white sm:py-20">
          <ScrollReveal>
            <div className="section-shell">
              <SectionHeading
                eyebrow="Témoignages"
                title="Ce que disent les bénéficiaires et partenaires de la DDC RDC."
                className="[&_h2]:text-white"
              />
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
                {testimonials.map((testimonial) => (
                  <article key={testimonial.name} className="rounded-lg border border-white/10 bg-white/10 p-5">
                    <h2 className="text-base font-black text-white">{testimonial.name}</h2>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-white/60">{testimonial.role}</p>
                    <p className="mt-3 text-sm leading-7 text-white/75">{testimonial.quote}</p>
                  </article>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>
      ) : null}
    </>
  );
}
