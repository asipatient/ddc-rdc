import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white py-24">
      <div className="section-shell max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-green">Page introuvable</p>
        <h1 className="mt-4 text-4xl font-black text-brand-blue">La page demandée n&apos;existe pas.</h1>
        <p className="mt-4 leading-8 text-slate-600">Vous pouvez revenir à l&apos;accueil ou consulter les publications disponibles.</p>
        <div className="mt-8">
          <Link className="focus-ring inline-flex rounded-md bg-brand-blue px-5 py-3 text-sm font-bold text-white hover:bg-brand-green" href="/">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
