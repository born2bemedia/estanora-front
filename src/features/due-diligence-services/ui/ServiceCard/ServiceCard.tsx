"use client";

import { useTranslations } from "next-intl";

import { useCartStore } from "@/features/cart";

import { Button } from "@/shared/ui/kit/button/Button";

import { OrderableService, PurchasableService } from "../../model/types";
import styles from "./ServiceCard.module.scss";

export const PurchasableServiceCard = ({
  service,
}: {
  service: PurchasableService;
}) => {
  const t = useTranslations("dueDiligenceServices");
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className={styles.service_card}>
      <div className={styles.service_card__header}>
        <h3>{service.title}</h3>
        <p>{service.subtitle}</p>
      </div>
      <p className={styles.service_card__description}>{service.description}</p>
      <h4>{t("consultation", { fallback: "Expert Consultation:" })}:</h4>
      <p className={styles.service_card__price}>
        {t("per", { fallback: "per hour" })} / <span>€{service.price}</span>
      </p>
      <p className={styles.service_card__note}>{service.note}</p>
      <Button
        variant="white"
        type="button"
        onClick={() => {
          addToCart({
            id: service.id,
            title: service.title,
            price: service.price,
            quantity: 1,
          });
        }}
      >
        {t("buy", { fallback: "Buy" })}
      </Button>
    </div>
  );
};

export const OrderableServiceCard = ({
  service,
}: {
  service: OrderableService;
}) => {
  const t = useTranslations("dueDiligenceServices");

  return (
    <div className={styles.service_card + " " + styles.orderable_service_card}>
      <div className={styles.service_card__header}>
        <h3>{service.title}</h3>
        <p className={styles.service_card__price}>
          {t("from", { fallback: "from" })} / <span>€{service.price}</span>
        </p>
      </div>
      <p className={styles.service_card__description}>
        {service.includes ? (
          <span className={styles.service_card__includes}>
            {t("includes", { fallback: "Includes:" })}
          </span>
        ) : null}
        {service.description}
      </p>
      <Button
        variant="white"
        type="button"
        onClick={() => {
          console.log(service.id);
        }}
      >
        {t("order", { fallback: "Order" })}
      </Button>
    </div>
  );
};
