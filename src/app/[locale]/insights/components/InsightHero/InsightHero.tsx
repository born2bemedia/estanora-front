'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './InsightHero.module.scss';

import { Link } from '@/i18n/navigation';

export const InsightHero = () => {
  const t = useTranslations('insightsHero');

  const featured = {
    title: t('featuredTitle', {
      fallback: 'Cybersecurity Outlook 2026 Preparing for the Age of Autonomous Threats',
    }),
    text: t('featuredText', {
      fallback:
        'Discover what 2026 holds for cybersecurity — from AI-driven attacks to autonomous defenses — and how businesses can stay ahead in the age of intelligent threats.',
    }),
    image: '/images/insights/article4.webp',
    url: '/insights/cybersecurity-outlook-2026',
  };

  const otherArticles = [
    {
      title: t('otherArticle1Title', {
        fallback: 'Cybersecurity Report Q2 2025 Defending Against Autonomy and Deception',
      }),
      image: '/images/insights/article3.webp',
      url: '/insights/cybersecurity-report-q2-2025',
    },
    {
      title: t('otherArticle2Title', {
        fallback: 'Cybersecurity Report Q1 2025: Resilience in the Age of Intelligent Threats',
      }),
      image: '/images/insights/article2.webp',
      url: '/insights/cybersecurity-report-q1-2025',
    },
    {
      title: t('otherArticle3Title', {
        fallback: 'Global Cybersecurity Report 2024 Navigating a New Era of Digital Threats',
      }),
      image: '/images/insights/article1.webp',
      url: '/insights/global-cybersecurity-report-2024',
    },
  ];

  return (
    <section className={styles.insights_hero}>
      <div className={'_container'}>
        <div className={styles.insights_hero__heading}>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.subtitle}
          >
            {t('subtitle', {
              fallback: '[Expert-Driven]',
            })}
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.title}
          >
            {t('title', { fallback: 'Insights & Market News' })}
          </motion.h2>
        </div>
        <div className={styles.insights_hero__featured}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.featured_image}
          >
            <Link href={featured.url}>
              <Image src={featured.image} alt="Featured" width={491} height={276} />
            </Link>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.featured_content}
          >
            <h3>{featured.title}</h3>
            <p>{featured.text}</p>
            <Button variant="primary" url={featured.url} type="link">
              {t('button', {
                fallback: 'Open',
              })}
            </Button>
          </motion.div>
        </div>
        <div className={styles.insights_hero__other}>
          {otherArticles.map((article) => (
            <motion.div
              key={article.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.other_article}
            >
              <div className={styles.top}>
                <Link href={article.url}>
                  <Image src={article.image} alt={article.title} width={274} height={154} />
                </Link>
                <h3>{article.title}</h3>
              </div>
              <Button variant="primary" url={article.url} type="link">
                {t('button', {
                  fallback: 'Open',
                })}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
