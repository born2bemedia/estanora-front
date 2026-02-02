
import { GuidesLoop } from "../../../features/guides/ui/GuidesLoop/GuidesLoop";
import {
  HomeBrings,
  HomeFaq,
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
      <GuidesLoop />
    </>
  );
}
