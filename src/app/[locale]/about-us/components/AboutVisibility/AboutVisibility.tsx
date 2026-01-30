"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./AboutVisibility.module.scss";

export const AboutVisibility = () => {
  const t = useTranslations("aboutVisibility");

  const items = [
    {
      title: t("item1", { fallback: "Market Reality" }),
      description: t("item1Description", {
        fallback: "Pricing, liquidity, and timing signals",
      }),
    },
    {
      title: t("item2", { fallback: "Technical Condition" }),
      description: t("item2Description", {
        fallback: "Structural, energy, and maintenance exposure",
      }),
    },
    {
      title: t("item3", { fallback: "Legal Context" }),
      description: t("item3Description", {
        fallback: "Ownership, compliance, and contractual risks",
      }),
    },
    {
      title: t("item4", { fallback: "Financial Impact" }),
      description: t("item4Description", {
        fallback: "Cash flow, costs, and capital implications",
      }),
    },
  ];

  return (
    <section className={styles.about_visibility}>
      <video src="/videos/guide-cta.mp4" autoPlay muted loop playsInline />
      <div className={"container"}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.about_visibility__header}
        >
          <h2>{t("title", { fallback: "How We Approach Every Request" })}</h2>
          <p>
            {t("description1", {
              fallback:
                "We treat all incoming requests as analytical cases, not sales enquiries.",
            })}
            <br />
            {t("description2", {
              fallback: "Our process is structured as follows:",
            })}
          </p>
        </motion.div>
        <div className={styles.about_visibility__content}>
          {items.map((item) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.about_visibility__item}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
