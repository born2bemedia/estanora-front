"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./AboutCta.module.scss";

export const AboutCta = () => {
  const t = useTranslations("aboutCta");

  return (
    <section className={styles.about_cta}>
      <video src="/videos/guide-cta.mp4" autoPlay muted loop playsInline />
      <div className={"container"}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.about_cta__content}
        >
          <h2>
            {t("title", { fallback: "Property decisions deserve responsibility, " })}
            <br />
            {t("title2", { fallback: "not assumptions." })}
          </h2>
          <Button variant="white" url="/contact" type="link">
            {t("button", { fallback: "Contact Estanora" })}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
