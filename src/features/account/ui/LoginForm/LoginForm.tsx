"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuthStore } from "@/features/account/store/auth";

import { EyeIcon, EyeOffIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./LoginForm.module.scss";

import { Link, useRouter } from "@/i18n/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const t = useTranslations("account");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormSchema) => {
    const result = await login(data.email, data.password);
    if (result.ok) {
      router.push("/account");
    } else {
      setError("root", { message: result.message ?? "Login failed." });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {t("title", { fallback: "Welcome Back to Estanora" })}
        </h1>
        <p className={styles.text}>
          {t("subtitle", {
            fallback:
              "Access your account and manage your property insights with ease.",
          })}
        </p>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">{t("email", { fallback: "Email" })} </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          autoComplete="email"
          className={errors.email ? styles.errorInput : ""}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">
          {t("password", { fallback: "Password" })}
        </label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            autoComplete="current-password"
            className={errors.password ? styles.errorInput : ""}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>
      {errors.root && (
        <span className={styles.rootError}>{errors.root.message}</span>
      )}
      <Button type="submit" variant="white" disabled={isLoading}>
        {isLoading
          ? t("loggingIn", { fallback: "Logging in..." })
          : t("login", { fallback: "Log in" })}
      </Button>
      <p className={styles.signupLink}>
        {t("signupLink1", { fallback: "Don't have an account?" })}{" "}
        <Link href="/registration">{t("signupLink2", { fallback: "Sign up" })}</Link>
      </p>
    </form>
  );
};
