"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import { isOrderCompleted, type Order } from "@/features/account/model/orders.types";
import { useAuthStore } from "@/features/account/store/auth";
import { useAllServices } from "@/features/services/lib/get-all-services";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./MyOrdersPage.module.scss";

import { useRouter } from "@/i18n/navigation";

type OrderRow = {
  orderId: string;
  orderNumber: string;
  date: string;
  service: string;
  quantity: number;
  total: number;
  status: string;
  order: Order;
};

function formatDate(createdAt: string): string {
  try {
    const d = new Date(createdAt);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).replace(/\//g, ".");
  } catch {
    return createdAt;
  }
}

function formatNumber(value: number): string {
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const MyOrdersPage = () => {
  const t = useTranslations("myOrdersPage");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
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
        const res = await fetch("/api/account/orders", { credentials: "include" });
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

  const rows: OrderRow[] = orders.map((order) => {
    const orderNumber = order.orderNumber ?? order.id;
    const date = formatDate(order.createdAt);
    const status = order.status ?? "Pending";
    const service = (order.items?.map((item) => {
      const productTitle = item.product ?? "—";
      return getLocalizedTitle(productTitle);
    }) ?? []).join("\n") || "—";
    const quantity = order.items?.reduce((sum, item) => sum + (item.quantity ?? 0), 0) ?? 0;
    const total = order.total ?? 0;
    return {
      orderId: order.id,
      orderNumber,
      date,
      service,
      quantity,
      total,
      status,
      order,
    };
  });


  if (!isInitialized || !user) {
    return (
      <section className={styles.section}>
        <div className="container">
          <p className={styles.loadingText}>{t("loading", { fallback: "Loading..." })}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
        <h1 className={styles.title}>{t("title", { fallback: "My Orders" })}</h1>
        {loading ? (
          <p className={styles.loadingText}>{t("loading", { fallback: "Loading orders..." })}</p>
        ) : rows.length === 0 ? (
          <p className={styles.empty}>{t("noOrders", { fallback: "You have no orders yet." })}</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t("date", { fallback: "Date" })}</th>
                  <th>{t("orderId", { fallback: "Order ID" })}</th>
                  <th>{t("service", { fallback: "Service" })}</th>
                  {/**<th>{t("quantity", { fallback: "Quantity" })}</th> */}
                  <th>{t("total", { fallback: "Total, €" })}</th>
                  <th>{t("status", { fallback: "Status" })}</th>
                  <th>{t("invoice", { fallback: "Invoice" })}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.orderId}>
                    <td className={styles.date}>{row.date}</td>
                    <td className={styles.orderNumber}>{row.orderNumber}</td>
                    <td className={styles.serviceCell}>{row.service}</td>
                    {/**<td className={styles.quantity}>{row.quantity}</td> */}
                    <td className={styles.total}>{formatNumber(row.total)}</td>
                    <td className={styles.status}>{row.status}</td>
                    <td className={styles.invoice}>
                      {isOrderCompleted(row.status) && row.order.invoiceDownloadUrl ? (
                        <Button
                          url={row.order.invoiceDownloadUrl}
                          variant="white"
                          type="link"
                        >
                          {t("download", { fallback: "Download" })}
                        </Button>
                      ) : (
                        <span className={styles.downloadBtnDisabled}>{t("download", { fallback: "Download" })}</span>
                      )}
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
