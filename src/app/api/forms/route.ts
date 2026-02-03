import { NextResponse } from "next/server";

import sgMail from "@sendgrid/mail";

const GOAL_LABELS: Record<string, string> = {
  buy: "Buy",
  sell: "Sell",
  hold: "Hold",
  leverage: "Leverage / Finance",
  not_sure: "Not sure yet",
};

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: "Apartment",
  house: "House",
  mixed_use: "Mixed-use",
  land: "Land",
  portfolio: "Portfolio / Multiple properties",
};

const VALUE_RANGE_LABELS: Record<string, string> = {
  under_500k: "Under €500k",
  "500k_1m": "€500k – €1M",
  "1m_3m": "€1M – €3M",
  "3m_plus": "€3M+",
  not_sure: "Not sure",
};

const I_WANT_LABELS: Record<string, string> = {
  buy: "Buy",
  sell: "Sell",
  lease: "Lease",
  rent: "Rent",
  invest: "Invest",
};

const I_NEED_LABELS: Record<string, string> = {
  confirm_price: "Confirm purchase price & market value",
  optimize_rental: "Optimize rental income / revenue potential",
  forecast: "Forecast property appreciation / resale timing",
  assess: "Assess market opportunities",
  other: "Other",
};

type MarketResearchPayload = {
  goal: string;
  country: string;
  city: string;
  propertyType: string;
  valueRange: string;
  fullName: string;
  phone: string;
  email: string;
};

type PropertyConsultationPayload = {
  iWant: string;
  areaOfInterest: string;
  iNeed: string;
  fullName: string;
  email: string;
  phone: string;
};

type RequestPayload = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as {
      formType: "market-research" | "property-consultation" | "request";
      data:
        | MarketResearchPayload
        | PropertyConsultationPayload
        | RequestPayload;
      name?: string;
    };

    const { formType, data, name } = body;

    if (!formType || !data) {
      return NextResponse.json(
        { message: "Missing formType or data." },
        { status: 400 }
      );
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!apiKey || !adminEmail || !fromEmail) {
      console.error("SENDGRID_API_KEY, ADMIN_EMAIL or FROM_EMAIL is not set");
      return NextResponse.json(
        { message: "Email configuration is missing." },
        { status: 500 }
      );
    }

    sgMail.setApiKey(apiKey);

    // Escape HTML to prevent XSS
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    let subject: string;
    let html: string;
    let userEmail: string | undefined;

    if (formType === "market-research") {
      const d = data as MarketResearchPayload;
      userEmail = d.email;
      subject = "Market Research Request";
      html = `
        <h2>Market Research Request</h2>
        <p><strong>What is your goal?</strong> ${escapeHtml(
          GOAL_LABELS[d.goal] ?? d.goal
        )}</p>
        <p><strong>Country:</strong> ${escapeHtml(d.country)}</p>
        <p><strong>City:</strong> ${escapeHtml(d.city)}</p>
        <p><strong>Property type:</strong> ${escapeHtml(
          PROPERTY_TYPE_LABELS[d.propertyType] ?? d.propertyType
        )}</p>
        <p><strong>Approximate value range:</strong> ${escapeHtml(
          VALUE_RANGE_LABELS[d.valueRange] ?? d.valueRange
        )}</p>
        <p><strong>Full name:</strong> ${escapeHtml(d.fullName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
      `;
    } else if (formType === "property-consultation") {
      const d = data as PropertyConsultationPayload;
      userEmail = d.email;
      subject = "Request Property Consultation";
      html = `
        <h2>Request Property Consultation</h2>
        <p><strong>I want to:</strong> ${escapeHtml(
          I_WANT_LABELS[d.iWant] ?? d.iWant
        )}</p>
        <p><strong>My area of interest:</strong> ${escapeHtml(
          d.areaOfInterest
        )}</p>
        <p><strong>I need:</strong> ${escapeHtml(
          I_NEED_LABELS[d.iNeed] ?? d.iNeed
        )}</p>
        <p><strong>Full name:</strong> ${escapeHtml(d.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
      `;
    } else if (formType === "request" && name) {
      const d = data as RequestPayload;
      userEmail = d.email;
      subject = `${escapeHtml(name)} Request`;
      html = `
        <h2>${escapeHtml(name)} Request</h2>
        <p><strong>Full name:</strong> ${escapeHtml(d.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
        <p><strong>Country:</strong> ${escapeHtml(d.country)}</p>
      `;
    } else {
      return NextResponse.json(
        { message: "Invalid formType or missing name for request form." },
        { status: 400 }
      );
    }

    const msg = {
      to: adminEmail,
      from: fromEmail,
      subject,
      html,
    };

    await sgMail.send(msg);

    // Send confirmation email to user for property-consultation
    if (formType === "property-consultation" && userEmail) {
      try {
        const userMsg = {
          to: userEmail,
          from: fromEmail,
          subject: "Your Free Consultation Request Has Been Received",
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
                                Dear Customer,
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                               Thank you for your interest in a <b>free consultation</b> regarding your real estate case.
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                We’ve received your request and will review it shortly to assign it to the most <b>appropriate</b> expert based on your needs and objectives.
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                               Our consultant will contact you using this email address to continue the conversation and schedule the next steps.
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                We look forward to assisting you.
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

        await sgMail.send(userMsg);
        console.log(`Consultation confirmation email sent to ${userEmail}`);
      } catch (emailError) {
        console.error(
          "Error sending consultation confirmation email:",
          emailError
        );
        // Don't fail the form submission if email fails
      }
    }

    // Send confirmation email to user for request form
    if (formType === "request" && userEmail) {
      try {
        const userMsg = {
          to: userEmail,
          from: fromEmail,
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
                                Dear Customer,
                            </p>

                            <p style="margin: 0 0 24px; 
                            color: #CCC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;">
                                Thank you for choosing <b>Estanora</b> for your real estate consultation.
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

        await sgMail.send(userMsg);
        console.log(`Request confirmation email sent to ${userEmail}`);
      } catch (emailError) {
        console.error("Error sending request confirmation email:", emailError);
        // Don't fail the form submission if email fails
      }
    }

    return NextResponse.json({
      message: "Form submitted successfully.",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error sending form request:", errorMessage);
    return NextResponse.json(
      { message: "Failed to send form request.", error: errorMessage },
      { status: 500 }
    );
  }
}
