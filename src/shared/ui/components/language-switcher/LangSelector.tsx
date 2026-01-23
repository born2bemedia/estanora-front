'use client';
import { useState } from 'react';
import Image from 'next/image';

import { useLocale } from 'next-intl';

import styles from './LangSelector.module.scss';

import { usePathname, useRouter } from '@/i18n/navigation';

export const LangSelector = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (locale: string) => {
    router.push(pathname, { locale });
    setIsOpen(false);
  };

  const localName = {
    en: 'English',
    de: 'German',
    it: 'Italian',
    ro: 'Romanian',
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.langSelector}>
      <button onClick={handleToggle} className={styles.langSelectorItemLabel}>
        <Image src={`/images/${locale}.svg`} alt={locale} width={18} height={18} />
        <span className={styles.langSelectorItemLabelText}>
          {localName[locale as keyof typeof localName]}
        </span>
        <Image src={`/images/arrow-down.svg`} alt={'arrow-down'} width={16} height={16} />
      </button>
      {isOpen && (
        <div className={styles.langSelectorDropdown}>
          <button onClick={() => handleChange('en')} className={styles.langSelectorDropdownItem}>
            <Image src={`/images/en.svg`} alt={'en'} width={18} height={18} />
            English
          </button>
          <button onClick={() => handleChange('de')} className={styles.langSelectorDropdownItem}>
            <Image src={`/images/de.svg`} alt={'de'} width={18} height={18} />
            German
          </button>
          <button onClick={() => handleChange('it')} className={styles.langSelectorDropdownItem}>
            <Image src={`/images/it.svg`} alt={'it'} width={18} height={18} />
            Italian
          </button>
          <button onClick={() => handleChange('ro')} className={styles.langSelectorDropdownItem}>
            <Image src={`/images/ro.svg`} alt={'ro'} width={18} height={18} />
            Romanian
          </button>
        </div>
      )}
    </div>
  );
};
