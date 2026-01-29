"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./LeaseHero.module.scss";

export const LeaseHero = () => {
  const t = useTranslations("leaseAdvisoryHero");

  return (
    <section className={styles.lease_hero}>
      <video src="/videos/market-research.mp4" autoPlay muted loop playsInline />
      <div className={styles.lease_hero__overlay}></div>
      <div className={"container"}>
        <div className={styles.lease_hero__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.lease_hero__left}
          >
            <h1>
              {t("title1", {
                fallback: "Lease Advisory:",
              })}
              <br />
              {t("title2", {
                fallback: "Optimize Your Rental Strategy",
              })}
            </h1>
            <p>
              {t("description", {
                fallback:
                  "Maximize your income and minimize legal risks.",
              })}
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.lease_hero__buttons}
          >
            <Button variant="white" url="#" type="link">
              {t("button", { fallback: "Order rental audit" })}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
