"use client";

import { usePathname } from "next/navigation";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollRevealAuto } from "@/components/ScrollRevealAuto";

export function SiteChrome({ children, siteConfig }: { children: React.ReactNode; siteConfig?: React.ComponentProps<typeof Header>["siteConfig"] }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main id="contenu">{children}</main>;
  }

  return (
    <>
      <Header siteConfig={siteConfig} />
      <ScrollRevealAuto />
      <main id="contenu">{children}</main>
      <Footer siteConfig={siteConfig} />
      <BackToTop />
    </>
  );
}
