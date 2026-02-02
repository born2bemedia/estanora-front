import type {
  MarketResearchSchema,
  PropertyConsultationSchema,
  RequestFormSchema,
} from "../model/schemas";

type FormType = "market-research" | "property-consultation" | "request";

export async function submitForm(
  formType: FormType,
  data:
    | MarketResearchSchema
    | PropertyConsultationSchema
    | (RequestFormSchema & { name?: string })
): Promise<void> {
  const body: Record<string, unknown> = {
    formType,
    data,
  };
  if (formType === "request" && "name" in data && data.name) {
    body.name = data.name;
  }

  const res = await fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const json = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(json?.message ?? "Submission failed");
  }
}

export async function submitMarketResearch(
  data: MarketResearchSchema
): Promise<void> {
  return submitForm("market-research", data);
}

export async function submitPropertyConsultation(
  data: PropertyConsultationSchema
): Promise<void> {
  return submitForm("property-consultation", data);
}

export async function submitRequestForm(
  data: RequestFormSchema,
  name: string
): Promise<void> {
  return submitForm("request", { ...data, name });
}
