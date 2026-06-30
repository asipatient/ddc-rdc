"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ddc-theme";
const THEME_CHANGE_EVENT = "ddc-theme-change";

type Theme = "light" | "dark";

function setDocumentTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => "light");

  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={theme === "dark"}
      suppressHydrationWarning
      onClick={() => {
        setDocumentTheme(nextTheme);
        localStorage.setItem(STORAGE_KEY, nextTheme);
      }}
      className={cn(
        "focus-ring relative inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-brand-blue transition hover:border-brand-gold hover:bg-brand-blueSoft dark:border-slate-700 dark:bg-slate-900 dark:text-brand-gold dark:hover:border-brand-gold dark:hover:bg-slate-800",
        className
      )}
    >
      <Sun aria-hidden="true" className="h-5 w-5 scale-100 rotate-0 transition dark:scale-0 dark:-rotate-90" />
      <Moon aria-hidden="true" className="absolute h-5 w-5 scale-0 rotate-90 transition dark:scale-100 dark:rotate-0" />
    </button>
  );
}
