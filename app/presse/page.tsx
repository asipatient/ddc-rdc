import { buildMetadata } from "@/lib/metadata";
import { Mail, Newspaper } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { officialContact, pressResources } from "@/lib/site-data";

export const metadata = buildMetadata("/presse/", {
  title: "Presse",
  description:
    "Communiqués, dossiers de presse et contacts médias de la DDC RDC, association congolaise basée à Bukavu engagée pour la jeunesse et les femmes du Congo."
});

export default function PressPage() {
  return (
    <>
      <PageHero
        kicker="Presse et médias"
        title="Un espace média pour suivre les prises de parole de la DDC RDC."
        description="Cette page pourra accueillir les communiqués, dossiers de presse, photos officielles, contacts presse, interventions médiatiques et articles parlant de la DDC."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Ressources presse" title="Éléments à publier ou compléter." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pressResources.map((resource) => (
              <article key={resource.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <Newspaper aria-hidden="true" className="h-7 w-7 text-brand-green" />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{resource.category}</p>
                <h2 className="mt-2 text-lg font-black text-brand-blue">{resource.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{resource.description}</p>
                <p className="mt-4 inline-flex rounded-md bg-brand-goldSoft px-3 py-2 text-xs font-black text-brand-blue">{resource.status}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Contact presse"
              title="Canal officiel pour les demandes médias."
              description="Les journalistes, médias et plateformes de communication peuvent écrire à la DDC RDC via le contact officiel."
            />
            <div className="mt-7 rounded-lg bg-white p-6 shadow-sm">
              <p className="flex items-center gap-3 text-sm font-bold text-brand-blue">
                <Mail aria-hidden="true" className="h-5 w-5 text-brand-green" />
                {officialContact.email}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <Newspaper aria-hidden="true" className="mx-auto h-10 w-10 text-brand-green" />
            <h2 className="mt-4 text-2xl font-black text-brand-blue">Dossier média à compléter</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Logos, photos officielles, biographie institutionnelle, fiches programmes et communiqués pourront être ajoutés ici.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact?type=Presse" variant="secondary">
                Contacter la presse
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
