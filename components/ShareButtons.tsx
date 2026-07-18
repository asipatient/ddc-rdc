"use client";

import { useState } from "react";
import { Check, Copy, Facebook, Twitter } from "lucide-react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-bold text-brand-blue">Partager :</span>
      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur Facebook"
        className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-brand-blue transition hover:border-brand-gold hover:text-brand-green"
      >
        <Facebook aria-hidden="true" className="h-4 w-4" />
      </a>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur X"
        className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-brand-blue transition hover:border-brand-gold hover:text-brand-green"
      >
        <Twitter aria-hidden="true" className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="Copier le lien"
        className="focus-ring inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-bold text-brand-blue transition hover:border-brand-gold hover:text-brand-green"
      >
        {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
        {copied ? "Lien copié !" : "Copier le lien"}
      </button>
    </div>
  );
}
