import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock2 = (): PurchasableService[] => {
  const t = useTranslations("marketResearchServices");
  return [
    {
      id: "investment-value-forecasting",
      title: t("service2_1", {
        fallback: "Investment & Value Forecasting",
      }),
      description: t("service2_1_description", {
        fallback:
          "We treat your home as a financial asset. By comparing your purchase price against historical data, micro-market trends, and urban development plans, we forecast the long-term appreciation potential of your investment.",
      }),
      subtitle: t("service2_1_subtitle", {
        fallback: 'For the "Wealth-Building" owner.',
      }),
      note: t("service2_1_note", {
        fallback:
          "Discuss a specific property's potential with a market analyst before bidding.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock2 = (): OrderableService[] => {
  const t = useTranslations("marketResearchServices");
  return [
    {
      id: "appreciation-benchmark",
      title: t("orderable_service2_1", {
        fallback: "Appreciation Benchmark",
      }),
      description: t("orderable_service2_1_description", {
        fallback:
          "Comparative analysis of historical growth in the specific street/district versus city and regional averages.",
      }),
      price: 3500,
    },
    {
      id: "urban-development-scan",
      title: t("orderable_service2_2", {
        fallback: "Urban Development Scan",
      }),
      description: t("orderable_service2_2_description", {
        fallback:
          "Identifying upcoming municipal projects (new parks, transit lines, or commercial hubs) that will drive future value.",
      }),
      price: 3000,
    },
    {
      id: "rental-yield-analysis",
      title: t("orderable_service2_3", {
        fallback: "Rental Yield Analysis",
      }),
      description: t("orderable_service2_3_description", {
        fallback:
          "Predictive modeling of potential rental income based on current demand and legal short/long-term rental caps.",
      }),
      price: 2500,
    },
    {
      id: "resale-liquidity-audit",
      title: t("orderable_service2_4", {
        fallback: "Resale Liquidity Audit",
      }),
      description: t("orderable_service2_4_description", {
        fallback:
          'Analysis of "days-on-market" for similar properties to determine how quickly you could exit the investment.',
      }),
      price: 2000,
    },
    {
      id: "strategic-investment-package",
      title: t("orderable_service2_5", {
        fallback: "Strategic Investment Package",
      }),
      description: t("orderable_service2_5_description", {
        fallback:
          "Includes: Appreciation Benchmark, Development Scan, Rental Yield Analysis, and Liquidity Audit.",
      }),
      includes: true,
      price: 8500,
    },
  ];
};
