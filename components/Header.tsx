"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation, site } from "@/lib/site-data";
import { ButtonLink } from "@/components/ButtonLink";
import { ThemeToggle } from "@/components/ThemeToggle";

type HeaderSiteConfig = typeof site;

export function Header({ siteConfig = site }: { siteConfig?: HeaderSiteConfig }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-40 border-b backdrop-blur">
      <div className="section-shell flex min-h-20 items-center justify-between gap-3">
        <Link href="/" className="focus-ring flex shrink-0 items-center rounded-md" aria-label="Accueil DDC RDC">
          <Image
            src={siteConfig.logo}
            alt="Logo DDC RDC"
            width={56}
            height={56}
            className="site-header-logo h-12 w-12 object-contain sm:h-14 sm:w-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navigation.map((item) =>
            "items" in item ? (
              <div key={item.label} className="group relative">
                <button className="site-header-link focus-ring inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-bold transition">
                  {item.label}
                  <ChevronDown aria-hidden="true" className="h-4 w-4" />
                </button>
                <div className="site-header-dropdown invisible absolute left-0 top-full w-64 translate-y-2 rounded-lg border p-2 opacity-0 shadow-soft transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.items.map((subItem) =>
                    subItem.external ? (
                      <a
                        key={subItem.href}
                        href={subItem.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="site-header-dropdown-link focus-ring block rounded-md px-3 py-2 text-sm font-semibold transition"
                      >
                        {subItem.label}
                      </a>
                    ) : (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="site-header-dropdown-link focus-ring block rounded-md px-3 py-2 text-sm font-semibold transition"
                      >
                        {subItem.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="site-header-link site-header-nav-link focus-ring inline-flex min-h-11 items-center rounded-md px-3 text-sm font-bold transition"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <ThemeToggle />
          <ButtonLink href={siteConfig.donationUrl} className="px-4">
            Faire un don
          </ButtonLink>
          <ButtonLink href="/devenir-membre-benevole" variant="secondary" className="px-4">
            Rejoindre
          </ButtonLink>
        </div>

        <ThemeToggle className="ml-auto xl:hidden" />

        <button
          type="button"
          className="site-header-icon-button focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          title={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <nav id="mobile-menu" className="site-mobile-menu border-t lg:hidden" aria-label="Navigation mobile">
          <div className="section-shell py-4">
            <div className="grid gap-3">
              {navigation.map((item) =>
                "items" in item ? (
                  <details key={item.label} className="site-mobile-menu-group rounded-md border px-4 py-3">
                    <summary className="cursor-pointer text-sm font-black">{item.label}</summary>
                    <div className="mt-3 grid gap-1">
                      {item.items.map((subItem) =>
                        subItem.external ? (
                          <a
                            key={subItem.href}
                            href={subItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="site-mobile-menu-link focus-ring rounded-md px-2 py-2 text-sm font-semibold"
                          >
                            {subItem.label}
                          </a>
                        ) : (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className="site-mobile-menu-link focus-ring rounded-md px-2 py-2 text-sm font-semibold"
                          >
                            {subItem.label}
                          </Link>
                        )
                      )}
                    </div>
                  </details>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="site-mobile-menu-link focus-ring rounded-md border px-4 py-3 text-sm font-black"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
            <div className="mt-4">
              <ButtonLink href={siteConfig.donationUrl} className="w-full">
                Faire un don
              </ButtonLink>
            </div>
            <div className="mt-3">
              <ButtonLink href="/devenir-membre-benevole" variant="secondary" className="w-full">
                Rejoindre la DDC
              </ButtonLink>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
