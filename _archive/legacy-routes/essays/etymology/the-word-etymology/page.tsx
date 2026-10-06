import type { Metadata } from 'next';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import TheWordEtymologyClient from './TheWordEtymologyClient';

const ESSAY_META = {
  title: 'Etymology: The Word That Dug Up Words',
  subtitle: 'A 2,500-Year Journey from Ancient Greek Philosophy to Digital Dictionaries',
  category: 'Etymology',
  readTime: '20 min',
  sourceCount: 12,
  sourceTier: 'Tier-1',
  sectionCount: 6,
  visualizationCount: 4,
  designSystem: 'Subject-derived',
  published: 'December 2025',
  model: 'Claude',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Root Brown', color: '#5C4033' },
    { name: 'Manuscript Cream', color: '#F5F0E1' },
    { name: 'Greek Gold', color: '#C9A84C' },
    { name: 'Dictionary Blue', color: '#2C3E50' },
    { name: 'Digital White', color: '#F8F8F8' },
  ],
  visualizations: [
    { name: 'Root Tree Diagram', type: 'Animated Etymology' },
    { name: 'Historical Timeline', type: 'Interactive Timeline' },
    { name: 'Era Typography Shifts', type: 'Visual Morphing' },
    { name: 'Word Archaeology', type: 'Gradual Reveals' },
  ],
  keySources: [
    "Plato, Cratylus",
    "Isidore of Seville, Etymologiae",
    "Jacob Grimm, Grimm's Law",
    "Oxford English Dictionary",
    "Calvert Watkins, American Heritage Dictionary of IE Roots",
  ],
};

export const metadata: Metadata = {
  title: 'Etymology: The Word That Dug Up Words | Esy',
  description:
    'A 2,500-year journey tracing the word "etymology" from ancient Greek philosophy to modern digital dictionaries. Discover how a word meaning "true sense" became the study of word origins.',
  keywords: [
    'etymology',
    'word origins',
    'linguistics',
    'philology',
    'language history',
    'Plato Cratylus',
    'Oxford English Dictionary',
    'Grimm\'s Law',
    'historical linguistics',
  ],
  openGraph: {
    title: 'Etymology: The Word That Dug Up Words',
    description:
      'A visual essay tracing 2,500 years of the word "etymology" — from Plato to the digital age.',
    type: 'article',
    url: 'https://esy.com/essays/etymology/the-word-etymology/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-word-etymology.png',
        width: 1200,
        height: 630,
        alt: 'Etymology: The Word That Dug Up Words — Visual Essay',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Etymology: The Word That Dug Up Words',
    description:
      'A visual essay tracing 2,500 years of the word "etymology" — from Plato to the digital age.',
    images: ['https://esy.com/og/the-word-etymology.png'],
    site: '@EsyResearch',
  },
  alternates: {
    canonical: 'https://esy.com/essays/etymology/the-word-etymology/',
  },
};

export default function TheWordEtymologyPage() {
  return (
    <ArtifactDetailWrapper meta={ESSAY_META}>
      <TheWordEtymologyClient />
    </ArtifactDetailWrapper>
  );
}
