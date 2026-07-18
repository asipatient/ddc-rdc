import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import Image from "next/image";
import { Mail } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { getPublicTeamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "Notre équipe",
  description: "Équipe dirigeante de la DDC RDC."
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const teamMembers = await getPublicTeamMembers();

  return (
    <>
      <PageHero
        kicker="Notre équipe"
        title="Une équipe engagée pour structurer, accompagner et rendre compte."
        description="Cette page présente les responsabilités clés de la DDC RDC. Les biographies, photos et liens de contact peuvent être complétés progressivement."
        cta={{ label: "Contacter l'équipe", href: "/contact" }}
      image="/images/ddc/IMG-20260131-WA0150.jpg"
      />
      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
        <div className="section-shell">
          <SectionHeading
            eyebrow="Leadership institutionnel"
            title="Une équipe identifiée, avec des rôles clairs au sein de l'association."
            description="Les photos officielles fournies sont intégrées. Les biographies détaillées et liens personnels pourront être enrichis progressivement."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <article key={member.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg bg-brand-mist">
                  {member.photo ? (
                    <Image src={member.photo} alt={member.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-brand-goldSoft text-brand-blue">
                        <Mail aria-hidden="true" className="h-6 w-6" />
                      </div>
                      <p className="mt-3 text-sm font-bold text-slate-500">Photo à ajouter</p>
                    </div>
                  )}
                </div>
                <h2 className="mt-5 text-xl font-black text-brand-blue">{member.name}</h2>
                <p className="mt-1 text-sm font-bold text-brand-green">{member.role}</p>
                {member.roleDescription ? (
                  <p className="mt-3 text-sm font-semibold leading-6 text-brand-blue">{member.roleDescription}</p>
                ) : null}
                <p className="mt-4 text-sm leading-7 text-slate-600">{member.bio}</p>
                {member.contactHref && member.contactHref !== "#" ? (
                  <a href={member.contactHref} className="focus-ring mt-4 inline-flex rounded-md text-sm font-bold text-brand-blue hover:text-brand-green">
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
