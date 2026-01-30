"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { CheckIcon } from "@/shared/ui/icons/check";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./AboutAgent.module.scss";

export const AboutAgent = () => {
  const t = useTranslations("aboutAgent");

  return (
    <section className={styles.about_agent}>
      <div className={"container"}>
        <div className={styles.about_agent__content}>
          <div className={styles.about_agent__col}>
            <div>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {t("title1", {
                  fallback: "Licensed Agent in Europe or the UK?",
                })}
                <br />
                {t("title2", { fallback: "Welcome to Estanora." })}
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {t("description1", {
                  fallback:
                    "We partner with regulated real estate professionals who want independent analysis behind their client recommendations.",
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
                  <b>{t("item1Title", { fallback: "What we provide" })}</b>
                  {t("item1", {
                    fallback:
                      "Independent due diligence support, pricing validation, risk mapping, and decision structure — delivered as clear, client-ready conclusions.",
                  })}
                </p>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <p>
                  <b>{t("item2Title", { fallback: "How it works" })}</b>
                  {t("item2", {
                    fallback:
                      "You stay client-facing. We stay analytical. No commission alignment, no transaction role — only advisory input.",
                  })}
                </p>
              </li>
              <li>
                <span>
                  <CheckIcon />
                </span>
                <p>
                  <b>{t("item3Title", { fallback: "When it helps most" })}</b>
                  {t("item3", {
                    fallback:
                      "Complex purchases, stalled sales, cross-border decisions, inherited or shared ownership cases, and rental/compliance questions.",
                  })}
                </p>
              </li>
            </motion.ul>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Button variant="white" url="/contact" type="link">
                {t("button", { fallback: "Contact us" })}
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.about_agent__image}
          >
            <Image
              src="/images/about/agent.png"
              alt="About Agent"
              width={531}
              height={531}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
