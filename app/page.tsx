import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { AxisCard } from "@/components/AxisCard";
import { ButtonLink } from "@/components/ButtonLink";
import { CountUp } from "@/components/CountUp";
import { CountUp } from "@/components/CountUp";
import { ContactForm } from "@/components/ContactForm";
import { PublicationCard } from "@/components/PublicationCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { axes, flagshipPrograms, publications } from "@/lib/site-data";
import { getPublicSiteConfig } from "@/lib/site-settings";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: "Accueil",
  description:
    "La DDC RDC mobilise la jeunesse et les femmes de Bukavu pour bâtir des communautés responsables, inclusives et engagées dans la transformation de la RDC.",
  path: "/"
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const siteConfig = await getPublicSiteConfig();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[88svh] overflow-hidden bg-brand-blue text-white">
        <Image
          src="/images/ddc/hero-reel-ddc.jpg"
          alt="Membres de la DDC RDC réunis lors d'une activité citoyenne à Bukavu"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,53,88,0.97)_0%,rgba(11,53,88,0.82)_55%,rgba(11,53,88,0.20)_100%)]" />
        <div className="section-shell relative flex min-h-[88svh] items-center py-24">
          <div className="max-w-2xl animate-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">
              Bukavu · Sud-Kivu · RDC
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] sm:text-5xl lg:text-6xl">
              Jeunesse et femmes debout pour transformer le Congo.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              La DDC RDC éveille, forme et mobilise les jeunes, les femmes et les communautés congolaises
              pour bâtir un Congo plus juste, inclusif et durable.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/a-propos">Qui sommes-nous ?</ButtonLink>
              <ButtonLink href="/axes-intervention" variant="outline">
                Nos axes d&apos;intervention
              </ButtonLink>
              <ButtonLink href={siteConfig.donationUrl} variant="outline">
                Soutenir la DDC
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── POSITIONNEMENT RAPIDE ────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16">
        <ScrollReveal className="section-shell grid gap-8 lg:grid-cols-3">
          {[
            {
              stat: "2016",
              label: "Premières formations",
              detail: "20 jeunes formés dès 2016 à Bukavu — le point de départ d'un engagement structuré."
            },
            {
              stat: "11",
              label: "Domaines d'action",
              detail: "Citoyenneté, leadership, VBG, environnement, culture, recherche, enfance et plus."
            },
            {
              stat: "3",
              label: "Axes stratégiques",
              detail: "Trois axes complémentaires pour organiser les programmes et mesurer l'impact."
            }
          ].map((item, i) => (
            <ScrollReveal key={item.stat} delayMs={i * 100} className="rounded-lg bg-brand-mist p-8">
              <p className="text-4xl font-black text-brand-blue"><CountUp value={item.stat} /></p>
              <p className="mt-2 text-lg font-black text-brand-blue">{item.label}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
            </ScrollReveal>
          ))}
        </ScrollReveal>
      </section>

      {/* ── AXES D'INTERVENTION ─────────────────────────────────────── */}
      <section id="axes" className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <ScrollReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Axes d'intervention"
              title="Trois axes pour organiser nos programmes et clarifier nos priorités."
              description="Chaque axe relie les besoins des publics cibles à des programmes concrets, adaptables et mesurables."
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
      <section id="publications" className="bg-white py-16 sm:py-20">
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

      {/* ── CTA AGIR AVEC NOUS ──────────────────────────────────────── */}
      <section className="bg-brand-blue py-16 text-white sm:py-20">
        <ScrollReveal className="section-shell flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">Agir avec nous</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Rejoignez le mouvement citoyen DDC RDC.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/75">
              Membre, bénévole, partenaire ou donateur — chaque engagement compte pour transformer
              les communautés congolaises.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.donationUrl}>Faire un don</ButtonLink>
            <ButtonLink href="/devenir-membre-benevole" variant="outline">
              Devenir membre
            </ButtonLink>
          </div>
        </ScrollReveal>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact" className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal direction="left">
            <SectionHeading
              eyebrow="Contact"
              title="Nous écrire, proposer une initiative ou devenir partenaire."
            />
            <div className="mt-8 space-y-4 text-sm text-slate-700">
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
