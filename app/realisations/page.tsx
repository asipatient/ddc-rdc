import { buildMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { RealisationCard } from "@/components/RealisationCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getPublicRealisations } from "@/lib/realisations";

export const metadata = buildMetadata("/realisations/", {
  title: "Nos réalisations",
  description:
    "Découvrez les réalisations de la DDC RDC auprès des jeunes, des femmes et des communautés de Bukavu et du Sud-Kivu, présentées en timeline détaillée."
});

export const dynamic = "force-dynamic";

export default async function RealisationsPage() {
  const realisations = await getPublicRealisations();

  return (
    <>
      <PageHero
        kicker="Nos réalisations"
        title="Des activités documentées au service de la citoyenneté, des droits, de la culture et de l'inclusion."
        description="Cette page rassemble les actions déjà menées par la DDC RDC avec les communautés, les jeunes, les femmes, les enfants et les organisations de la société civile."
        cta={{ label: "Agir avec nous", href: "/partenaires" }}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Timeline"
            title="Chronologie des réalisations"
            description="Les dates sont reprises selon les informations disponibles et pourront être complétées avec des rapports, photos et documents officiels."
          />
          <div className="mt-10 border-l-2 border-brand-gold pl-6">
            {realisations.map((realisation) => (
              <div key={realisation.slug} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-brand-green shadow" />
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-green">{realisation.dateLabel}</p>
                <h2 className="mt-2 text-2xl font-black text-brand-blue">{realisation.title}</h2>
                <p className="mt-2 text-sm font-bold text-slate-500">{realisation.category}</p>
                <p className="mt-3 max-w-4xl leading-8 text-slate-600">{realisation.description}</p>
                {realisation.relatedProgram || realisation.relatedAxis ? (
                  <dl className="mt-4 grid max-w-4xl gap-3 text-sm leading-7 text-slate-600 sm:grid-cols-2">
                    {realisation.relatedProgram ? (
                      <div>
                        <dt className="font-black text-brand-blue">Programme lié</dt>
                        <dd>{realisation.relatedProgram}</dd>
                      </div>
                    ) : null}
                    {realisation.relatedAxis ? (
                      <div>
                        <dt className="font-black text-brand-blue">Axe lié</dt>
                        <dd>{realisation.relatedAxis}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}
                {realisation.impact ? (
                  <div className="mt-4 max-w-4xl rounded-lg bg-brand-mist p-4">
                    <h3 className="text-sm font-black text-brand-blue">Impact</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {realisation.impact.length ? realisation.impact.join(" ") : "À compléter"}
                    </p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Galerie d'activités" title="Cartes de réalisations avec photos disponibles." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {realisations.map((realisation) => (
              <RealisationCard key={realisation.slug} realisation={realisation} />
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/publications" variant="secondary">
              Voir les actualités
            </ButtonLink>
            <ButtonLink href="/impact" variant="ghost">
              Voir l&apos;impact
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
