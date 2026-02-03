import { NextResponse } from "next/server";

import sgMail from "@sendgrid/mail";

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json(
        { message: "Server URL is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
    };
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const res = await fetch(`${SERVER_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to register user: ${res.status} - ${errorText}`);
      try {
        const errJson = JSON.parse(errorText) as { errors?: Array<{ message?: string }> };
        if (errJson.errors?.length) {
          const message = errJson.errors[0]?.message ?? "Registration failed.";
          return NextResponse.json({ message }, { status: res.status });
        }
      } catch {
        // ignore JSON parse error
      }
      return NextResponse.json(
        { message: "Registration failed." },
        { status: res.status },
      );
    }

    const user = (await res.json()) as {
      id: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
    };

    // Send welcome email to the user
    if (SENDGRID_API_KEY && FROM_EMAIL && email) {
      try {
        // Escape HTML to prevent XSS
        const escapeHtml = (text: string) => {
          return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        };

        const safeFirstName = escapeHtml(firstName);
        const safeEmail = escapeHtml(email);
        const safePassword = escapeHtml(password);

        const welcomeEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Estanora</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #1a1a1a; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background-color: #1a1a1a;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #ffffff; letter-spacing: -0.5px;">
                Welcome to Estanora – Your Account is Ready
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Dear ${safeFirstName},
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Congratulations! You have successfully registered an account with Estanora.
              </p>
              
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Here are your account credentials for reference:
              </p>
              
              <div style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 24px; margin: 24px 0;">
                <p style="margin: 0 0 12px; font-size: 14px; font-weight: 500; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
                  Email:
                </p>
                <p style="margin: 0 0 24px; font-size: 16px; color: #e0e0e0; word-break: break-all;">
                  ${safeEmail}
                </p>
                
                <p style="margin: 0 0 12px; font-size: 14px; font-weight: 500; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
                  Password:
                </p>
                <p style="margin: 0; font-size: 16px; color: #e0e0e0; font-family: 'Courier New', monospace;">
                  ${safePassword}
                </p>
              </div>
              
              <p style="margin: 24px 0; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                You can now log in and start exploring our real estate consulting services.
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                We're excited to help you make informed property decisions.
              </p>
              
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Happy real estate consulting!<br>
                <strong style="color: #ffffff;">The Estanora Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: rgba(255, 255, 255, 0.03); border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0; font-size: 12px; color: rgba(255, 255, 255, 0.5);">
                © ${new Date().getFullYear()} Estanora. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `;

        const welcomeMsg = {
          to: email,
          from: FROM_EMAIL,
          subject: "Welcome to Estanora – Your Account is Ready",
          html: welcomeEmailHtml,
        };

        await sgMail.send(welcomeMsg);
        console.log(`Registration email sent to ${email}`);
      } catch (emailError) {
        console.error("Error sending registration email:", emailError);
        // Не зупиняємо процес, якщо email не відправився
      }
    }

    // Automatically log in the user after registration to get a token
    const loginRes = await fetch(`${SERVER_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      // Registration succeeded but login failed - return user anyway
      console.error(`Failed to auto-login after registration: ${loginRes.status}`);
      return NextResponse.json({ user });
    }

    const loginData = (await loginRes.json()) as {
      user?: {
        id: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
      };
      token?: string;
      exp?: number;
      errors?: Array<{ message?: string }>;
    };

    const token = loginData.token;
    const response = NextResponse.json({ user: loginData.user ?? user });
    
    if (token && COOKIE_NAME) {
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Registration error:", message);
    return NextResponse.json(
      { message: "Registration failed.", error: message },
      { status: 500 },
    );
  }
}
