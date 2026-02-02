"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import {
  type ChangePasswordSchema,
  changePasswordSchema,
} from "@/features/account/model/account-settings.schema";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "../AccountSettingsPage.module.scss";

const SUCCESS_MESSAGE = "Your personal information has been updated successfully.";
const WRONG_PASSWORD_MESSAGE = "The wrong password. Try again.";

export const ChangePasswordForm = () => {
  const t = useTranslations("accountSettingsPage");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordSchema) => {
    setMessage(null);
    try {
      const res = await fetch("/api/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });
      const json = (await res.json()) as { message?: string; ok?: boolean };
      if (res.ok) {
        setMessage({ type: "success", text: SUCCESS_MESSAGE });
        form.reset({
          currentPassword: "",
          newPassword: "",
          repeatNewPassword: "",
        });
      } else {
        const msg = json.message ?? "Password update failed.";
        if (res.status === 400 && (msg.toLowerCase().includes("wrong") || msg.toLowerCase().includes("password"))) {
          setMessage({ type: "error", text: WRONG_PASSWORD_MESSAGE });
        } else {
          setMessage({ type: "error", text: msg });
        }
      }
    } catch {
      setMessage({ type: "error", text: "Password update failed." });
    }
  };

  return (
    <div className={styles.formSection}>
      <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword">
            {t("currentPassword", { fallback: "Current Password" })} <span className={styles.required}>*</span>
          </label>
          <input
            id="currentPassword"
            type="password"
            placeholder={t("currentPasswordPlaceholder", { fallback: "Current Password" })}
            {...form.register("currentPassword")}
            className={form.formState.errors.currentPassword ? styles.errorInput : ""}
          />
          {form.formState.errors.currentPassword && (
            <p className={styles.error}>{form.formState.errors.currentPassword.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword">
            {t("newPassword", { fallback: "New Password" })} <span className={styles.required}>*</span>
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder={t("newPasswordPlaceholder", { fallback: "New Password" })}
            {...form.register("newPassword")}
            className={form.formState.errors.newPassword ? styles.errorInput : ""}
          />
          {form.formState.errors.newPassword && (
            <p className={styles.error}>{form.formState.errors.newPassword.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="repeatNewPassword">
            {t("repeatNewPassword", { fallback: "Repeat New Password" })} <span className={styles.required}>*</span>
          </label>
          <input
            id="repeatNewPassword"
            type="password"
            placeholder={t("repeatNewPasswordPlaceholder", { fallback: "Repeat New Password" })}
            {...form.register("repeatNewPassword")}
            className={form.formState.errors.repeatNewPassword ? styles.errorInput : ""}
          />
          {form.formState.errors.repeatNewPassword && (
            <p className={styles.error}>{form.formState.errors.repeatNewPassword.message}</p>
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
