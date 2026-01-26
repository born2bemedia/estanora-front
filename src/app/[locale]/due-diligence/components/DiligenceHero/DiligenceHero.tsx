"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./DiligenceHero.module.scss";

export const DiligenceHero = () => {
  const t = useTranslations("diligenceHero");

  return (
    <section className={styles.diligence_hero}>
      <video src="/videos/diligence.mp4" autoPlay muted loop playsInline />
      <div className={styles.diligence_hero__overlay}></div>
      <div className={"container"}>
        <div className={styles.diligence_hero__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.diligence_hero__left}
          >
            <h1>
              {t("title1", {
                fallback: "Verify the Property Before You Pay",
              })}
            </h1>
            <p>
              {t("description", {
                fallback:
                  "Stop guessing. We run the technical and legal checks so you don’t buy an expensive mistake",
              })}
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.diligence_hero__buttons}
          >
            <Button variant="white" url="#" type="link">
              {t("button", { fallback: "Order audit" })}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
