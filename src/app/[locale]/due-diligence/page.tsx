import type { Metadata } from "next";

import { DiligenceAudit, DiligenceDifference, DiligenceHero, DiligenceServices, DiligenceWhy } from "./components";

export const metadata: Metadata = {
  title: 'Estanora Due Diligence Professional Services',
  description: 'Verify property condition and legal documents before you buy—request a professional due diligence audit today!',
  openGraph: {
    title: 'Estanora Due Diligence Professional Services',
    description: 'Verify property condition and legal documents before you buy—request a professional due diligence audit today!',
    images: 'https://estanora.com/images/meta.png',
  },
};

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
