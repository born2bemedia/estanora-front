"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./GuidesCta.module.scss";

export const GuidesCta = () => {
  const t = useTranslations("guidesCta");

  return (
    <section className={styles.guides_cta}>
      <video src="/videos/guide-cta.mp4" autoPlay muted loop playsInline />
      <div className={"container"}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.guides_cta__content}
        >
          <h2>
            {t("title", { fallback: "Not sure what’s blocking " })}
            <br />
            {t("title2", { fallback: "your decision? Let’s diagnose it." })}
          </h2>
          <p>
            {t("description", {
              fallback:
                "We’ll identify the real driver — pricing, hidden risks, legal exposure, financing constraints, or timing — and show you the cleanest decision path.",
            })}
          </p>
          <Button variant="white" url="/contact" type="link">
            {t("button", { fallback: "Contact us" })}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
