import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { founderProfile, historyIntro, historyTimeline } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Notre histoire",
  description: "Évolution de l'engagement citoyen ayant conduit à la création et à la structuration de la DDC RDC ASBL."
};

export default function HistoryPage() {
  return (
    <>
      <PageHero
        kicker="Notre histoire"
        title="De l'engagement communautaire à une plateforme institutionnelle."
        description={historyIntro}
        cta={{ label: "Voir les réalisations", href: "/realisations" }}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="relative overflow-hidden rounded-lg bg-brand-mist">
              <Image
                src={founderProfile.photo}
                alt={founderProfile.name}
                width={900}
                height={1125}
                className="aspect-[4/5] w-full object-cover"
                priority
              />
            </div>
            <div className="mt-6 rounded-lg bg-brand-blue p-6 text-white">
              <h2 className="text-2xl font-black">{founderProfile.name}</h2>
              <p className="mt-1 text-sm font-bold text-brand-gold">{founderProfile.role}</p>
              <p className="mt-4 text-sm leading-7 text-white/80">{founderProfile.shortBio}</p>
              <div className="mt-5">
                <ButtonLink href="/profil-president-fondateur">Voir le profil</ButtonLink>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Timeline"
              title="Une trajectoire construite par étapes."
              description="La chronologie reste modifiable et pourra être complétée avec des dates, documents, photos et témoignages validés."
            />
            <div className="mt-10 border-l-2 border-brand-gold pl-6">
              {historyTimeline.map((item) => (
                <article key={`${item.period}-${item.title}`} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-brand-green shadow" />
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-green">{item.period}</p>
                  <h2 className="mt-2 text-2xl font-black text-brand-blue">{item.title}</h2>
                  <p className="mt-3 leading-8 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionHeading
            eyebrow="Structuration"
            title="Des initiatives vers des programmes durables."
            description="La DDC organise progressivement ses actions autour de la citoyenneté, du leadership féminin, de l'entrepreneuriat, de la culture, de l'environnement, de la recherche, de la protection communautaire et de l'innovation locale."
          />
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href="/programmes" variant="secondary">
              Découvrir les programmes
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
