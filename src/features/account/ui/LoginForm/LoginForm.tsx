"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuthStore } from "@/features/account/store/auth";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./LoginForm.module.scss";

import { useRouter } from "@/i18n/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);

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
      <h1>Log in</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} autoComplete="email" />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} autoComplete="current-password" />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>
      {errors.root && <span className={styles.error}>{errors.root.message}</span>}
      
      <Button type="submit" disabled={isLoading} variant="white">
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
};
