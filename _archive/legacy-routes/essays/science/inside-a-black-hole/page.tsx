import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import InsideABlackHoleClient from './InsideABlackHoleClient';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';

const ESSAY_META = {
  title: 'Inside a Black Hole',
  subtitle: 'What physics actually tells us about the most extreme object in the universe',
  category: 'Science',
  subcategory: 'Physics',
  readTime: '25 min',
  sourceCount: 16,
  sourceTier: 'Tier-1',
  sectionCount: 9,
  visualizationCount: 7,
  designSystem: 'Subject-derived',
  published: 'February 8, 2026',
  model: 'claude-opus-4.6',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'EHT Gold', color: '#c4922a' },
    { name: 'Lensing Blue', color: '#3d7ec7' },
    { name: 'Quantum Violet', color: '#6b4fa0' },
    { name: 'Horizon Teal', color: '#1a9e8f' },
    { name: 'Danger Red', color: '#b5382a' },
  ],
  visualizations: [
    { name: 'EHT Ring', type: 'Annotated CSS' },
    { name: 'Observer Duality', type: 'Split-screen' },
    { name: 'Horizon Crossing', type: 'Scroll-triggered' },
    { name: 'Spacetime Curvature', type: 'Three.js 3D' },
    { name: 'Tidal Comparison', type: 'Data Cards + SVG' },
    { name: 'Penrose Diagram', type: 'Interactive SVG' },
    { name: 'Information Flow', type: 'Programmatic SVG' },
  ],
  keySources: [
    'Penrose (1965)',
    'Hawking (1975)',
    'EHT Collaboration (2019)',
    'Schwarzschild (1916)',
  ],
  citationFirst: false,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/science/inside-a-black-hole/#article",
      "headline": "Inside a Black Hole: What Physics Actually Tells Us",
      "alternativeHeadline": "A Journey Into the Most Extreme Object in the Universe",
      "description": "An interactive visual essay exploring what happens inside a black hole — from crossing the event horizon to the singularity, Penrose diagrams, Hawking radiation, and the information paradox. Built entirely on peer-reviewed physics with 22 Tier-1 sources.",
      "url": "https://esy.com/essays/science/inside-a-black-hole/",
      "datePublished": "2026-02-08",
      "dateModified": "2026-02-08",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://images.esy.com/essays/inside-a-black-hole/inside-a-black-hole-og.822a747747.webp",
      "articleSection": "Physics",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Science", "item": "https://esy.com/essays/science/" },
        { "@type": "ListItem", "position": 4, "name": "Inside a Black Hole", "item": "https://esy.com/essays/science/inside-a-black-hole/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What happens when you cross the event horizon of a black hole?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Surprisingly, nothing noticeable. The event horizon is not a physical surface — it's a mathematical boundary. An infalling observer in freefall would not feel any impact or sensation when crossing. For a supermassive black hole, you wouldn't even notice tidal forces. However, once crossed, no signal you send can ever reach the outside universe."
          }
        },
        {
          "@type": "Question",
          "name": "Is the singularity at the center of a black hole?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Inside a black hole, the singularity is not a point in space you travel toward — it is a moment in your future. The roles of space and time swap inside the event horizon, making the singularity a temporal destination as unavoidable as next Tuesday. This is one of the most counterintuitive predictions of general relativity."
          }
        },
        {
          "@type": "Question",
          "name": "What is the black hole information paradox?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The information paradox arises because Hawking radiation — the faint thermal glow emitted by black holes due to quantum effects — appears to carry no information about what fell in. If a black hole evaporates completely, the information about everything it consumed seems to be permanently destroyed. But quantum mechanics says information can never be truly destroyed. This contradiction has been debated since 1976 and remains unresolved."
          }
        },
        {
          "@type": "Question",
          "name": "Have black holes been directly observed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. LIGO detected gravitational waves from merging black holes in 2015, and the Event Horizon Telescope photographed the shadow of the supermassive black hole M87* in 2019 and Sagittarius A* in 2022. These are among the most well-confirmed objects in astrophysics."
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: 'inside-a-black-hole',
  basePath: 'essays/science',
  title: 'Inside a Black Hole: What Physics Actually Tells Us | Esy',
  description: 'An interactive visual essay exploring what happens inside a black hole — event horizons, Penrose diagrams, Hawking radiation, and the information paradox. Built on 22 peer-reviewed sources.',
  ogTitle: 'Inside a Black Hole',
  ogDescription: 'What physics actually tells us about the interior of black holes. An interactive visual essay with Penrose diagrams, observer duality, and the information paradox.',
  ogImage: 'https://images.esy.com/essays/inside-a-black-hole/inside-a-black-hole-og.822a747747.webp',
  keywords: [
    'black hole',
    'event horizon',
    'singularity',
    'Penrose diagram',
    'information paradox',
    'Hawking radiation',
    'gravitational lensing',
    'general relativity',
    'interactive essay',
    'visual essay',
    'physics',
  ],
  publishedTime: '2026-02-08T00:00:00.000Z',
});

export default function InsideABlackHolePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <InsideABlackHoleClient />
      </ArtifactDetailWrapper>
    </>
  );
}
