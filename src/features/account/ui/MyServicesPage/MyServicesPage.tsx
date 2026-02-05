"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import type { Order, OrderItem } from "@/features/account/model/orders.types";
import { useAuthStore } from "@/features/account/store/auth";
import { useCartStore } from "@/features/cart/store/cart";
import { useAllServices } from "@/features/services/lib/get-all-services";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./MyServicesPage.module.scss";

import { useRouter } from "@/i18n/navigation";

type ServiceRow = {
  orderId: string;
  itemIndex: number;
  service: string;
  date: string;
  documents: { name: string; url: string }[];
  item: OrderItem;
  order: Order;
};

function formatDate(createdAt: string): string {
  try {
    const d = new Date(createdAt);
    return d
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");
  } catch {
    return createdAt;
  }
}

export const MyServicesPage = () => {
  const t = useTranslations("myServicesPage");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const addToCart = useCartStore((s) => s.addToCart);
  const { getLocalizedTitle } = useAllServices();
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
    const date = formatDate(order.createdAt);
    for (let i = 0; i < (order.items?.length ?? 0); i++) {
      const item = order.items![i];
      const productTitle = item.product ?? "—";
      const localizedTitle = getLocalizedTitle(productTitle);
      rows.push({
        orderId: order.id,
        itemIndex: i,
        service: localizedTitle,
        date,
        documents: item.filesWithUrl ?? [],
        item,
        order,
      });
    }
  }

  const handleOrderAgain = (row: ServiceRow) => {
    const cartId = `${row.orderId}-${row.itemIndex}`;
    addToCart({
      id: cartId,
      title: row.service,
      price: row.item.price ?? 0,
      quantity: 1,
    });
  };

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
      <h1 className={styles.title}>
        {t("title", { fallback: "My Services" })}
      </h1>
      {loading ? (
        <p className={styles.loadingText}>
          {t("loading", { fallback: "Loading..." })}
        </p>
      ) : rows.length === 0 ? (
        <p className={styles.empty}>
          {t("noServices", { fallback: "You have no services yet." })}
        </p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("service", { fallback: "Service" })}</th>
                <th>{t("date", { fallback: "Date" })}</th>
                <th>{t("documents", { fallback: "Documents" })}</th>
                <th>{t("manage", { fallback: "Manage" })}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.orderId}-${row.itemIndex}`}>
                  <td className={styles.serviceCell}>{row.service}</td>
                  <td className={styles.date}>{row.date}</td>
                  <td className={styles.documentsCell}>
                    {row.documents.length > 0 ? (
                      <div className={styles.documents}>
                        {row.documents.map((doc, i) => (
                          <a
                            key={i}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.docLink}
                            download
                          >
                            {t("document", { fallback: "Document" })} {i + 1}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                  <td className={styles.manage}>
                    <Button
                      type="button"
                      variant="white"
                      onClick={() => handleOrderAgain(row)}
                    >
                      {t("orderAgain", { fallback: "Order Again" })}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className={styles.back}>
        <Button url="/account" variant="bordered-black" type="link">
          {t("backToAccount", { fallback: "← Back to account" })}
        </Button>
      </p>
    </section>
  );
};
