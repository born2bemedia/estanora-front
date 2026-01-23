'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { ExpertBlock } from '@/shared/ui/components';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './InsightExperts.module.scss';

export const InsightExperts = () => {
  const t = useTranslations('insightsExperts');

  return (
    <section className={styles.insights_experts}>
      <div className={'_container'}>
        <div className={styles.insights_experts__content}>
          <div className={styles.insights_experts__col_1}>
            <ExpertBlock />
          </div>
          <div className={styles.insights_experts__col_2}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: t('title', {
                  fallback: 'Our Experts Are Ready to Consult You Right Away',
                }),
              }}
            />
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.subtitle}
            >
              {t('subtitle', {
                fallback:
                  'Schedule a session or emergency advisory call within 24 hours for pressing security needs: SOC assessment, incident response, or architecture review.',
              })}
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.button}
            >
              <Button variant="primary" url="/request-assistance-form" type="link">
                {t('button', { fallback: 'Request Expert Assistance' })}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
