"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useTranslations } from "next-intl";

import { useAuthStore } from "@/features/account";
import { useCartStore } from "@/features/cart";

import { WEBSITE_EMAIL, WEBSITE_PHONE } from "@/shared/lib/constants/constants";
import { AccountIcon, CartIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./Header.module.scss";

import { Link } from "@/i18n/navigation";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const totalItems = useCartStore((state) => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  });

  const t = useTranslations("header");

  useEffect(() => {
    if (!isInitialized) {
      fetchUser();
    }
  }, [isInitialized, fetchUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${isMobileMenuOpen ? styles.open : ""} ${
        isScrolled ? styles.scrolled : ""
      }`}
    >
      <div className={"container"}>
        <div className={styles.header__top}>
          <div className={styles.header__top__contacts}>
            <Link href={`mailto:${WEBSITE_EMAIL}`}>{WEBSITE_EMAIL}</Link>
            <Link href={`tel:${WEBSITE_PHONE}`}>{WEBSITE_PHONE}</Link>
          </div>
          <div className={styles.header__top__actions}>
            <Link className={styles.header__cart} href="/checkout">
              <CartIcon />
              {totalItems > 0 && (
                <span className={styles.header__mobile_actions__total_items}>
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href={user ? "/account" : "/log-in"}>
              <AccountIcon />
            </Link>
          </div>
        </div>
        <div className={styles.header__row}>
          <Link href="/" className={styles.header__logo}>
            <Image
              src="/images/logo.svg"
              alt="Estanora"
              width={87}
              height={20}
            />
          </Link>

          <div className={styles.header__mobile_actions}>
            <Link className={styles.header__cart} href="/checkout">
              <CartIcon />
              {totalItems > 0 && (
                <span className={styles.header__mobile_actions__total_items}>
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href={user ? "/account" : "/log-in"}>
              <AccountIcon />
            </Link>

            <button
              className={`${styles.header__mobile_menu_button} ${
                isMobileMenuOpen ? styles.open : ""
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Image src="/images/menu.svg" alt="Menu" width={24} height={24} />
            </button>
          </div>

          <nav className={styles.header__menu}>
            <Link
              href="/due-diligence"
              className={pathname === "/due-diligence" ? styles.active : ""}
            >
              {t("due-diligence", { fallback: "Due Diligence" })}
            </Link>
            <Link
              href="/market-research"
              className={pathname === "/market-research" ? styles.active : ""}
            >
              {t("market-research", { fallback: "Market Research" })}
            </Link>
            <Link
              href="/portfolio-services"
              className={
                pathname === "/portfolio-services" ? styles.active : ""
              }
            >
              {t("portfolio-services", { fallback: "Portfolio Services" })}
            </Link>
            <Link
              href="/lease-advisory"
              className={pathname === "/lease-advisory" ? styles.active : ""}
            >
              {t("lease-advisory", { fallback: "Lease Advisory" })}
            </Link>
            <Link
              href="/free-guides"
              className={pathname === "/free-guides" ? styles.active : ""}
            >
              {t("free-guides", { fallback: "Free Guides" })}
            </Link>
            <Button variant="white" url="/contact" type="link">
              {t("contact-us", { fallback: "Contact Us" })}
            </Button>
          </nav>
        </div>
      </div>
      <div
        className={`${styles.header__mobile_menu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <nav>
          <Link
            href="/due-diligence"
            className={pathname === "/due-diligence" ? styles.active : ""}
          >
            {t("due-diligence", { fallback: "Due Diligence" })}
          </Link>
          <Link
            href="/market-research"
            className={pathname === "/market-research" ? styles.active : ""}
          >
            {t("market-research", { fallback: "Market Research" })}
          </Link>
          <Link
            href="/portfolio-services"
            className={pathname === "/portfolio-services" ? styles.active : ""}
          >
            {t("portfolio-services", { fallback: "Portfolio Services" })}
          </Link>
          <Link
            href="/lease-advisory"
            className={pathname === "/lease-advisory" ? styles.active : ""}
          >
            {t("lease-advisory", { fallback: "Lease Advisory" })}
          </Link>
          <Link
            href="/free-guides"
            className={pathname === "/free-guides" ? styles.active : ""}
          >
            {t("free-guides", { fallback: "Free Guides" })}
          </Link>
          <Button variant="white" url="/contact" type="link">
            {t("contact-us", { fallback: "Contact Us" })}
          </Button>
        </nav>
      </div>
    </header>
  );
};
