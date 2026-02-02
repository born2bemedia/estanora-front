"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./MarketNeed.module.scss";

export const MarketNeed = () => {
  const t = useTranslations("marketResearchNeed");
  const { openPropertyConsultation } = useFormsPopup();
  return (
    <section className={styles.market_need}>
      <div className={"container"}>
        <div className={styles.market_need__content}>
          <div className={styles.market_need__col}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {t("title", { fallback: "Unsure which research you need?" })}
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
              className={styles.home_why__button}
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
            className={styles.market_need__image}
          >
            <Image
              src="/images/market-research/need.png"
              alt="Market Research Need"
              width={531}
              height={531}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
