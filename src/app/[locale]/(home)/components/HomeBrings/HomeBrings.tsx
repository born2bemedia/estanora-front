"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { CheckIcon } from "@/shared/ui/icons/check";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./HomeBrings.module.scss";

export const HomeBrings = () => {
  const t = useTranslations("homeBrings");
  const { openPropertyConsultation } = useFormsPopup();

  const brings = [
    {
      title: t("bring1", {
        fallback: "I want to buy",
      }),
      video: "/videos/brings1.mp4",
      details: [
        t("bring1detail1", {
          fallback: "Confirm the purchase price",
        }),
        t("bring1detail2", {
          fallback: "Calculate repair and renovation costs",
        }),
        t("bring1detail3", {
          fallback: "Identify structural and climate risks",
        }),
        t("bring1detail4", {
          fallback: "Analyze co-buying feasibility",
        }),
      ],
    },
    {
      title: t("bring2", {
        fallback: "I want to sell",
      }),
      video: "/videos/brings2.mp4",
      details: [
        t("bring2detail1", {
          fallback: "Determine timing (Sell vs. Wait)",
        }),
        t("bring2detail2", {
          fallback: "Diagnose why a property isn't selling",
        }),
        t("bring2detail3", {
          fallback: "Compare relocation taxes and costs",
        }),
      ],
    },
    {
      title: t("bring3", {
        fallback: "I want to manage family property",
      }),
      video: "/videos/brings3.mp4",
      details: [
        t("bring3detail1", {
          fallback: "Plan for an inherited property",
        }),
        t("bring3detail2", {
          fallback: "Strategy for downsizing",
        }),
        t("bring3detail3", {
          fallback: "Review multi-property performance",
        }),
      ],
    },
    {
      title: t("bring4", {
        fallback: "I want to increase income",
      }),
      video: "/videos/brings4.mp4",
      details: [
        t("bring4detail1", {
          fallback: "Select a profitable rental strategy",
        }),
        t("bring4detail2", {
          fallback: "Verify rental legal compliance",
        }),
        t("bring4detail3", {
          fallback: "Assess space monetization potential",
        }),
      ],
    },
  ];

  return (
    <>
      <section className={styles.home_brings}>
        <div className={"container"}>
          <h2>{t("title", { fallback: "What brings you here today?" })}</h2>
          <div className={styles.home_brings__content}>
            {brings.map((bring) => (
              <motion.div
                key={bring.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={styles.home_brings__item}
              >
                <video src={bring.video} autoPlay muted loop playsInline />
                <div>
                  <h3>{bring.title}</h3>
                  <ul>
                    {bring.details.map((detail) => (
                      <li key={detail}>
                        <span>
                          <CheckIcon />
                        </span>
                        <p>{detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.home_brings__button}
          >
            <Button variant="white" type="button" onClick={openPropertyConsultation}>
              {t("button", { fallback: "Book free consultation" })}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};
