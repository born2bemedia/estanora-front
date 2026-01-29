import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock3 = (): PurchasableService[] => {
  const t = useTranslations("leaseAdvisoryServices");
  return [
    {
      id: "space-monetization-consulting",
      title: t("service3_1", {
        fallback: "Space Monetization Consulting",
      }),
      description: t("service3_1_description", {
        fallback:
          "We identify underused areas within your property, such as basements, garages, or attics, and provide a roadmap to convert them into legal, income-generating rental units or workspaces.",
      }),
      subtitle: t("service3_1_subtitle", {
        fallback: "For owners unlocking hidden value.",
      }),
      note: t("service3_1_note", {
        fallback:
          "Initial walkthrough to identify \"dead space\" that can be converted to cash.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock3 = (): OrderableService[] => {
  const t = useTranslations("leaseAdvisoryServices");
  return [
    {
      id: "conversion-feasibility-study",
      title: t("orderable_service3_1", {
        fallback: "Conversion Feasibility Study",
      }),
      description: t("orderable_service3_1_description", {
        fallback:
          "Technical assessment of structural, plumbing, and electrical requirements for creating a separate rental unit.",
      }),
      price: 4500,
    },
    {
      id: "zoning-permit-verification",
      title: t("orderable_service3_2", {
        fallback: "Zoning & Permit Verification",
      }),
      description: t("orderable_service3_2_description", {
        fallback:
          "Direct confirmation with local authorities on whether a garage or basement conversion is legally allowed.",
      }),
      price: 3500,
    },
    {
      id: "unit-layout-optimization",
      title: t("orderable_service3_3", {
        fallback: "Unit Layout Optimization",
      }),
      description: t("orderable_service3_3_description", {
        fallback:
          "Architectural suggestions to maximize the utility and appeal of small-footprint rental spaces.",
      }),
      price: 3000,
    },
    {
      id: "cost-to-income-forecast",
      title: t("orderable_service3_4", {
        fallback: "Cost-to-Income Forecast",
      }),
      description: t("orderable_service3_4_description", {
        fallback:
          "A financial projection showing how many months of rent it will take to pay off the conversion construction costs.",
      }),
      price: 2000,
    },
    {
      id: "space-monetization-package",
      title: t("orderable_service3_5", {
        fallback: "Space Monetization Package",
      }),
      description: t("orderable_service3_5_description", {
        fallback:
          "Includes: Feasibility Study, Permit Verification, Layout Optimization, and Income Forecast.",
      }),
      includes: true,
      price: 11000,
    },
  ];
};
