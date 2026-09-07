import { buildMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/ScrollReveal";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutIntro, founderProfile, historyTimeline, site } from "@/lib/site-data";

export const metadata = buildMetadata({
 title:"À propos",
 description:"La Dynamique Debout Congolais (DDC RDC) est fondée à Bukavu, Sud-Kivu, engagée pour l'autonomisation des jeunes, des femmes et des communautés congolaises.",
 path:"/a-propos/"
});

export default function AboutPage() {
 return (
 <>
 <PageHero
 kicker="À propos"
 title="Née d'une conviction. Portée par une génération."
 description="La DDC RDC est une réponse citoyenne à une question simple : pourquoi pas nous ?"
 cta={{ label: "Découvrir notre histoire", href: "/notre-histoire" }}
 image="/images/ddc/osc-droits-socioeconomiques.jpg"
 />
 <section className="bg-brand-mist dark:bg-surface-muted py-12 sm:py-16">
   <ScrollReveal>
     <div className="section-shell max-w-4xl text-center">
       <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-blue dark:text-brand-gold">
         Qu&apos;est-ce que la DDC RDC aujourd&apos;hui ?
       </h2>
       <p className="mt-5 text-xl sm:text-2xl font-medium leading-relaxed text-foreground">
         La DDC RDC est une plateforme institutionnelle congolaise d&apos;éveil citoyen, de leadership, d&apos;autonomisation économique, de recherche, de culture, d&apos;environnement, de paix et de développement communautaire.
       </p>
     </div>
   </ScrollReveal>
 </section>
 <section className="bg-background py-16 sm:py-20">
 <ScrollReveal>
 <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
 <div className="relative overflow-hidden rounded-lg bg-brand-blueSoft">
 <Image src="/images/logo-ddc-card.jpg" alt={`Identité visuelle ${site.shortName}`} width={900} height={900} className="aspect-square w-full object-cover" />
 </div>
 <div className="space-y-5 text-base leading-8 text-foreground-muted">
 {aboutIntro.map((paragraph) => (
 <p key={paragraph.slice(0, 48)}>{paragraph}</p>
 ))}
 </div>
 </div>
 </ScrollReveal>

 </section>
 <section className="bg-background py-16 sm:py-20">
 <ScrollReveal>
 <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
 <div className="relative overflow-hidden rounded-lg bg-brand-mist dark:bg-surface-muted">
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
 <div className="mt-7 space-y-5 text-base leading-8 text-foreground-muted">
 {founderProfile.fullBio.map((paragraph) => (
 <p key={paragraph.slice(0, 48)}>{paragraph}</p>
 ))}
 </div>
 <div className="mt-7 grid gap-3">
 {historyTimeline.slice(2, 6).map((item) => (
 <div key={item.period} className="rounded-lg border border-border p-4">
 <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-green">{item.period}</p>
 <h2 className="mt-2 text-base font-bold text-brand-blue">{item.title}</h2>
 <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.description}</p>
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
 <section className="bg-brand-mist dark:bg-surface-muted py-16 sm:py-20">
 <ScrollReveal>
 <div className="section-shell grid gap-6 md:grid-cols-3">
 {[
 ["Notre posture","La DDC RDC ne fait pas de politique. Elle forme des citoyens qui, eux, transforment la politique."],
 ["Notre méthode", "Nous ne venons pas avec des solutions toutes faites. Nous travaillons avec les communautés pour qu'elles construisent les leurs."],
 ["Notre ambition","Un Congo où un jeune diplômé de Bukavu a autant de chances qu'ailleurs. Pas dans cinquante ans. Maintenant."]
 ].map(([title, text]) => (
 <article key={title} className="rounded-lg bg-surface-elevated p-6 shadow-sm">
 <h2 className="text-xl font-bold text-brand-blue">{title}</h2>
 <p className="mt-3 text-sm leading-7 text-foreground-muted">{text}</p>
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
