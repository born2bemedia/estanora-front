import { PortfolioDifference, PortfolioHero,  PortfolioNeed,  PortfolioServices, PortfolioWhy } from "./components";

export default async function Home() {
  return (
    <>
      <PortfolioHero />
      <PortfolioWhy />  
      <PortfolioServices />
      <PortfolioNeed />
      <PortfolioDifference />
    </>
  );
}
