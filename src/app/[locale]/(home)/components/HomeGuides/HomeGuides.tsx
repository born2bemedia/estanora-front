"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./HomeGuides.module.scss";

export const HomeGuides = () => {
  const t = useTranslations("homeGuides");

  const guides = [
    {
      title: t("guide1", {
        fallback:
          "European Real Estate 2026: Stabilisation, Stagnation or the Start of a New Cycle?",
      }),
      image: "/images/home/guide1.jpg",
      link: "/guide1",
    },
    {
      title: t("guide2", {
        fallback:
          "Banks, Private Credit and Alternative Lenders: Who Is Funding Real Estate Now",
      }),
      image: "/images/home/guide2.jpg",
      link: "/guide2",
    },
    {
      title: t("guide3", {
        fallback:
          "Why Buy-and-Hold Is Failing: The New Holding Strategy for European Assets",
      }),
      image: "/images/home/guide3.jpg",
      link: "/guide3",
    },
    {
      title: t("guide4", {
        fallback:
          "Liquidity Has a Memory: How 2022–2024 Still Distorts Today’s Deals",
      }),
      image: "/images/home/guide4.jpg",
      link: "/guide4",
    },
  ];

  return (
    <section className={styles.home_guides}>
      <div className={"container"}>
        <h2>{t("title", { fallback: "Our Free Guides" })}</h2>
        <div className={styles.home_guides__content}>
          {guides.map((guide) => (
            <motion.div
              key={guide.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.home_guides__item}
              style={{ backgroundImage: `url(${guide.image})` }}
            >
              <div>
                <h3>{guide.title}</h3>
              </div>
              <Button variant="white" url={guide.link} type="link">
                {t("button", { fallback: "Read" })}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
