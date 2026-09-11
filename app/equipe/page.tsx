import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Mail, User2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ContentImage } from "@/components/ContentImage";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { getPublicTeamMembers } from "@/lib/team";

export const metadata: Metadata = {
 title:"Notre équipe",
 description:"Équipe dirigeante de la DDC RDC."
};

export const dynamic ="force-dynamic";

export default async function TeamPage() {
 const teamMembers = await getPublicTeamMembers();

 return (
 <>
 <PageHero
 kicker="Notre équipe"
 title="Une équipe engagée pour structurer, accompagner et rendre compte."
 description="Cette page présente les responsabilités clés et les profils de l'équipe dirigeante de la DDC RDC."
 cta={{ label:"Contacter l'équipe", href:"/contact" }}
 image="/images/ddc/IMG-20260131-WA0150.jpg"
 />
 <section className="bg-background py-16 sm:py-20">
 <ScrollReveal>
 <div className="section-shell">
 <SectionHeading
 eyebrow="Leadership institutionnel"
 title="Une équipe identifiée, avec des rôles clairs au sein de l'association."
 />
 <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
 {teamMembers.map((member) => (
 <article key={member.name} className="rounded-lg border border-border bg-surface-elevated p-5 shadow-sm">
 <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg bg-brand-mist dark:bg-surface-muted">
 {member.photo ? (
 <ContentImage src={member.photo} alt={member.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
 ) : (
 <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-surface-muted p-4 text-center">
 <User2 aria-hidden="true" className="h-12 w-12 text-border-strong" />
 </div>
 )}
 </div>
 <h2 className="mt-5 text-xl font-extrabold text-brand-blue dark:text-foreground">{member.name}</h2>
 <p className="mt-1 text-sm font-bold text-brand-green dark:text-foreground-muted">{member.role}</p>
 {member.roleDescription ? (
 <p className="mt-3 text-sm font-semibold leading-6 text-brand-blue dark:text-foreground-muted">{member.roleDescription}</p>
 ) : null}
 <p className="mt-4 text-sm leading-7 text-foreground-muted">{member.bio}</p>
 {member.contactHref && member.contactHref !=="#" ? (
 <a href={member.contactHref} className="focus-ring mt-4 inline-flex rounded-md text-sm font-bold text-brand-blue dark:text-foreground-muted hover:text-brand-green">
 {member.contactLabel}
 </a>
 ) : null}
 </article>
 ))}
 </div>
 <div className="mt-10 flex flex-col gap-3 sm:flex-row">
 <ButtonLink href="/gouvernance" variant="secondary">
 Voir la gouvernance
 </ButtonLink>
 <ButtonLink href="/partenaires" variant="ghost">
 Proposer un partenariat
 </ButtonLink>
 </div>
 </div>
 </ScrollReveal>

 </section>
 </>
 );
}
