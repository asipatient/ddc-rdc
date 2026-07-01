"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealDirection = "up" | "left" | "right";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: ScrollRevealDirection;
  delayMs?: number;
  as?: ElementType;
};

const directionClasses: Record<ScrollRevealDirection, string> = {
  up: "translate-y-6",
  left: "-translate-x-6",
  right: "translate-x-6"
};

/**
 * Anime l'entrée d'un bloc au scroll (fade-in + déplacement léger).
 * Respecte prefers-reduced-motion via motion-reduce:*.
 */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delayMs = 0,
  as: Component = "div"
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
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
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none",
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${directionClasses[direction]}`,
        className
      )}
      style={
        delayMs && !isVisible
          ? { transitionDelay: `${delayMs}ms` }
          : undefined
      }
    >
      {children}
    </Component>
  );
}
