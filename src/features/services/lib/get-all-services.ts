
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
 * Supports lookup by localized title, English fallback, and id
 */
// Static map of service IDs to English titles (fallback values)
const SERVICE_ID_TO_ENGLISH_TITLE: Record<string, string> = {
  // Due Diligence - Block 1
  "fixer-upper-feasibility-study": "Fixer-Upper Feasibility Study",
  "renovation-cost-audit": "Renovation Cost Audit",
  "equity-protection": "Equity Protection",
  "permit-verification": "Permit Verification",
  "contractor-quote-review": "Contractor Quote Review",
  "fixer-upper-complete-feasibility-package": "Fixer-Upper: Complete Feasibility Package",
  // Due Diligence - Block 2
  "energy-climate-risk-audit": "Energy & Climate Risk Audit",
  "insulation-efficiency-check": "Insulation & Efficiency Check",
  "solar-resource-potential": "Solar & Resource Potential",
  "hazard-mapping": "Hazard Mapping",
  "green-subsidy-scan": "Green Subsidy Scan",
  "energy-climate-total-resilience-package": "Energy & Climate: Total Resilience Package",
  // Due Diligence - Block 3
  "co-buying-structural-analysis": "Co-Buying Structural Analysis",
  "physical-division-study": "Physical Division Study",
  "legal-split-audit": 'Legal "Split" Audit',
  "shared-infrastructure-review": "Shared Infrastructure Review",
  "usage-conflict-analysis": "Usage Conflict Analysis",
  "co-buying-full-structural-legal-package": "Co-Buying: Full Structural & Legal Package",
  // Lease Advisory - Block 1
  "lease-strategy-revenue-optimization": "Lease Strategy & Revenue Optimization",
  "yield-performance-modeling": "Yield Performance Modeling",
  "target-tenant-profile-audit": "Target Tenant Profile Audit",
  "dynamic-pricing-roadmap": "Dynamic Pricing Roadmap",
  "operational-cost-audit": "Operational Cost Audit",
  "rental-revenue-package": "Rental Revenue Package",
  // Lease Advisory - Block 2
  "rental-legal-compliance-check": "Rental Legal Compliance Check",
  "contract-vulnerability-review": "Contract Vulnerability Review",
  "rent-cap-indexation-scan": "Rent Cap & Indexation Scan",
  "safety-licensing-audit": "Safety & Licensing Audit",
  "tenant-dispute-protection": "Tenant Dispute Protection",
  "landlord-protection-package": "Landlord Protection Package",
  // Lease Advisory - Block 3
  "space-monetization-consulting": "Space Monetization Consulting",
  "conversion-feasibility-study": "Conversion Feasibility Study",
  "zoning-permit-verification": "Zoning & Permit Verification",
  "unit-layout-optimization": "Unit Layout Optimization",
  "cost-to-income-forecast": "Cost-to-Income Forecast",
  "space-monetization-package": "Space Monetization Package",
  // Market Research - Block 1
  "neighborhood-lifestyle-analysis": "Neighborhood Lifestyle Analysis",
  "connectivity-tech-audit": "Connectivity & Tech Audit",
  "20-minute-city-score": '"20-Minute City" Score',
  "commute-mobility-study": "Commute & Mobility Study",
  "safety-atmosphere-report": "Safety & Atmosphere Report",
  "lifestyle-connectivity-package": "Lifestyle & Connectivity Package",
  // Market Research - Block 2
  "investment-value-forecasting": "Investment & Value Forecasting",
  "appreciation-benchmark": "Appreciation Benchmark",
  "urban-development-scan": "Urban Development Scan",
  "rental-yield-analysis": "Rental Yield Analysis",
  "resale-liquidity-audit": "Resale Liquidity Audit",
  "strategic-investment-package": "Strategic Investment Package",
  // Market Research - Block 3
  "relocation-tax-cost-comparison": "Relocation Tax & Cost Comparison",
  "regional-tax-audit": "Regional Tax Audit",
  "cost-of-living-indexing": "Cost of Living Indexing",
  "maintenance-liability-forecast": "Maintenance Liability Forecast",
  "relocation-logistics-budget": "Relocation Logistics Budget",
  "financial-relocation-package": "Financial Relocation Package",
  // Portfolio Services - Block 1
  "inheritance-strategy-management": "Inheritance Strategy & Management",
  "succession-tax-optimization": "Succession Tax Optimization",
  "keep-vs-sell-financial-modeling": '"Keep vs. Sell" Financial Modeling',
  "market-entry-preparation": "Market Entry Preparation",
  "beneficiary-dispute-mediation": "Beneficiary Dispute Mediation",
  "family-legacy-package": "Family Legacy Package",
  // Portfolio Services - Block 2
  "multi-property-performance-review": "Multi-Property Performance Review",
  "consolidated-valuation-audit": "Consolidated Valuation Audit",
  "portfolio-tax-efficiency-scan": "Portfolio Tax Efficiency Scan",
  "operational-expense-review": "Operational Expense Review",
  "risk-diversification-analysis": "Risk Diversification Analysis",
  "portfolio-performance-package": "Portfolio Performance Package",
  // Portfolio Services - Block 3
  "downsizing-equity-release-plan": "Downsizing & Equity Release Plan",
  "equity-liquidity-forecast": "Equity Liquidity Forecast",
  "reverse-mortgage-annuity-scan": "Reverse Mortgage & Annuity Scan",
  "modern-lifestyle-match": "Modern Lifestyle Match",
  "relocation-impact-audit": "Relocation Impact Audit",
  "strategic-transition-package": "Strategic Transition Package",
};

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

  // Create maps: localized title -> description, id -> description, English title -> description
  const serviceMapByTitle = new Map<string, string>();
  const serviceMapById = new Map<string, string>();
  const serviceMapByEnglishTitle = new Map<string, string>();

  allServices.forEach((service) => {
    // Store by localized title (current locale)
    serviceMapByTitle.set(service.title, service.description);
    
    // Store by id (canonical identifier)
    if ("id" in service) {
      serviceMapById.set(service.id, service.description);
      
      // Also store by English title (fallback) if available
      const englishTitle = SERVICE_ID_TO_ENGLISH_TITLE[service.id];
      if (englishTitle) {
        serviceMapByEnglishTitle.set(englishTitle, service.description);
      }
    }
  });

  // Create reverse map: English title -> localized title
  const englishTitleToLocalizedTitle = new Map<string, string>();
  allServices.forEach((service) => {
    if ("id" in service) {
      const englishTitle = SERVICE_ID_TO_ENGLISH_TITLE[service.id];
      if (englishTitle) {
        englishTitleToLocalizedTitle.set(englishTitle, service.title);
      }
    }
  });

  return {
    services: allServices,
    getDescriptionByTitle: (title: string): string | undefined => {
      // First try by localized title (current locale)
      const byTitle = serviceMapByTitle.get(title);
      if (byTitle) return byTitle;

      // Try by English title (fallback for orders created in English locale)
      const byEnglishTitle = serviceMapByEnglishTitle.get(title);
      if (byEnglishTitle) return byEnglishTitle;

      // Try by id (if title matches an id pattern)
      const byId = serviceMapById.get(title);
      if (byId) return byId;

      return undefined;
    },
    getLocalizedTitleByEnglishTitle: (englishTitle: string): string | undefined => {
      // Find localized title by English title
      return englishTitleToLocalizedTitle.get(englishTitle);
    },
    getLocalizedTitle: (title: string): string => {
      // If title is already localized (exists in current locale), return as is
      if (serviceMapByTitle.has(title)) {
        return title;
      }

      // If title is English, try to find localized version
      const localized = englishTitleToLocalizedTitle.get(title);
      if (localized) {
        return localized;
      }

      // If title is an id, find the localized title
      const description = serviceMapById.get(title);
      if (description) {
        // Find the service with this id and return its localized title
        const service = allServices.find((s) => "id" in s && s.id === title);
        if (service) {
          return service.title;
        }
      }

      // Fallback: return original title
      return title;
    },
  };
};
