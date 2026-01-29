import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock2 = (): PurchasableService[] => {
  const t = useTranslations("portfolioServices");
  return [
    {
      id: "multi-property-performance-review",
      title: t("service2_1", {
        fallback: "Multi-Property Performance Review",
      }),
      description: t("service2_1_description", {
        fallback:
          'A consolidated "Health Check" for your entire real estate portfolio. We audit every asset to ensure your holdings are tax-efficient, physically sound, and performing at their peak market potential.',
      }),
      subtitle: t("service2_1_subtitle", {
        fallback: "For private collectors and family offices.",
      }),
      note: t("service2_1_note", {
        fallback:
          "Review your portfolio's high-level risks and performance gaps with a senior strategist.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock2 = (): OrderableService[] => {
  const t = useTranslations("portfolioServices");
  return [
    {
      id: "consolidated-valuation-audit",
      title: t("orderable_service2_1", {
        fallback: "Consolidated Valuation Audit",
      }),
      description: t("orderable_service2_1_description", {
        fallback:
          "A synchronized update of the current market value for all properties in your portfolio.",
      }),
      price: 7500,
    },
    {
      id: "portfolio-tax-efficiency-scan",
      title: t("orderable_service2_2", {
        fallback: "Portfolio Tax Efficiency Scan",
      }),
      description: t("orderable_service2_2_description", {
        fallback:
          "Identifying opportunities to restructure ownership or leverage local tax laws to reduce annual overhead.",
      }),
      price: 6000,
    },
    {
      id: "operational-expense-review",
      title: t("orderable_service2_3", {
        fallback: "Operational Expense Review",
      }),
      description: t("orderable_service2_3_description", {
        fallback:
          "Analyzing maintenance, insurance, and management fees across all assets to identify cost-saving leaks.",
      }),
      price: 4000,
    },
    {
      id: "risk-diversification-analysis",
      title: t("orderable_service2_4", {
        fallback: "Risk Diversification Analysis",
      }),
      description: t("orderable_service2_4_description", {
        fallback:
          "Assessment of your geographic and sector exposure (e.g., too much concentration in one city or asset type).",
      }),
      price: 5000,
    },
    {
      id: "portfolio-performance-package",
      title: t("orderable_service2_5", {
        fallback: "Portfolio Performance Package",
      }),
      description: t("orderable_service2_5_description", {
        fallback:
          "Includes: Valuation Audit, Tax Scan, Expense Review, and Risk Analysis.",
      }),
      includes: true,
      price: 22000,
    },
  ];
};
