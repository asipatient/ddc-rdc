import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { activityArticles, founderProfile, historyTimeline } from "@/lib/site-data";

export const metadata: Metadata = {
 title:"Profil du Président Fondateur",
 description:"Profil institutionnel de Patient Asifiwe, Président Fondateur de la DDC RDC."
};

export default function FounderProfilePage() {
 return (
 <>
 <PageHero
 kicker="Profil institutionnel"
 title="Patient Asifiwe, Président Fondateur de la DDC RDC."
 description={founderProfile.shortBio}
 cta={{ label:"Contacter la DDC", href:"/contact" }}
 image="/images/ddc/asifiwe-patient.jpg"
 />
 <section className="bg-background py-16 sm:py-20">
 <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
 <div className="relative overflow-hidden rounded-lg bg-brand-mist dark:bg-surface-muted">
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
 <div className="mt-7 space-y-5 text-base leading-8 text-foreground-muted">
 {founderProfile.fullBio.map((paragraph) => (
 <p key={paragraph}>{paragraph}</p>
 ))}
 </div>
 <div className="mt-8 grid gap-3 sm:grid-cols-2">
 {founderProfile.orientations.map((orientation) => (
 <p key={orientation} className="flex items-start gap-3 rounded-lg bg-brand-mist dark:bg-surface-muted p-4 text-sm font-bold leading-7 text-brand-blue dark:text-foreground-muted">
 <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-brand-green dark:text-brand-gold" />
 {orientation}
 </p>
 ))}
 </div>
 </div>
 </div>
 </section>
 <section className="bg-brand-mist dark:bg-surface-muted py-16 sm:py-20">
 <div className="section-shell">
 <SectionHeading
 eyebrow="Parcours"
 title="Repères construits à partir des documents et archives disponibles."
 description="Cette synthèse reste volontairement sobre et modifiable, afin de garder une présentation institutionnelle vérifiable."
 />
 <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
 {historyTimeline.slice(0, 8).map((item) => (
 <article key={`${item.period}-${item.title}`} className="rounded-lg bg-surface-elevated p-5 shadow-sm">
 <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-green dark:text-brand-gold">{item.period}</p>
 <h2 className="mt-3 text-lg font-bold text-brand-blue dark:text-foreground">{item.title}</h2>
 <p className="mt-3 text-sm leading-7 text-foreground-muted">{item.description}</p>
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
 </>
 );
}
