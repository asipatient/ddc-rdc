import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { activityArticles, founderProfile, historyTimeline } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Profil du Président Fondateur",
  description: "Profil institutionnel de Patient Asifiwe, Président Fondateur de la DDC RDC."
};

export default function FounderProfilePage() {
  return (
    <>
      <PageHero
        kicker="Profil institutionnel"
        title="Patient Asifiwe, Président Fondateur de la DDC RDC."
        description={founderProfile.shortBio}
        cta={{ label: "Contacter la DDC", href: "/contact" }}
      image="/images/ddc/hero-reel-ddc.jpg"
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
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
          <div>
            <SectionHeading
              eyebrow="Biographie"
              title="Communicateur, entrepreneur social et acteur communautaire."
            />
            <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
              {founderProfile.fullBio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {founderProfile.orientations.map((orientation) => (
                <p key={orientation} className="flex items-start gap-3 rounded-lg bg-brand-mist p-4 text-sm font-bold leading-7 text-brand-blue">
                  <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-brand-green" />
                  {orientation}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Parcours"
            title="Repères construits à partir des documents et archives disponibles."
            description="Cette synthèse reste volontairement sobre et modifiable, afin de garder une présentation institutionnelle vérifiable."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {historyTimeline.slice(0, 8).map((item) => (
              <article key={`${item.period}-${item.title}`} className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-green">{item.period}</p>
                <h2 className="mt-3 text-lg font-black text-brand-blue">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/notre-histoire" variant="secondary">
              Notre histoire
            </ButtonLink>
            <ButtonLink href="/equipe" variant="ghost">
              Voir l&apos;équipe
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Éléments à documenter"
            title="Renforcement des capacités, réseaux et initiatives à clarifier."
            description="Ces éléments sont conservés comme repères du parcours et restent à relire avant toute publication institutionnelle définitive."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {activityArticles
              .filter((article) => article.status === "draft")
              .map((article) => (
                <article key={article.slug} className="rounded-lg border border-slate-200 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-green">{article.period}</p>
                  <h2 className="mt-3 text-lg font-black text-brand-blue">{article.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{article.excerpt}</p>
                  <p className="mt-4 inline-flex rounded-md bg-brand-goldSoft px-3 py-2 text-xs font-black text-brand-blue">
                    À vérifier / clarifier
                  </p>
                </article>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
