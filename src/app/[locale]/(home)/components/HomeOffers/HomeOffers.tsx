"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { CheckIcon } from "@/shared/ui/icons/check";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./HomeOffers.module.scss";

export const HomeOffers = () => {
  const t = useTranslations("homeOffers");
  const { openRequest } = useFormsPopup();

  const offers = [
    {
      id: 1,
      title: t("offer1", {
        fallback: "Acquisition",
      }),
      price: "€7,500",
      details: [
        {
          title: t("offer1detail1", {
            fallback: "Valuation:",
          }),
          description: t("offer1detail1description", {
            fallback: "Market price verification and negotiation strategy.",
          }),
        },
        {
          title: t("offer1detail2", {
            fallback: "Technical Audit:",
          }),
          description: t("offer1detail2description", {
            fallback: "Structural survey and renovation cost estimates.",
          }),
        },
        {
          title: t("offer1detail3", {
            fallback: "Risk Mapping:",
          }),
          description: t("offer1detail3description", {
            fallback: "Legal, environmental, and climate risk analysis.",
          }),
        },
        {
          title: t("offer1detail4", {
            fallback: "Feasibility:",
          }),
          description: t("offer1detail4description", {
            fallback: "Legal study of co-buying or future resale options.",
          }),
        },
      ],
    },
    {
      id: 2,
      title: t("offer2", {
        fallback: "Selling",
      }),
      price: "€5,500",
      details: [
        {
          title: t("offer2detail1", {
            fallback: "Market Forecast:",
          }),
          description: t("offer2detail1description", {
            fallback: "Data-backed timing (Sell vs. Wait).",
          }),
        },
        {
          title: t("offer2detail2", {
            fallback: "Listing Audit:",
          }),
          description: t("offer2detail2description", {
            fallback: "Diagnosis of why the property is not selling.",
          }),
        },
        {
          title: t("offer2detail3", {
            fallback: "Financial Modeling:",
          }),
          description: t("offer2detail3description", {
            fallback: "Tax and cost analysis for relocation.",
          }),
        },
        {
          title: t("offer2detail4", {
            fallback: "Value Prep:",
          }),
          description: t("offer2detail4description", {
            fallback: "Recommendations to increase price before listing.",
          }),
        },
      ],
    },
    {
      id: 3,
      title: t("offer3", {
        fallback: "Legacy",
      }),
      price: "€15,500",
      details: [
        {
          title: t("offer3detail1", {
            fallback: "Inheritance Plan:",
          }),
          description: t("offer3detail1description", {
            fallback: "Financial and legal strategy for multi-heir assets.",
          }),
        },
        {
          title: t("offer3detail2", {
            fallback: "Equity Strategy:",
          }),
          description: t("offer3detail2description", {
            fallback: "Planning for downsizing and cash release.",
          }),
        },
        {
          title: t("offer3detail3", {
            fallback: "Asset Review:",
          }),
          description: t("offer3detail3description", {
            fallback: "Performance and tax audit for multiple properties.",
          }),
        },
        {
          title: t("offer3detail4", {
            fallback: "Hold/Sell Analysis:",
          }),
          description: t("offer3detail4description", {
            fallback: "Long-term wealth preservation modeling.",
          }),
        },
      ],
    },
    {
      id: 4,
      title: t("offer4", {
        fallback: "Investment",
      }),
      price: "€10,500",
      details: [
        {
          title: t("offer4detail1", {
            fallback: "Strategy Mix:",
          }),
          description: t("offer4detail1description", {
            fallback: "Profit comparison of short-term vs. long-term rental.",
          }),
        },
        {
          title: t("offer4detail2", {
            fallback: "Compliance:",
          }),
          description: t("offer4detail2description", {
            fallback: "Legal review of contracts and local rental regulations.",
          }),
        },
        {
          title: t("offer4detail3", {
            fallback: "Conversion Study:",
          }),
          description: t("offer4detail3description", {
            fallback: "Feasibility for basement or garage monetization.",
          }),
        },
        {
          title: t("offer4detail4", {
            fallback: "Cost Audit:",
          }),
          description: t("offer4detail4description", {
            fallback: "Strategy to reduce maintenance and management overhead.",
          }),
        },
      ],
    },
  ];

  return (
    <>
    <section className={styles.home_offers}>
      <div className={"container"}>
        <h2>{t("title", { fallback: "Our top offers" })}</h2>
        <div className={styles.home_offers__content}>
          {offers.map((offer) => (
            <motion.div
              key={offer.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.home_offers__item}
            >
              <div className={styles.home_offers__item__header}>
                <h3>{offer.title}</h3>
                <p>
                  <span>
                    {t("from", { fallback: "from" })}{" "}
                    /{" "}
                  </span>
                  {offer.price}
                </p>
              </div>
              <Button variant="black" type="button" onClick={() => openRequest(offer.title)}>
                {t("button", { fallback: "Order" })}
              </Button>
              <ul>
                {offer.details.map((detail) => (
                  <li key={detail.title}>
                    <span>
                      <CheckIcon />
                    </span>
                    <p>
                      <b>{detail.title}</b>
                      <br />
                      {detail.description}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};
