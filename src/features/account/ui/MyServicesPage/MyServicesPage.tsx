"use client";

import { useEffect, useState } from "react";

import type { Order, OrderItem } from "@/features/account/model/orders.types";
import { useAuthStore } from "@/features/account/store/auth";
import { useCartStore } from "@/features/cart/store/cart";

import styles from "./MyServicesPage.module.scss";

import { Link, useRouter } from "@/i18n/navigation";

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
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/\//g, ".");
  } catch {
    return createdAt;
  }
}

export const MyServicesPage = () => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const addToCart = useCartStore((s) => s.addToCart);
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

  const rows: ServiceRow[] = [];
  for (const order of orders) {
    const date = formatDate(order.createdAt);
    for (let i = 0; i < (order.items?.length ?? 0); i++) {
      const item = order.items![i];
      rows.push({
        orderId: order.id,
        itemIndex: i,
        service: item.product ?? "—",
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
        <div className="container">
          <p className={styles.loadingText}>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>My Services</h1>
        {loading ? (
          <p className={styles.loadingText}>Loading...</p>
        ) : rows.length === 0 ? (
          <p className={styles.empty}>You have no services yet.</p>
        ) : (
          <div className={styles.list}>
            {rows.map((row) => (
              <article key={`${row.orderId}-${row.itemIndex}`} className={styles.card}>
                <div className={styles.cardRow}>
                  <div className={styles.cardCol}>
                    <span className={styles.label}>Service</span>
                    <span className={styles.value}>{row.service}</span>
                  </div>
                  <div className={styles.cardCol}>
                    <span className={styles.label}>Date</span>
                    <span className={styles.value}>{row.date}</span>
                  </div>
                </div>
                <div className={styles.cardCol}>
                  <span className={styles.label}>Documents</span>
                  <div className={styles.documents}>
                    {row.documents.length > 0 ? (
                      <>
                        {row.documents.map((doc, i) => (
                          <a
                            key={i}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.docLink}
                            download
                          >
                            {doc.name}
                          </a>
                        ))}
                        <p className={styles.docNote}>The documents are downloadable</p>
                      </>
                    ) : (
                      <span className={styles.value}>—</span>
                    )}
                  </div>
                </div>
                <div className={styles.cardColManage}>
                  <span className={styles.label}>Manage</span>
                  <button
                    type="button"
                    className={styles.orderAgainBtn}
                    onClick={() => handleOrderAgain(row)}
                  >
                    Order Again
                  </button>
                  <p className={styles.orderAgainNote}>The button adds the service to the cart</p>
                </div>
              </article>
            ))}
          </div>
        )}
        <p className={styles.back}>
          <Link href="/account" className={styles.backLink}>
            ← Back to account
          </Link>
        </p>
      </div>
    </section>
  );
};
