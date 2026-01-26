import { DiligenceAudit, DiligenceDifference, DiligenceHero, DiligenceServices, DiligenceWhy } from "./components";

export default async function Home() {
  return (
    <>
      <DiligenceHero />
      <DiligenceWhy />
      <DiligenceServices />
      <DiligenceAudit />
      <DiligenceDifference />
    </>
  );
}
