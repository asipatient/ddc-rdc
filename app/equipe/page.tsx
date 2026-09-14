import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { User2, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ContentImage } from "@/components/ContentImage";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { getPublicTeamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "Notre équipe | DDC RDC",
  description: "Découvrez les responsables qui portent la direction, la coordination et l'action de la DDC RDC."
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const teamMembers = await getPublicTeamMembers();
  
  // Isoler le président fondateur (par ID conventionnel ou nom)
  const president = teamMembers.find(m => m.name === "Patient Asifiwe");
  const coordination = teamMembers.filter(m => m.name !== "Patient Asifiwe");

  return (
    <>
      <PageHero
        kicker="Notre équipe"
        title="Des responsables engagés pour structurer, coordonner et accompagner l’action de la DDC RDC."
        description="L'association s'appuie sur une équipe dirigeante et opérationnelle aux rôles clairement définis pour garantir l'impact et la transparence de ses actions."
        image="/images/ddc/IMG-20260131-WA0150.jpg"
      />

      {president && (
        <section className="bg-background py-16 sm:py-20">
          <ScrollReveal>
            <div className="section-shell">
              <SectionHeading
                eyebrow="Présidence"
                title="Présidence et coordination nationale"
              />
              <div className="mt-10 rounded-2xl border border-border bg-surface-elevated overflow-hidden shadow-sm lg:flex">
                <div className="relative aspect-square lg:aspect-auto lg:w-1/3 bg-brand-mist dark:bg-surface-muted">
                  {president.photo ? (
                    <ContentImage 
                      src={president.photo} 
                      alt={`Photo de ${president.name}`}
                      fill 
                      sizes="(min-width: 1024px) 33vw, 100vw" 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-border-strong">
                      <User2 aria-hidden="true" className="h-16 w-16" />
                    </div>
                  )}
                </div>
                <div className="p-8 lg:p-12 lg:w-2/3 flex flex-col justify-center">
                  <h3 className="text-2xl font-extrabold text-brand-blue dark:text-foreground">{president.name}</h3>
                  <p className="mt-2 text-lg font-bold text-brand-green dark:text-brand-gold">{president.role}</p>
                  
                  {president.roleDescription && (
                    <div className="mt-6 border-l-2 border-brand-green pl-4">
                      <p className="text-sm font-semibold text-foreground">{president.roleDescription}</p>
                    </div>
                  )}
                  
                  {president.bio && (
                    <p className="mt-6 text-base leading-7 text-foreground-muted">
                      {president.bio}
                    </p>
                  )}
                  
                  <div className="mt-8">
                    <ButtonLink href="/profil-president-fondateur" variant="primary">
                      Lire le profil complet
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      <section className="bg-surface-muted py-16 sm:py-20 border-y border-border">
        <ScrollReveal>
          <div className="section-shell">
            <SectionHeading
              eyebrow="Équipe"
              title="Équipe de coordination et de gestion"
            />
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {coordination.map((member) => {
                const isGenericBio = member.bio?.toLowerCase().includes("membre actif");
                
                return (
                  <article key={member.name} className="flex flex-col rounded-xl border border-border bg-background p-6 shadow-sm">
                    <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-brand-mist dark:bg-surface-elevated ring-4 ring-background">
                      {member.photo ? (
                        <ContentImage 
                          src={member.photo} 
                          alt={`Photo de ${member.name}`} 
                          fill 
                          sizes="128px" 
                          className="object-cover" 
                        />
                      ) : (
                        <User2 aria-hidden="true" className="h-12 w-12 text-border-strong" />
                      )}
                    </div>
                    
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-extrabold text-brand-blue dark:text-foreground">{member.name}</h3>
                      <p className="mt-1 text-sm font-bold text-brand-green dark:text-brand-gold">{member.role}</p>
                      
                      {member.roleDescription && (
                        <p className="mt-4 text-xs font-semibold leading-relaxed text-brand-blue dark:text-foreground-muted bg-brand-mist dark:bg-surface-elevated inline-block px-3 py-1.5 rounded-md">
                          {member.roleDescription}
                        </p>
                      )}
                      
                      {!isGenericBio && member.bio && (
                        <p className="mt-4 text-sm leading-6 text-foreground-muted">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell grid gap-10 md:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Gouvernance"
                title="Comprendre notre gouvernance"
                description="La DDC RDC repose sur une architecture statutaire rigoureuse, séparant la souveraineté, la direction et le contrôle financier."
              />
              <div className="mt-8">
                <ButtonLink href="/gouvernance" variant="secondary" className="group">
                  Découvrir notre gouvernance
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
              </div>
            </div>
            
            <div className="rounded-2xl border border-dashed border-border-strong bg-surface-elevated p-8">
              <h3 className="text-xl font-bold text-brand-blue dark:text-foreground">Devenir partenaire</h3>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">
                Vous représentez une institution, une fondation ou une ONG et souhaitez soutenir l'action de notre équipe de coordination ?
              </p>
              <div className="mt-6">
                <ButtonLink href="/partenaires" variant="ghost">
                  Proposer un partenariat
                </ButtonLink>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
