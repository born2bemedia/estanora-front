"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./LeaseDifference.module.scss";

export const LeaseDifference = () => {
  const t = useTranslations("leaseAdvisoryDifference");

  return (
    <section className={styles.lease_difference}>
      <div className={"container"}>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {t("title", { fallback: "What’s the difference?" })}
        </motion.h2>
        <div className={styles.lease_difference__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.lease_difference__col}
          >
            <div className={styles.lease_difference__col_item}>
              <h3>
                {t("subtitle1", { fallback: "15-Minute Intro Call (Free)" })}
              </h3>
              <p>
                {t("description1", {
                  fallback:
                    "A brief session to discuss your case details. We help you identify the right specialist and service for your needs.",
                })}
              </p>
            </div>
            <div className={styles.lease_difference__col_item}>
              <div>
                <h4>{t("goal", { fallback: "Goal" })}</h4>
                <p>
                  {t("goalDescription1", {
                    fallback: "Choosing the right service.",
                  })}
                </p>
              </div>
              <div>
                <h4>{t("note", { fallback: "Note" })}</h4>
                <p>
                  {t("noteDescription1", {
                    fallback: "No professional advice or solutions provided.",
                  })}
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.lease_difference__col}
          >
            <div className={styles.lease_difference__col_item}>
              <h3>
                {t("subtitle2", { fallback: "Expert Consultation (450 EUR)" })}
              </h3>
              <p>
                {t("description2", {
                  fallback:
                    "A deep-dive session focused entirely on solving your problem. We analyze your documents and provide actionable data.",
                })}
              </p>
            </div>
              <div className={styles.lease_difference__col_item}>
              <div>
                <h4>{t("goal", { fallback: "Goal" })}</h4>
                <p>
                  {t("goalDescription2", {
                    fallback: "Resolving your case.",
                  })}
                </p>
              </div>
              <div>
                <h4>{t("note", { fallback: "Note" })}</h4>
                <p>
                  {t("noteDescription2", {
                    fallback:
                      "Up to 30% of our clients find their solution during this session and require no further services.",
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
