"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./PortfolioWhy.module.scss";

export const PortfolioWhy = () => {
  const t = useTranslations("portfolioServicesWhy");

  return (
    <section className={styles.portfolio_why}>
      <div className={"container"}>
        <div className={styles.portfolio_why__content}>
          <div className={styles.portfolio_why__col}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("title", { fallback: "Why Manage Portfolio?" })}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("description", {
                fallback:
                  "Passive ownership often leads to tax leakage and missed growth opportunities. Professional portfolio management ensures your assets are physically sound, tax-optimized, and strategically aligned with your family’s long-term financial goals.",
              })}
            </motion.p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.portfolio_why__image}
          >
            <Image
              src="/images/portfolio-services/why.png"
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
