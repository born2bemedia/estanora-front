"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./PortfolioHero.module.scss";

export const PortfolioHero = () => {
  const t = useTranslations("portfolioServicesHero");
  const { openMarketResearch   } = useFormsPopup();

  return (
    <section className={styles.portfolio_hero}>
      <video
        src="/videos/portfolio-services.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/portfolio-services/hero.webp"
      />
      <div className={styles.portfolio_hero__overlay}></div>
      <div className={"container"}>
        <div className={styles.portfolio_hero__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.portfolio_hero__left}
          >
            <h1>
              {t("title1", {
                fallback: "Portfolio Strategy:",
              })}
              <br />
              {t("title2", {
                fallback: "Maximize the Value of Your Legacy",
              })}
            </h1>
            <p>
              {t("description", {
                fallback:
                  "Manage your real estate as a high-performing asset. ",
              })}
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.portfolio_hero__buttons}
          >
            <Button variant="white" type="button" onClick={openMarketResearch}>
              {t("button", { fallback: "Order portfolio audit" })}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
