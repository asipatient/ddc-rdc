"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
  priority?: boolean;
  variant?: "default" | "footer";
}

export function Logo({ className = "", priority = false, variant = "default" }: LogoProps) {
  if (variant === "footer") {
    return (
      <Image
        src="/images/logos/ddc-logo-rect2.svg"
        alt="Logo DDC RDC - Dynamique Debout Congolais"
        width={220}
        height={88}
        className={`object-contain ${className}`}
        priority={priority}
      />
    );
  }

  return (
    <>
      <Image
        src="/images/logos/ddc-logo-rect.svg"
        alt="Logo DDC RDC - Dynamique Debout Congolais"
        width={220}
        height={88}
        className={`dark:hidden object-contain ${className}`}
        priority={priority}
      />
      <Image
        src="/images/logos/ddc-logo-rect2.svg"
        alt="Logo DDC RDC - Dynamique Debout Congolais"
        width={220}
        height={88}
        className={`hidden dark:block object-contain ${className}`}
        priority={priority}
      />
    </>
  );
}
