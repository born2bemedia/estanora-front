"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./AboutCore.module.scss";

export const AboutCore = () => {
  const t = useTranslations("aboutCore");

  const services = [
    {
      title: t("service1", { fallback: "Independence" }),
      description: t("service1Description", {
        fallback:
          "We provide advisory services only. We do not participate in transactions or receive third-party incentives.",
      }),
      video: "/videos/about-independence.mp4",
    },
    {
      title: t("service2", { fallback: "Structure" }),
      description: t("service2Description", {
        fallback:
          "Each case follows a defined analytical process, ensuring consistency, traceability, and clarity of conclusions.",
      }),
      video: "/videos/about-structure.mp4",
    },
    {
      title: t("service3", { fallback: "Transparency" }),
      description: t("service3Description", {
        fallback:
          "Assumptions, limitations, and areas of uncertainty are stated explicitly and documented.",
      }),
      video: "/videos/about-transparency.mp4",
    },
    {
      title: t("service4", { fallback: "Discretion" }),
      description: t("service4Description", {
        fallback:
          "All enquiries, data, and findings are handled confidentially and with professional care.",
      }),
      video: "/videos/about-discretion.mp4",
    },
  ];

  return (
    <section className={styles.about_core}>
      <div className={"container"}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.about_core__header}
        >
          <h2>{t("title", { fallback: "What You’ll Find in the Library" })}</h2>
          <p>{t("description", { fallback: "Key principles" })}</p>
        </motion.div>
        <div className={styles.about_core__content}>
          {services.map((service) => (
            <motion.div
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.about_core__item}
            >
              <video src={service.video} autoPlay muted loop playsInline />
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
