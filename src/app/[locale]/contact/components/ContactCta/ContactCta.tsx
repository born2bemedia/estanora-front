"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./ContactCta.module.scss";

export const ContactCta = () => {
  const t = useTranslations("contactCta");

  return (
    <section className={styles.contactCta}>
      <video src="/videos/guide-cta.mp4" autoPlay muted loop playsInline />
      <div className={"container"}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.contactCta__content}
        >
          <h2>
            {t("title", { fallback: "Complex property decisions " })}
            <br />
            {t("title2", { fallback: "require clarity, not assumptions." })}
          </h2>
          <p>
            {t("description", {
              fallback:
                "If you need independent validation before committing capital, this is the correct starting point.",
            })}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
