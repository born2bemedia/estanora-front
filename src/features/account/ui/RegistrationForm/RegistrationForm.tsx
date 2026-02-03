"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import {
  type RegistrationSchema,
  registrationSchema,
} from "@/features/account/model/account-settings.schema";
import { useAuthStore } from "@/features/account/store/auth";

import { EyeIcon, EyeOffIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./RegistrationForm.module.scss";

import { Link, useRouter } from "@/i18n/navigation";

export const RegistrationForm = () => {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);
  const t = useTranslations("registration");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegistrationSchema) => {
    const result = await register(data.firstName, data.lastName, data.email, data.password);
    if (result.ok) {
      setIsSuccess(true);
    } else {
      if (result.message?.toLowerCase().includes("email")) {
        setError("email", { message: result.message });
      } else {
        setError("root", { message: result.message ?? "Registration failed." });
      }
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.successMessage}>
        <h2>{t("successTitle", { fallback: "Your account has been created successfully!" })}</h2>
        <p>{t("successMessage", { fallback: "You can now log in with your email and password." })}</p>
        <Button type="button" variant="white" onClick={() => router.push("/log-in")}>
          {t("goToLogin", { fallback: "Go to Login" })}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {t("title", { fallback: "Join Estanora" })}
        </h1>
        <p className={styles.text}>
          {t("subtitle", {
            fallback:
              "Create your account to access property insights and personalized services.",
          })}
        </p>
      </div>
      <div className={styles.formWrapper}>
      <div className={styles.formGroup}>
        <label htmlFor="firstName">
          {t("firstName", { fallback: "First name:" })}{" "}
          <span className={styles.required}>*</span>
        </label>
        <input
          id="firstName"
          type="text"
          {...registerField("firstName")}
          autoComplete="given-name"
          className={errors.firstName ? styles.errorInput : ""}
        />
        {errors.firstName && (
          <span className={styles.error}>{errors.firstName.message}</span>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lastName">
          {t("lastName", { fallback: "Last name:" })}{" "}
          <span className={styles.required}>*</span>
        </label>
        <input
          id="lastName"
          type="text"
          {...registerField("lastName")}
          autoComplete="family-name"
          className={errors.lastName ? styles.errorInput : ""}
        />
        {errors.lastName && (
          <span className={styles.error}>{errors.lastName.message}</span>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">
          {t("email", { fallback: "Email:" })}{" "}
          <span className={styles.required}>*</span>
        </label>
        <input
          id="email"
          type="email"
          {...registerField("email")}
          autoComplete="email"
          className={errors.email ? styles.errorInput : ""}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">
          {t("password", { fallback: "Password:" })}{" "}
          <span className={styles.required}>*</span>
        </label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...registerField("password")}
            autoComplete="new-password"
            className={errors.password ? styles.errorInput : ""}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOffIcon />
            ) : (
              <EyeIcon />
            )}
          </button>
        </div>
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>
      {errors.root && <span className={styles.rootError}>{errors.root.message}</span>}
      <Button type="submit" variant="white" disabled={isLoading}>
        {isLoading ? t("registering", { fallback: "Registering..." }) : t("register", { fallback: "Register" })}
      </Button>
      <p className={styles.loginLink}>
        {t("loginLink1", { fallback: "Already have an account?" })}{" "}
        <Link href="/log-in">{t("loginLink2", { fallback: "Log in" })}</Link>
      </p>
      </div>
    </form>
  );
};
