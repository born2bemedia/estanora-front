import type { Metadata } from "next";

import { PortfolioDifference, PortfolioHero,  PortfolioNeed,  PortfolioServices, PortfolioWhy } from "./components";

export const metadata: Metadata = {
  title: 'Estanora Property Portfolio Management Professional Services',
  description: 'Optimize your real estate portfolio and maximize asset performance – book a professional portfolio review today!',
  openGraph: {
    title: 'Estanora Property Portfolio Management Professional Services',
    description: 'Optimize your real estate portfolio and maximize asset performance – book a professional portfolio review today!',
    //images: 'https://estanora.com/images/meta.png',
  },
};

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
