import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui/kit/button/Button';

import styles from './ContactForm.module.scss';

export const ContactFormSuccess = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations('contactForm');
  return (
    <div className={styles.contactFormSuccess}>
      <div className={styles.contactFormSuccess__content}>
        <Image
          src="/images/topLeftBlack.svg"
          alt="top left black corner"
          width={20}
          height={20}
          className={styles.top_left}
        />
        <Image
          src="/images/topRightBlack.svg"
          alt="top right black corner"
          width={20}
          height={20}
          className={styles.top_right}
        />
        <Image
          src="/images/bottomLeftBlack.svg"
          alt="bottom left black corner"
          width={20}
          height={20}
          className={styles.bottom_left}
        />
        <Image
          src="/images/bottomRightBlack.svg"
          alt="bottom right black corner"
          width={20}
          height={20}
          className={styles.bottom_right}
        />
        <h2>
          {t('success', { fallback: 'Your request has been ' })}
          <span>{t('submitted', { fallback: 'submitted successfully' })}</span>
        </h2>
        <p>
          {t('thankYou', { fallback: 'Our team will reach out within the next business day.' })}
        </p>
        <span onClick={onClose}>
          <Button type="button" variant="white">
            {t('close', { fallback: 'Continue' })}
          </Button>
        </span>
      </div>
    </div>
  );
};
