"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { getGuides } from "@/features/guides/api/get-guides";
import { Guide } from "@/features/guides/model/types";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./GuidesLoop.module.scss";

export const GuidesLoop = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("guidesLoop");
  const locale = useLocale();
  const isMountedRef = useRef(true);

  const fetchGuides = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    setLoading(true);
    try {
      const fetchedGuides = await getGuides({ locale: locale });
      if (isMountedRef.current) {
        console.log(fetchedGuides[0].image.url);
        setGuides(fetchedGuides);
        setLoading(false);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setLoading(false);
      }
      console.error("Error fetching guides:", error);
    }
  }, [locale]);

  useEffect(() => {
    isMountedRef.current = true;
    queueMicrotask(() => {
      void fetchGuides();
    });

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchGuides]);

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  return (
    <section className={styles.guides_loop}>
      <div className={"container"}>
        <h2>{t("title", { fallback: "Our Free Guides" })}</h2>
        <div className={styles.guides_loop__content}>
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={styles.guides_loop__skeleton_item} />
            ))
          ) : guides.length > 0 ? (
            guides.map((guide) => (
              <motion.div
                key={guide.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={styles.guides_loop__item}
                style={{
                  backgroundImage: `url(${SERVER_URL}${
                    guide?.image?.url || ""
                  })`,
                }}
              >
                <div>
                  <h3>{guide.title}</h3>
                </div>
                <Button
                  variant="white"
                  url={`/free-guides/${guide.slug}`}
                  type="link"
                >
                  {t("button", { fallback: "Read" })}
                </Button>
              </motion.div>
            ))
          ) : (
            <div className={styles.guides_loop__empty}>
              <p>{t("empty", { fallback: "No guides found" })}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
