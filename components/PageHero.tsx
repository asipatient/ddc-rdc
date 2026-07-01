import { ButtonLink } from "@/components/ButtonLink";

type PageHeroProps = {
  kicker: string;
  title: string;
  description: string;
  location?: string;
  cta?: { label: string; href: string };
};

export function PageHero({ kicker, title, description, location, cta }: PageHeroProps) {
  return (
    <section className="bg-brand-blue text-white">
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl animate-fade-up">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">{kicker}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {location ? <p className="mt-2 text-xs uppercase tracking-wider text-white/60">{location}</p> : null}
          <p className="mt-6 max-w-3xl text-lg leading-9 text-white/80">{description}</p>
          {cta ? (
            <div className="mt-8">
              <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
