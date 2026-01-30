"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type ChangePasswordSchema,
  changePasswordSchema,
} from "@/features/account/model/account-settings.schema";

import styles from "../AccountSettingsPage.module.scss";

const SUCCESS_MESSAGE = "Your personal information has been updated successfully.";
const WRONG_PASSWORD_MESSAGE = "The wrong password. Try again.";

export const ChangePasswordForm = () => {
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
      <h2>Change password</h2>
      <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword">
            Current Password <span className={styles.required}>*</span>
          </label>
          <input
            id="currentPassword"
            type="password"
            placeholder="Current Password (this is a placeholder text)"
            {...form.register("currentPassword")}
            className={form.formState.errors.currentPassword ? styles.errorInput : ""}
          />
          {form.formState.errors.currentPassword && (
            <p className={styles.error}>{form.formState.errors.currentPassword.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword">
            New Password <span className={styles.required}>*</span>
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="New Password (this is a placeholder text)"
            {...form.register("newPassword")}
            className={form.formState.errors.newPassword ? styles.errorInput : ""}
          />
          {form.formState.errors.newPassword && (
            <p className={styles.error}>{form.formState.errors.newPassword.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="repeatNewPassword">
            Repeat New Password <span className={styles.required}>*</span>
          </label>
          <input
            id="repeatNewPassword"
            type="password"
            placeholder="Repeat New Password (this is a placeholder text)"
            {...form.register("repeatNewPassword")}
            className={form.formState.errors.repeatNewPassword ? styles.errorInput : ""}
          />
          {form.formState.errors.repeatNewPassword && (
            <p className={styles.error}>{form.formState.errors.repeatNewPassword.message}</p>
          )}
        </div>
        <button type="submit" disabled={form.formState.isSubmitting}>
          Update Data
        </button>
        {message && (
          <p className={`${styles.message} ${styles[message.type]}`}>{message.text}</p>
        )}
      </form>
    </div>
  );
};
