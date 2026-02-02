"use client";

import { AccountNavigation } from "@/features/account/ui/AccountNavigation/AccountNavigation";

import styles from "./layout.module.scss";

import { usePathname } from "@/i18n/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname();
  return (
    <section className={styles.accountLayout}>
      <div className="container">
        <div className={styles.accountLayout__body}>
          <AccountNavigation />
          <div className={`${styles.accountLayout__content} ${pathname === "/account" ? styles.mainPage : ""}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}
