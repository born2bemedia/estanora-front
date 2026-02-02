"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./LeaseNeed.module.scss";

export const LeaseNeed = () => {
  const t = useTranslations("leaseAdvisoryNeed");
  const { openPropertyConsultation } = useFormsPopup();
  return (
    <section className={styles.lease_need}>
      <div className={"container"}>
        <div className={styles.lease_need__content}>
          <div className={styles.lease_need__col}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("title", {
                fallback: "Unsure which service you need?",
              })}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("description", {
                fallback:
                  "Get a professional case revision at no cost. Schedule a free introductory call to discuss your property goals. We will help you identify the immediate risks and recommend the exact expert or audit required for your situation.",
              })}
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.lease_need__button}
            >
              <Button variant="white" type="button" onClick={openPropertyConsultation}>
                {t("button", { fallback: "Book free call" })}
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.lease_need__image}
          >
            <Image
              src="/images/lease-advisory/need.png"
              alt="Lease Advisory Need"
              width={531}
              height={531}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
