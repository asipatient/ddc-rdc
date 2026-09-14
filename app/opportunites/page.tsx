import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Handshake, Users, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";

export const metadata: Metadata = {
  title: "S'engager avec la DDC RDC",
  description: "Découvrez comment vous engager avec la DDC RDC : devenir membre ou bénévole, ou construire un partenariat autour de nos actions."
};

export default function OpportunitiesPage() {
  return (
    <>
      <PageHero
        kicker="S'engager"
        title="Engagez-vous avec la DDC RDC"
        description="Vous pouvez contribuer à la dynamique de la DDC RDC en rejoignant nos actions comme membre ou bénévole, ou en construisant un partenariat avec nous."
        cta={{ label: "Devenir membre ou bénévole", href: "/devenir-membre-benevole" }}
        image="/images/ddc/IMG-20260131-WA0181.jpg"
      />
      
      <section className="bg-background py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell">
            <SectionHeading
              eyebrow="Agir avec nous"
              title="Deux façons de s'engager"
              description="Selon votre rôle et vos possibilités, vous pouvez vous engager directement dans la dynamique de la DDC RDC ou construire une collaboration avec l'organisation."
            />
            
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Link href="/devenir-membre-benevole" className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm transition-all hover:border-brand-green/30 hover:shadow-md sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-mist text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white dark:bg-surface-muted dark:text-brand-gold dark:group-hover:bg-accent dark:group-hover:text-white">
                    <Users className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-brand-blue dark:text-foreground">
                    Devenir membre ou bénévole
                  </h3>
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground-muted">
                  Rejoignez la DDC RDC et contribuez à ses activités selon vos possibilités et vos domaines d'intérêt.
                </p>
                <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-brand-green transition-colors group-hover:text-brand-blue dark:text-foreground-muted dark:group-hover:text-foreground">
                  Découvrir comment s'engager
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>

              <Link href="/partenaires" className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm transition-all hover:border-brand-blue/30 hover:shadow-md sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-mist text-brand-blue transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white dark:bg-surface-muted dark:text-brand-gold dark:group-hover:bg-accent dark:group-hover:text-white">
                    <Handshake className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-brand-blue dark:text-foreground">
                    Devenir partenaire
                  </h3>
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground-muted">
                  Construisez une collaboration avec la DDC RDC pour soutenir ou développer des initiatives en lien avec nos domaines d'action.
                </p>
                <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-brand-blue transition-colors group-hover:text-brand-blueLight dark:text-foreground-muted dark:group-hover:text-foreground">
                  Proposer un partenariat
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <ScrollReveal>
          <div className="section-shell">
            <SectionHeading
              eyebrow="Appels ponctuels"
              title="Pas d'appel spécifique actuellement"
              description="Il n'y a pas d'appel à projets ou d'appel à candidatures spécifique publié pour le moment. Les prochains appels seront publiés sur nos canaux officiels."
            />
            <div className="mt-8">
              <ButtonLink href="/publications" variant="outline">
                Lire nos actualités
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
