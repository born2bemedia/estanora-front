"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { CheckIcon } from "@/shared/ui/icons/check";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./ContactSecond.module.scss";

export const ContactSecond = () => {
  const t = useTranslations("contactSecond");

  return (
    <section className={styles.contactSecond}>
      <div className={"container"}>
        <div className={styles.contactSecond__content}>
          <div className={styles.contactSecond__col}>
            <div>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {t("title1", { fallback: "When It Makes " })}
                <br />
                {t("title2", { fallback: "Sense to Contact Estanora" })}
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {t("description1", {
                  fallback:
                    "Precision Market Analysis We use industry-leading tools for real-time monitoring and data-driven accuracy in every report.",
                })}
              </motion.p>
            </div>
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
                      "Assessing whether an asking price reflects real market value",
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
                      "Identifying hidden technical, legal or regulatory risks",
                  })}
                </p>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <p>
                  {t("item3", {
                    fallback: "Deciding whether to buy, sell, hold, or wait",
                  })}
                </p>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <p>
                  {t("item4", {
                    fallback:
                      "Understanding why a property is not selling despite market exposure",
                  })}
                </p>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <p>
                  {t("item5", {
                    fallback:
                      "Structuring an inherited or jointly owned property",
                  })}
                </p>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <p>
                  {t("item6", {
                    fallback:
                      "Evaluating rental strategies under current legal frameworks",
                  })}
                </p>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <p>
                  {t("item7", {
                    fallback:
                      "Reviewing the performance and risk profile of a property portfolio",
                  })}
                </p>
              </li>
            </motion.ul>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.contactSecond__image}
          >
            <video src="/videos/brings4.mp4" autoPlay muted loop playsInline />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
