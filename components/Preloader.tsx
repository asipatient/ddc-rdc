"use client";

import { useEffect, useState } from "react";

/**
 * Préchargeur plein écran (anneau tournant) affiché pendant le chargement
 * initial de la page, puis masqué en fondu. Repli de sécurité à 4 s pour
 * ne jamais bloquer la page si l'évènement load tarde.
 */
export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>;

    const hide = () => {
      setHidden(true);
      fadeTimer = setTimeout(() => setRemoved(true), 700);
    };

    if (document.readyState === "complete") {
      hide();
      return () => clearTimeout(fadeTimer);
    }

    const fallbackTimer = setTimeout(hide, 4000);
    const onLoad = () => {
      clearTimeout(fallbackTimer);
      hide();
    };
    window.addEventListener("load", onLoad);

    return () => {
      clearTimeout(fallbackTimer);
      clearTimeout(fadeTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (removed) return null;

  return <div id="preloader" className={hidden ? "preloader-hidden" : undefined} aria-hidden="true" />;
}
