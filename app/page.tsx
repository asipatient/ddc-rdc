import Image from "next/image";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { AxisCard } from "@/components/AxisCard";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { IconCard } from "@/components/IconCard";
import { IconRenderer } from "@/components/IconRenderer";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProgramCard } from "@/components/ProgramCard";
import { PublicationCard } from "@/components/PublicationCard";
import { RealisationCard } from "@/components/RealisationCard";
import { SectionHeading } from "@/components/SectionHeading";
import {
  axes,
  beneficiaries,
  flagshipPrograms,
  home,
  interventionApproach,
  monitoringLearning,
  newsletterBenefits,
  publications,
  realisations,
  testimonials,
  transparencyDocuments,
  whySupportDdc,
  zonesIntervention
} from "@/lib/site-data";
import { getImpactVerificationBadge, getPublicImpactIndicators, getPublicImpactSection } from "@/lib/impact-content";
import { getPublicSiteConfig } from "@/lib/site-settings";

const priorityAudiences = [
  {
    title: "Jeunes",
    description: "Rejoindre la DDC, se former, proposer des initiatives, devenir leader et acteur du changement.",
    icon: "graduation"
  },
  {
    title: "Femmes",
    description: "Renforcer le leadership, l'autonomisation économique, la protection et la participation citoyenne.",
    icon: "users"
  },
  {
    title: "Communautés locales",
    description: "Agir sur la citoyenneté, la cohésion sociale, la culture, l'environnement, la paix et la résilience.",
    icon: "map"
  },
  {
    title: "Donateurs et partenaires",
    description: "Construire des collaborations crédibles, transparentes et orientées vers l'impact mesurable.",
    icon: "handshake"
  }
] as const;

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const site = await getPublicSiteConfig();
  const impactIndicators = await getPublicImpactIndicators();
  const impactSection = await getPublicImpactSection();

  return (
    <>
      <section className="relative isolate min-h-[82svh] overflow-hidden bg-brand-blue text-white">
        <Image
          src="/images/ddc/hero-reel-ddc.jpg"
          alt="Activité institutionnelle de la DDC RDC avec des jeunes et acteurs de la société civile"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,53,88,0.97)_0%,rgba(11,53,88,0.86)_48%,rgba(11,53,88,0.28)_100%)]" />
        <div className="section-shell relative flex min-h-[82svh] items-center py-20">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">{site.legalName}</p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{home.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">{home.heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={site.donationUrl}>Faire un don</ButtonLink>
              <ButtonLink href="/programmes" variant="outline">
                Découvrir nos programmes
              </ButtonLink>
              <ButtonLink href="/partenaires" variant="outline">
                Devenir partenaire
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="positionnement" className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading eyebrow="Plateforme institutionnelle" title="Une organisation congolaise crédible, citoyenne et orientée impact." />
          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>{home.reason}</p>
            <p>{home.reasonFollowUp}</p>
          </div>
        </div>
        <div className="section-shell mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {priorityAudiences.map((audience) => (
            <IconCard key={audience.title} title={audience.title} description={audience.description} icon={audience.icon} />
          ))}
        </div>
      </section>

      <section id="impact" className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={impactSection.title}
              title={impactSection.subtitle}
              description={impactSection.text}
            />
            <ButtonLink href={impactSection.buttonHref} variant="secondary">
              {impactSection.buttonLabel}
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactIndicators.map((indicator) => (
              <article key={indicator.label} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-goldSoft text-brand-blue">
                    <IconRenderer icon={indicator.icon} className="h-5 w-5" />
                  </div>
                  <p className="text-3xl font-black text-brand-blue">{indicator.value}</p>
                </div>
                <h2 className="mt-5 text-base font-black text-brand-blue">{indicator.label}</h2>
                {getImpactVerificationBadge(indicator.verificationStatus) ? (
                  <p className="mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                    {getImpactVerificationBadge(indicator.verificationStatus)}
                  </p>
                ) : null}
                <p className="mt-2 text-sm leading-6 text-slate-500">{indicator.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="axes" className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Axes d'intervention"
              title="Trois axes pour organiser les programmes et clarifier les priorités."
              description="Chaque axe relie les besoins des publics cibles à des programmes concrets, adaptables et mesurables."
            />
            <ButtonLink href="/axes-intervention" variant="secondary">
              Explorer les axes
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {axes.map((axis) => (
              <AxisCard
                key={axis.slug}
                axis={axis}
                programs={flagshipPrograms.filter((program) => axis.programSlugs.includes(program.slug))}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="programmes" className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Programmes"
              title="Des programmes pour former, accompagner, documenter et mobiliser."
            />
            <ButtonLink href="/programmes" variant="secondary">
              Découvrir nos programmes
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {flagshipPrograms.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      <section id="realisations" className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Réalisations"
              title="Des activités documentées auprès des jeunes, femmes, enfants et communautés."
            />
            <ButtonLink href="/realisations" variant="secondary">
              Voir nos réalisations
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {realisations.slice(0, 3).map((realisation) => (
              <RealisationCard key={realisation.slug} realisation={realisation} compact />
            ))}
          </div>
        </div>
      </section>

      <section id="soutenir" className="bg-brand-blue py-16 text-white sm:py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Pourquoi soutenir la DDC ?"
              title="Un appui à la citoyenneté, au leadership, à la paix et à la résilience."
              description="Soutenir la DDC, c'est renforcer une plateforme congolaise qui travaille avec les publics capables de porter un changement durable."
              className="[&_h2]:text-white [&_p:not(.eyebrow)]:text-white/75"
            />
            <ButtonLink href={site.donationUrl}>Faire un don</ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whySupportDdc.map((argument) => (
              <article key={argument.title} className="rounded-lg border border-white/10 bg-white/10 p-5">
                <IconRenderer icon={argument.icon} className="h-6 w-6 text-brand-gold" />
                <h2 className="mt-4 text-lg font-black text-white">{argument.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/75">{argument.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approche" className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Approche d'intervention"
              title="Une méthode de travail proche des réalités locales."
              description={zonesIntervention.description}
            />
            <div className="mt-8 flex min-h-64 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-brand-mist p-8 text-center">
              <div>
                <IconRenderer icon="map" className="mx-auto h-10 w-10 text-brand-green" />
                <h3 className="mt-4 text-2xl font-black text-brand-blue">Carte d&apos;intervention à intégrer</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Bukavu, Sud-Kivu, RDC - expansion locale, nationale et africaine.</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {interventionApproach.slice(0, 12).map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 p-5">
                <IconRenderer icon={item.icon} className="h-5 w-5 text-brand-green" />
                <h3 className="mt-3 text-base font-black text-brand-blue">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="transparence" className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Transparence et redevabilité"
              title="Un espace prêt pour les rapports, politiques et documents publics."
              description={monitoringLearning.intro}
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/documents-institutionnels" variant="secondary">
                Documents institutionnels
              </ButtonLink>
              <ButtonLink href="/impact" variant="ghost">
                Suivi-évaluation
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-3">
            {transparencyDocuments.slice(0, 6).map((document) => (
              <div key={document.title} className="flex items-start gap-3 rounded-lg bg-white p-5 shadow-sm">
                <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-brand-green" />
                <div>
                  <h3 className="text-base font-black text-brand-blue">{document.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{document.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="temoignages" className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Témoignages"
            title="Des récits à documenter avec les bénéficiaires, partenaires et leaders communautaires."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {testimonials.map((testimonial) => (
              <article key={testimonial.title} className="rounded-lg border border-slate-200 p-5">
                <h2 className="text-base font-black text-brand-blue">{testimonial.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{testimonial.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficiaires" className="bg-brand-mist py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Publics cibles"
            title="Des jeunes, femmes, enfants et communautés au coeur de la transformation."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {beneficiaries.slice(0, 6).map((beneficiary) => (
              <article key={beneficiary.title} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-black text-brand-blue">{beneficiary.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{beneficiary.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Publications" title="Actualités, rapports, notes de plaidoyer et documents à suivre." />
            <ButtonLink href="/publications" variant="secondary">
              Lire nos publications
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {publications.slice(0, 3).map((publication) => (
              <PublicationCard key={publication.slug} publication={publication} />
            ))}
          </div>
        </div>
      </section>

      <section id="newsletter" className="bg-brand-green py-16 text-white sm:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">Newsletter</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Suivre les programmes, opportunités et rapports.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {newsletterBenefits.map((benefit) => (
                <p key={benefit} className="flex items-center gap-2 text-sm font-semibold text-white/80">
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-brand-gold" />
                  {benefit}
                </p>
              ))}
            </div>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section id="contact" className="bg-white py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Contact" title="Nous contacter, proposer une initiative ou devenir partenaire." />
            <div className="mt-8 space-y-4 text-sm text-slate-700">
              <p className="flex items-center gap-3">
                <MapPin aria-hidden="true" className="h-5 w-5 text-brand-green" />
                {site.contact.address}
              </p>
              <p className="flex items-center gap-3">
                <Phone aria-hidden="true" className="h-5 w-5 text-brand-green" />
                {site.contact.phone}
              </p>
              <p className="flex items-center gap-3">
                <Mail aria-hidden="true" className="h-5 w-5 text-brand-green" />
                {site.contact.email}
              </p>
            </div>
          </div>
          <ContactForm title="Envoyer un message" idPrefix="home-contact" />
        </div>
      </section>
    </>
  );
}
