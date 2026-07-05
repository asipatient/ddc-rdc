"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Anime automatiquement les images du contenu (fondu + légère montée)
 * lorsqu'elles entrent dans le viewport, sur tout le site.
 * Exclut les héros (déjà animés), respecte prefers-reduced-motion.
 */
export function ScrollRevealAuto() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = Array.from(
      document.querySelectorAll("main img:not(.hero-kenburns)")
    ).filter((el) => !el.classList.contains("sr-auto-in"));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          el.style.transitionDelay = Math.min(batchIndex * 70, 350) + "ms";
          el.classList.add("sr-auto-in");
          batchIndex += 1;
          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -24px 0px" }
    );

    targets.forEach((el) => {
      el.classList.add("sr-auto");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
