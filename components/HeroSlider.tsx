'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

const heroImages = [
  "/images/ddc/groupe-partenaires-ddc.jpg",
  "/images/ddc/hero1.jpg",
  "/images/ddc/hero2.jpg",
  "/images/ddc/hero3.jpg",
  "/images/ddc/hero4.jpg",
];

const altTexts = [
  "Groupe de partenaires et membres de la DDC RDC",
  "Actions citoyennes sur le terrain",
  "Engagement des jeunes dans les communautés",
  "Sensibilisation et formation des femmes",
  "Équipe en action sur le terrain"
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Do not start the automatic slider
    }

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Conteneur principal : plein écran. Le dégradé de marque est appliqué
    // une seule fois, par le parent (voir app/page.tsx), pour éviter de
    // superposer deux calques identiques au-dessus des photos.
    <div className="absolute inset-0">
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-[1400ms] motion-reduce:transition-none ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={altTexts[index]}
            fill
            className="object-cover object-[50%_40%]"
            priority={index === 0}
            sizes="100vw"
            quality={85}
          />
        </div>
      ))}
    </div>
  );
}