import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { site } from "@/lib/site-data";
import { getPublicPublicationBySlug } from "@/lib/publications";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublicPublicationBySlug(slug);

  if (!publication) {
    return { title: "Publication introuvable" };
  }

  return {
    title: publication.title,
    description: publication.excerpt,
    openGraph: {
      title: `${publication.title} | ${site.shortName}`,
      description: publication.excerpt,
      images: [{ url: publication.image || "/images/ddc/hero-reel-ddc.jpg", width: 1600, height: 900 }]
    }
  };
}

export default async function PublicationDetailPage({ params }: Props) {
  const { slug } = await params;
  const publication = await getPublicPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  const date = new Intl.DateTimeFormat("fr-CD", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(publication.date));
  const displayDate = publication.period || date;
  const infoBlocks: Array<{ title: string; items?: string[] }> = [];

  if (publication.objectives) {
    infoBlocks.push({ title: "Objectifs", items: publication.objectives });
  }

  if (publication.targetAudience) {
    infoBlocks.push({ title: "Public cible", items: publication.targetAudience });
  }

  if (publication.impact) {
    infoBlocks.push({ title: "Résultats / impact", items: publication.impact });
  }

  return (
    <article>
      <section className="bg-brand-blue text-white">
        <div className="section-shell py-16 sm:py-20">
          <Link href="/publications" className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-bold text-brand-gold">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Retour aux publications
          </Link>
          <div className="mt-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">{publication.category}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{publication.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">{publication.excerpt}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {publication.needsReview ? (
                <span className="rounded-md bg-brand-gold px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-brand-blue">
                  À relire et valider
                </span>
              ) : null}
              {publication.status ? (
                <span className="rounded-md bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                  {publication.status === "published" ? "Publié" : "Brouillon"}
                </span>
              ) : null}
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-white/70">
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              <time dateTime={publication.date}>{displayDate}</time>
            </p>
          </div>
        </div>
      </section>

      {publication.image ? (
        <section className="bg-white pt-10">
          <div className="section-shell">
            <div className="relative overflow-hidden rounded-lg bg-brand-mist">
              <Image
                src={publication.image}
                alt={publication.title}
                width={1600}
                height={900}
                className="aspect-[16/9] w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell max-w-4xl">
          <div className="space-y-6 text-lg leading-9 text-slate-700">
            {publication.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {infoBlocks.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {infoBlocks.map((block) => (
                <InfoBlock key={block.title} title={block.title} items={block.items} />
              ))}
            </div>
          ) : null}

          {publication.location || publication.partners || publication.relatedAxis || publication.relatedProgram ? (
            <div className="mt-8 rounded-lg border border-slate-200 p-6">
              <h2 className="text-xl font-black text-brand-blue">Informations de référence</h2>
              <dl className="mt-5 grid gap-4 text-sm leading-7 text-slate-600 md:grid-cols-2">
                {publication.location ? (
                  <div>
                    <dt className="font-black text-brand-blue">Lieu</dt>
                    <dd>{publication.location}</dd>
                  </div>
                ) : null}
                {publication.relatedAxis ? (
                  <div>
                    <dt className="font-black text-brand-blue">Axe lié</dt>
                    <dd>{publication.relatedAxis}</dd>
                  </div>
                ) : null}
                {publication.relatedProgram ? (
                  <div>
                    <dt className="font-black text-brand-blue">Programme lié</dt>
                    <dd>{publication.relatedProgram}</dd>
                  </div>
                ) : null}
                {publication.partners?.length ? (
                  <div>
                    <dt className="font-black text-brand-blue">Partenaires / co-organisateurs</dt>
                    <dd>{publication.partners.join(", ")}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ) : null}

          <div className="mt-10 rounded-lg bg-brand-mist p-6">
            <h2 className="text-xl font-black text-brand-blue">Pour aller plus loin</h2>
            <p className="mt-3 leading-8 text-slate-600">
              Cette page est prête pour recevoir des contenus détaillés, images, documents PDF, témoignages et liens de téléchargement lorsque les documents officiels seront disponibles.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

function InfoBlock({ title, items }: { title: string; items?: string[] }) {
  return (
    <article className="rounded-lg bg-brand-mist p-5">
      <h2 className="text-lg font-black text-brand-blue">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
        {(items?.length ? items : ["À compléter"]).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
