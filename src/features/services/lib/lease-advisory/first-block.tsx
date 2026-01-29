import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock1 = (): PurchasableService[] => {
  const t = useTranslations("leaseAdvisoryServices");
  return [
    {
      id: "lease-strategy-revenue-optimization",
      title: t("service1_1", {
        fallback: "Lease Strategy & Revenue Optimization",
      }),
      description: t("service1_1_description", {
        fallback:
          "We move beyond simple \"market rates\" to find the highest-performing tenant profile for your specific property. By analyzing current demand and local regulations, we determine which rental model, be it student housing, digital nomads, or traditional families—will generate the most stable profit.",
      }),
      subtitle: t("service1_1_subtitle", {
        fallback: "For owners maximizing their rental yield.",
      }),
      note: t("service1_1_note", {
        fallback:
          "Strategic session to determine the optimal rental model for your property.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock1 = (): OrderableService[] => {
  const t = useTranslations("leaseAdvisoryServices");
  return [
    {
      id: "yield-performance-modeling",
      title: t("orderable_service1_1", {
        fallback: "Yield Performance Modeling",
      }),
      description: t("orderable_service1_1_description", {
        fallback:
          "A side-by-side ROI comparison between short-term (AirBnB), mid-term (corporate/nomad), and long-term (family) leasing.",
      }),
      price: 2500,
    },
    {
      id: "target-tenant-profile-audit",
      title: t("orderable_service1_2", {
        fallback: "Target Tenant Profile Audit",
      }),
      description: t("orderable_service1_2_description", {
        fallback:
          "Analysis of local amenities and interior layout to identify which high-paying niche (students vs. expats) matches your asset.",
      }),
      price: 2000,
    },
    {
      id: "dynamic-pricing-roadmap",
      title: t("orderable_service1_3", {
        fallback: "Dynamic Pricing Roadmap",
      }),
      description: t("orderable_service1_3_description", {
        fallback:
          "Researching and vetting smaller, \"barrier-free\" properties that fit your new health and mobility needs.",
      }),
      price: 1500,
    },
    {
      id: "operational-cost-audit",
      title: t("orderable_service1_4", {
        fallback: "Operational Cost Audit",
      }),
      description: t("orderable_service1_4_description", {
        fallback:
          "A deep dive into management fees, cleaning, and maintenance costs to protect your net profit margins.",
      }),
      price: 1500,
    },
    {
      id: "rental-revenue-package",
      title: t("orderable_service1_5", {
        fallback: "Rental Revenue Package",
      }),
      description: t("orderable_service1_5_description", {
        fallback:
          "Includes: Yield Modeling, Tenant Profiling, Pricing Roadmap, and Operational Audit.",
      }),
      includes: true,
      price: 6500,
    },
  ];
};
