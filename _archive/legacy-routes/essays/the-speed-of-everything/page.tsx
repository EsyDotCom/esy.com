import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import SpeedOfEverythingClient from './SpeedOfEverythingClient';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';

/**
 * THE SPEED OF EVERYTHING — A Logarithmic Journey Through Velocity
 * ================================================================
 * From continental drift to the speed of light — 17 orders of magnitude
 * of velocity visualized on a single logarithmic ruler.
 *
 * 7 interactive visualizations, 15 verified Tier-1 sources,
 * subject-derived color palette (geological → electromagnetic).
 *
 * Research Package: ./research/
 * Design Research: ./DESIGN-RESEARCH.md
 * Intake: ./G1-INTAKE.md
 */

const ESSAY_META = {
  title: 'The Speed of Everything',
  subtitle: 'A Logarithmic Journey Through Velocity',
  category: 'Science',
  subcategory: 'Physics',
  readTime: '12 min',
  sourceCount: 15,
  sourceTier: 'Tier-1',
  sectionCount: 6,
  visualizationCount: 7,
  designSystem: 'Subject-derived',
  published: 'February 9, 2026',
  model: 'Claude Opus 4.6',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Geological Amber', color: '#C4923A' },
    { name: 'Biological Green', color: '#34A853' },
    { name: 'Human Blue', color: '#4285F4' },
    { name: 'Atmospheric Steel', color: '#78909C' },
    { name: 'Cosmic Purple', color: '#9C27B0' },
    { name: 'Electromagnetic Gold', color: '#FFB300' },
  ],
  visualizations: [
    { name: 'The Familiar Scale', type: 'Animated Comparison' },
    { name: 'The Slow Parade', type: 'Interactive Bar Race' },
    { name: 'Sound vs. Light', type: 'Distance-over-Time Animation' },
    { name: 'The Cosmic Speedometer', type: 'Nested Velocity Rings' },
    { name: 'Light Delay Explorer', type: 'Interactive Distance Selector' },
    { name: 'Time Dilation Preview', type: 'Interactive Slider' },
    { name: 'The Logarithmic Ruler', type: 'Scroll-Locked Log Scale' },
  ],
  keySources: [
    'NIST Fundamental Physical Constants',
    'NASA Earth Fact Sheet & Solar System Exploration',
    'USGS — Understanding Plate Motions',
    'Griffiths — Introduction to Electrodynamics (4th ed.)',
  ],
  citationFirst: false,
};

export const metadata = createVisualEssayMetadata({
  slug: 'the-speed-of-everything',
  basePath: 'essays',
  title: 'The Speed of Everything | Esy Visual Essay',
  description:
    'An interactive visual essay spanning 17 orders of magnitude — from continental drift to the speed of light. Featuring a scroll-locked logarithmic ruler, animated speed comparisons, and data-driven visualizations.',
  ogTitle: 'The Speed of Everything',
  ogDescription:
    'From continental drift to the speed of light — a logarithmic journey through 17 orders of magnitude of velocity.',
  keywords: [
    'speed of light',
    'logarithmic scale',
    'orders of magnitude',
    'velocity',
    'physics visualization',
    'data visualization',
    'interactive essay',
    'visual essay',
    'speed comparison',
    'continental drift',
    'science',
  ],
  publishedTime: '2026-02-09T00:00:00.000Z',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-speed-of-everything/#article",
      "headline": "The Speed of Everything",
      "alternativeHeadline": "A Logarithmic Journey Through Velocity",
      "description":
        "An interactive visual essay exploring the full spectrum of speeds in nature — from continental drift at 2.5 cm/year to the speed of light at 299,792,458 m/s. Featuring an interactive logarithmic ruler, animated speed comparisons, and scroll-driven data visualizations spanning 17 orders of magnitude.",
      "url": "https://esy.com/essays/the-speed-of-everything/",
      "datePublished": "2026-02-09",
      "dateModified": "2026-02-09",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" },
      },
      "image": "https://esy.com/og/the-speed-of-everything.png",
      "articleSection": "Science",
      "wordCount": 2000,
      "isAccessibleForFree": true,
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "The Speed of Everything",
          "item": "https://esy.com/essays/the-speed-of-everything/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the fastest speed in the universe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The speed of light in a vacuum — exactly 299,792,458 metres per second — is the maximum speed at which information or energy can travel through space. Since 1983, the metre itself is defined by this constant.",
          },
        },
        {
          "@type": "Question",
          "name": "How fast do tectonic plates move?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tectonic plates move at 1–10 centimetres per year, approximately 1 nanometre per second. This is roughly the same speed at which human fingernails grow.",
          },
        },
        {
          "@type": "Question",
          "name": "How many orders of magnitude do speeds in nature span?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Speeds in nature span approximately 17 orders of magnitude — from continental drift at roughly 10^-9 m/s to the speed of light at roughly 10^8.5 m/s. Human direct experience covers less than 2 of these 17 orders.",
          },
        },
      ],
    },
  ],
};

export default function TheSpeedOfEverythingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <SpeedOfEverythingClient />
      </ArtifactDetailWrapper>
    </>
  );
}
