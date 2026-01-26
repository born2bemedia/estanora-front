'use client';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import {
  FACEBOOK_URL,
  LINKEDIN_URL,
  WEBSITE_EMAIL,
  WEBSITE_PHONE,
  X_URL,
} from '@/shared/lib/constants/constants';
import { FacebookIcon, LinkedinIcon, XIcon } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './Footer.module.scss';

import { Link } from '@/i18n/navigation';

export const Footer = () => {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={'container'}>
        <div className={styles.footer__main}>
          <div className={styles.footer__main__col1}>
            <Link href="/" className={styles.header__logo}>
              <Image src="/images/logo.svg" alt="Estanora" width={87} height={20} />
            </Link>
            <p>
              {t('description', {
                fallback: 'You don’t need to be an expert. You just need us.',
              })}
            </p>
            <Button variant="white" url="/contact" type="link">
              {t('button', { fallback: 'Contact Us' })}
            </Button>
          </div>
          <div className={styles.footer__main__col2}>
            <div className={styles.col}>
              <div className={styles.nav}>
                <h3>{t('contact', { fallback: 'Contact' })}</h3>
                <nav className={styles.contacts}>
                  <Link href={`mailto:${WEBSITE_EMAIL}`}>{WEBSITE_EMAIL}</Link>
                  <Link href={`tel:${WEBSITE_PHONE}`}>{WEBSITE_PHONE}</Link>
                  <Link href="/contact">
                    {t('more-contacts', { fallback: 'More contacts' })}
                  </Link>
                </nav>
              </div>
              <div className={styles.nav}>
                <h3>{t('follow-us', { fallback: 'Follow Us' })}</h3>
                <nav className={styles.socials}>
                  <Link href={LINKEDIN_URL}>
                    <LinkedinIcon />
                  </Link>
                  <Link href={X_URL}>
                    <XIcon />
                  </Link>
                  <Link href={FACEBOOK_URL}>
                    <FacebookIcon />
                  </Link>
                </nav>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.nav}>
                <h3>{t('our-services', { fallback: 'Our Services' })}</h3>
                <nav>
                  <Link href="/due-diligence">
                    {t('due-diligence', { fallback: 'Due Diligence' })}
                  </Link>
                  <Link href="/market-research">
                    {t('market-research', { fallback: 'Market Research' })}
                  </Link>
                  <Link href="/portfolio-services">
                    {t('portfolio-services', {
                      fallback: 'Portfolio Services',
                    })}
                  </Link>
                  <Link href="/lease-advisory">
                    {t('lease-advisory', { fallback: 'Lease Advisory' })}
                  </Link>
                </nav>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.nav}>
                <h3>{t('useful-links', { fallback: 'Useful Links' })}</h3>
                <nav>
                  <Link href="/free-guides">{t('free-guides', { fallback: 'Free Guides' })}</Link>
                  <Link href="/about-us">{t('about-us', { fallback: 'About Us' })}</Link>
                  <Link href="/contact">{t('contact-us', { fallback: 'Contact Us' })}</Link>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer__divider}></div>
        <div className={styles.footer__bottom}>
          <p>
            © {year} Estara |{' '}
            {t('copyright', {
              fallback: 'Strategic Property Intelligence. All rights reserved.',
            })}
          </p>
          <nav>
            <Link href="/legal/terms-and-conditions">{t('terms-and-conditions', { fallback: 'Terms & Conditions' })}</Link>
            <Link href="/legal/privacy-policy">{t('privacy-policy', { fallback: 'Privacy' })}</Link>
            <Link href="/legal/cookie-policy">{t('cookie-policy', { fallback: 'Cookie' })}</Link>
            <Link href="/legal/refund-policy">{t('refund-policy', { fallback: 'Refund' })}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
