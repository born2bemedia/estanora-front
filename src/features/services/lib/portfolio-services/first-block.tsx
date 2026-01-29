import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock1 = (): PurchasableService[] => {
  const t = useTranslations("portfolioServices");
  return [
    {
      id: "inheritance-strategy-management",
      title: t("service1_1", {
        fallback: "Inheritance Strategy & Management",
      }),
      description: t("service1_1_description", {
        fallback:
          "Professional guidance on how to handle inherited assets. We provide the financial and legal data needed to decide whether to sell for a clean exit, renovate for rental income, or keep the property as a family legacy.",
      }),
      subtitle: t("service1_1_subtitle", {
        fallback: "For families managing generational wealth.",
      }),
      note: t("service1_1_note", {
        fallback:
          "Immediate strategic advice on tax implications and estate options.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock1 = (): OrderableService[] => {
  const t = useTranslations("portfolioServices");
  return [
    {
      id: "succession-tax-optimization",
      title: t("orderable_service1_1", {
        fallback: "Succession Tax Optimization",
      }),
      description: t("orderable_service1_1_description", {
        fallback:
          "A detailed plan to minimize the tax impact of transferring property titles between generations.",
      }),
      price: 5000,
    },
    {
      id: "keep-vs-sell-financial-modeling",
      title: t("orderable_service1_2", {
        fallback: '"Keep vs. Sell" Financial Modeling',
      }),
      description: t("orderable_service1_2_description", {
        fallback:
          "A side-by-side comparison of immediate sale proceeds versus long-term rental ROI and appreciation.",
      }),
      price: 4000,
    },
    {
      id: "market-entry-preparation",
      title: t("orderable_service1_3", {
        fallback: "Market Entry Preparation",
      }),
      description: t("orderable_service1_3_description", {
        fallback:
          "A roadmap for clearing legal encumbrances and preparing the home for the modern buyer.",
      }),
      price: 3500,
    },
    {
      id: "beneficiary-dispute-mediation",
      title: t("orderable_service1_4", {
        fallback: "Beneficiary Dispute Mediation",
      }),
      description: t("orderable_service1_4_description", {
        fallback:
          "Objective third-party valuations and split-scenario modeling to help heirs reach a fair agreement.",
      }),
      price: 4500,
    },
    {
      id: "family-legacy-package",
      title: t("orderable_service1_5", {
        fallback: "Family Legacy Package",
      }),
      description: t("orderable_service1_5_description", {
        fallback:
          "Includes: Tax Optimization, Financial Modeling, Market Prep, and Mediation Data.",
      }),
      includes: true,
      price: 16500,
    },
  ];
};
