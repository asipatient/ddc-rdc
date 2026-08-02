import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CheckCircle2 } from "lucide-react";
import { MembershipForm } from "@/components/MembershipForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { memberVolunteerIntro, memberVolunteerLetter, membershipInterestDomains } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Devenir membre / bénévole",
  description: "Rejoindre la DDC RDC comme membre, bénévole ou citoyen engagé."
};

export default function MemberVolunteerPage() {
  return (
    <>
      <PageHero
        kicker="Rejoindre la DDC"
        title="Devenir membre, bénévole ou porteur d'initiative citoyenne."
        description={memberVolunteerIntro}
        cta={{ label: "Remplir le formulaire", href: "#candidature" }}
        image="/images/ddc/IMG-20260131-WA0150.jpg"
      />

      <section className="bg-white py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">Message du fondateur</p>
            <p className="mt-6 text-xl font-black text-brand-blue sm:text-2xl">{memberVolunteerLetter.greeting}</p>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-700 sm:text-lg">
              {memberVolunteerLetter.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 56)} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-8 text-base font-bold text-brand-green">{memberVolunteerLetter.signature}</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-brand-mist py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading
                eyebrow="Domaines d'intérêt"
                title="Choisir un domaine où contribuer utilement."
                description="La DDC accueille les engagements alignés sur ses axes et programmes, avec une attention particulière aux jeunes, femmes et communautés locales."
              />
              <div className="mt-8 grid gap-3">
                {membershipInterestDomains.map((domain) => (
                  <p key={domain} className="flex items-center gap-3 rounded-lg bg-white p-4 text-sm font-bold text-brand-blue shadow-sm">
                    <CheckCircle2 aria-hidden="true" className="h-5 w-5 flex-none text-brand-green" />
                    {domain}
                  </p>
                ))}
              </div>
            </div>
            <div id="candidature">
              <MembershipForm />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
