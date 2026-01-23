import type { Metadata } from 'next';

import { InsightExperts, InsightHero } from './components';

export const metadata: Metadata = {
  title: 'Cybersecurity Insights & Market News | Craftify Tech Reports and Analysis',
  description:
    'Stay informed with Craftify Tech‘s latest cybersecurity insights, market reports, and expert analyses. Explore trends shaping 2025–2026, from AI-driven threats to autonomous defenses.',
  openGraph: {
    title: 'Cybersecurity Insights & Market News | Craftify Tech Reports and Analysis',
    description:
      'Stay informed with Craftify Tech‘s latest cybersecurity insights, market reports, and expert analyses. Explore trends shaping 2025–2026, from AI-driven threats to autonomous defenses.',
    images: 'https://craftify-tech.com/images/meta.png',
  },
};

export default function InsightsPage() {
  return (
    <>
      <InsightHero />
      <InsightExperts />
    </>
  );
}
