"use client";

import { useState } from "react";
import { Facebook, Twitter, Link as LinkIcon, Check } from "lucide-react";

const SITE_ORIGIN = "https://ddcrdc.org";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_ORIGIN}/publications/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for browsers that block clipboard API
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-brand-blue transition hover:border-brand-gold hover:text-brand-blue"
        aria-label="Partager sur Facebook"
      >
        <Facebook aria-hidden="true" className="h-4 w-4" />
        Facebook
      </a>

      <a
        href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-brand-blue transition hover:border-brand-gold hover:text-brand-blue"
        aria-label="Partager sur X (Twitter)"
      >
        <Twitter aria-hidden="true" className="h-4 w-4" />X
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="focus-ring inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-brand-blue transition hover:border-brand-gold hover:text-brand-blue"
        aria-label="Copier le lien"
      >
        {copied ? (
          <>
            <Check aria-hidden="true" className="h-4 w-4 text-brand-green" />
            Lien copié !
          </>
        ) : (
          <>
            <LinkIcon aria-hidden="true" className="h-4 w-4" />
            Copier le lien
          </>
        )}
      </button>
    </div>
  );
}
