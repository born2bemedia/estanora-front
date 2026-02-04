"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import type { Order, OrderItem } from "@/features/account/model/orders.types";
import { useAuthStore } from "@/features/account/store/auth";
import { useAllServices } from "@/features/services/lib/get-all-services";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./AccountPage.module.scss";

import { useRouter } from "@/i18n/navigation";

type ServiceRow = {
  orderId: string;
  itemIndex: number;
  service: string;
  description: string | undefined;
};

export const AccountPage = () => {
  const t = useTranslations("accountPage");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const { getDescriptionByTitle } = useAllServices();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isInitialized) return;
    if (!user) {
      router.replace("/log-in");
    }
  }, [isInitialized, user, router]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/account/orders", {
          credentials: "include",
        });
        const data = (await res.json()) as { orders?: Order[] };
        if (!cancelled) setOrders(data.orders ?? []);
      } catch {
        if (!cancelled) setOrders([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows: ServiceRow[] = [];
  for (const order of orders) {
    for (let i = 0; i < (order.items?.length ?? 0); i++) {
      const item = order.items![i];
      const serviceTitle = item.product ?? "—";
      rows.push({
        orderId: order.id,
        itemIndex: i,
        service: serviceTitle,
        description: getDescriptionByTitle(serviceTitle),
      });
    }
  }

  if (!isInitialized || !user) {
    return (
      <section className={styles.section}>
        <p className={styles.loadingText}>
          {t("loading", { fallback: "Loading..." })}
        </p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{t("title", { fallback: "My orders" })}</h1>
      {loading ? (
        <p className={styles.loadingText}>
          {t("loading", { fallback: "Loading..." })}
        </p>
      ) : rows.length === 0 ? (
        <p className={styles.empty}>
          {t("noServices", { fallback: "You have no orders yet." })}
        </p>
      ) : (
        <div className={styles.orders}>
          {rows.slice(0, 2).map((row) => (
            <div className={styles.order} key={`${row.orderId}-${row.itemIndex}`}>
              <h3 className={styles.serviceName}>{row.service}</h3>
              {row.description && (
                <p className={styles.description}>{row.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      <p className={styles.back}>
        <Button url="/account/my-orders" variant="white" type="link">
          {t("allOrders", { fallback: "Check all orders" })}
        </Button>
      </p>
    </section>
  );
};
