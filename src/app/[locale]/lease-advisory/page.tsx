import { LeaseDifference, LeaseHero,  LeaseNeed,  LeaseServices, LeaseWhy } from "./components";

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
