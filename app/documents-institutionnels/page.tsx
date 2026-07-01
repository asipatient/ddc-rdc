import { buildMetadata } from "@/lib/metadata";
import { FileText } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { institutionalDocuments, paypalDonationUrl, protectionEthicsDocuments, strategicPlan, transparencyDocuments } from "@/lib/site-data";
import { getPublicDocuments } from "@/lib/document-content";
import type { DocumentItem } from "@/data/types";

export const metadata = buildMetadata("/documents-institutionnels/", {
  title: "Documents institutionnels",
  description:
    "Statuts, règlement intérieur, rapports et plans stratégiques de la DDC RDC, ASBL congolaise basée à Bukavu, engagée pour la transparence institutionnelle."
});

function DocumentGrid({ documents }: { documents: DocumentItem[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((document) => (
        <article key={`${document.category}-${document.title}`} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <FileText aria-hidden="true" className="h-7 w-7 text-brand-green" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{document.category}</p>
          <h2 className="mt-2 text-lg font-black text-brand-blue">{document.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{document.description}</p>
          <p className="mt-4 inline-flex rounded-md bg-brand-goldSoft px-3 py-2 text-xs font-black text-brand-blue">{document.status}</p>
          {document.href ? (
            <a href={document.href} className="focus-ring mt-4 block w-fit rounded-md text-sm font-bold text-brand-green hover:text-brand-blue">
              Ouvrir le document
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default async function InstitutionalDocumentsPage() {
  const documents = await getPublicDocuments();

  return (
    <>
      <PageHero
        kicker="Documents institutionnels"
        title="Un espace de transparence pour les textes, rapports et politiques de la DDC."
        description="Les documents officiels seront publiés progressivement. Les emplacements actuels indiquent clairement les contenus à ajouter ou compléter."
        cta={{ label: "Faire un don", href: paypalDonationUrl }}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Documentation"
            title="Statuts, règlement intérieur, rapports, plans stratégiques et plaidoyer."
          />
          <div className="mt-10">
            <DocumentGrid documents={documents.length ? documents : institutionalDocuments} />
          </div>
        </div>
      </section>
      <section className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Transparence et redevabilité"
            title="Rapports et documents publics à publier."
            description="Cette section est conçue pour rassurer les partenaires, bailleurs, membres et communautés sur la gestion et la documentation des actions."
          />
          <div className="mt-10">
            <DocumentGrid documents={transparencyDocuments} />
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Plan stratégique"
              title={strategicPlan.title}
              description={strategicPlan.note}
            />
            <div className="mt-7">
              <ButtonLink href="/partenaires" variant="secondary">
                Partenaires recherchés
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[...strategicPlan.axes, ...strategicPlan.sections].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 p-5 text-sm font-bold leading-7 text-brand-blue">
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-brand-blue py-16 text-white sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Protection et éthique"
            title="Un espace pour les politiques internes de protection, données, signalement et anti-corruption."
            className="[&_h2]:text-white"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {protectionEthicsDocuments.map((document) => (
              <article key={document.title} className="rounded-lg border border-white/10 bg-white/10 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">{document.status}</p>
                <h2 className="mt-3 text-lg font-black text-white">{document.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/75">{document.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
