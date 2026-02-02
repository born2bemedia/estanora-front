import { usePurchasableServicesBlock1 as useDueDiligencePurchasable1 } from "./due-diligence/first-block";
import { useOrderableServicesBlock1 as useDueDiligenceOrderable1 } from "./due-diligence/first-block";
import { usePurchasableServicesBlock2 as useDueDiligencePurchasable2 } from "./due-diligence/second-block";
import { useOrderableServicesBlock2 as useDueDiligenceOrderable2 } from "./due-diligence/second-block";
import { usePurchasableServicesBlock3 as useDueDiligencePurchasable3 } from "./due-diligence/third-block";
import { useOrderableServicesBlock3 as useDueDiligenceOrderable3 } from "./due-diligence/third-block";
import { usePurchasableServicesBlock1 as useLeaseAdvisoryPurchasable1 } from "./lease-advisory/first-block";
import { useOrderableServicesBlock1 as useLeaseAdvisoryOrderable1 } from "./lease-advisory/first-block";
import { usePurchasableServicesBlock2 as useLeaseAdvisoryPurchasable2 } from "./lease-advisory/second-block";
import { useOrderableServicesBlock2 as useLeaseAdvisoryOrderable2 } from "./lease-advisory/second-block";
import { usePurchasableServicesBlock3 as useLeaseAdvisoryPurchasable3 } from "./lease-advisory/third-block";
import { useOrderableServicesBlock3 as useLeaseAdvisoryOrderable3 } from "./lease-advisory/third-block";
import { usePurchasableServicesBlock1 as useMarketResearchPurchasable1 } from "./market-research/first-block";
import { useOrderableServicesBlock1 as useMarketResearchOrderable1 } from "./market-research/first-block";
import { usePurchasableServicesBlock2 as useMarketResearchPurchasable2 } from "./market-research/second-block";
import { useOrderableServicesBlock2 as useMarketResearchOrderable2 } from "./market-research/second-block";
import { usePurchasableServicesBlock3 as useMarketResearchPurchasable3 } from "./market-research/third-block";
import { useOrderableServicesBlock3 as useMarketResearchOrderable3 } from "./market-research/third-block";
import { usePurchasableServicesBlock1 as usePortfolioServicesPurchasable1 } from "./portfolio-services/first-block";
import { useOrderableServicesBlock1 as usePortfolioServicesOrderable1 } from "./portfolio-services/first-block";
import { usePurchasableServicesBlock2 as usePortfolioServicesPurchasable2 } from "./portfolio-services/second-block";
import { useOrderableServicesBlock2 as usePortfolioServicesOrderable2 } from "./portfolio-services/second-block";
import { usePurchasableServicesBlock3 as usePortfolioServicesPurchasable3 } from "./portfolio-services/third-block";
import { useOrderableServicesBlock3 as usePortfolioServicesOrderable3 } from "./portfolio-services/third-block";

/**
 * Hook that collects all services from all categories and blocks
 * Returns a map of service title -> description
 */
export const useAllServices = () => {
  // Due Diligence
  const dueDiligencePurchasable1 = useDueDiligencePurchasable1();
  const dueDiligenceOrderable1 = useDueDiligenceOrderable1();
  const dueDiligencePurchasable2 = useDueDiligencePurchasable2();
  const dueDiligenceOrderable2 = useDueDiligenceOrderable2();
  const dueDiligencePurchasable3 = useDueDiligencePurchasable3();
  const dueDiligenceOrderable3 = useDueDiligenceOrderable3();

  // Lease Advisory
  const leaseAdvisoryPurchasable1 = useLeaseAdvisoryPurchasable1();
  const leaseAdvisoryOrderable1 = useLeaseAdvisoryOrderable1();
  const leaseAdvisoryPurchasable2 = useLeaseAdvisoryPurchasable2();
  const leaseAdvisoryOrderable2 = useLeaseAdvisoryOrderable2();
  const leaseAdvisoryPurchasable3 = useLeaseAdvisoryPurchasable3();
  const leaseAdvisoryOrderable3 = useLeaseAdvisoryOrderable3();

  // Market Research
  const marketResearchPurchasable1 = useMarketResearchPurchasable1();
  const marketResearchOrderable1 = useMarketResearchOrderable1();
  const marketResearchPurchasable2 = useMarketResearchPurchasable2();
  const marketResearchOrderable2 = useMarketResearchOrderable2();
  const marketResearchPurchasable3 = useMarketResearchPurchasable3();
  const marketResearchOrderable3 = useMarketResearchOrderable3();

  // Portfolio Services
  const portfolioServicesPurchasable1 = usePortfolioServicesPurchasable1();
  const portfolioServicesOrderable1 = usePortfolioServicesOrderable1();
  const portfolioServicesPurchasable2 = usePortfolioServicesPurchasable2();
  const portfolioServicesOrderable2 = usePortfolioServicesOrderable2();
  const portfolioServicesPurchasable3 = usePortfolioServicesPurchasable3();
  const portfolioServicesOrderable3 = usePortfolioServicesOrderable3();

  // Combine all services
  const allServices = [
    ...dueDiligencePurchasable1,
    ...dueDiligenceOrderable1,
    ...dueDiligencePurchasable2,
    ...dueDiligenceOrderable2,
    ...dueDiligencePurchasable3,
    ...dueDiligenceOrderable3,
    ...leaseAdvisoryPurchasable1,
    ...leaseAdvisoryOrderable1,
    ...leaseAdvisoryPurchasable2,
    ...leaseAdvisoryOrderable2,
    ...leaseAdvisoryPurchasable3,
    ...leaseAdvisoryOrderable3,
    ...marketResearchPurchasable1,
    ...marketResearchOrderable1,
    ...marketResearchPurchasable2,
    ...marketResearchOrderable2,
    ...marketResearchPurchasable3,
    ...marketResearchOrderable3,
    ...portfolioServicesPurchasable1,
    ...portfolioServicesOrderable1,
    ...portfolioServicesPurchasable2,
    ...portfolioServicesOrderable2,
    ...portfolioServicesPurchasable3,
    ...portfolioServicesOrderable3,
  ];

  // Create a map of title -> description
  const serviceMap = new Map<string, string>();
  allServices.forEach((service) => {
    serviceMap.set(service.title, service.description);
  });

  return {
    services: allServices,
    getDescriptionByTitle: (title: string): string | undefined => {
      return serviceMap.get(title);
    },
  };
};
