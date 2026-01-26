import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "./types";

export const usePurchasableServicesBlock3 = (): PurchasableService[] => {
  const t = useTranslations("dueDiligenceServices");
  return [
    {
      id: "co-buying-structural-analysis",
      title: t("service3_1", {
        fallback: "Co-Buying Structural Analysis",
      }),
      description: t("service3_1_description", {
        fallback:
          "We verify if a property can be legally and physically divided. We inspect the layout for separate entrances and utility meters, while checking zoning laws to confirm you are allowed to split the title into two separate homes.",
      }),
      subtitle: t("service3_1_subtitle", {
        fallback: "For family or partners splitting a property",
      }),
      note: t("service3_1_note", {
        fallback:
          "Consult with a structural strategist to determine if your co-buying plan is realistic.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock3 = (): OrderableService[] => {
  const t = useTranslations("dueDiligenceServices");
  return [
    {
      id: "physical-division-study",
      title: t("orderable_service3_1", {
        fallback: "Physical Division Study",
      }),
      description: t("orderable_service3_1_description", {
        fallback:
          "Architectural check to see if the building can be physically split into two private units (separate entrances, meters, etc.).",
      }),
      price: 6000,
    },
    {
      id: "legal-split-audit",
      title: t("orderable_service3_2", {
        fallback: 'Legal "Split" Audit',
      }),
      description: t("orderable_service3_2_description", {
        fallback:
          "Reviewing local zoning laws to confirm if the property can be legally subdivided into two titles.",
      }),
      price: 4500,
    },
    {
      id: "shared-infrastructure-review",
      title: t("orderable_service3_3", {
        fallback: "Shared Infrastructure Review",
      }),
      description: t("orderable_service3_3_description", {
        fallback:
          "Assessing the condition of common areas (roof, foundations, gardens) that both owners will be responsible for.",
      }),
      price: 3500,
    },
    {
      id: "usage-conflict-analysis",
      title: t("orderable_service3_4", {
        fallback: "Usage Conflict Analysis",
      }),
      description: t("orderable_service3_4_description", {
        fallback:
          "Identifying potential issues with noise, privacy, and parking before you sign a co-ownership agreement.",
      }),
      price: 2500,
    },
    {
      id: "co-buying-full-structural-legal-package",
      title: t("orderable_service3_5", {
        fallback: "Co-Buying: Full Structural & Legal Package",
      }),
      description: t("orderable_service3_5_description", {
        fallback:
          "Includes: Physical Division Study, Legal Split Audit, Infrastructure Review, and Conflict Analysis",
      }),
      includes: true,
      price: 14500,
    },
  ];
};
