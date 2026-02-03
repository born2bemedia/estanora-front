"use server";

import { cookies } from "next/headers";

import sgMail from "@sendgrid/mail";

import type { CheckoutFormSchema } from "../model/checkout.schema";
import type { CartItem } from "../store/cart";
import { ensureUser } from "./user";

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export type CreateOrderPayload = {
  billing: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    country: string;
    zip: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  orderNotes?: string;
  items: CartItem[];
  total: number;
};

const postOrder = async (
  data: CheckoutFormSchema,
  total: number,
  cart: CartItem[]
) => {
  if (!SERVER_URL) {
    throw new Error("SERVER_URL is not configured");
  }

  // Перевіряємо/створюємо користувача перед створенням ордера
  const { userId, isNewUser, password } = await ensureUser({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone ?? "",
  });

  const orderNumber = `ORD_${Math.floor(Math.random() * 900000) + 100000}`;

  const orderNotes = [
    `Contact: ${data.email}, ${data.phone ?? ""}`,
    `Billing name: ${data.firstName} ${data.lastName}`,
    data.orderNotes ? `Notes: ${data.orderNotes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const orderData = {
    user: userId,
    items: cart.map((item) => ({
      product: item.title,
      quantity: item.quantity,
      price: item.price,
    })),
    total: total,
    status: "pending",
    paymentMethod: "Bank Transfer",
    orderNotes,
    billingAddress: {
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      zip: data.zip,
      country: data.country,
    },
  };

  console.log("Sending order data to Payload:", JSON.stringify(orderData, null, 2));

  // If Payload returns 500 "Something went wrong", check the CMS repo:
  // - Orders collection: beforeChange hook (e.g. find last order with sort "-createdAt") — ensure it handles empty collection and correct field name (createdAt vs createdAt).
  // - Run the CMS locally and check server logs for the real error/stack trace.
  const response = await fetch(`${SERVER_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Order creation failed with status: ${response.status}`);
    console.error("Error response:", errorText);
    // Payload often returns { errors: [{ message, name?, data? }] } — log full JSON for debugging
    try {
      const errJson = JSON.parse(errorText) as { errors?: Array<{ message?: string; name?: string; data?: unknown }> };
      if (errJson.errors?.length) {
        console.error("Payload errors:", JSON.stringify(errJson.errors, null, 2));
      }
    } catch {
      // ignore
    }
    throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
  }

  const orderResult = (await response.json()) as Record<string, unknown>;

  // Після успішної покупки логінимо юзера, якщо він щойно створений
  if (isNewUser && password && data.email) {
    try {
      const loginRes = await fetch(`${SERVER_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: data.email, password }),
      });
      if (loginRes.ok) {
        const loginData = (await loginRes.json()) as { token?: string };
        if (loginData.token) {
          const cookieStore = await cookies();
          cookieStore.set(COOKIE_NAME as string, loginData.token ?? "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });
        }
      }
    } catch (loginErr) {
      console.error("Auto-login after purchase failed:", loginErr);
    }
  }

  // Send emails if SendGrid is configured
  if (SENDGRID_API_KEY && FROM_EMAIL && ADMIN_EMAIL) {
    try {
      const adminMsg = {
        to: ADMIN_EMAIL,
        from: FROM_EMAIL,
        subject: `New Order Received - ${orderNumber}`,
        html: `
          <h2>New Order Received - ${orderNumber}</h2>
          <p><strong>User:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone ?? ""}</p>
          <p><strong>Address:</strong> ${data.address1}${data.address2 ? `, ${data.address2}` : ""}, ${data.city}, ${data.zip}, ${data.country}</p>
          ${data.orderNotes ? `<p><strong>Order Notes:</strong> ${data.orderNotes}</p>` : ""}
          <p><strong>Total:</strong> €${total.toFixed(2)}</p>
          <p><strong>Items:</strong></p>
          <ul>
            ${cart.map((item) => `<li>${item.title} x ${item.quantity} - €${(item.price * item.quantity).toFixed(2)}</li>`).join("")}
          </ul>
        `,
      };

      // Escape HTML to prevent XSS
      const escapeHtml = (text: string) => {
        return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      };

      const safeFirstName = escapeHtml(data.firstName);

      const userMsg = {
        to: data.email,
        from: FROM_EMAIL,
        subject: "We've received your Estanora order",
        html: `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Received - Estanora</title>
</head>

<body
    style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;">

        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation"
                    style="max-width: 640px; width: 100%; border-collapse: collapse; background-color: #1a1a1a;overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 0;height: 100px;">

                            <img style="width: 100%;height: auto;" src="https://estanora.com/images/mail-header.png"
                                alt="Estanora Logo">
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 32px;background: #000;">
                            <p style="margin: 0 0 32px; color: rgba(204, 204, 204, 0.40);
                            font-size: 42px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;">
                                Dear Customer,
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                Thank you for choosing Estanora for your real estate consultation.
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                We're happy to let you know that your order has been successfully received. One of our
                                experts will review your request and contact you shortly to clarify details and ensure
                                we deliver a tailored, high-value consulting experience.
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                In the meantime, no further action is required from you. If you have any additional
                                information you'd like to share, you can simply reply to this email.
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                We appreciate your trust in Estanora and look forward to working with you.
                            </p>

                            <p style="margin: 0; color: #FFF;
                            font-size: 20px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;">
                                Kind regards,<br>
                                <strong style="color: #ffffff;">The Estanora Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="border-top: 1px solid #222; padding: 24px 30px; background: #000;">
                            <a href="mailto:info@estanora.com" style="color: #FFF;
                            font-size: 10px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;
                            text-transform: uppercase;
                            float: left;
                            text-decoration: none;">
                                <img style="margin-right: 8px;margin-bottom: -2px;" width="14" height="14"
                                    src="https://estanora.com/images/mail-icon.png" alt="Estanora Mail Icon">
                                info@estanora.com
                            </a>
                            <img style="width: 124.695px;height: 20px; float: right;"
                                src="https://estanora.com/images/mail-logo.png" alt="Estanora Mail Icon">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
        `,
      };

      await sgMail.send(adminMsg);
      await sgMail.send(userMsg);
    } catch (emailError) {
      console.error("Error sending emails:", emailError);
      // Don't fail the order if email fails
    }
  }

  return orderResult;
};

export const createOrder = async (payload: CreateOrderPayload) => {
  const formData: CheckoutFormSchema = {
    firstName: payload.billing.firstName,
    lastName: payload.billing.lastName,
    address1: payload.billing.address1,
    address2: payload.billing.address2,
    city: payload.billing.city,
    country: payload.billing.country,
    zip: payload.billing.zip,
    email: payload.contact.email,
    phone: payload.contact.phone ?? "",
    orderNotes: payload.orderNotes,
    termsAccepted: true,
    refundPolicyAccepted: true,
  };

  return postOrder(formData, payload.total, payload.items);
};
