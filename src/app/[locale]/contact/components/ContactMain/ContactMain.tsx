"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { ContactFormNew } from "@/features/contact-form/ui/ContactFormNew";

import { WEBSITE_EMAIL, WEBSITE_PHONE } from "@/shared/lib/constants/constants";
import { fadeInUp } from "@/shared/lib/helpers/animations";
import { CheckIcon } from "@/shared/ui/icons/check";
import { EmailIcon } from "@/shared/ui/icons/email";
import { PhoneIcon } from "@/shared/ui/icons/phone";

import styles from "./ContactMain.module.scss";

import { Link } from "@/i18n/navigation";

export const ContactMain = () => {
  const t = useTranslations("contactMain");

  return (
    <section className={styles.contactMain}>
      <div className={"container"}>
        <div className={styles.contactMain__content}>
          <div className={styles.contactMain__left}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.contactMain__left__block}
            >
              <h1>
                {t("title1", {
                  fallback: "Request Independent Property Analysis",
                })}
              </h1>
              <p>
                {t("description1", {
                  fallback:
                    "Objective, Evidence-Based Guidance for Private Property Decisions. Real estate decisions involve capital allocation, legal exposure, and long-term financial consequences. They require more than opinions, listings, or general market commentary.",
                })}
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.contactMain__left__block}
            >
              <h2>{t("title2", { fallback: "Direct Contact" })}</h2>
              <p>
                {t("description2", {
                  fallback:
                    "If you prefer direct communication, you may reach us via:",
                })}
              </p>
              <div className={styles.contactMain__left__contacts}>
                <Link className={styles.contactMain__left__contacts__item} href={`mailto:${WEBSITE_EMAIL}`}>
                  <EmailIcon />
                  <p>{WEBSITE_EMAIL}</p>
                </Link>
                <Link className={styles.contactMain__left__contacts__item} href={`tel:${WEBSITE_PHONE}`}>
                  <PhoneIcon />
                  <p>{WEBSITE_PHONE}</p>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.contactMain__left__block}
            >
              <h2>
                {t("title3", {
                  fallback: "When contacting us, please include:",
                })}
              </h2>
              <ul>
                <li>
                  <span>
                    <CheckIcon />
                  </span>
                  <p>
                    {t("item1", {
                      fallback: "Property location (city and country)",
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
                        "Your objective (buy, sell, hold, rent, portfolio, inheritance)",
                    })}
                  </p>
                </li>
                <li>
                  <span>
                    <CheckIcon />
                  </span>
                  <p>
                    {t("item3", {
                      fallback: "Any relevant timing constraints or deadlines",
                    })}
                  </p>
                </li>
              </ul>
              <span>
                {t("note", {
                  fallback:
                    "Providing this information allows us to respond efficiently and with appropriate context.",
                })}
              </span>
            </motion.div>
          </div>

          <div className={styles.contactMain__right}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.contactMain__right__block}
            >
              <h2>
                {t("title5", { fallback: "Submit Assistance Request" })}
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.contactMain__right__form}
            >
              <ContactFormNew />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
