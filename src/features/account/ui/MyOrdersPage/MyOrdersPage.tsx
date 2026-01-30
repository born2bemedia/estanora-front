"use client";

import { useEffect, useState } from "react";

import { isOrderCompleted, type Order } from "@/features/account/model/orders.types";
import { useAuthStore } from "@/features/account/store/auth";

import styles from "./MyOrdersPage.module.scss";

import { Link, useRouter } from "@/i18n/navigation";

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
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
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
    const service = (order.items?.map((item) => item.product ?? "—") ?? []).join("\n") || "—";
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
          <p className={styles.loadingText}>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>My Orders</h1>
        {loading ? (
          <p className={styles.loadingText}>Loading orders...</p>
        ) : rows.length === 0 ? (
          <p className={styles.empty}>You have no orders yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Service</th>
                  <th>Quantity</th>
                  <th>Total, €</th>
                  <th>Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.orderId}>
                    <td>{row.date}</td>
                    <td>{row.orderNumber}</td>
                    <td className={styles.serviceCell}>{row.service}</td>
                    <td>{row.quantity}</td>
                    <td>{formatNumber(row.total)}</td>
                    <td>{row.status}</td>
                    <td>
                      {isOrderCompleted(row.status) && row.order.invoiceDownloadUrl ? (
                        <a
                          href={row.order.invoiceDownloadUrl}
                          className={styles.downloadBtn}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          Download
                        </a>
                      ) : (
                        <span className={styles.downloadBtnDisabled}>Download</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className={styles.back}>
          <Link href="/account" className={styles.backLink}>← Back to account</Link>
        </p>
      </div>
    </section>
  );
};
