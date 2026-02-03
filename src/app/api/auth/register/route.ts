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
    <title>Order Received - Estanora</title>
</head>

<body
    style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #121212;">

        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation"
                    style="max-width: 640px; width: 100%; border-collapse: collapse; background-color: #121212;overflow: hidden;">
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
                                Dear ${safeFirstName},
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                Congratulations! You have successfully registered an account with <b>Estanora</b>.
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                Here are your account credentials for reference:
                            </p>

                            <p style="margin: 0 0 12px; 
                            background: rgba(255, 255, 255, 0.05);
                            padding: 12px;
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;
                            width: fit-content;">
                                Email:&nbsp;&nbsp;
                                <span style="color: #FFF;font-weight: 400;">${safeEmail}</span>
                            </p>
                            <p style="margin: 0 0 24px; 
                            background: rgba(255, 255, 255, 0.05);
                            padding: 12px;
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;
                            width: fit-content;">
                                Password:&nbsp;&nbsp;
                                <span style="color: #FFF;font-weight: 400;">${safePassword}</span>
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                You can now log in and start exploring our real estate consulting services.
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                We’re excited to help you make informed property decisions.
                            </p>

                            <p style="margin: 0; color: #FFF;
                            font-size: 20px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;">
                                Happy real estate consulting!<br>
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
