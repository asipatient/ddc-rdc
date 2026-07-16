'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

const heroImages = [
  "/images/ddc/hero1.jpg",
  "/images/ddc/hero2.jpg",
  "/images/ddc/hero3.jpg",
  "/images/ddc/hero4.jpg",
  "/images/ddc/hero5.jpg",
  "/images/ddc/hero6.jpg",
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
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
          className={`absolute inset-0 transition-opacity duration-[1400ms] ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Hero ${index + 1}`}
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