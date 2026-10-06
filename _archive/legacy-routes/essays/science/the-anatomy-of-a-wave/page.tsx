import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import TheAnatomyOfAWaveClient from './TheAnatomyOfAWaveClient';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';

const ESSAY_META = {
  title: 'The Anatomy of a Wave',
  subtitle: 'From ocean to quantum — the universal pattern',
  category: 'Science',
  subcategory: 'Physics',
  readTime: '20 min',
  sourceCount: 14,
  sourceTier: 'Tier-1',
  sectionCount: 9,
  visualizationCount: 7,
  designSystem: 'Subject-derived',
  published: 'February 9, 2026',
  model: 'Claude Opus 4.6',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Ocean Blue', color: '#1a6fa0' },
    { name: 'Sound Amber', color: '#d4872c' },
    { name: 'Quantum Violet', color: '#6b3fa0' },
    { name: 'Interference Cyan', color: '#00bcd4' },
    { name: 'Constructive Green', color: '#2ecc71' },
  ],
  visualizations: [
    { name: 'Ocean Wave Anatomy', type: 'Annotated SVG' },
    { name: 'Sound Pressure', type: 'Animated SVG' },
    { name: 'Light Spectrum', type: 'Styled CSS' },
    { name: 'Superposition Playground', type: 'Interactive Canvas' },
    { name: 'Ripple Tank', type: 'Canvas Simulation' },
    { name: 'Standing Wave Builder', type: 'Animated SVG' },
    { name: 'Double-Slit Experiment', type: 'Scroll Canvas' },
  ],
  keySources: [
    'Feynman (1964)',
    'Halliday & Resnick',
    'Tonomura et al. (1989)',
    'Griffiths (2018)',
  ],
  citationFirst: false,
};

export const metadata = createVisualEssayMetadata({
  slug: 'the-anatomy-of-a-wave',
  basePath: 'essays/science',
  title: 'The Anatomy of a Wave: From Ocean to Quantum | Esy',
  description: 'An interactive visual essay exploring the universal pattern of waves — from ocean waves to sound, light, interference, standing waves, and quantum wave functions. Built on 14 Tier-1 physics sources.',
  ogTitle: 'The Anatomy of a Wave',
  ogDescription: 'From ocean waves to quantum mechanics — an interactive visual essay revealing the universal pattern that governs everything from guitar strings to electrons.',
  keywords: [
    'wave physics',
    'anatomy of a wave',
    'superposition',
    'interference patterns',
    'standing waves',
    'double slit experiment',
    'quantum wave function',
    'wave particle duality',
    'sound waves',
    'electromagnetic waves',
    'visual essay',
    'interactive physics',
    'science education',
  ],
  publishedTime: '2026-02-09T00:00:00.000Z',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/science/the-anatomy-of-a-wave/#article",
      "headline": "The Anatomy of a Wave: From Ocean to Quantum",
      "alternativeHeadline": "The universal pattern that governs everything from guitar strings to electrons",
      "description": "An interactive visual essay exploring waves — from ocean waves to sound, light, interference, standing waves, and quantum wave functions. Progressive abstraction from physical to mathematical.",
      "url": "https://esy.com/essays/science/the-anatomy-of-a-wave/",
      "datePublished": "2026-02-09",
      "dateModified": "2026-02-09",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://esy.com/essays/science/the-anatomy-of-a-wave/"
      },
      "keywords": "wave physics, superposition, interference, standing waves, double slit experiment, quantum wave function",
      "articleSection": "Science",
      "wordCount": 3500,
      "isAccessibleForFree": true,
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com/" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Science", "item": "https://esy.com/essays/science/" },
        { "@type": "ListItem", "position": 4, "name": "The Anatomy of a Wave", "item": "https://esy.com/essays/science/the-anatomy-of-a-wave/" }
      ]
    }
  ]
};

export default function TheAnatomyOfAWavePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheAnatomyOfAWaveClient />
      </ArtifactDetailWrapper>
    </>
  );
}
