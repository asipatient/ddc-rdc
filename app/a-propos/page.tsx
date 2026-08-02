import { buildMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/ScrollReveal";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutIntro, founderProfile, historyTimeline, site } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "À propos",
  description: "La Dynamique Debout Congolais (DDC RDC) est fondée à Bukavu, Sud-Kivu, engagée pour l'autonomisation des jeunes, des femmes et des communautés congolaises.",
  path: "/a-propos/"
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="À propos"
        title="Née d'une conviction. Portée par une génération."
        description="La DDC RDC est une réponse citoyenne à une question simple : pourquoi pas nous ?"
        cta={{ label: "Rejoindre la DDC", href: "/devenir-membre-benevole" }}
      image="/images/ddc/osc-droits-socioeconomiques.jpg"
      />
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-lg bg-brand-blueSoft">
            <Image src="/images/logo-ddc-card.jpg" alt={`Identité visuelle ${site.shortName}`} width={900} height={900} className="aspect-square w-full object-cover" />
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-600">
            {aboutIntro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </ScrollReveal>

      </section>
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative overflow-hidden rounded-lg bg-brand-mist">
            <Image
              src={founderProfile.leadershipImage || founderProfile.photo}
              alt={founderProfile.leadershipImageAlt || founderProfile.name}
              width={1200}
              height={1500}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading title="Origine et leadership" />
            <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
              {founderProfile.fullBio.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-7 grid gap-3">
              {historyTimeline.slice(2, 6).map((item) => (
                <div key={item.period} className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-green">{item.period}</p>
                  <h2 className="mt-2 text-base font-black text-brand-blue">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/notre-histoire" variant="secondary">
                Lire notre histoire
              </ButtonLink>
              <ButtonLink href="/profil-president-fondateur" variant="ghost">
                Profil du fondateur
              </ButtonLink>
            </div>
          </div>
        </div>
      </ScrollReveal>

      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell grid gap-6 md:grid-cols-3">
          {[
            ["Notre posture", "La DDC RDC ne fait pas de politique. Elle forme des citoyens qui, eux, transforment la politique."],
            ["Notre méthode", "On ne vient pas avec des solutions toutes faites. On travaille avec les communautés pour qu'elles construisent les leurs."],
            ["Notre ambition", "Un Congo où un jeune diplômé de Bukavu a autant de chances qu'ailleurs. Pas dans cinquante ans. Maintenant."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-brand-blue">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="section-shell mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/vision-mission" variant="secondary">
            Lire vision & mission
          </ButtonLink>
          <ButtonLink href="/equipe" variant="ghost">
            Voir l&apos;équipe
          </ButtonLink>
        </div>
      </ScrollReveal>

      </section>
    </>
  );
}
