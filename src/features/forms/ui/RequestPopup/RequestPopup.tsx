"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";

import { submitRequestForm } from "@/features/forms/api/submitForm";
import { formCountries } from "@/features/forms/lib/countries";
import { getSelectStyles } from "@/features/forms/lib/selectStyles";
import {
  type RequestFormSchema,
  requestFormSchema,
} from "@/features/forms/model/schemas";

import { excludedCountries } from "@/shared/lib/helpers/excludedCountries";
import { Button } from "@/shared/ui/kit/button/Button";

import { FormPopup } from "../FormPopup/FormPopup";
import styles from "../FormPopup/FormPopup.module.scss";

import "react-phone-input-2/lib/style.css";

type RequestPopupProps = {
  /** Display name for the package or service, e.g. "Due Diligence" or "Market Research" */
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onReturnHome?: () => void;
};

export const RequestPopup = ({
  name,
  isOpen,
  onClose,
  onReturnHome,
}: RequestPopupProps) => {
  const t = useTranslations("forms");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RequestFormSchema>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
    },
  });

  const onSubmit = async (data: RequestFormSchema) => {
    setError(null);
    setIsLoading(true);
    try {
      await submitRequestForm(data, name);
      setIsSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnHome = () => {
    setIsSuccess(false);
    onReturnHome?.();
    onClose();
  };

  const successMessage = t("requestForm.successMessage1", {
    name,
    fallback: `Your request for {name} has been received.`,
  });
  const successMessage2 = t("requestForm.successMessage2", {
    name,
    fallback: `Our expert will contact you shortly to confirm details, scope, and pricing.`,
  });

  return (
    <FormPopup
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy="request-popup-title"
    >
      {isSuccess ? (
          <>
            
            <div className={styles.successPanel}>
            <h2 id="request-popup-title" className={styles.title}>
              {t("requestForm.successTitle", { fallback: "Thank you!" })}
            </h2>
            <p className={styles.description}>{successMessage}<br/>{successMessage2}</p>
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
            <h2 id="request-popup-title" className={styles.title}>
              {name} {t("requestForm.request", { fallback: "Request" })}
            </h2>
            <br/><br/>
            <form
              className={styles.form}
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <div
                className={`${styles.formGroup} ${form.formState.errors.fullName ? styles.hasError : ""}`}
              >
                <label htmlFor="request-fullName">
                  {t("fullName", { fallback: "Full name:" })}{" "}
                  <span className={styles.required}>*</span>
                </label>
                <input
                  id="request-fullName"
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
                <label htmlFor="request-email">
                  {t("email", { fallback: "Email:" })}{" "}
                  <span className={styles.required}>*</span>
                </label>
                <input
                  id="request-email"
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
                <label htmlFor="request-phone">
                  {t("phone", { fallback: "Phone:" })}{" "}
                  <span className={styles.required}>*</span>
                </label>
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <PhoneInput
                      country="de"
                      value={field.value}
                      onChange={field.onChange}
                      excludeCountries={[...new Set(excludedCountries)]}
                      containerClass={styles.phoneInputContainer}
                      inputClass={form.formState.errors.phone ? `${styles.phoneInput} ${styles.errorInput}` : styles.phoneInput}
                      inputProps={{ id: "request-phone" }}
                      enableSearch
                      preferredCountries={[ "de", "gb", "us"]}
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

              

              <div className={styles.formGroup}>
                <label htmlFor="request-country">
                  {t("country", { fallback: "Country:" })}{" "}
                  <span className={styles.required}>*</span>
                </label>
                <Controller
                  name="country"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputId="request-country"
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
                      styles={getSelectStyles(!!form.formState.errors.country)}
                    />
                  )}
                />
                {form.formState.errors.country && (
                  <span className={styles.error}>
                    {form.formState.errors.country.message}
                  </span>
                )}
              </div>

              {error && <p className={styles.submitError}>{error}</p>}
              <div className={styles.buttons}>
                <Button type="submit" variant="white" disabled={form.formState.isSubmitting || isLoading}>
                  {isLoading ? t("loading", { fallback: "Sending…" }) : t("submit", { fallback: "Submit" })}
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
