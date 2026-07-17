import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { ThemeProvider } from "@/components/ThemeProvider";
import { site } from "@/lib/site-data";
import { getPublicSiteConfig } from "@/lib/site-settings";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap"
});

const themeInitScript = `
(function () {
  try {
    var storedTheme = localStorage.getItem("ddc-theme");
    var systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = storedTheme || (systemPrefersDark ? "dark" : "light");
    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
  } catch (error) {}
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Dynamique Debout Congolais",
  legalName: "Dynamique Debout Congolais",
  alternateName: "DDC RDC",
  foundingDate: "2022-01-05",
  url: "https://ddcrdc.org",
  logo: "https://ddcrdc.org/images/logos/logo-ddc.png",
  description:
    "Association Sans But Lucratif (ASBL) de droit congolais, engagée pour l'autonomisation des jeunes, des femmes et des communautés au Sud-Kivu, RDC.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Nyarwizimia 019, Quartier Panzi, Commune d'Ibanda",
    addressLocality: "Bukavu",
    addressRegion: "Sud-Kivu",
    addressCountry: "CD"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+243992588137",
    email: "ddc.democratie@gmail.com"
  },
  sameAs: ["https://www.facebook.com/ddcrdc", "https://x.com/ddcrdc"]
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — ${site.slogan}`,
    template: `%s | ${site.shortName}`
  },
  description:
    "La DDC RDC mobilise la jeunesse et les femmes de Bukavu pour bâtir des communautés responsables, inclusives et engagées dans la transformation de la RDC.",
  keywords: [
    "DDC RDC",
    "Dynamique Debout Congolais",
    "jeunesse congolaise",
    "femmes autonomisation",
    "citoyenneté",
    "Bukavu",
    "Sud-Kivu",
    "développement communautaire RDC"
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: `${site.shortName} — ${site.slogan}`,
    description: site.description,
    locale: "fr_CD",
    type: "website",
    siteName: site.shortName,
    images: [{ url: "/images/ddc/hero-reel-ddc.jpg", width: 1600, height: 900, alt: "DDC RDC" }]
  },
  twitter: {
    card: "summary_large_image",
    site: "@ddcrdc",
    title: `${site.shortName} — ${site.slogan}`,
    description: site.description
  },
  icons: {
    icon: site.favicon,
    apple: site.logo
  },
  alternates: {
    canonical: site.url,
    languages: { fr: site.url }
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = await getPublicSiteConfig();

  return (
    <html lang="fr" suppressHydrationWarning className={plusJakartaSans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={plusJakartaSans.className}>
        <ThemeProvider>
          <a
            href="#contenu"
            className="focus-ring sr-only z-50 rounded-md bg-brand-blue px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 dark:bg-brand-gold dark:text-brand-blue"
          >
            Aller au contenu
          </a>
          <SiteChrome siteConfig={siteConfig}>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
