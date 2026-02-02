import { z } from "zod";

const phoneSchema = z
  .string()
  .min(1, "This field is required")
  .refine(
    (val) => /^[+]?[\d\s-]{10,}$/.test(val.replace(/\s/g, "")),
    "Please provide a valid phone number."
  );

const emailSchema = z
  .string()
  .min(1, "This field is required")
  .email("Please provide a valid email address.");

const fullNameSchema = z.string().min(1, "This field is required");

const countrySchema = z.string().min(1, "Please select your property location.");

// 1. Market Research Request
export const marketResearchSchema = z.object({
  goal: z.string().min(1, "This field is required"),
  country: z.string().min(1, "This field is required"),
  city: z.string().min(1, "This field is required"),
  propertyType: z.string().min(1, "This field is required"),
  valueRange: z.string().min(1, "This field is required"),
  fullName: fullNameSchema,
  phone: phoneSchema,
  email: emailSchema,
});

export type MarketResearchSchema = z.infer<typeof marketResearchSchema>;

// 2. Request Property Consultation
export const propertyConsultationSchema = z.object({
  iWant: z.string().min(1, "This field is required"),
  areaOfInterest: z.string().min(1, "This field is required"),
  iNeed: z.string().min(1, "This field is required"),
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
});

export type PropertyConsultationSchema = z.infer<typeof propertyConsultationSchema>;

// 3 & 4. [PACKAGE NAME] / [SERVICE NAME] Request (same schema)
export const requestFormSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  country: countrySchema,
});

export type RequestFormSchema = z.infer<typeof requestFormSchema>;
