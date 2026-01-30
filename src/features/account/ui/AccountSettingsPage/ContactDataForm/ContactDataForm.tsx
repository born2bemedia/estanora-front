"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type ContactDataSchema,
  contactDataSchema,
} from "@/features/account/model/account-settings.schema";
import type { AuthUser } from "@/features/account/model/auth.types";
import { useAuthStore } from "@/features/account/store/auth";

import styles from "../AccountSettingsPage.module.scss";

const SUCCESS_MESSAGE = "Your personal information has been updated successfully.";

type ContactDataFormProps = {
  user: AuthUser;
};

export const ContactDataForm = ({ user }: ContactDataFormProps) => {
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
    <div className={styles.formSection}>
      <h2>Contact details</h2>
      <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="contact-firstName">
            Your Name <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-firstName"
            type="text"
            placeholder="Your Name (this is a placeholder text)"
            {...form.register("firstName")}
            className={form.formState.errors.firstName ? styles.errorInput : ""}
          />
          {form.formState.errors.firstName && (
            <p className={styles.error}>{form.formState.errors.firstName.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact-lastName">
            Your Last Name <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-lastName"
            type="text"
            placeholder="Your Last Name (this is a placeholder text)"
            {...form.register("lastName")}
            className={form.formState.errors.lastName ? styles.errorInput : ""}
          />
          {form.formState.errors.lastName && (
            <p className={styles.error}>{form.formState.errors.lastName.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact-phone">Your Phone</label>
          <input
            id="contact-phone"
            type="tel"
            placeholder="Your Phone (this is a placeholder text) +44"
            {...form.register("phone")}
            className={form.formState.errors.phone ? styles.errorInput : ""}
          />
          {form.formState.errors.phone && (
            <p className={styles.error}>{form.formState.errors.phone.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact-email">
            Your Email <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="Your Email (this is a placeholder text)"
            {...form.register("email")}
            className={form.formState.errors.email ? styles.errorInput : ""}
          />
          {form.formState.errors.email && (
            <p className={styles.error}>{form.formState.errors.email.message}</p>
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
