import { HeroSlider } from"@/components/HeroSlider";
import Image from"next/image";
import { Mail, MapPin, Phone } from"lucide-react";
import { AxisCard } from"@/components/AxisCard";
import { CountUp } from"@/components/CountUp";
import { ButtonLink } from"@/components/ButtonLink";
import { ContactForm } from"@/components/ContactForm";
import { PublicationCard } from"@/components/PublicationCard";
import { PulsatingPlayButton } from"@/components/PulsatingPlayButton";
import { ScrollReveal } from"@/components/ScrollReveal";
import { SectionHeading } from"@/components/SectionHeading";
import { axes, flagshipPrograms, founderCallout, publications } from"@/lib/site-data";
import { getPublicSiteConfig } from"@/lib/site-settings";
import { buildMetadata } from"@/lib/metadata";
import { site } from"@/data/site";

export const metadata = buildMetadata({
 title:"Accueil",
 description:
"La DDC RDC mobilise la jeunesse et les femmes de Bukavu pour bâtir des communautés responsables, inclusives et engagées dans la transformation de la RDC.",
 path:"/"
});

export const dynamic ="force-dynamic";

export default async function HomePage() {
 const siteConfig = await getPublicSiteConfig();

 return (
 <>
 {/* ── HERO ─────────────────────────────────────────────────────── */}
 <section className="relative isolate min-h-[88svh] overflow-hidden bg-brand-blue text-white">
 <HeroSlider />
<div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,53,88,0.94)_0%,rgba(11,53,88,0.75)_45%,rgba(11,53,88,0.30)_75%,rgba(11,53,88,0.12)_100%)]" />
<div className="section-shell relative flex min-h-[88svh] items-center py-24">
 <div className="max-w-2xl">
 <div className="anim-fade-down">
 <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">
 DDC RDC · DYNAMIQUE DEBOUT CONGOLAIS
 </p>
 <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
 Jeunesse et femmes debout pour transformer le Congo.
 </h1>
 </div>
 <p className="anim-fade-down anim-delay-200 mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
 Depuis Bukavu, la DDC RDC rassemble des jeunes et des femmes qui refusent la résignation —
 et qui construisent, ensemble, le Congo qu&apos;ils méritent.
 </p>
 <div className="anim-fade-up anim-delay-400 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
 <ButtonLink href="/impact">Voir notre impact</ButtonLink>
 <ButtonLink href="/devenir-membre-benevole" variant="outline">
 S'engager
 </ButtonLink>
 </div>
 <div className="anim-fade-up anim-delay-600 mt-10 flex items-center gap-5">
 <PulsatingPlayButton
 href="https://www.youtube.com/@ddcrdc"
 label="Découvrir la DDC RDC en vidéo"
 size={72}
 />
 <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/85">
 Découvrir la DDC en vidéo
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* ── POSITIONNEMENT RAPIDE / PREUVE D'IMPACT ──────────────────── */}
 <section className="bg-background py-14 sm:py-20">
 <div className="section-shell">
 <SectionHeading
 eyebrow="REPÈRES & IMPACT"
 title="Des actions mesurables, ancrées dans la réalité communautaire."
 />
 <div className="mt-12 grid gap-6 lg:grid-cols-3">
 {/* Repères institutionnels */}
 <div className="rounded-2xl border border-border bg-surface-elevated shadow-sm p-6 sm:p-8">
 <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
 <span className="w-2.5 h-2.5 rounded-full bg-brand-blue"></span>
 Repères institutionnels
 </h3>
 <div className="mt-8 space-y-6 relative before:absolute before:inset-y-0 before:left-2.5 before:w-0.5 before:bg-border-strong">
 <div className="relative flex gap-4">
 <div className="absolute left-2.5 top-2 -translate-x-1/2 w-2 h-2 rounded-full bg-border-strong border-2 border-surface-elevated ring-4 ring-surface-elevated"></div>
 <div className="pl-6">
 <p className="text-xl font-extrabold text-foreground">2016</p>
 <p className="mt-1 text-sm font-bold text-foreground-muted">Premières initiatives citoyennes</p>
 </div>
 </div>
 <div className="relative flex gap-4">
 <div className="absolute left-2.5 top-2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand border-2 border-surface-elevated ring-4 ring-surface-elevated"></div>
 <div className="pl-6">
 <p className="text-xl font-extrabold text-foreground">2022</p>
 <p className="mt-1 text-sm font-bold text-foreground-muted">Fondation officielle DDC RDC</p>
 </div>
 </div>
 </div>
 </div>

 {/* Résultats documentés */}
 <div className="rounded-2xl border border-border bg-surface-elevated shadow-sm p-6 sm:p-8">
 <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
 <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
 Résultats documentés
 </h3>
 <div className="mt-8 space-y-6">
 <div>
 <p className="text-4xl font-extrabold text-foreground"><CountUp value="970+" /></p>
 <p className="mt-1 text-sm font-bold text-foreground-muted">Bénéficiaires et participants documentés</p>
 </div>
 <div>
 <p className="text-4xl font-extrabold text-foreground"><CountUp value="10+" /></p>
 <p className="mt-1 text-sm font-bold text-foreground-muted">Activités réalisées</p>
 </div>
 </div>
 </div>

 {/* Demain */}
 <div className="rounded-2xl border border-border bg-surface-muted p-6 sm:p-8 flex flex-col">
 <h3 className="text-lg font-extrabold text-foreground-muted flex items-center gap-2">
 <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
 Ambitions futures
 </h3>
 <div className="mt-8 flex-1">
 <p className="text-4xl font-extrabold text-foreground">26</p>
 <p className="mt-1 text-sm font-bold text-foreground-muted">Provinces — notre horizon</p>
 <p className="mt-4 text-sm leading-relaxed text-foreground-subtle">
 Notre ambition stratégique est d'étendre progressivement nos programmes éprouvés pour couvrir l'ensemble du territoire national et amplifier notre impact.
 </p>
 </div>
 <ButtonLink href="/impact" variant="secondary" className="mt-6 w-full justify-center">
 Voir l'impact
 </ButtonLink>
 </div>

 </div>
 </div>
 </section>

 {/* ── SEGMENTATION VISITEURS (Que cherchez-vous ?) ─────────────── */}
 <section className="bg-brand-blue py-16 text-white sm:py-20">
 <div className="section-shell">
 <div className="text-center">
 <h2 className="text-3xl font-extrabold sm:text-4xl">Que cherchez-vous ?</h2>
 <p className="mt-4 text-lg text-white/80">
 Trouvez rapidement les opportunités et ressources qui correspondent à votre profil.
 </p>
 </div>
 <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {[
 { label:"Je suis jeune", desc:"Programmes, formations et opportunités", href:"/programmes" },
 { label:"Je suis une femme", desc:"Autonomisation, JASIRI, leadership", href:"/axes-intervention" },
 { label:"Je suis partenaire", desc:"Partenariat, programmes, documents", href:"/partenaires" },
 { label:"Je veux soutenir", desc:"Impact, don, engagement", href: siteConfig.donationUrl },
 { label:"Je suis journaliste", desc:"Presse, publications, contact", href:"/presse" },
 { label:"Je veux découvrir", desc:"Notre vision, notre mission", href:"/vision-mission" },
 ].map((segment) => (
 <a
 key={segment.label}
 href={segment.href}
 className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
 >
 <div>
 <h3 className="text-xl font-bold text-brand-gold">{segment.label}</h3>
 <p className="mt-2 text-sm text-white/70">{segment.desc}</p>
 </div>
 <div className="mt-6 flex items-center text-sm font-bold text-white group-hover:text-brand-gold">
 Explorer <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
 </div>
 </a>
 ))}
 </div>
 </div>
 </section>

 {/* ── CE QUE NOUS CHANGEONS ─────────────────────────────────────── */}
 <section id="axes" className="bg-surface-muted py-16 sm:py-20">
 <div className="section-shell">
 <ScrollReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
 <SectionHeading
 eyebrow="Ce que nous changeons"
 title="Trois grands domaines pour organiser nos actions et maximiser notre impact."
 description="Nous partons des problèmes réels pour construire des actions concrètes aboutissant à des résultats mesurables."
 />
 <ButtonLink href="/axes-intervention" variant="secondary">
 Explorer les axes
 </ButtonLink>
 </ScrollReveal>
 <div className="mt-10 grid gap-6 lg:grid-cols-3">
 {axes.map((axis, index) => (
 <ScrollReveal key={axis.slug} delayMs={index * 100}>
 <AxisCard
 axis={axis}
 programs={flagshipPrograms.filter((p) => axis.programSlugs.includes(p.slug))}
 />
 </ScrollReveal>
 ))}
 </div>
 </div>
 </section>

 {/* ── PUBLICATIONS RÉCENTES ───────────────────────────────────── */}
 <section id="publications" className="bg-background py-16 sm:py-20">
 <div className="section-shell">
 <ScrollReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
 <SectionHeading
 eyebrow="Publications"
 title="Actualités, rapports et documents de la DDC RDC."
 />
 <ButtonLink href="/publications" variant="secondary">
 Toutes les publications
 </ButtonLink>
 </ScrollReveal>
 <div className="mt-10 grid gap-6 md:grid-cols-3">
 {publications.slice(0, 3).map((publication, index) => (
 <ScrollReveal key={publication.slug} delayMs={index * 100}>
 <PublicationCard publication={publication} />
 </ScrollReveal>
 ))}
 </div>
 </div>
 </section>

 {/* ── NOTRE APPEL ─────────────────────────────────────────────── */}
 <section className="bg-surface-elevated border-y border-border/50 py-16 text-foreground sm:py-20">
 <ScrollReveal className="section-shell">
 <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
 {founderCallout.eyebrow}
 </p>
 <blockquote className="mx-auto mt-8 max-w-4xl text-center">
 <div className="space-y-6 text-2xl font-normal italic leading-relaxed sm:text-3xl sm:leading-snug">
 {founderCallout.paragraphs.map((paragraph) => (
 <p key={paragraph.slice(0, 48)}>{paragraph}</p>
 ))}
 </div>
 <footer className="mt-10 text-base font-bold not-italic tracking-wide text-brand-gold sm:text-lg">
 {founderCallout.signature}
 </footer>
 </blockquote>
 </ScrollReveal>
 </section>

 {/* ── CTA AGIR AVEC NOUS ──────────────────────────────────────── */}
 <section className="bg-surface-muted py-16 sm:py-20">
 <ScrollReveal className="section-shell flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
 <div className="max-w-xl">
 <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green dark:text-brand-gold">Agir avec nous</p>
 <h2 className="mt-3 text-3xl font-extrabold text-brand-blue dark:text-foreground sm:text-4xl">
 Rejoignez le mouvement citoyen DDC RDC.
 </h2>
 <p className="mt-4 text-base leading-8 text-foreground-muted">
 Membre, bénévole, partenaire ou donateur — chaque engagement compte pour transformer
 les communautés congolaises.
 </p>
 </div>
 <div className="flex flex-col gap-3 sm:flex-row">
 <ButtonLink href={siteConfig.donationUrl}>Soutenir notre action</ButtonLink>
 <ButtonLink href="/devenir-membre-benevole" variant="secondary">
 S'engager
 </ButtonLink>
 </div>
 </ScrollReveal>
 </section>

 {/* ── CONTACT ─────────────────────────────────────────────────── */}
 <section id="contact" className="bg-background py-16 sm:py-20">
 <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
 <ScrollReveal direction="left">
 <SectionHeading
 eyebrow="Contact"
 title="Nous écrire, proposer une initiative ou devenir partenaire."
 />
 <div className="mt-8 space-y-4 text-sm text-foreground-muted">
 <p className="flex items-center gap-3">
 <MapPin aria-hidden="true" className="h-5 w-5 text-brand-green" />
 {siteConfig.contact.address}
 </p>
 <p className="flex items-center gap-3">
 <Phone aria-hidden="true" className="h-5 w-5 text-brand-green" />
 {siteConfig.contact.phone}
 </p>
 <p className="flex items-center gap-3">
 <Mail aria-hidden="true" className="h-5 w-5 text-brand-green" />
 {siteConfig.contact.email}
 </p>
 </div>
 </ScrollReveal>
 <ScrollReveal direction="right">
 <ContactForm title="Envoyer un message" idPrefix="home-contact" />
 </ScrollReveal>
 </div>
 </section>
 </>
 );
}
