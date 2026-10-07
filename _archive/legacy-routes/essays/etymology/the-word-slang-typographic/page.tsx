import type { Metadata } from 'next';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import TheWordSlangTypographicClient from './TheWordSlangTypographicClient';

// OG Image: 1200x630 recommended, absolute HTTPS URL required
const OG_IMAGE_URL = 'https://esy.com/og/the-word-slang-typographic.png';
const CANONICAL_URL = 'https://esy.com/essays/etymology/the-word-slang-typographic';

const ESSAY_META = {
  title: 'SLANG: The Rogue Archive',
  subtitle: 'A Typographic Etymology — No Photographs, Only Type, Pattern, and Power',
  category: 'Etymology',
  readTime: '20 min',
  sourceCount: 14,
  sourceTier: 'Tier-1',
  sectionCount: 6,
  visualizationCount: 5,
  designSystem: 'Subject-derived',
  published: 'January 2026',
  model: 'claude-opus-4.6',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Cant Black', color: '#0D0D0D' },
    { name: 'Underworld Red', color: '#8B2500' },
    { name: 'Lexicon Cream', color: '#F0E6D3' },
    { name: 'Editorial Blue', color: '#1E3A5F' },
    { name: 'Type Grey', color: '#6B7280' },
  ],
  visualizations: [
    { name: 'Typography-Led Narrative', type: 'Typographic Display' },
    { name: 'Era Pattern Shifts', type: 'Visual Morphing' },
    { name: 'Word Migration Timeline', type: 'Interactive Timeline' },
    { name: 'Letter Compositions', type: 'Typographic Art' },
    { name: 'Dictionary Evolution', type: 'Gradual Reveals' },
  ],
  keySources: [
    'Francis Grose, A Classical Dictionary of the Vulgar Tongue (1785)',
    'H.L. Mencken, The American Language',
    'Eric Partridge, Slang To-Day and Yesterday',
    'Jonathon Green, Language! 500 Years of the Vulgar Tongue',
    'Oxford English Dictionary',
  ],
};

export const metadata: Metadata = {
  title: 'SLANG: The Rogue Archive | A Typographic Etymology | Esy',
  description:
    'A typography-led visual essay tracing the word "slang" from London\'s criminal underworld in 1756 to the present. No photographs—only type, pattern, and the power of letters.',
  keywords: [
    'slang etymology',
    'slang origin',
    'typographic essay',
    'typography design',
    'visual etymology',
    'word history',
    'Francis Grose',
    'H.L. Mencken',
    'cant',
    'argot',
    'lexicography',
    'editorial design',
    'esy',
  ],
  // Open Graph (Facebook, LinkedIn, Discord, Slack, iMessage)
  openGraph: {
    title: 'SLANG: The Rogue Archive',
    description:
      'A typography-led visual essay tracing "slang" from criminal cant to everyday speech. Type is the protagonist.',
    type: 'article',
    url: CANONICAL_URL,
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'SLANG — The Rogue Archive: A typographic etymology of the word that names the unnamed',
      },
    ],
    publishedTime: '2026-01-21T00:00:00Z',
    modifiedTime: '2026-01-22T00:00:00Z',
    authors: ['Esy'],
  },
  // Twitter/X Cards
  twitter: {
    card: 'summary_large_image',
    title: 'SLANG: The Rogue Archive',
    description:
      'A typography-led visual essay. No photos—only letters, history, and the word that names the unnamed.',
    images: {
      url: OG_IMAGE_URL,
      alt: 'SLANG — The Rogue Archive: A typographic etymology of the word that names the unnamed',
    },
    site: '@esy',
  },
  // Canonical URL
  alternates: {
    canonical: CANONICAL_URL,
  },
};

export default function TheWordSlangTypographicPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SLANG: The Rogue Archive — A Typographic Etymology',
    description:
      'A typography-led visual essay tracing the word "slang" from London\'s criminal underworld in 1756 to the digital present.',
    image: OG_IMAGE_URL,
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
        url: 'https://esy.com/esy-logo.png',
      },
    },
    datePublished: '2026-01-21',
    dateModified: '2026-01-22',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL_URL,
    },
    about: {
      '@type': 'Thing',
      name: 'Slang (linguistics)',
      description: 'Informal vocabulary used by particular social groups',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordSlangTypographicClient />
      </ArtifactDetailWrapper>
    </>
  );
}
