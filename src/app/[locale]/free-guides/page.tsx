import type { Metadata } from "next";

import { GuidesHero, GuidesLoop, GuidesServices } from "./components";

export const metadata: Metadata = {
  title: 'Estanora Free Real Estate Guides & Articles',
  description: 'Explore expert articles and practical guides to make smarter property decisions – read our free real estate resources today!',
  openGraph: {
    title: 'Estanora Free Real Estate Guides & Articles',
    description: 'Explore expert articles and practical guides to make smarter property decisions – read our free real estate resources today!',
    images: 'https://estanora.com/images/meta.png',
  },
};

export default async function Home() {
  return (
    <>
      <GuidesHero />
      <GuidesServices />
      <GuidesLoop />
    </>
  );
}
