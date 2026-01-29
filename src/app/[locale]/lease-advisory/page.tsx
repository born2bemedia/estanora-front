import type { Metadata } from "next";

import { LeaseDifference, LeaseHero,  LeaseNeed,  LeaseServices, LeaseWhy } from "./components";

export const metadata: Metadata = {
  title: 'Estanora Rental & Lease Advisory Professional Services',
  description: 'Ensure your rental agreements comply with the law and maximize rental income – request professional lease advisory today!',
  openGraph: {
    title: 'Estanora Rental & Lease Advisory Professional Services',
    description: 'Ensure your rental agreements comply with the law and maximize rental income – request professional lease advisory today!',
    //images: 'https://estanora.com/images/meta.png',
  },
};

export default async function Home() {
  return (
    <>
      <LeaseHero />
      <LeaseWhy />  
      <LeaseServices />
      <LeaseNeed />
      <LeaseDifference />
    </>
  );
}
