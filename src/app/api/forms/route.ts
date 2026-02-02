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

    let subject: string;
    let html: string;

    if (formType === "market-research") {
      const d = data as MarketResearchPayload;
      subject = "Market Research Request";
      html = `
        <h2>Market Research Request</h2>
        <p><strong>What is your goal?</strong> ${GOAL_LABELS[d.goal] ?? d.goal}</p>
        <p><strong>Country:</strong> ${d.country}</p>
        <p><strong>City:</strong> ${d.city}</p>
        <p><strong>Property type:</strong> ${PROPERTY_TYPE_LABELS[d.propertyType] ?? d.propertyType}</p>
        <p><strong>Approximate value range:</strong> ${VALUE_RANGE_LABELS[d.valueRange] ?? d.valueRange}</p>
        <p><strong>Full name:</strong> ${d.fullName}</p>
        <p><strong>Phone:</strong> ${d.phone}</p>
        <p><strong>Email:</strong> ${d.email}</p>
      `;
    } else if (formType === "property-consultation") {
      const d = data as PropertyConsultationPayload;
      subject = "Request Property Consultation";
      html = `
        <h2>Request Property Consultation</h2>
        <p><strong>I want to:</strong> ${I_WANT_LABELS[d.iWant] ?? d.iWant}</p>
        <p><strong>My area of interest:</strong> ${d.areaOfInterest}</p>
        <p><strong>I need:</strong> ${I_NEED_LABELS[d.iNeed] ?? d.iNeed}</p>
        <p><strong>Full name:</strong> ${d.fullName}</p>
        <p><strong>Email:</strong> ${d.email}</p>
        <p><strong>Phone:</strong> ${d.phone}</p>
      `;
    } else if (formType === "request" && name) {
      const d = data as RequestPayload;
      subject = `${name} Request`;
      html = `
        <h2>${name} Request</h2>
        <p><strong>Full name:</strong> ${d.fullName}</p>
        <p><strong>Email:</strong> ${d.email}</p>
        <p><strong>Phone:</strong> ${d.phone}</p>
        <p><strong>Country:</strong> ${d.country}</p>
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
