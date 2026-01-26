import { DiligenceAudit, DiligenceDifference, DiligenceHero, DiligenceWhy } from "./components";

export default async function Home() {
  return (
    <>
      <DiligenceHero />
      <DiligenceWhy />
      <DiligenceAudit />
      <DiligenceDifference />
    </>
  );
}
