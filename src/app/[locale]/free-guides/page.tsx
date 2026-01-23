import { GuidesHero, GuidesLoop, GuidesServices } from "./components";

export default async function Home() {
  return (
    <>
      <GuidesHero />
      <GuidesServices />
      <GuidesLoop />
    </>
  );
}
