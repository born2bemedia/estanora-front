"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./HomeFaq.module.scss";

interface FaqItem {
  question: string;
  answer: string;
}

export const HomeFaq = () => {
  const t = useTranslations("homeFaq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: t("faq1question", {
        fallback: "Why do I need this if I already have a real estate agent?",
      }),
      answer: t("faq1answer", {
        fallback:
          "Agents want the deal to close. We don’t sell property, so we have no reason to hide the truth. We provide the unbiased data on prices, risks, and repairs that agents might downplay.",
      }),
    },
    {
      question: t("faq2question", {
        fallback: "How do you spot a bad purchase?",
      }),
      answer: t("faq2answer", {
        fallback:
          "We look beyond the surface. We analyze 10 years of historical data and 5-year price forecasts, hidden legal disputes, and the real cost of renovations. We apply top market AI forecasting tools that are worth the best minds of real estate analytics. If the numbers show the house is a mistake, we tell you.",
      }),
    },
    {
      question: t("faq3question", {
        fallback: "Why is my property not selling?",
      }),
      answer: t("faq3answer", {
        fallback:
          'We don’t just "try harder." We run a diagnosis to find the specific "blocker," whether it’s the price, the presentation, or a neighborhood issue, so you can fix it and move on.',
      }),
    },
    {
      question: t("faq4question", {
        fallback: "How do I know if my rental contracts are protecting me?",
      }),
      answer: t("faq4answer", {
        fallback:
          'We perform a legal audit. Laws change constantly, and we make sure your leases follow the latest rules so you don’t face fines or get stuck with a "professional tenant" you can’t evict.',
      }),
    },
    {
      question: t("faq5question", {
        fallback: "Can you actually help me get more rent from my property?",
      }),
      answer: t("faq5answer", {
        fallback:
          "Yes. We analyze your local market to see if you should switch to short-term, student, or long-term rentals. We also check if you can legally convert unused space, like a garage, into a new income stream.",
      }),
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.home_faq}>
      <video src="/videos/home-faq.mp4" autoPlay muted loop playsInline />
      <div className={"container"}>
        <h2>{t("title", { fallback: "You Ask, We Answer" })}</h2>
        <div className={styles.home_faq__content}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index * 0.1}
                className={styles.home_faq__item}
              >
                <button
                  className={`${styles.home_faq__question} ${
                    isOpen ? styles.open : ""
                  }`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <motion.span
                    className={styles.home_faq__chevron}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={styles.home_faq__answer_wrapper}
                    >
                      <div className={styles.home_faq__answer}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.home_faq__buttin}
        >
          <Button variant="white" url="/contact" type="link">
            {t("button", { fallback: "Ask question" })}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
