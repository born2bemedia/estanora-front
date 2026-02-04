"use client";

import { useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";

import { submitPropertyConsultation } from "@/features/forms/api/submitForm";
import { formCountries } from "@/features/forms/lib/countries";
import { getSelectStyles } from "@/features/forms/lib/selectStyles";
import {
  type PropertyConsultationSchema,
  propertyConsultationSchema,
} from "@/features/forms/model/schemas";

import { excludedCountries } from "@/shared/lib/helpers/excludedCountries";
import { Button } from "@/shared/ui/kit/button/Button";

import { FormPopup } from "../FormPopup/FormPopup";
import styles from "../FormPopup/FormPopup.module.scss";

import "react-phone-input-2/lib/style.css";



const ENABLE_RECAPTCHA = true;

type PropertyConsultationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onReturnHome?: () => void;
};

export const PropertyConsultationPopup = ({
  isOpen,
  onClose,
  onReturnHome,
}: PropertyConsultationPopupProps) => {
  const t = useTranslations("forms");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const I_WANT_OPTIONS = [
    { value: "buy", label: t("iWant_buy", { fallback: "Buy" }) },
    { value: "sell", label: t("iWant_sell", { fallback: "Sell" }) },
    { value: "lease", label: t("iWant_lease", { fallback: "Lease" }) },
    { value: "rent", label: t("iWant_rent", { fallback: "Rent" }) },
    { value: "invest", label: t("iWant_invest", { fallback: "Invest" }) },
  ];
  
  const I_NEED_OPTIONS = [
    { value: "confirm_price", label: t("iNeed_confirm_price", { fallback: "Confirm purchase price & market value" }) },
    { value: "optimize_rental", label: t("iNeed_optimize_rental", { fallback: "Optimize rental income / revenue potential" }) },
    { value: "forecast", label: t("iNeed_forecast", { fallback: "Forecast property appreciation / resale timing" }) },
    { value: "assess", label: t("iNeed_assess", { fallback: "Assess market opportunities" }) },
    { value: "other", label: t("iNeed_other", { fallback: "Other" }) },
  ];

  const form = useForm<PropertyConsultationSchema>({
    resolver: zodResolver(propertyConsultationSchema),
    defaultValues: {
      iWant: "",
      areaOfInterest: "",
      iNeed: "",
      fullName: "",
      email: "",
      phone: "",
      recaptcha: "",
    },
  });

  const handleRecaptchaChange = (token: string | null) => {
    if (ENABLE_RECAPTCHA) {
      form.setValue("recaptcha", token ?? "", { shouldValidate: true });
    } else {
      form.setValue("recaptcha", "disabled", { shouldValidate: false });
    }
  };

  const onSubmit = async (data: PropertyConsultationSchema) => {
    setError(null);
    setIsLoading(true);
    try {
      await submitPropertyConsultation(data);
      setIsSuccess(true);
      form.reset();
      recaptchaRef.current?.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
      recaptchaRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnHome = () => {
    setIsSuccess(false);
    onReturnHome?.();
    onClose();
  };

  return (
    <FormPopup
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy="property-consultation-title"
    >
      {isSuccess ? (
          <>
            
            <div className={styles.successPanel}>
            <h2 id="property-consultation-title" className={styles.title}>
              {t("propertyConsultation.successTitle", {
                fallback: "Request submitted successfully!",
              })}
            </h2>
            <p className={styles.description}>
              {t("propertyConsultation.successMessage", {
                fallback:
                  "Thank you! Our expert will review your case and contact you shortly to confirm details and next steps. (No obligation. Pricing and scope will be confirmed before any work begins.)",
              })}
            </p>
              <div className={styles.returnButton}>
                <Button
                  type="button"
                  variant="white"
                  onClick={handleReturnHome}
                >
                  {t("returnHome", { fallback: "RETURN TO HOME PAGE" })}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 id="property-consultation-title" className={styles.title}>
              {t("propertyConsultation.title", {
                fallback: "Request Property Consultation",
              })}
            </h2>
            <p className={styles.subtitle}>
              {t("propertyConsultation.subtitle", {
                fallback: "It is free.",
              })}
            </p>
            <form
              className={styles.form}
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <div className={styles.formGroup}>
                <label htmlFor="consult-iWant">
                  {t("propertyConsultation.iWant", {
                    fallback: "I want to:",
                  })}
                </label>
                <Controller
                  name="iWant"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputId="consult-iWant"
                      placeholder={t("chooseOption", {
                        fallback: "Choose your option",
                      })}
                      options={I_WANT_OPTIONS}
                      value={I_WANT_OPTIONS.find((o) => o.value === field.value) ?? null}
                      onChange={(opt) => field.onChange(opt?.value ?? "")}
                      className={styles.select}
                      classNamePrefix="select"
                      styles={getSelectStyles(!!form.formState.errors.iWant)}
                    />
                  )}
                />
                {form.formState.errors.iWant && (
                  <span className={styles.error}>
                    {form.formState.errors.iWant.message}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="consult-areaOfInterest">
                  {t("propertyConsultation.areaOfInterest", {
                    fallback: "My area of interest:",
                  })}
                </label>
                <Controller
                  name="areaOfInterest"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputId="consult-areaOfInterest"
                      placeholder={t("chooseOption", {
                        fallback: "Choose your option",
                      })}
                      options={formCountries}
                      value={
                        formCountries.find(
                          (c) => c.value.toLowerCase() === field.value?.toLowerCase()
                        ) ?? null
                      }
                      onChange={(opt) => field.onChange(opt?.value ?? "")}
                      className={styles.select}
                      classNamePrefix="select"
                      styles={getSelectStyles(!!form.formState.errors.areaOfInterest)}
                    />
                  )}
                />
                {form.formState.errors.areaOfInterest && (
                  <span className={styles.error}>
                    {form.formState.errors.areaOfInterest.message}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="consult-iNeed">
                  {t("propertyConsultation.iNeed", {
                    fallback: "I need:",
                  })}
                </label>
                <Controller
                  name="iNeed"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputId="consult-iNeed"
                      placeholder={t("chooseOption", {
                        fallback: "Choose your option",
                      })}
                      options={I_NEED_OPTIONS}
                      value={I_NEED_OPTIONS.find((o) => o.value === field.value) ?? null}
                      onChange={(opt) => field.onChange(opt?.value ?? "")}
                      className={styles.select}
                      classNamePrefix="select"
                      styles={getSelectStyles(!!form.formState.errors.iNeed)}
                    />
                  )}
                />
                {form.formState.errors.iNeed && (
                  <span className={styles.error}>
                    {form.formState.errors.iNeed.message}
                  </span>
                )}
              </div>

              <div
                  className={`${styles.formGroup} ${form.formState.errors.fullName ? styles.hasError : ""}`}
                >
                  <label htmlFor="consult-fullName">
                    {t("fullName", { fallback: "Full name:" })}{" "}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="consult-fullName"
                    type="text"
                    placeholder={t("fullNamePlaceholder", {
                      fallback: "Full name",
                    })}
                    {...form.register("fullName")}
                  />
                  {form.formState.errors.fullName && (
                    <span className={styles.error}>
                      {form.formState.errors.fullName.message}
                    </span>
                  )}
                </div>

              <div className={styles.formRow}>
                
                <div
                  className={`${styles.formGroup} ${form.formState.errors.email ? styles.hasError : ""}`}
                >
                  <label htmlFor="consult-email">
                    {t("email", { fallback: "Email address:" })}{" "}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="consult-email"
                    type="email"
                    placeholder={t("emailPlaceholder", {
                      fallback: "Email address",
                    })}
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <span className={styles.error}>
                      {form.formState.errors.email.message}
                    </span>
                  )}
                </div>
                <div
                className={`${styles.formGroup} ${form.formState.errors.phone ? styles.hasError : ""}`}
              >
                <label htmlFor="consult-phone">
                  {t("phone", { fallback: "Phone:" })}{" "}
                  <span className={styles.required}>*</span>
                </label>
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <PhoneInput
                      country="gb"
                      value={field.value}
                      onChange={field.onChange}
                      excludeCountries={[...new Set(excludedCountries)]}
                      containerClass={styles.phoneInputContainer}
                      inputClass={form.formState.errors.phone ? `${styles.phoneInput} ${styles.errorInput}` : styles.phoneInput}
                      inputProps={{ id: "consult-phone" }}
                      enableSearch
                      preferredCountries={['gb']}
                    />
                  )}
                />
                {form.formState.errors.phone && (
                  <span className={styles.error}>
                    {form.formState.errors.phone.message}
                  </span>
                )}
              </div>
              </div>

              {ENABLE_RECAPTCHA && (
                <div className={styles.formGroup}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
                    onChange={handleRecaptchaChange}
                  />
                  {form.formState.errors.recaptcha && (
                    <span className={styles.error}>
                      {form.formState.errors.recaptcha.message}
                    </span>
                  )}
                </div>
              )}

              {error && <p className={styles.submitError}>{error}</p>}
              <div className={styles.buttons}>
                <Button type="submit" variant="white" disabled={form.formState.isSubmitting || isLoading}>
                  {isLoading ? t("loading", { fallback: "Sending…" }) : t("propertyConsultation.orderConsultation", { fallback: "Order consultation" })}
                </Button>
                <Button type="button" variant="bordered-black" onClick={onClose}>
                  {t("cancel", { fallback: "Cancel" })}
                </Button>
              </div>
            </form>
          </>
        )}
    </FormPopup>
  );
};
