"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_OFFICE_ADDRESS_MAP,
  WEBSITE_REGISTERED_ADDRESS,
  WEBSITE_REGISTERED_ADDRESS_MAP,
} from "@/shared/lib/constants/constants";
import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./ContactLocations.module.scss";

export const ContactLocations = () => {
  const t = useTranslations("contactLocations");

  return (
    <section className={styles.contactLocations}>
      <div className={"container"}>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {t("title1", { fallback: "Our locations:" })}
        </motion.h2>
        <div className={styles.contactLocations__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.contactLocations__col}
          >
            <div>
              <h3>{t("title2", { fallback: "Office" })}</h3>
              <p>{WEBSITE_OFFICE_ADDRESS}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: WEBSITE_OFFICE_ADDRESS_MAP }} />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.contactLocations__col}
          >
            <div>
              <h3>{t("title3", { fallback: "Registration" })}</h3>
              <p>{WEBSITE_REGISTERED_ADDRESS}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: WEBSITE_REGISTERED_ADDRESS_MAP }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
