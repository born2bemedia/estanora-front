"use client";

import { useEffect, useRef, useState } from "react";

import { useLocale } from "next-intl";

import { LangIcon } from "@/shared/ui/icons/header/LangIcon";

import styles from "./LangSelector.module.scss";

import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  de: "German",
  it: "Italian",
  el: "Greek",
};

/** Strip locale segment from pathname. */
function getPathnameWithoutLocale(pathname: string, locales: readonly string[]): string {
  const segments = pathname.replace(/^\/+|\/+$/g, "").split("/");
  const first = segments[0];
  if (first && locales.includes(first)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

/** Build full URL for locale (respects localePrefix: 'as-needed'). */
function getLocalePath(pathWithoutLocale: string, newLocale: string): string {
  const path = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  if (newLocale === routing.defaultLocale) {
    return path || "/";
  }
  return `/${newLocale}${path}`;
}

export const LangSelector = () => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const locales = routing.locales;
  const currentLabel = LOCALE_LABELS[locale] ?? locale;

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const pathWithoutLocale = getPathnameWithoutLocale(pathname, locales);
    const newPath = getLocalePath(pathWithoutLocale, newLocale);
    // Full page navigation so server re-renders with new locale (layout, getLocale, RSC, data)
    if (typeof window !== "undefined") {
      window.location.assign(newPath);
    }
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className={styles.langSelector}>
      <button
        type="button"
        onClick={handleToggle}
        className={styles.langSelectorItemLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={currentLabel}
      >
        <LangIcon />
      </button>
      {isOpen && (
        <div
          className={styles.langSelectorDropdown}
          role="listbox"
          aria-label="Select language"
        >
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              role="option"
              aria-selected={locale === loc}
              onClick={() => handleChange(loc)}
              className={
                locale === loc
                  ? `${styles.langSelectorDropdownItem} ${styles.active}`
                  : styles.langSelectorDropdownItem
              }
            >
              {LOCALE_LABELS[loc] ?? loc}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
