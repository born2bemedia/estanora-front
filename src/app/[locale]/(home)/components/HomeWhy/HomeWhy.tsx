"use client";
import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { CheckIcon } from "@/shared/ui/icons/check";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./HomeWhy.module.scss";

export const HomeWhy = () => {
  const t = useTranslations("homeWhy");

  return (
    <section className={styles.home_why}>
      <div className={"container"}>
        <div className={styles.home_why__content}>
          <div className={styles.home_why__col}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("title", { fallback: "Why Estanora" })}
            </motion.h2>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <li>
                <span>
                  <CheckIcon />
                </span>
                <p>
                  {t("item1", {
                    fallback:
                      "Precision Market Analysis We use industry-leading tools for real-time monitoring and data-driven accuracy in every report.",
                  })}
                </p>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <p>
                  {t("item2", {
                    fallback:
                      "Specialized Expertise A dedicated team of 12 specialists with niche experience across technical, legal, and financial sectors.",
                  })}
                </p>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <p>
                  {t("item3", {
                    fallback:
                      "Institutional-Grade Due Diligence We apply the same rigorous auditing standards used by institutional investors to protect your private property interests.",
                  })}
                </p>
              </li>
            </motion.ul>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.home_why__button}
            >
              <Button variant="white" url="#" type="link">
                {t("button", { fallback: "More about us" })}
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.home_why__image}
          >
            <Image
              src="/images/home/why.png"
              alt="Why Estanora"
              width={531}
              height={531}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
