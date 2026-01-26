import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock1 = (): PurchasableService[] => {
  const t = useTranslations("marketResearchServices");
  return [
    {
      id: "neighborhood-lifestyle-analysis",
      title: t("service1_1", {
        fallback: "Neighborhood Lifestyle Analysis",
      }),
      description: t("service1_1_description", {
        fallback:
          "We look beyond property walls to evaluate the daily reality of your location. Our data-driven concierge service ensures the neighborhood matches your lifestyle requirements for connectivity, mobility, and community.",
      }),
      subtitle: t("service1_1_subtitle", {
        fallback: 'For the "Digital Nomad" & Modern Professional.',
      }),
      note: t("service1_1_note", {
        fallback:
          "Get an immediate breakdown of which neighborhoods fit your specific lifestyle profile.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock1 = (): OrderableService[] => {
  const t = useTranslations("marketResearchServices");
  return [
    {
      id: "connectivity-tech-audit",
      title: t("orderable_service1_1", {
        fallback: "Connectivity & Tech Audit",
      }),
      description: t("orderable_service1_1_description", {
        fallback:
          "Verification of actual (not advertised) fiber/5G speeds and mobile coverage stability for remote work.",
      }),
      price: 1500,
    },
    {
      id: "20-minute-city-score",
      title: t("orderable_service1_2", {
        fallback: '"20-Minute City" Score',
      }),
      description: t("orderable_service1_2_description", {
        fallback:
          "Mapping of essential services (healthcare, coworking, organic markets) within walking or cycling distance.",
      }),
      price: 2000,
    },
    {
      id: "commute-mobility-study",
      title: t("orderable_service1_3", {
        fallback: "Commute & Mobility Study",
      }),
      description: t("orderable_service1_3_description", {
        fallback:
          "Analysis of public transit efficiency, traffic patterns, and future infrastructure projects affecting local access.",
      }),
      price: 2500,
    },
    {
      id: "safety-atmosphere-report",
      title: t("orderable_service1_4", {
        fallback: "Safety & Atmosphere Report",
      }),
      description: t("orderable_service1_4_description", {
        fallback:
          "Detailed local crime statistics, street lighting quality, and noise level monitoring across different times of day.",
      }),
      price: 2500,
    },
    {
      id: "lifestyle-connectivity-package",
      title: t("orderable_service1_5", {
        fallback: "Lifestyle & Connectivity Package",
      }),
      description: t("orderable_service1_5_description", {
        fallback:
          "Includes: Connectivity Audit, 20-Minute City Score, Mobility Study, and Safety Report.",
      }),
      includes: true,
      price: 6500,
    },
  ];
};
