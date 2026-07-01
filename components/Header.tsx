"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/lib/site-data";
import { ButtonLink } from "@/components/ButtonLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/data/types";

type HeaderSiteConfig = typeof site;

function NavDropdown({ label, items }: { label: string; items: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="site-header-link focus-ring inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-bold transition"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown aria-hidden="true" className="h-4 w-4" />
      </button>
      <div
        className={cn(
          "site-header-dropdown absolute left-0 top-full w-64 rounded-lg border p-2 shadow-soft transition",
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
        )}
      >
        {items.map((subItem) =>
          subItem.external ? (
            <a
              key={subItem.href}
              href={subItem.href}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header-dropdown-link focus-ring block rounded-md px-3 py-2 text-sm font-semibold transition"
              onClick={() => setOpen(false)}
            >
              {subItem.label}
            </a>
          ) : (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="site-header-dropdown-link focus-ring block rounded-md px-3 py-2 text-sm font-semibold transition"
              onClick={() => setOpen(false)}
            >
              {subItem.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}

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
              <NavDropdown key={item.label} label={item.label} items={item.items} />
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
