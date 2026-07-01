import type { Metadata } from "next";
import { UsersRound } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { beneficiaries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Bénéficiaires",
  description:
    "Jeunes, femmes, enfants et communautés vulnérables de Bukavu et du Sud-Kivu : découvrez les publics accompagnés par la DDC RDC dans ses programmes citoyens."
};

export default function BeneficiariesPage() {
  return (
    <>
      <PageHero
        kicker="Bénéficiaires"
        title="Accompagner les personnes, organisations et communautés porteuses de changement."
        description="La DDC RDC cible les jeunes, les femmes, les enfants, les groupes vulnérables et les structures locales de participation citoyenne."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Publics cibles" title="Des accompagnements adaptés aux réalités locales." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {beneficiaries.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 p-6 shadow-sm">
                <UsersRound aria-hidden="true" className="h-8 w-8 text-brand-green" />
                <h2 className="mt-4 text-xl font-black text-brand-blue">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-lg bg-brand-blue p-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="text-2xl font-black">Identifier un besoin communautaire</h2>
              <p className="mt-3 max-w-3xl leading-8 text-white/80">
                Les communautés, leaders locaux et organisations peuvent partager une initiative ou solliciter un accompagnement.
              </p>
            </div>
            <div className="mt-6 sm:mt-0">
              <ButtonLink href="/contact?type=Projet%20communautaire">Nous contacter</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
