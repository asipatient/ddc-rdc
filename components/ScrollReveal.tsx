"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealDirection = "up" | "left" | "right";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: ScrollRevealDirection;
  delayMs?: number;
  as?: keyof JSX.IntrinsicElements;
};

const directionClasses: Record<ScrollRevealDirection, string> = {
  up: "translate-y-6",
  left: "-translate-x-6",
  right: "translate-x-6"
};

/**
 * Anime légèrement l'entrée d'un bloc lorsqu'il devient visible au scroll
 * (fade-in + léger déplacement). Respecte automatiquement
 * prefers-reduced-motion via la classe globale .animate-fade-up
 * désactivée dans globals.css.
 */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delayMs = 0,
  as = "div"
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = as as any;

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none",
        isVisible ? "translate-x-0 translate-y-0 opacity-100" : `opacity-0 ${directionClasses[direction]}`,
        className
      )}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
