"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./AboutAnalytics.module.scss";

export const AboutAnalytics = () => {
  const t = useTranslations("aboutAnalytics");

  return (
    <section className={styles.about_analytics}>
      <div className={"container"}>
        <div className={styles.about_analytics__content}>
          <div className={styles.about_analytics__col}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("title", {
                fallback: "Responsible Use of Advanced Analytics and AI",
              })}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("description", {
                fallback:
                  "We use AI and advanced data tools to test market scenarios and ensure accuracy. This technology provides deeper analysis and faster results under professional oversight.",
              })}
            </motion.p>
            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("title2", {
                fallback: "What this enables ",
              })}
            </motion.h3>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <li>
                {t("item1", {
                  fallback:
                    "Scenario modelling under different market conditions",
                })}
              </li>
              <li>
                {t("item2", {
                  fallback:
                    "Sensitivity analysis for price, rent, and cost assumptions",
                })}
              </li>
              <li>
                {t("item3", {
                  fallback:
                    "Identification of anomalies and risk concentrations",
                })}
              </li>
              <li>
                {t("item4", {
                  fallback:
                    "Data-supported forecasts where sufficient evidence exists",
                })}
              </li>
            </motion.ul>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.about_analytics__image}
          >
            <Image
              src="/images/about/analytics.png"
              alt="About Analytics"
              width={531}
              height={531}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
