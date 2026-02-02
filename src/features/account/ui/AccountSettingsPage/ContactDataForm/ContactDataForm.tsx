"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

import {
  type ContactDataSchema,
  contactDataSchema,
} from "@/features/account/model/account-settings.schema";
import type { AuthUser } from "@/features/account/model/auth.types";
import { useAuthStore } from "@/features/account/store/auth";

import { excludedCountries } from "@/shared/lib/helpers/excludedCountries";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "../AccountSettingsPage.module.scss";

import "react-phone-input-2/lib/style.css";

const SUCCESS_MESSAGE = "Your personal information has been updated successfully.";

type ContactDataFormProps = {
  user: AuthUser;
};

export const ContactDataForm = ({ user }: ContactDataFormProps) => {
  const t = useTranslations("accountSettingsPage");
  const setUser = useAuthStore((s) => s.setUser);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const form = useForm<ContactDataSchema>({
    resolver: zodResolver(contactDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    form.reset({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      phone: (user.phone as string) ?? "",
      email: user.email ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when user loads
  }, [user]);

  const onSubmit = async (data: ContactDataSchema) => {
    setMessage(null);
    try {
      const res = await fetch("/api/account/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || undefined,
        }),
      });
      const json = (await res.json()) as { user?: Record<string, unknown>; message?: string };
      if (res.ok && json.user) {
        const u = json.user as { email?: string; firstName?: string; lastName?: string; phone?: string };
        setUser({
          id: user.id,
          email: u.email ?? user.email,
          firstName: u.firstName ?? user.firstName,
          lastName: u.lastName ?? user.lastName,
          phone: u.phone ?? user.phone,
        });
        setMessage({ type: "success", text: SUCCESS_MESSAGE });
      } else {
        setMessage({ type: "error", text: json.message ?? "Update failed." });
      }
    } catch {
      setMessage({ type: "error", text: "Update failed." });
    }
  };

  return (
    <div className={styles.contactDataSection}>
      <form className={styles.contactDataForm} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={`${styles.formGroup} ${form.formState.errors.firstName ? styles.errorInput : ""}`}>
          <label htmlFor="contact-firstName">
            {t("yourName", { fallback: "Your Name" })} <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-firstName"
            type="text"
            placeholder={t("yourNamePlaceholder", { fallback: "Your Name" })}
            {...form.register("firstName")}
          />
          {form.formState.errors.firstName && (
            <p className={styles.error}>{form.formState.errors.firstName.message}</p>
          )}
        </div>
        <div className={`${styles.formGroup} ${form.formState.errors.lastName ? styles.errorInput : ""}`}>
          <label htmlFor="contact-lastName">
            {t("yourLastName", { fallback: "Your Last Name" })} <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-lastName"
            type="text"
            placeholder={t("yourLastNamePlaceholder", { fallback: "Your Last Name" })}
            {...form.register("lastName")}
          />
          {form.formState.errors.lastName && (
            <p className={styles.error}>{form.formState.errors.lastName.message}</p>
          )}
        </div>
        <div className={`${styles.formGroup} ${form.formState.errors.phone ? styles.errorInput : ""}`}>
          <label htmlFor="contact-phone">{t("yourPhone", { fallback: "Your Phone" })}</label>
          <Controller
            name="phone"
            control={form.control}
            render={({ field }) => (
              <PhoneInput
                country="ua"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                excludeCountries={[...new Set(excludedCountries)]}
                inputProps={{
                  id: "contact-phone",
                  name: "phone",
                  placeholder: t("yourPhonePlaceholder", { fallback: "Your Phone" }),
                }}
                containerClass={styles.phoneInputContainer}
                inputClass={form.formState.errors.phone ? `${styles.phoneInput} ${styles.errorInput}` : styles.phoneInput}
                enableSearch
                preferredCountries={["ua", "de", "gb", "us"]}
              />
            )}
          />
          {form.formState.errors.phone && (
            <p className={styles.error}>{form.formState.errors.phone.message}</p>
          )}
        </div>
        <div className={`${styles.formGroup} ${form.formState.errors.email ? styles.errorInput : ""}`}>
          <label htmlFor="contact-email">
            {t("yourEmail", { fallback: "Your Email" })} <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder={t("yourEmailPlaceholder", { fallback: "Your Email" })}
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className={styles.error}>{form.formState.errors.email.message}</p>
          )}
        </div>
        <Button type="submit" variant="white" disabled={form.formState.isSubmitting}>
          {t("updateData", { fallback: "Update Data" })}
        </Button>
        {message && (
          <p className={`${styles.message} ${styles[message.type]}`}>{message.text}</p>
        )}
      </form>
    </div>
  );
};
