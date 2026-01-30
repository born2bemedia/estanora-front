"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./GuidesServices.module.scss";

export const GuidesServices = () => {
  const t = useTranslations("guidesServices");

  const itemsList = [
    {
      title: t("service1", { fallback: "Due Diligence Guide" }),
      description: t("service1Description", {
        fallback:
          "How to identify structural, legal, and financial risks before committing",
      }),
      image: "/images/home/service1.jpg",
    },
    {
      title: t("service2", { fallback: "Market & Pricing Guides" }),
      description: t("service2Description", {
        fallback:
          "How to verify value, assess liquidity, and choose the right timing",
      }),
      image: "/images/home/service2.jpg",
    },
    {
      title: t("service3", { fallback: "Rental Strategy Guides" }),
      description: t("service3Description", {
        fallback: "Comparing income models, legal exposure, and net returns",
      }),
      image: "/images/home/service3.jpg",
    },
    {
      title: t("service4", { fallback: "Portfolio & Family Property Guides" }),
      description: t("service4Description", {
        fallback:
          "Decision frameworks for inherited and multi-asset situations",
      }),
      image: "/images/home/service4.jpg",
    },
  ];

  return (
    <section className={styles.guides_services}>
      <h2>{t("title", { fallback: "What You’ll Find in the Library" })}</h2>
      <div className={"container"}>
        <div className={styles.guides_services__content}>
          {itemsList.map((item) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.guides_services__item}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
