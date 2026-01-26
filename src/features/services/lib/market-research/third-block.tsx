import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock3 = (): PurchasableService[] => {
  const t = useTranslations("marketResearchServices");
  return [
    {
      id: "relocation-tax-cost-comparison",
      title: t("service3_1", {
        fallback: "Relocation Tax & Cost Comparison",
      }),
      description: t("service3_1_description", {
        fallback:
          "Moving to a new region often carries hidden financial impacts. We provide a side-by-side comparison of the tax burdens, utility costs, and local maintenance fees to ensure your move is a smart financial transition.",
      }),
      subtitle: t("service3_1_subtitle", {
        fallback: 'For the "Strategic Mover" changing regions or cities.',
      }),
      note: t("service3_1_note", {
        fallback:
          "Strategic advice on the tax implications of relocating between specific regions.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock3 = (): OrderableService[] => {
  const t = useTranslations("marketResearchServices");
  return [
    {
      id: "regional-tax-audit",
      title: t("orderable_service3_1", {
        fallback: "Regional Tax Audit",
      }),
      description: t("orderable_service3_1_description", {
        fallback:
          "Detailed comparison of property taxes, wealth taxes, and local levies between your current and target location.",
      }),
      price: 4000,
    },
    {
      id: "cost-of-living-indexing",
      title: t("orderable_service3_2", {
        fallback: "Cost of Living Indexing",
      }),
      description: t("orderable_service3_2_description", {
        fallback:
          "A localized comparison of utility costs, insurance premiums, and municipal service fees specific to the property type.",
      }),
      price: 2000,
    },
    {
      id: "maintenance-liability-forecast",
      title: t("orderable_service3_3", {
        fallback: "Maintenance Liability Forecast",
      }),
      description: t("orderable_service3_3_description", {
        fallback:
          "Estimating long-term upkeep costs based on local climate effects on building materials in that specific region.",
      }),
      price: 3000,
    },
    {
      id: "relocation-logistics-budget",
      title: t("orderable_service3_4", {
        fallback: "Relocation Logistics Budget",
      }),
      description: t("orderable_service3_4_description", {
        fallback:
          "A professional estimate of actual moving costs, including specialized transport, insurance, and temporary storage.",
      }),
      price: 1500,
    },
    {
      id: "financial-relocation-package",
      title: t("orderable_service3_5", {
        fallback: "Financial Relocation Package",
      }),
      description: t("orderable_service3_5_description", {
        fallback:
          "Includes: Regional Tax Audit, Cost of Living Indexing, Maintenance Forecast, and Logistics Budget.",
      }),
      includes: true,
      price: 8000,
    },
  ];
};
