"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  durationMs?: number;
};

export function CountUp({ value, durationMs = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const match = value.match(/([\d][\d\s\u00a0.,]*)/);
    if (!match || typeof match.index !== "number") {
      return;
    }

    const prefix = value.slice(0, match.index);
    const rawNumber = match[1];
    const suffix = value.slice(match.index + rawNumber.length);
    const target = Number(rawNumber.replace(/[\s\u00a0,.]/g, ""));

    if (!Number.isFinite(target) || target <= 0) {
      return;
    }

    const usesGrouping = /[\s\u00a0,.]/.test(rawNumber.trim());
    const formatNumber = (n: number) =>
      usesGrouping ? n.toLocaleString("fr-FR") : String(n);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let hasStarted = false;

    const animate = () => {
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(prefix + formatNumber(Math.round(target * eased)) + suffix);

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            hasStarted = true;
            observer.unobserve(entry.target);
            animate();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return <span ref={ref}>{display}</span>;
}
