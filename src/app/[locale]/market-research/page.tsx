import { MarketDifference, MarketHero,  MarketNeed,  MarketServices, MarketWhy } from "./components";

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
