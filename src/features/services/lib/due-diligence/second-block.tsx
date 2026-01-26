import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock2 = (): PurchasableService[] => {
  const t = useTranslations("dueDiligenceServices");
  return [
    {
      id: "energy-climate-risk-audit",
      title: t("service2_1", {
        fallback: "Energy & Climate Risk Audit",
      }),
      description: t("service2_1_description", {
        fallback:
          "We check the efficiency of the building and the safety of the location. Our team reviews insulation quality, solar potential, and environmental risks (like flood or fire) to forecast your future utility bills and insurance costs.",
      }),
      subtitle: t("service2_1_subtitle", {
        fallback: 'For the "Future-Proof" owner.',
      }),
      note: t("service2_1_note", {
        fallback:
          "Speak with a sustainability specialist to prioritize your efficiency upgrades.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock2 = (): OrderableService[] => {
  const t = useTranslations("dueDiligenceServices");
  return [
    {
      id: "insulation-efficiency-check",
      title: t("orderable_service2_1", {
        fallback: "Insulation & Efficiency Check",
      }),
      description: t("orderable_service2_1_description", {
        fallback:
          'Identifying "thermal leaks" and calculating the cost to upgrade to modern energy standards.',
      }),
      price: 5000,
    },
    {
      id: "solar-resource-potential",
      title: t("orderable_service2_2", {
        fallback: "Solar & Resource Potential",
      }),
      description: t("orderable_service2_2_description", {
        fallback:
          "Assessing roof orientation and local climate data for solar panels or rainwater harvesting.",
      }),
      price: 3500,
    },
    {
      id: "hazard-mapping",
      title: t("orderable_service2_3", {
        fallback: "Hazard Mapping",
      }),
      description: t("orderable_service2_3_description", {
        fallback:
          "Detailed report on flood zones, soil stability, and local fire risks over the next 10–20 years.",
      }),
      price: 4500,
    },
    {
      id: "green-subsidy-scan",
      title: t("orderable_service2_4", {
        fallback: "Green Subsidy Scan",
      }),
      description: t("orderable_service2_4_description", {
        fallback:
          "Identifying government grants or tax breaks available for energy-saving renovations.",
      }),
      price: 2000,
    },
    {
      id: "energy-climate-total-resilience-package",
      title: t("orderable_service2_5", {
        fallback: "Energy & Climate: Total Resilience Package",
      }),
      description: t("orderable_service2_5_description", {
        fallback:
          "Includes: Efficiency Check, Solar Assessment, Hazard Mapping, and Subsidy Scan",
      }),
      includes: true,
      price: 12000,
    },
  ];
};
