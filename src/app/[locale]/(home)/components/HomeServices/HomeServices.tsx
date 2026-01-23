'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './HomeServices.module.scss';

export const HomeServices = () => {
  const t = useTranslations('homeServices');

  const services = [
    {
      title: t('service1', { fallback: 'Due Diligence' }),
      description: t('service1Description', {
        fallback:
          "Avoid hidden costs. We check the building's condition and legal paperwork so you don't buy a property with expensive problems.",
      }),
      image: '/images/home/service1.jpg',
      link: '/due-diligence',
    },
    {
      title: t('service2', { fallback: 'Market Research' }),
      description: t('service2Description', {
        fallback:
          'Back up your decision. We analyze price trends and neighborhood data so you know exactly when to buy, sell, or wait.',
      }),
      image: '/images/home/service2.jpg',
      link: '/market-research',
    },
    {
      title: t('service3', { fallback: 'Portfolio Services' }),
      description: t('service3Description', {
        fallback:
          'Manage family property. We handle the difficult details of inherited homes, downsizing, or managing multiple properties at once.',
      }),
      image: '/images/home/service3.jpg',
      link: '/portfolio-services',
    },
    {
      title: t('service4', { fallback: 'Lease Advisory' }),
      description: t('service4Description', {
        fallback:
          'Increase your rent income. We review your contracts and local laws to make sure you are renting safely and for the best price.',
      }),
      image: '/images/home/service4.jpg',
      link: '/lease-advisory',
    },
  ];

  return (
    <section className={styles.home_services}>
      <div className={'container'}>
        <div className={styles.home_services__content}>
          {services.map((service) => (
            <motion.div
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={styles.home_services__item}
              style={{ backgroundImage: `url(${service.image})` }}
            >
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <Button variant="white" url={service.link} type="link">
                {t('button', { fallback: 'Check' })}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
