"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthStore } from "@/features/account";
import { createOrder } from "@/features/cart/api/createOrder";
import {
  type CheckoutFormSchema,
  checkoutFormSchema,
} from "@/features/cart/model/checkout.schema";
import { useCartStore } from "@/features/cart/store/cart";

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
          phone: data.phone,
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
      <h1>Complete Your Order</h1>

      <fieldset className={styles.fieldset}>
        <legend>Billing Details</legend>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" {...register("firstName")} className={errors.firstName ? styles.errorInput : ""} />
          {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" {...register("lastName")} className={errors.lastName ? styles.errorInput : ""} />
          {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address1">Address Line 1</label>
          <input id="address1" {...register("address1")} className={errors.address1 ? styles.errorInput : ""} />
          {errors.address1 && <span className={styles.error}>{errors.address1.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address2">Address Line 2</label>
          <input id="address2" {...register("address2")} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="city">City</label>
          <input id="city" {...register("city")} className={errors.city ? styles.errorInput : ""} />
          {errors.city && <span className={styles.error}>{errors.city.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <input id="country" {...register("country")} className={errors.country ? styles.errorInput : ""} />
          {errors.country && <span className={styles.error}>{errors.country.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="zip">ZIP Code</label>
          <input id="zip" {...register("zip")} className={errors.zip ? styles.errorInput : ""} />
          {errors.zip && <span className={styles.error}>{errors.zip.message}</span>}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>Contact Details</legend>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} className={errors.email ? styles.errorInput : ""} />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input id="phone" {...register("phone")} className={errors.phone ? styles.errorInput : ""} />
          {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>Payment Method</legend>
        <p className={styles.intro}>Bank Transfer (no other options are currently available)</p>
      </fieldset>

      <p className={styles.intro}>
        When your order is placed, an email will be sent to you with payment instructions, banking details, and an overview of your order.
      </p>

      <div className={styles.fieldset}>
        <div className={styles.formGroup}>
          <label htmlFor="orderNotes">Anything to add?</label>
          <textarea id="orderNotes" {...register("orderNotes")} rows={4} />
        </div>
      </div>

      <section className={styles.orderSummary}>
        <h2>Order Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Price, €</th>
              <th>Subtotal, €</th>
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
        </table>
        <p className={styles.total}>
          <strong>Total:</strong> €{total.toFixed(2)}
        </p>
      </section>

      <div className={styles.checkboxes}>
        <label>
          <input type="checkbox" {...register("termsAccepted")} />
          I have read and agree to the website&apos;s Terms of Use.
        </label>
        {errors.termsAccepted && <span className={styles.error}>{errors.termsAccepted.message}</span>}
      </div>
      <div className={styles.checkboxes}>
        <label>
          <input type="checkbox" {...register("refundPolicyAccepted")} />
          I have read and agree to the Refund Policy.
        </label>
        {errors.refundPolicyAccepted && <span className={styles.error}>{errors.refundPolicyAccepted.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
