"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/features/account/store/auth";

import styles from "./AccountPage.module.scss";

import { Link, useRouter } from "@/i18n/navigation";

export const AccountPage = () => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isLoading = useAuthStore((s) => s.isLoading);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isInitialized || isLoading) return;
    if (!user) {
      router.replace("/log-in");
    }
  }, [isInitialized, isLoading, user, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/log-in");
  };

  if (!isInitialized || isLoading || !user) {
    return (
      <section className={styles.section}>
        <div className="container">
          <p className={styles.loading}>Loading...</p>
        </div>
      </section>
    );
  }

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "there";

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.greeting}>Hi, {displayName}!</h1>
        <nav className={styles.nav}>
          <Link href="/account/my-orders" className={styles.linkButton}>
            My Orders
          </Link>
          <Link href="/account/my-services" className={styles.linkButton}>
            My Services
          </Link>
          <Link href="/account/account-settings" className={styles.linkButton}>
            Account Setting
          </Link>
          <button type="button" onClick={handleLogout} className={styles.logout}>
            Log Out
          </button>
        </nav>
      </div>
    </section>
  );
};
