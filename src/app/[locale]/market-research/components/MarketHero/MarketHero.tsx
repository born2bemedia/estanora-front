"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./MarketHero.module.scss";

export const MarketHero = () => {
  const t = useTranslations("marketResearchHero");

  return (
    <section className={styles.market_hero}>
      <video
        src="/videos/market-research.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/market-research/hero.webp"
      />
      <div className={styles.market_hero__overlay}></div>
      <div className={"container"}>
        <div className={styles.market_hero__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.market_hero__left}
          >
            <h1>
              {t("title1", {
                fallback: "Market Research:",
              })}
              <br />
              {t("title2", {
                fallback: "The Intelligence Behind the Location",
              })}
            </h1>
            <p>
              {t("description", {
                fallback:
                  "Don’t just buy a house; invest in a lifestyle and a financial future.",
              })}
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.market_hero__buttons}
          >
            <Button variant="white" url="#" type="link">
              {t("button", { fallback: "Order research" })}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
