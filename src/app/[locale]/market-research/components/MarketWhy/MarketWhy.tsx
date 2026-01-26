"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./MarketWhy.module.scss";

export const MarketWhy = () => {
  const t = useTranslations("marketResearchWhy");

  return (
    <section className={styles.market_why}>
      <div className={"container"}>
        <div className={styles.market_why__content}>
          <div className={styles.market_why__col}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("title", { fallback: "Why Research?" })}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("description", {
                fallback:
                  "Market data transforms speculation into strategy across every stage of your property journey. Whether you are buying, selling, or developing, our research identifies hidden risks and growth trends to maximize your financial outcome.",
              })}
            </motion.p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.market_why__image}
          >
            <Image
              src="/images/market-research/why.png"
              alt="Market Research Why"
              width={531}
              height={531}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
