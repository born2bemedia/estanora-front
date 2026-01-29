"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./LeaseWhy.module.scss";

export const LeaseWhy = () => {
  const t = useTranslations("leaseAdvisoryWhy");

  return (
    <section className={styles.lease_why}>
      <div className={"container"}>
        <div className={styles.lease_why__content}>
          <div className={styles.lease_why__col}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("title", { fallback: "Why Lease Advisory?" })}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("description", {
                fallback:
                  "A poorly structured lease is a long-term financial liability. These services are crucial to ensure you don’t get locked into below-market rates, face unexpected legal fines, or miss out on high-yield opportunities hidden within your property’s square footage.",
              })}
            </motion.p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.lease_why__image}
          >
            <Image
              src="/images/market-research/why.png"
              alt="Market Research Why"
              width={531}
              height={531}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
