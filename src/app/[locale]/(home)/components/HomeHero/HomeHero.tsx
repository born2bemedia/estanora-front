"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./HomeHero.module.scss";

export const HomeHero = () => {
  const t = useTranslations("homeHero");

  return (
    <section className={styles.home_hero}>
      <video
        src="/videos/home-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/home/hero.webp"
      />
      <div className={styles.home_hero__overlay}></div>
      <div className={"container"}>
        <div className={styles.home_hero__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.home_hero__left}
          >
            <div className={styles.tips}>
              <span></span>
              <p>{t("tip1", { fallback: "Buy" })}</p>
              <p>{t("tip2", { fallback: "Sell" })}</p>
              <p>{t("tip3", { fallback: "Manage" })}</p>
              <p>{t("tip4", { fallback: "Profit" })}</p>
            </div>
            <h1>
              {t("title1", {
                fallback: "Estanora | Expert",
              })}
              <br />
              {t("title2", {
                fallback: "Real Estate Advice",
              })}
            </h1>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.home_hero__right}
          >
            <h2>{t("subtitle", { fallback: "How hot is the market?" })}</h2>
            <Button variant="white" url="#" type="link">
              {t("button", { fallback: "Get research" })}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
