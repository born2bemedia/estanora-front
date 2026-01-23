'use client';

import { useCallback, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { excludedCountries } from '@/shared/lib/countries';
import { Button } from '@/shared/ui/kit/button/Button';

import { submitContactForm } from '../api/submitContactForm';
import { type ContactFormSchema, createContactFormSchema } from '../model/ContactForm.schema';
import styles from './ContactForm.module.scss';
import { ContactFormSuccess } from './ContactFormSuccess';

import 'react-phone-input-2/lib/style.css';

export const ContactForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const t = useTranslations('contactForm');

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createContactFormSchema()),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      businessEmail: '',
      company: '',
      website: '',
      question: '',
      recaptcha: '',
    },
  });

  const onSubmit = useCallback(
    (data: ContactFormSchema) => {
      try {
        setIsLoading(true);
        console.log(data);
        submitContactForm(data);
        setTimeout(() => {
          setIsSuccess(true);
          reset();
          recaptchaRef.current?.reset();
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        recaptchaRef.current?.reset();
      }
    },
    [reset]
  );

  const handleRecaptchaChange = (token: string | null) => {
    setValue('recaptcha', token || '', { shouldValidate: true });
  };

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(onSubmit)(e);
    },
    [handleSubmit, onSubmit]
  );

  return (
    <>
      <div className={styles.contactForm}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.formGroup}>
            <input
              id="contact-form-name"
              type="text"
              {...register('firstName')}
              placeholder={t('firstName', { fallback: 'First Name' })}
              className={errors.firstName ? styles.errorInput : ''}
            />
            {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <input
              id="contact-form-lastName"
              type="text"
              {...register('lastName')}
              placeholder={t('lastName', { fallback: 'Last Name' })}
              className={errors.lastName ? styles.errorInput : ''}
            />
          </div>

          <div className={styles.formGroup}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country="gb"
                  inputClass={errors.phone ? styles.errorInput : ''}
                  containerClass={styles.phoneInputContainer}
                  buttonClass={styles.phoneInputButton}
                  dropdownClass={styles.phoneInputDropdown}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder={t('phone', { fallback: 'Phone' })}
                  inputProps={{
                    id: 'contact-form-phone',
                  }}
                  excludeCountries={excludedCountries}
                />
              )}
            />
            {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <input
              id="contact-form-businessEmail"
              type="email"
              {...register('businessEmail')}
              placeholder={t('businessEmail', { fallback: 'Business Email' })}
              className={errors.businessEmail ? styles.errorInput : ''}
            />
            {errors.businessEmail && <p className={styles.error}>{errors.businessEmail.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <input
              id="contact-form-company"
              type="text"
              {...register('company')}
              placeholder={t('company', { fallback: 'Company' })}
              className={errors.company ? styles.errorInput : ''}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              id="contact-form-website"
              type="text"
              {...register('website')}
              placeholder={t('website', { fallback: 'Website' })}
              className={errors.website ? styles.errorInput : ''}
            />
            {errors.website && <p className={styles.error}>{errors.website.message}</p>}
          </div>

          <div className={styles.formGroup + ' ' + styles.textarea}>
            <textarea
              id="contact-form-question"
              {...register('question')}
              placeholder={t('question', { fallback: 'Your Question' })}
              className={errors.question ? styles.errorInput : ''}
            />
            {errors.question && <p className={styles.error}>{errors.question.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              onChange={handleRecaptchaChange}
            />
            {errors.recaptcha && <p className={styles.error}>{errors.recaptcha.message}</p>}
          </div>

            <Button type="submit" variant="black">
            {isLoading
              ? t('loading', { fallback: 'Loading...' })
              : t('submit', { fallback: 'Submit' })}
          </Button>
        </form>
      </div>
      {isSuccess && <ContactFormSuccess onClose={() => setIsSuccess(false)} />}
    </>
  );
};
