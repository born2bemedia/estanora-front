"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/features/account/store/auth";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./AccountPage.module.scss";

import { useRouter } from "@/i18n/navigation";

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
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <h1>My account</h1>
        <div className={styles.card}>
          <p><strong>Email:</strong> {user.email ?? "—"}</p>
          <p><strong>First name:</strong> {user.firstName ?? "—"}</p>
          <p><strong>Last name:</strong> {user.lastName ?? "—"}</p>
          {user.phone != null && user.phone !== "" && (
            <p><strong>Phone:</strong> {user.phone}</p>
          )}
        </div>
        <Button type="button" onClick={handleLogout} variant="white">
          Log out
        </Button>
      </div>
    </section>
  );
};
