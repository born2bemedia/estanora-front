"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";

import { submitMarketResearch } from "@/features/forms/api/submitForm";
import { formCountries } from "@/features/forms/lib/countries";
import { getSelectStyles } from "@/features/forms/lib/selectStyles";
import {
  type MarketResearchSchema,
  marketResearchSchema,
} from "@/features/forms/model/schemas";

import { excludedCountries } from "@/shared/lib/helpers/excludedCountries";
import { Button } from "@/shared/ui/kit/button/Button";

import { FormPopup } from "../FormPopup/FormPopup";
import styles from "../FormPopup/FormPopup.module.scss";

import "react-phone-input-2/lib/style.css";

type SelectOption = { value: string; label: string };

type MarketResearchPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onReturnHome?: () => void;
};

export const MarketResearchPopup = ({
  isOpen,
  onClose,
  onReturnHome,
}: MarketResearchPopupProps) => {
  const t = useTranslations("forms");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const GOAL_OPTIONS = [
    { value: "buy", label: t("goal_buy", { fallback: "Buy" }) },
    { value: "sell", label: t("goal_sell", { fallback: "Sell" }) },
    { value: "hold", label: t("goal_hold", { fallback: "Hold" }) },
    { value: "leverage", label: t("goal_leverage", { fallback: "Leverage / Finance" }) },
    { value: "not_sure", label: t("goal_not_sure", { fallback: "Not sure yet" }) },
  ];

  const PROPERTY_TYPE_OPTIONS = [
    { value: "apartment", label: t("propertyType_apartment", { fallback: "Apartment" }) },
    { value: "house", label: t("propertyType_house", { fallback: "House" }) },
    { value: "mixed_use", label: t("propertyType_mixed_use", { fallback: "Mixed-use" }) },
    { value: "land", label: t("propertyType_land", { fallback: "Land" }) },
    { value: "portfolio", label: t("propertyType_portfolio", { fallback: "Portfolio / Multiple properties" }) },
  ];
  
  const VALUE_RANGE_OPTIONS = [
    { value: "under_500k", label: t("valueRange_under_500k", { fallback: "Under €500k" }) },
    { value: "500k_1m", label: t("valueRange_500k_1m", { fallback: "€500k – €1M" }) },
    { value: "1m_3m", label: t("valueRange_1m_3m", { fallback: "€1M – €3M" }) },
    { value: "3m_plus", label: t("valueRange_3m_plus", { fallback: "€3M+" }) },
    { value: "not_sure", label: t("valueRange_not_sure", { fallback: "Not sure" }) },
  ];

  const form = useForm<MarketResearchSchema>({
    resolver: zodResolver(marketResearchSchema),
    defaultValues: {
      goal: "",
      country: "",
      city: "",
      propertyType: "",
      valueRange: "",
      fullName: "",
      phone: "",
      email: "",
    },
  });


  const onSubmit = async (data: MarketResearchSchema) => {
    setError(null);
    setIsLoading(true);
    try {
      await submitMarketResearch(data);
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

  const handleClose = () => {
    if (!isSuccess) onClose();
  };

  return (
    <FormPopup
      isOpen={isOpen}
      onClose={handleClose}
      ariaLabelledBy="market-research-title"
    >
      {isSuccess ? (
          <>
            
            <div className={styles.successPanel}>
              <h2 id="market-research-title" className={styles.title}>
                {t("marketResearch.successTitle", {
                  fallback: "Request submitted successfully",
                })}
              </h2>
              <p className={styles.description}>
                {t("marketResearch.successMessage", {
                  fallback:
                    "Thank you. Our expert will contact you shortly to confirm details and pricing.",
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
            <h2 id="market-research-title" className={styles.title}>
              {t("marketResearch.title", {
                fallback: "Market Research Request",
              })}
            </h2>
            <p className={styles.description}>
              {t("marketResearch.description", {
                fallback:
                  "Data-driven analysis to determine whether now is the right time to buy, sell, hold, or leverage your property.",
              })}
            </p>
            <form
              className={styles.form}
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <div className={styles.formGroup}>
                <label htmlFor="market-goal">
                  {t("marketResearch.goal", { fallback: "What is your goal?" })}
                </label>
                <Controller
                  name="goal"
                  control={form.control}
                  render={({ field }) => (
                    <Select<SelectOption>
                      {...field}
                      inputId="market-goal"
                      placeholder={t("chooseOption", {
                        fallback: "Choose your option",
                      })}
                      options={GOAL_OPTIONS}
                      value={GOAL_OPTIONS.find((o) => o.value === field.value) ?? null}
                      onChange={(opt) => field.onChange(opt?.value ?? "")}
                      className={styles.select}
                      classNamePrefix="select"
                      styles={getSelectStyles(!!form.formState.errors.goal)}
                    />
                  )}
                />
                {form.formState.errors.goal && (
                  <span className={styles.error}>
                    {form.formState.errors.goal.message}
                  </span>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="market-country">
                    {t("country", { fallback: "Country:" })}
                  </label>
                  <Controller
                    name="country"
                    control={form.control}
                    render={({ field }) => (
                      <Select<SelectOption>
                        {...field}
                        inputId="market-country"
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
                <div className={`${styles.formGroup} ${form.formState.errors.city ? styles.hasError : ""}`}>
                  <label htmlFor="market-city">
                    {t("city", { fallback: "City:" })}
                  </label>
                  <input
                    id="market-city"
                    type="text"
                    placeholder={t("cityPlaceholder", {
                      fallback: "City name",
                    })}
                    {...form.register("city")}
                    className={form.formState.errors.city ? styles.errorInput : ""}
                  />
                  {form.formState.errors.city && (
                    <span className={styles.error}>
                      {form.formState.errors.city.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="market-propertyType">
                    {t("marketResearch.propertyType", {
                      fallback: "Property type:",
                    })}
                  </label>
                  <Controller
                    name="propertyType"
                    control={form.control}
                    render={({ field }) => (
<Select<SelectOption>
                      {...field}
                      inputId="market-propertyType"
                        placeholder={t("chooseOption", {
                          fallback: "Choose your option",
                        })}
                        options={PROPERTY_TYPE_OPTIONS}
                        value={
                          PROPERTY_TYPE_OPTIONS.find(
                            (o) => o.value === field.value
                          ) ?? null
                        }
                        onChange={(opt) => field.onChange(opt?.value ?? "")}
                        className={styles.select}
                        classNamePrefix="select"
                        styles={getSelectStyles(!!form.formState.errors.propertyType)}
                      />
                    )}
                  />
                  {form.formState.errors.propertyType && (
                    <span className={styles.error}>
                      {form.formState.errors.propertyType.message}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="market-valueRange">
                    {t("marketResearch.valueRange", {
                      fallback: "Approximate value range:",
                    })}
                  </label>
                  <Controller
                    name="valueRange"
                    control={form.control}
                    render={({ field }) => (
<Select<SelectOption>
                      {...field}
                      inputId="market-valueRange"
                        placeholder={t("chooseOption", {
                          fallback: "Choose your option",
                        })}
                        options={VALUE_RANGE_OPTIONS}
                        value={
                          VALUE_RANGE_OPTIONS.find(
                            (o) => o.value === field.value
                          ) ?? null
                        }
                        onChange={(opt) => field.onChange(opt?.value ?? "")}
                        className={styles.select}
                        classNamePrefix="select"
                        styles={getSelectStyles(!!form.formState.errors.valueRange)}
                      />
                    )}
                  />
                  {form.formState.errors.valueRange && (
                    <span className={styles.error}>
                      {form.formState.errors.valueRange.message}
                    </span>
                  )}
                </div>
              </div>


              <div
                  className={`${styles.formGroup} ${form.formState.errors.fullName ? styles.hasError : ""}`}
                >
                  <label htmlFor="market-fullName">
                    {t("fullName", { fallback: "Full name:" })}{" "}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="market-fullName"
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
                  <label htmlFor="market-email">
                    {t("email", { fallback: "Email:" })}{" "}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="market-email"
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
                <div className={styles.formGroup}>
                  <label htmlFor="market-phone">
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
                        inputProps={{ id: "market-phone" }}
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

                

              {error && <p className={styles.submitError}>{error}</p>}
              <div className={styles.buttons}>
                <Button type="submit" variant="white" disabled={form.formState.isSubmitting || isLoading}>
                  {isLoading ? t("loading", { fallback: "Sending…" }) : t("marketResearch.orderResearch", { fallback: "Order research" })}
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
