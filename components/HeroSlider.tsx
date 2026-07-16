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
    // Conteneur principal : plein écran
    <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,53,88,0.94)_0%,rgba(11,53,88,0.75)_45%,rgba(11,53,88,0.30)_75%,rgba(11,53,88,0.12)_100%)]" >
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
            // quality retiré pour éviter l'avertissement
          />
        </div>
      ))}
    </div>
  );
}