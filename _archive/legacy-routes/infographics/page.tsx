import { Suspense } from 'react';
import InfographicsIndexClient from './InfographicsIndexClient';

export const metadata = {
  title: 'Research Infographics — Data-Driven Visual Knowledge | Esy',
  description:
    'Explore citation-verified infographics on human evolution, the brain, mythology, and more. Every data point traces to a verified source.',
  keywords: [
    'research infographics',
    'educational infographics',
    'data visualization',
    'science infographics',
    'human evolution infographic',
    'citation-verified infographics',
  ],
  openGraph: {
    title: 'Research Infographics | Esy',
    description:
      'Citation-verified infographics on science, history, and culture. Every data point traces to a verified source.',
    url: 'https://esy.com/infographics/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Research Infographics | Esy',
    description:
      'Citation-verified infographics on science, history, and culture.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://esy.com/infographics/',
  },
};

export default function InfographicsHub() {
  return (
    <Suspense fallback={<div className="infographics-loading" />}>
      <InfographicsIndexClient />
    </Suspense>
  );
}
