import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";

type PageHeroProps = {
  kicker: string;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  image?: string;
};

/**
 * Mapping page → image DDC RDC pertinente.
 * Utilisé si aucune image n'est passée explicitement.
 */
const DEFAULT_IMAGE = "/images/ddc/hero3.jpg";

export function PageHero({ kicker, title, description, cta, image = DEFAULT_IMAGE }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-blue text-white">
      {/* Image de fond avec faible opacité */}
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="hero-kenburns object-cover object-center"
      />

      {/* Dégradé bleu marine → violet indigo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(11,53,88,0.95) 0%, rgba(13,48,92,0.86) 42%, rgba(23,32,86,0.68) 72%, rgba(30,20,80,0.55) 100%)"
        }}
      />

      {/* Grain subtil pour profondeur */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      <div className="section-shell relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl">
          <div className="anim-fade-down">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">{kicker}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
          </div>
          <p className="anim-fade-down anim-delay-200 mt-6 max-w-3xl text-lg leading-9 text-white/80">{description}</p>
          {cta ? (
            <div className="anim-fade-up anim-delay-400 mt-8">
              <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
            </div>
          ) : null}
        </div>
      </div>

      {/* Liseré doré en bas */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
    </section>
  );
}
