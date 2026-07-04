"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bouton flottant de retour en haut de page.
 * - Apparaît après un écran de défilement (~600px)
 * - Défilement doux, sauf si prefers-reduced-motion
 * - Accessible au clavier, libellé explicite
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className={cn(
        "focus-ring fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full",
        "bg-brand-blue text-white shadow-soft",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:bg-brand-green",
        "dark:bg-white dark:text-brand-blue dark:hover:bg-brand-gold",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}
