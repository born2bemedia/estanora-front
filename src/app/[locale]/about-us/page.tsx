import type { Metadata } from "next";

import { AboutAgent, AboutAnalytics, AboutApproach, AboutCore, AboutCta, AboutHero, AboutVisibility, AboutWork } from "./components";

export const metadata: Metadata = {
  title: "About Estanora – Expert Real Estate Consulting",
  description:
    "Learn about our team and approach to property consulting – discover how we help clients make informed real estate decisions today!",
  openGraph: {
    title: "About Estanora – Expert Real Estate Consulting",
    description:
      "Learn about our team and approach to property consulting – discover how we help clients make informed real estate decisions today!",
    //images: 'https://estanora.com/images/meta.png',
  },
};

export default async function Home() {
  return (
    <>
      <AboutHero />
      <AboutAgent />
      <AboutCore />
      <AboutWork />
      <AboutApproach />
      <AboutVisibility /> 
      <AboutAnalytics />
      <AboutCta />
    </>
  );
}
