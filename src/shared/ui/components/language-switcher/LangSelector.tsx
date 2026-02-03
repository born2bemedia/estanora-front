"use client";

import { useEffect, useRef, useState } from "react";

import { useLocale } from "next-intl";

import { LangIcon } from "@/shared/ui/icons/header/LangIcon";

import styles from "./LangSelector.module.scss";

import { useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  de: "Deutsch",
  it: "Italiano",
};

/** Strip locale segment from pathname so we never get e.g. /it/de */
function getPathnameWithoutLocale(pathname: string, locales: readonly string[]): string {
  const segments = pathname.replace(/^\/+|\/+$/g, "").split("/");
  const first = segments[0];
  if (first && locales.includes(first)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

export const LangSelector = () => {
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const locales = routing.locales;
  const currentLabel = LOCALE_LABELS[locale] ?? locale;

  const handleChange = (newLocale: string) => {
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const pathWithoutLocale = getPathnameWithoutLocale(pathname, locales);
    router.push(pathWithoutLocale, { locale: newLocale });
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
