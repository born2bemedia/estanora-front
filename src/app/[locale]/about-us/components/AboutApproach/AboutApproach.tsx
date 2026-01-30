"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./AboutApproach.module.scss";

export const AboutApproach = () => {
  const t = useTranslations("aboutApproach");

  return (
    <section className={styles.about_approach}>
      <div className={"container"}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.about_approach__header}
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
        <div className={styles.about_approach__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.about_approach__item}
          >
            <span>1</span>
            <div>
              <h3>{t("approach1", { fallback: "Initial Case Review" })}</h3>
              <p>
                {t("text1", {
                  fallback:
                    "We review your situation, objective, and any available documentation to identify the core decision at stake.",
                })}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.about_approach__item}
          >
            <span>2</span>
            <div>
              <h3>
                {t("approach2", {
                  fallback: "Risk and Variable Identification",
                })}
              </h3>
              <p>
                {t("text2", {
                  fallback:
                    "We determine which factors materially affect the outcome: pricing, liquidity, regulation, technical condition, financing, or timing.",
                })}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.about_approach__item}
          >
            <span>3</span>
            <div>
              <h3>{t("approach3", { fallback: "Scope Recommendation" })}</h3>
              <p>
                {t("text3", {
                  fallback:
                    "You receive a clear recommendation on the appropriate next step — due diligence, market research, portfolio review, or no action.",
                })}
              </p>
              <p>
                {t("text4", { fallback: "We will explicitly state when:" })}
              </p>
              <ul>
                <li>
                  {t("text5", { fallback: "The risk profile is unfavourable" })}
                </li>
                <li>
                  {t("text6", {
                    fallback: "Assumptions are not supported by data",
                  })}
                </li>
                <li>
                  {t("text7", {
                    fallback: "Delaying action is strategically preferable",
                  })}
                </li>
              </ul>
              <p>
                {t("text8", {
                  fallback:
                    "Our role is to reduce uncertainty — not to facilitate transactions.",
                })}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
