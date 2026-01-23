"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./GuidesHero.module.scss";

export const GuidesHero = () => {
  const t = useTranslations("guidesHero");

  return (
    <section className={styles.guides_hero}>
      <video src="/videos/guides.mp4" autoPlay muted loop playsInline />
      <div className={styles.guides_hero__overlay}></div>
      <div className={"container"}>
        <div className={styles.guides_hero__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.guides_hero__left}
          >
            <h1>
              {t("title1", {
                fallback:
                  "Make the Right Property Decision With Evidence, Not Assumptions",
              })}
            </h1>
            <p>
              {t("description", {
                fallback:
                  "We analyse price reality, structural risks, legal exposure, and market timing so you know exactly when to buy, sell, hold, or restructure. Clarity replaces uncertainty. Strategy replaces guesswork.",
              })}
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.guides_hero__buttons}
          >
            <Button variant="white" url="#" type="link">
              {t("button", { fallback: "Get research" })}
            </Button>
            <Button variant="bordered-black" url="#" type="link">
              {t("button", { fallback: "Get research" })}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
