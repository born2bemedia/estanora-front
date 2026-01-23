import {
  HomeBrings,
  HomeFaq,
  HomeGuides,
  HomeHero,
  HomeOffers,
  HomeServices,
  HomeWhy,
} from "./components";

export default async function Home() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <HomeBrings />
      <HomeOffers />
      <HomeWhy />
      <HomeFaq />
      <HomeGuides />
    </>
  );
}
