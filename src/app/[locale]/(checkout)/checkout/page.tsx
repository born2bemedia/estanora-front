"use client";

import { useCartStore } from "@/features/cart";
import { CheckoutForm } from "@/features/cart/ui/CheckoutForm/CheckoutForm";
import { EmptyCart } from "@/features/cart/ui/EmptyCart/EmptyCart";
import { EmptyCta } from "@/features/cart/ui/EmptyCta/EmptyCta";

import styles from "./page.module.scss";

export default function CheckoutPage() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const isEmpty = totalItems === 0;
  return (
    <>
      <section className={styles.checkout}>
        <div className={"container"}>
          {isEmpty ? (
            <>
              <EmptyCart />
              <EmptyCta />
            </>
          ) : (
            <CheckoutForm />
          )}
        </div>
      </section>
    </>
  );
}
