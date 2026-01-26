"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./DiligenceWhy.module.scss";

export const DiligenceWhy = () => {
  const t = useTranslations("diligenceWhy");

  return (
    <section className={styles.diligence_why}>
      <div className={"container"}>
        <div className={styles.diligence_why__content}>
          <div className={styles.diligence_why__col}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("title", { fallback: "Why Due Diligence?" })}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("description", {
                fallback:
                  "Whether you are buying, splitting an inheritance, or converting a rental, assumptions are your biggest financial risk. Our service replaces guesswork with technical and legal facts, ensuring your next move builds wealth instead of debt.",
              })}
            </motion.p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.home_why__image}
          >
            <Image
              src="/images/diligence/why.png"
              alt="Diligence Why"
              width={531}
              height={531}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
