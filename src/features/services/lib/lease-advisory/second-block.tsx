import { useTranslations } from "next-intl";

import { OrderableService, PurchasableService } from "../../model/types";

export const usePurchasableServicesBlock2 = (): PurchasableService[] => {
  const t = useTranslations("leaseAdvisoryServices");
  return [
    {
      id: "rental-legal-compliance-check",
      title: t("service2_1", {
        fallback: "Rental Legal Compliance Check",
      }),
      description: t("service2_1_description", {
        fallback:
          "Rental laws are changing rapidly. We review your contracts and local zoning to ensure you are fully compliant with rent caps, eviction protections, and safety standards, shielding you from heavy fines and legal disputes.",
      }),
      subtitle: t("service2_1_subtitle", {
        fallback: 'For the "Protected" Landlord.',
      }),
      note: t("service2_1_note", {
        fallback:
          "Legal/regulatory overview for landlords operating in high-restriction zones.",
      }),
      price: 450,
    },
  ];
};

export const useOrderableServicesBlock2 = (): OrderableService[] => {
  const t = useTranslations("leaseAdvisoryServices");
  return [
    {
      id: "contract-vulnerability-review",
      title: t("orderable_service2_1", {
        fallback: "Contract Vulnerability Review",
      }),
      description: t("orderable_service2_1_description", {
        fallback:
          "An audit of your current lease agreements to identify loopholes and ensure compliance with the latest housing laws.",
      }),
      price: 3000,
    },
    {
      id: "rent-cap-indexation-scan",
      title: t("orderable_service2_2", {
        fallback: "Rent Cap & Indexation Scan",
      }),
      description: t("orderable_service2_2_description", {
        fallback:
          "Verification of the maximum legal rent you can charge and the allowed annual inflation adjustments.",
      }),
      price: 1500,
    },
    {
      id: "safety-licensing-audit",
      title: t("orderable_service2_3", {
        fallback: "Safety & Licensing Audit",
      }),
      description: t("orderable_service2_3_description", {
        fallback:
          "Ensuring the property meets all legal fire, health, and energy standards required for a rental license.",
      }),
      price: 2500,
    },
    {
      id: "tenant-dispute-protection",
      title: t("orderable_service2_4", {
        fallback: "Tenant Dispute Protection",
      }),
      description: t("orderable_service2_4_description", {
        fallback:
          "Implementation of legally sound entry/exit protocols and deposit management strategies to minimize friction.",
      }),
      price: 2000,
    },
    {
      id: "landlord-protection-package",
      title: t("orderable_service2_5", {
        fallback: "Landlord Protection Package",
      }),
      description: t("orderable_service2_5_description", {
        fallback:
          "Includes: Contract Review, Rent Cap Scan, Licensing Audit, and Dispute Protection.",
      }),
      includes: true,
      price: 7500,
    },
  ];
};
