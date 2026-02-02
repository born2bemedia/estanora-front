"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { useAuthStore } from "@/features/account";
import { createOrder } from "@/features/cart/api/createOrder";
import {
  type CheckoutFormSchema,
  checkoutFormSchema,
} from "@/features/cart/model/checkout.schema";
import { useCartStore } from "@/features/cart/store/cart";

import { Button } from "@/shared/ui/kit/button/Button";

import styles from "./CheckoutForm.module.scss";

import { useRouter } from "@/i18n/navigation";

const defaultValues: CheckoutFormSchema = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  country: "",
  zip: "",
  email: "",
  phone: "",
  orderNotes: "",
  termsAccepted: false,
  refundPolicyAccepted: false,
};

export const CheckoutForm = () => {
  const t = useTranslations("checkoutForm");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = getTotalPrice();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!isInitialized) {
      fetchUser();
    }
  }, [isInitialized, fetchUser]);

  useEffect(() => {
    if (!user || !isInitialized) return;
    reset({
      ...defaultValues,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phone: (user.phone as string) ?? "",
    });
  }, [user, isInitialized, reset]);

  const onSubmit = async (data: CheckoutFormSchema) => {
    try {
      await createOrder({
        billing: {
          firstName: data.firstName,
          lastName: data.lastName,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          country: data.country,
          zip: data.zip,
        },
        contact: {
          email: data.email,
          phone: data.phone ?? "",
        },
        orderNotes: data.orderNotes,
        items,
        total,
      });
      clearCart();
      // Оновлюємо стан авторизації (після покупки юзер міг бути залогінений автоматично)
      await fetchUser();
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>{t("completeYourOrder", { fallback: "Complete Your Order" })}</h1>

      <fieldset className={styles.fieldset}>
        <h2>{t("billingDetails", { fallback: "Billing Details" })}</h2>
        <div className={styles.billingDetailsRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">{t("firstName", { fallback: "First Name" })}<span className={styles.required}>*</span></label>
            <input id="firstName" {...register("firstName")} className={errors.firstName ? styles.errorInput : ""} />
            {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">{t("lastName", { fallback: "Last Name" })}<span className={styles.required}>*</span></label>
            <input id="lastName" {...register("lastName")} className={errors.lastName ? styles.errorInput : ""} />
            {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address1">{t("address1", { fallback: "Address Line 1" })}<span className={styles.required}>*</span></label>
            <input id="address1" {...register("address1")} className={errors.address1 ? styles.errorInput : ""} />
            {errors.address1 && <span className={styles.error}>{errors.address1.message}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address2">{t("address2", { fallback: "Address Line 2" })}</label>
            <input id="address2" {...register("address2")} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="city">{t("city", { fallback: "City" })}<span className={styles.required}>*</span></label>
            <input id="city" {...register("city")} className={errors.city ? styles.errorInput : ""} />
            {errors.city && <span className={styles.error}>{errors.city.message}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="country">{t("country", { fallback: "Country" })}<span className={styles.required}>*</span></label>
            <input id="country" {...register("country")} className={errors.country ? styles.errorInput : ""} />
            {errors.country && <span className={styles.error}>{errors.country.message}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="zip">{t("zip", { fallback: "ZIP Code" })}<span className={styles.required}>*</span></label>
            <input id="zip" {...register("zip")} className={errors.zip ? styles.errorInput : ""} />
            {errors.zip && <span className={styles.error}>{errors.zip.message}</span>}
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <h2>{t("contactDetails", { fallback: "Contact Details" })}</h2>
        <div className={styles.contactDetailsRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email">{t("email", { fallback: "Email address" })}<span className={styles.required}>*</span></label>
            <input id="email" type="email" {...register("email")} className={errors.email ? styles.errorInput : ""} />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">{t("phone", { fallback: "Phone number " })}<span className={styles.optional}>{t("optional", { fallback: "(Optional)" })}</span></label>
            <input id="phone" {...register("phone")} className={errors.phone ? styles.errorInput : ""} />
            {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <h2>{t("paymentMethod", { fallback: "Payment Method" })}</h2>
        <p className={styles.paymentMethod}>{t("bankTransfer", { fallback: "Bank Transfer " })}<span>{t("noOtherOptions", { fallback: "(no other options are currently available)" })}</span></p>
        <p className={styles.intro}>
          <span>
            {t("paymentInstructions1", { fallback: "Dear user," })}
          </span>
          <br/>
          {t("paymentInstructions2", { fallback: "When your order is placed, an email will be sent to you with payment instructions, banking details, and an overview of your order." })}
      </p>
      </fieldset>

      

      <div className={styles.fieldset}>
        <h2>{t("anythingToAdd", { fallback: "Anything to add?" })}</h2>
        <div className={styles.formGroup + " " + styles.textareaGroup}>
          <textarea id="orderNotes" {...register("orderNotes")} rows={4} />
        </div>
      </div>

      <section className={styles.orderSummary}>
        <h2>{t("orderSummary", { fallback: "Order Summary" })}</h2>
        <table>
          <thead>
            <tr>
              <th>{t("service", { fallback: "Service" })}</th>
              <th>{t("price", { fallback: "Price, €" })}</th>
              <th>{t("subtotal", { fallback: "Subtotal, €" })}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title} x {item.quantity}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}

          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className={styles.total}>{t("total", { fallback: "Total" })}</td>
              <td className={styles.totalPrice}>{total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <div className={styles.actions}>
        <div className={styles.checkboxes}>
          <label>
            <input type="checkbox" {...register("termsAccepted")} />
            {t("termsOfUse", { fallback: "I have read and agree to the website's Terms of Use." })}
          </label>
          {errors.termsAccepted && <span className={styles.error}>{errors.termsAccepted.message}</span>}
        </div>
        <div className={styles.checkboxes}>
          <label>
            <input type="checkbox" {...register("refundPolicyAccepted")} />
            {t("refundPolicy", { fallback: "I have read and agree to the Refund Policy." })}
          </label>
          {errors.refundPolicyAccepted && <span className={styles.error}>{errors.refundPolicyAccepted.message}</span>}
        </div>

        <Button type="submit" variant="white" disabled={isSubmitting}>
          {isSubmitting ? t("submitting", { fallback: "Submitting..." }) : t("submit", { fallback: "Submit" })}
        </Button>
      </div>
    </form>
  );
};
