import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock3 = (): PurchasableService[] => {
  const t = useTranslations("portfolioServices");
  return [
    {
      id: "downsizing-equity-release-plan",
      title: t("service3_1", {
        fallback: "Downsizing & Equity Release Plan",
      }),
      description: t("service3_1_description", {
        fallback:
          "Strategy for older owners or retirees looking to move into smaller, more efficient homes while safely liquidating the value stored in their current primary residence.",
      }),
      subtitle: t("service3_1_subtitle", {
        fallback: "For owners transitioning to a new lifestyle.",
      }),
      note: t("service3_1_note", {
        fallback:
          "Strategic planning on how to unlock equity without losing financial security.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock3 = (): OrderableService[] => {
  const t = useTranslations("portfolioServices");
  return [
    {
      id: "equity-liquidity-forecast",
      title: t("orderable_service3_1", {
        fallback: "Equity Liquidity Forecast",
      }),
      description: t("orderable_service3_1_description", {
        fallback:
          "Calculating the exact cash-in-hand after taxes, fees, and the purchase of a smaller property.",
      }),
      price: 3500,
    },
    {
      id: "reverse-mortgage-annuity-scan",
      title: t("orderable_service3_2", {
        fallback: "Reverse Mortgage & Annuity Scan",
      }),
      description: t("orderable_service3_2_description", {
        fallback:
          "Exploring financial products that allow you to receive income from your home while remaining in it.",
      }),
      price: 3000,
    },
    {
      id: "modern-lifestyle-match",
      title: t("orderable_service3_3", {
        fallback: "Modern Lifestyle Match",
      }),
      description: t("orderable_service3_3_description", {
        fallback:
          'Researching and vetting smaller, "barrier-free" properties that fit your new health and mobility needs.',
      }),
      price: 4000,
    },
    {
      id: "relocation-impact-audit",
      title: t("orderable_service3_4", {
        fallback: "Relocation Impact Audit",
      }),
      description: t("orderable_service3_4_description", {
        fallback:
          "Evaluating the change in local taxes and cost of living in the new neighborhood or retirement community.",
      }),
      price: 2500,
    },
    {
      id: "strategic-transition-package",
      title: t("orderable_service3_5", {
        fallback: "Strategic Transition Package",
      }),
      description: t("orderable_service3_5_description", {
        fallback:
          "Includes: Equity Forecast, Annuity Scan, Lifestyle Match, and Impact Audit.",
      }),
      includes: true,
      price: 13500,
    },
  ];
};
