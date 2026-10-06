import type { Metadata } from 'next';
import WhyVenezuelaMattersClient from './WhyVenezuelaMattersClient';

export const metadata: Metadata = {
  title: 'Why Venezuela Matters: Oil, Refineries & Power | Esy',
  description:
    'Why does Venezuela matter? A visual essay explaining heavy crude oil, Gulf Coast refineries, and Operation Absolute Resolve. Clear analysis, cited sources.',
  keywords: [
    'Venezuela',
    'Operation Absolute Resolve',
    'Maduro',
    'heavy crude oil',
    'Gulf Coast refineries',
    'Monroe Doctrine',
    'PDVSA',
    'Orinoco Belt',
    'U.S. foreign policy',
    'international law',
  ],
  openGraph: {
    title: 'Why Venezuela Matters: Oil, Refineries & Power',
    description:
      'A visual systems essay explaining the forces behind Operation Absolute Resolve and the capture of Nicolas Maduro.',
    type: 'article',
    url: 'https://esy.com/essays/why-venezuela-matters',
    siteName: 'Esy',
    locale: 'en_US',
    publishedTime: '2026-01-03T23:00:00Z',
    modifiedTime: '2026-01-03T23:00:00Z',
    authors: ['Esy'],
    tags: ['Venezuela', 'Oil', 'Geopolitics', 'International Law'],
    images: [
      {
        url: 'https://images.esy.com/essays/why-venezuela-matters/orinoco-oil-belt-map.2de055ee32.png',
        width: 1200,
        height: 630,
        alt: 'Orinoco Oil Belt geological map showing East Venezuela Basin Province and oil assessment units',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Venezuela Matters: Oil, Refineries & Power',
    description:
      'A visual essay on Venezuela\'s oil, Gulf Coast refining, and Operation Absolute Resolve.',
    images: ['https://images.esy.com/essays/why-venezuela-matters/orinoco-oil-belt-map.2de055ee32.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://esy.com/essays/why-venezuela-matters',
  },
};

// Article Schema
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Why Venezuela Matters: Oil, Refineries, and Power in the Western Hemisphere',
  description:
    'A visual systems essay explaining the forces behind Operation Absolute Resolve and the capture of Nicolas Maduro.',
  image: 'https://images.esy.com/essays/why-venezuela-matters/orinoco-oil-belt-map.2de055ee32.png',
  author: {
    '@type': 'Organization',
    name: 'Esy',
    url: 'https://esy.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Esy',
    logo: {
      '@type': 'ImageObject',
      url: 'https://esy.com/logo.png',
    },
  },
  datePublished: '2026-01-03',
  dateModified: '2026-01-03',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://esy.com/essays/why-venezuela-matters',
  },
  articleSection: 'Visual Essays',
  keywords: ['Venezuela', 'Oil', 'Heavy Crude', 'Gulf Coast Refineries', 'Operation Absolute Resolve', 'Maduro'],
};

export default function WhyVenezuelaMattersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <WhyVenezuelaMattersClient />
    </>
  );
}
