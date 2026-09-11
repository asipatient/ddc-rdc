import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, ChevronRight, FileText } from "lucide-react";
import { ContentImage } from "@/components/ContentImage";
import { site } from "@/lib/site-data";
import { getPublicPublicationBySlug, getPublicPublications } from "@/lib/publications";
import { PublicationCard } from "@/components/PublicationCard";
import { ShareButtons } from "@/components/ShareButtons";
import { ButtonLink } from "@/components/ButtonLink";

type Props = {
 params: Promise<{ slug: string }>;
};

export const dynamic ="force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params;
 const publication = await getPublicPublicationBySlug(slug);

 if (!publication) {
 return { title:"Publication introuvable" };
 }

 return {
 title: publication.title,
 description: publication.excerpt,
 openGraph: {
 title: `${publication.title} | ${site.shortName}`,
 description: publication.excerpt,
 images: [
 {
 url:
 publication.image && !publication.image.startsWith("data:")
 ? publication.image
 :"/images/ddc/groupe-partenaires-ddc.jpg",
 width: 1600,
 height: 900
 }
 ]
 }
 };
}

export default async function PublicationDetailPage({ params }: Props) {
 const { slug } = await params;
 const publication = await getPublicPublicationBySlug(slug);

 if (!publication) {
 notFound();
 }

 const allPublications = await getPublicPublications();
 const relatedPublications = allPublications
 .filter((item) => item.slug !== publication.slug && item.category === publication.category)
 .slice(0, 3);
 const shareUrl = `${site.url}/publications/${publication.slug}`;

 const date = new Intl.DateTimeFormat("fr-CD", {
 day:"2-digit",
 month:"long",
 year:"numeric"
 }).format(new Date(publication.date));
 const displayDate = publication.period || date;

 // Calcul du temps de lecture (environ 200 mots/min)
 const wordCount = publication.body.join("").split(/\s+/).length;
 const readingTime = Math.max(1, Math.ceil(wordCount / 200));

 return (
 <article>
 <section className="bg-brand-blue text-white">
 <div className="section-shell py-12 sm:py-16">
 <nav aria-label="Fil d'ariane" className="flex items-center space-x-2 text-sm font-medium text-brand-mist/60 mb-10">
 <Link href="/publications" className="hover:text-white transition-colors focus-ring rounded-sm">Publications</Link>
 <ChevronRight className="w-4 h-4" />
 <span className="text-brand-gold">{publication.category}</span>
 </nav>

 <div className="max-w-4xl">
 <span className="inline-block rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-gold">
 {publication.category}
 </span>
 <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl text-white">{publication.title}</h1>
 <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/90 font-medium">{publication.excerpt}</p>

 <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-medium text-white/70">
 <div className="flex items-center gap-2">
 <CalendarDays aria-hidden="true" className="h-4 w-4" />
 <time dateTime={publication.date}>{displayDate}</time>
 </div>
 {publication.location && (
 <div className="flex items-center gap-2">
 <MapPin aria-hidden="true" className="h-4 w-4" />
 <span>{publication.location}</span>
 </div>
 )}
 <div className="flex items-center gap-2">
 <Clock aria-hidden="true" className="h-4 w-4" />
 <span>{readingTime} min de lecture</span>
 </div>
 </div>
 </div>
 </div>
 </section>

 {publication.image ? (
 <section className="bg-surface-elevated">
 <div className="section-shell max-w-6xl -mt-6 sm:-mt-10 relative z-10">
 <div className="overflow-hidden rounded-xl bg-brand-mist dark:bg-surface-muted shadow-xl ring-1 ring-slate-900/5">
 <ContentImage
 src={publication.image}
 alt={publication.title}
 width={1600}
 height={900}
 className="aspect-[21/9] sm:aspect-[2.5/1] w-full object-cover"
 priority
 />
 </div>
 </div>
 </section>
 ) : null}

 <section className={`bg-background pb-16 sm:pb-24 ${publication.image ? 'pt-12 sm:pt-16' : 'pt-16 sm:pt-20'}`}>
 <div className="section-shell max-w-6xl">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

 {/* Colonne Principale */}
 <div className="lg:col-span-8 space-y-16">

 {/* Corps éditorial */}
 <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:leading-loose prose-p:text-foreground-muted prose-strong:text-foreground">
 {publication.body.map((paragraph, i) => (
 <p key={i}>{paragraph}</p>
 ))}
 </div>

 {/* Ce que cette action cherche à changer */}
 {publication.objectives && publication.objectives.length > 0 && (
 <div className="border-t border-border pt-12">
 <h2 className="text-2xl font-bold text-foreground">Ce que cette action cherche à changer</h2>
 <div className="mt-6 grid gap-4 sm:grid-cols-2">
 {publication.objectives.map((obj, i) => (
 <div key={i} className="rounded-xl border border-border bg-surface-elevated p-5 shadow-sm">
 <div className="flex items-start gap-3">
 <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand/20 text-brand text-xs font-bold">{i + 1}</span>
 <p className="text-sm font-semibold text-foreground-muted leading-relaxed">{obj}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Chronologie */}
 {publication.timeline && publication.timeline.length > 0 && (
 <div className="border-t border-border pt-12">
 <h2 className="text-2xl font-bold text-foreground">Chronologie</h2>
 <div className="mt-8 relative before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-border space-y-8">
 {publication.timeline.map((event, i) => (
 <div key={i} className="relative flex gap-6">
 <div className="absolute left-[11px] top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-background"></div>
 <div className="pl-8">
 <span className="text-sm font-bold text-brand uppercase tracking-widest">{event.year}</span>
 <h3 className="mt-1 text-lg font-bold text-foreground">{event.title}</h3>
 {event.description && <p className="mt-2 text-foreground-muted leading-relaxed">{event.description}</p>}
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Ressources */}
 {publication.resources && publication.resources.length > 0 && (
 <div className="border-t border-border pt-12">
 <h2 className="text-2xl font-bold text-foreground">Ressources associées</h2>
 <div className="mt-6 space-y-3">
 {publication.resources.map((res, i) => (
 <a key={i} href={res.url ||"#"} className="flex items-center gap-4 rounded-xl border border-border bg-surface-elevated p-4 hover:border-brand hover:shadow-sm transition-all focus-ring group">
 <div className="flex-shrink-0 p-2 rounded-lg bg-surface-muted text-accent group-hover:bg-accent group-hover:text-white transition-colors">
 <FileText className="w-5 h-5" />
 </div>
 <div>
 <p className="font-bold text-foreground">{res.title}</p>
 <p className="text-xs font-semibold text-foreground-subtle uppercase tracking-wider">{res.type}</p>
 </div>
 </a>
 ))}
 </div>
 </div>
 )}

 {/* Partage */}
 <div className="border-t border-border pt-8 flex items-center justify-between flex-wrap gap-4">
 <span className="font-bold text-foreground">Partager cet article</span>
 <ShareButtons url={shareUrl} title={publication.title} />
 </div>
 </div>

 {/* Colonne Secondaire (Sticky) */}
 <aside className="lg:col-span-4">
 <div className="sticky top-24 space-y-8">

 {/* En Bref */}
 {publication.keyFacts && publication.keyFacts.length > 0 && (
 <div className="rounded-2xl border border-border bg-surface-muted p-6">
 <h3 className="text-sm font-bold uppercase tracking-widest text-foreground-subtle mb-6">En bref</h3>
 <dl className="space-y-6">
 {publication.keyFacts.map((fact, i) => (
 <div key={i}>
 <dt className="text-2xl font-bold text-foreground">{fact.value}</dt>
 <dd className="mt-1 text-sm font-semibold text-foreground-muted leading-relaxed">{fact.label}</dd>
 </div>
 ))}
 </dl>
 </div>
 )}

 {/* Programme Associé */}
 {publication.relatedProgram && (
 <div className="rounded-2xl bg-brand-blue p-6 text-white shadow-lg">
 <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Programme associé</h3>
 <p className="text-xl font-bold">{publication.relatedProgram}</p>
 {publication.relatedAxis && (
 <p className="mt-2 text-sm font-medium text-white/70">Axe : {publication.relatedAxis}</p>
 )}
 <ButtonLink href="/programmes" variant="primary" className="mt-6 w-full justify-center bg-surface-elevated text-brand-blue dark:text-foreground hover:bg-surface-muted">
 Découvrir le programme
 </ButtonLink>
 </div>
 )}

 </div>
 </aside>

 </div>
 </div>
 </section>

 {/* Articles Similaires */}
 {relatedPublications.length > 0 && (
 <section className="bg-surface-muted py-16 sm:py-24 border-t border-border">
 <div className="section-shell max-w-6xl">
 <div className="flex items-center justify-between mb-10">
 <h2 className="text-2xl font-bold text-foreground">À découvrir ensuite</h2>
 <Link href="/publications" className="hidden sm:inline-flex items-center text-sm font-bold text-brand hover:text-brand-hover transition-colors">
 Voir toutes les publications
 <ChevronRight className="ml-1 w-4 h-4" />
 </Link>
 </div>
 <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
 {relatedPublications.map((related) => (
 <PublicationCard key={related.slug} publication={related} />
 ))}
 </div>
 <div className="mt-8 text-center sm:hidden">
 <ButtonLink href="/publications" variant="secondary" className="w-full justify-center">
 Voir toutes les publications
 </ButtonLink>
 </div>
 </div>
 </section>
 )}
 </article>
 );
}
