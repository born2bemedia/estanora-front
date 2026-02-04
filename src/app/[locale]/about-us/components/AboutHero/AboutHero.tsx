"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms/model/store";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./AboutHero.module.scss";

export const AboutHero = () => {
  const t = useTranslations("aboutHero");
  const { openMarketResearch } = useFormsPopup(); 
  return (
    <section className={styles.about_hero}>
      <video
        src="/videos/about.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/about/hero.webp"
      />
      <div className={styles.about_hero__overlay}></div>
      <div className={"container"}>
        <div className={styles.about_hero__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.about_hero__left}
          >
            <h1>
              {t("title1", {
                fallback:
                  "Responsible Property Decisions",
              })}
            </h1>
            <p>
              {t("description", {
                fallback:
                  "Independent real estate consulting for private property owners across Europe and the UK.",
              })}
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.about_hero__buttons}
          >
            <Button variant="white" url="#" type="button" onClick={openMarketResearch}>
              {t("button1", { fallback: "Request analysis" })}
            </Button>
            <Button variant="bordered-black" url="#services" type="link">
              {t("button2", { fallback: "View services" })}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
