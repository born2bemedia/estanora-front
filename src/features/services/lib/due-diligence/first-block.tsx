import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock1 = (): PurchasableService[] => {
  const t = useTranslations("dueDiligenceServices");
  return [
    {
      id: "fixer-upper-feasibility-study",
      title: t("service1_1", {
        fallback: "Fixer-Upper Feasibility Study",
      }),
      description: t("service1_1_description", {
        fallback:
          "We calculate the real math behind the renovation. We compare current repair quotes against the property’s future market value to ensure you don’t spend more on construction than the house is actually worth.",
      }),
      subtitle: t("service1_1_subtitle", {
        fallback: 'For the "Renovate-to-Live" buyer.',
      }),
      note: t("service1_1_note", {
        fallback: "Immediate verbal assessment of your project’s viability.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock1 = (): OrderableService[] => {
  const t = useTranslations("dueDiligenceServices");
  return [
    {
      id: "renovation-cost-audit",
      title: t("orderable_service1", {
        fallback: "Renovation Cost Audit",
      }),
      description: t("orderable_service1_description", {
        fallback:
          "Itemized breakdown of essential repairs (roof, plumbing, electrics) vs. aesthetic upgrades.",
      }),
      price: 5000,
    },
    {
      id: "equity-protection",
      title: t("orderable_service2", {
        fallback: "Equity Protection",
      }),
      description: t("orderable_service2_description", {
        fallback:
          "Analysis of whether the purchase price + renovation costs will exceed the home's future market value.",
      }),
      price: 3500,
    },
    {
      id: "permit-verification",
      title: t("orderable_service3", {
        fallback: "Permit Verification",
      }),
      description: t("orderable_service3_description", {
        fallback:
          "Confirming if your planned extensions or structural changes are legally allowed by local authorities.",
      }),
      price: 4000,
    },
    {
      id: "contractor-quote-review",
      title: t("orderable_service4", {
        fallback: "Contractor Quote Review",
      }),
      description: t("orderable_service4_description", {
        fallback:
          "Analyzing external quotes to ensure you aren't being overcharged for the works.",
      }),
      price: 2500,
    },
    {
      id: "fixer-upper-complete-feasibility-package",
      title: t("orderable_service5", {
        fallback: "Fixer-Upper: Complete Feasibility Package",
      }),
      description: t("orderable_service5_description", {
        fallback:
          "Renovation Cost Audit, Equity Protection, Permit Verification, and Quote Review.",
      }),
      includes: true,
      price: 2500,
    },
  ];
};
