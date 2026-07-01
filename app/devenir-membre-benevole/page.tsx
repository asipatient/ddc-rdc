import { buildMetadata } from "@/lib/metadata";
import { CheckCircle2 } from "lucide-react";
import { MembershipForm } from "@/components/MembershipForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { memberVolunteerIntro, membershipInterestDomains } from "@/lib/site-data";

export const metadata = buildMetadata("/devenir-membre-benevole/", {
  title: "Devenir membre / bénévole",
  description:
    "Devenez membre ou bénévole de la DDC RDC à Bukavu : rejoignez une communauté engagée pour la citoyenneté, le leadership et le développement du Sud-Kivu."
});

export default function MemberVolunteerPage() {
  return (
    <>
      <PageHero
        kicker="Rejoindre la DDC"
        title="Devenir membre, bénévole ou porteur d'initiative citoyenne."
        description={memberVolunteerIntro}
        cta={{ label: "Remplir le formulaire", href: "#candidature" }}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Domaines d'intérêt"
              title="Choisir un domaine où contribuer utilement."
              description="La DDC accueille les engagements alignés sur ses axes et programmes, avec une attention particulière aux jeunes, femmes et communautés locales."
            />
            <div className="mt-8 grid gap-3">
              {membershipInterestDomains.map((domain) => (
                <p key={domain} className="flex items-center gap-3 rounded-lg bg-brand-mist p-4 text-sm font-bold text-brand-blue">
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
      </section>
    </>
  );
}
