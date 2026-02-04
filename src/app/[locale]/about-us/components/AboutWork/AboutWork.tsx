"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./AboutWork.module.scss";

export const AboutWork = () => {
  const t = useTranslations("aboutWork");

  const works = [
    {
      title: t("work1", {
        fallback: "Due Diligence",
      }),
      image: "/images/about/work1.jpg",
      text: t("text1", { fallback: "Buying or Modifying a Property" }),
      link: "/due-diligence",
    },
    {
      title: t("work2", {
        fallback: "Market Research",
      }),
      image: "/images/about/work2.jpg",
      text: t("text2", { fallback: "Pricing, Selling, or Waiting" }),
      link: "/market-research",
    },
    {
      title: t("work3", {
        fallback: "Portfolio Services",
      }),
      image: "/images/about/work3.jpg",
      text: t("text3", { fallback: "Multiple Assets or Family Property" }),
      link: "/portfolio-services",
    },
    {
      title: t("work4", {
        fallback: "Lease Advisory",
      }),
      image: "/images/about/work4.jpg",
      text: t("text4", { fallback: "Rental Income and Compliance" }),
      link: "/lease-advisory",
    },
  ];

  return (
    <section className={styles.about_work} id="services">
      <div className={"container"}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.about_work__header}
        >
          <h2>{t("title", { fallback: "What We Actually Work On" })}</h2>
          <p>
            {t("description1", {
              fallback:
                "Our advisory work is organised around four recurring property situations. ",
            })}
            <br />
            {t("description2", {
              fallback:
                "Each addresses a specific type of decision and produces a concrete analytical outcome.",
            })}
          </p>
        </motion.div>
        <div className={styles.about_work__content}>
          {works.map((work) => (
            <motion.div
              key={work.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.about_work__item}
            >
              <Image src={work.image} alt={work.title} width={531} height={531} />
              <div>
                <h3>{work.title}</h3>
                <p>{work.text}</p>
              </div>
              <Button variant="white" url={work.link} type="link">
                {t("button", { fallback: "Explore services" })}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
