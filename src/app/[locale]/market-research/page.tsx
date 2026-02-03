import type { Metadata } from "next";

import { MarketDifference, MarketHero,  MarketNeed,  MarketServices, MarketWhy } from "./components";

export const metadata: Metadata = {
  title: 'Estanora Real Estate Market Research Professional Services',
  description: 'Get accurate market data and neighborhood insights to make informed property decisions—request your research today!',
  openGraph: {
    title: 'Estanora Real Estate Market Research Professional Services',
    description: 'Get accurate market data and neighborhood insights to make informed property decisions—request your research today!',
    images: 'https://estanora.com/images/meta.png',
  },
};

export default async function Home() {
  return (
    <>
      <MarketHero />
      <MarketWhy />
      <MarketServices />
      <MarketNeed />
      <MarketDifference />
    </>
  );
}
