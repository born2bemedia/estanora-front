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
      data: MarketResearchPayload | PropertyConsultationPayload | RequestPayload;
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
        <p><strong>What is your goal?</strong> ${escapeHtml(GOAL_LABELS[d.goal] ?? d.goal)}</p>
        <p><strong>Country:</strong> ${escapeHtml(d.country)}</p>
        <p><strong>City:</strong> ${escapeHtml(d.city)}</p>
        <p><strong>Property type:</strong> ${escapeHtml(PROPERTY_TYPE_LABELS[d.propertyType] ?? d.propertyType)}</p>
        <p><strong>Approximate value range:</strong> ${escapeHtml(VALUE_RANGE_LABELS[d.valueRange] ?? d.valueRange)}</p>
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
        <p><strong>I want to:</strong> ${escapeHtml(I_WANT_LABELS[d.iWant] ?? d.iWant)}</p>
        <p><strong>My area of interest:</strong> ${escapeHtml(d.areaOfInterest)}</p>
        <p><strong>I need:</strong> ${escapeHtml(I_NEED_LABELS[d.iNeed] ?? d.iNeed)}</p>
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
  <title>Consultation Request Received - Estanora</title>
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
                Your Free Consultation Request Has Been Received
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Dear Customer,
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Thank you for your interest in a free consultation regarding your real estate case.
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                We've received your request and will review it shortly to assign it to the most appropriate expert based on your needs and objectives.
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Our consultant will contact you using this email address to continue the conversation and schedule the next steps.
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                We look forward to assisting you.
              </p>
              
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Kind regards,<br>
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
          `,
        };

        await sgMail.send(userMsg);
        console.log(`Consultation confirmation email sent to ${userEmail}`);
      } catch (emailError) {
        console.error("Error sending consultation confirmation email:", emailError);
        // Don't fail the form submission if email fails
      }
    }

    return NextResponse.json({
      message: "Form submitted successfully.",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error sending form request:", errorMessage);
    return NextResponse.json(
      { message: "Failed to send form request.", error: errorMessage },
      { status: 500 }
    );
  }
}
