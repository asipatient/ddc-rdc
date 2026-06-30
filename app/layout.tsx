import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { ThemeProvider } from "@/components/ThemeProvider";
import { site } from "@/lib/site-data";
import { getPublicSiteConfig } from "@/lib/site-settings";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} - ${site.slogan}`,
    template: `%s | ${site.shortName}`
  },
  description: site.description,
  keywords: [
    "DDC RDC",
    "Dynamique Debout Congolais",
    "jeunesse congolaise",
    "femmes",
    "citoyenneté",
    "développement communautaire",
    "ASBL RDC"
  ],
  openGraph: {
    title: `${site.shortName} - ${site.slogan}`,
    description: site.description,
    locale: "fr_CD",
    siteName: site.shortName,
    images: [{ url: "/images/ddc/hero-reel-ddc.jpg", width: 1600, height: 900 }]
  },
  icons: {
    icon: site.favicon,
    apple: site.logo
  },
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
      en: "/en"
    }
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = await getPublicSiteConfig();

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
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
