import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import SilkClient from './SilkClient';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';

/**
 * SILK — The Luminous Thread
 * ==========================
 * 5,000 Years of Thread, Empire, and Espionage
 *
 * A photography-heavy visual essay tracing silk from Neolithic China
 * to the birth of computing. 5-movement cinematic structure,
 * 35 photographs, 3 interaction modes, 22 verified sources.
 *
 * Research Package: ./research/
 * Design Research: ./DESIGN-RESEARCH.md
 * Spec: /orchestration/skills/visual-essay-invocation/specs/silk.md
 */

const ESSAY_META = {
  title: 'The Luminous Thread',
  subtitle: '5,000 Years of Silk, Secrecy, and Civilization',
  category: 'History',
  subcategory: 'Material Culture',
  readTime: '16 min',
  sourceCount: 22,
  sourceTier: 'Tier-1',
  sectionCount: 5,
  visualizationCount: 3,
  designSystem: 'Subject-derived',
  published: 'February 9, 2026',
  model: 'Claude Opus 4.6',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Silk Gold', color: '#C9A84C' },
    { name: 'Silk Ivory', color: '#F5F0E8' },
    { name: 'Mulberry', color: '#6B3A5C' },
    { name: 'Lapis Lazuli', color: '#264B8C' },
    { name: 'Byzantine Purple', color: '#6B2D75' },
    { name: 'Lyon Crimson', color: '#8B1A1A' },
  ],
  visualizations: [
    { name: 'MigrationTrail: The Silk Road', type: 'Interactive Map' },
    { name: 'IngredientOracle: Sericulture', type: 'Progressive Reveal' },
    { name: 'TimefoldSlider: 5,000 Years', type: 'Timeline Slider' },
  ],
  keySources: [
    'Hansen (2012)',
    'Procopius (6th c.)',
    'Needham & Kuhn (1988)',
    'Essinger (2004)',
  ],
  citationFirst: false,
};

export const metadata = createVisualEssayMetadata({
  slug: 'silk',
  basePath: 'essays',
  title: 'The Luminous Thread: 5,000 Years of Silk | Esy',
  description:
    'A photography-dense visual essay tracing silk across 5,000 years — from Neolithic Chinese sericulture through the Silk Road, Byzantine espionage, the Jacquard loom, and the mysterious disappearance of Jim Thompson. 22 verified sources, 35 photographs, 3 interactive visualizations.',
  ogTitle: 'The Luminous Thread: 5,000 Years of Silk',
  ogDescription:
    'From a caterpillar\'s cocoon to the birth of computing. A visual essay spanning 5,000 years of thread, empire, and espionage.',
  keywords: [
    'silk history',
    'silk road',
    'sericulture',
    'Bombyx mori',
    'silk road trade routes',
    'Byzantine silk',
    'Justinian silk',
    'Jacquard loom',
    'Jim Thompson silk',
    'Chinese silk',
    'history of textiles',
    'Sogdian merchants',
    'silk road map',
    'visual essay',
    'interactive history',
  ],
  publishedTime: '2026-02-09T00:00:00.000Z',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/silk/#article",
      "headline": "The Luminous Thread: 5,000 Years of Silk, Secrecy, and Civilization",
      "alternativeHeadline": "From a Caterpillar's Cocoon to the Birth of Computing",
      "description":
        "A photography-dense visual essay tracing silk across 5,000 years — from Neolithic Chinese sericulture through the Silk Road, Byzantine espionage, the Jacquard loom, and the mysterious disappearance of Jim Thompson.",
      "url": "https://esy.com/essays/silk/",
      "datePublished": "2026-02-09",
      "dateModified": "2026-02-09",
      "author": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://esy.com/essays/silk/",
      },
      "keywords":
        "silk history, silk road, sericulture, Justinian, Jacquard loom, Jim Thompson, Sogdian merchants",
      "articleSection": "History",
      "wordCount": 6000,
      "isAccessibleForFree": true,
      "inLanguage": "en-US",
      "mentions": [
        { "@type": "Person", "name": "Zhang Qian" },
        { "@type": "Person", "name": "Justinian I" },
        { "@type": "Person", "name": "Joseph Marie Jacquard" },
        { "@type": "Person", "name": "Jim Thompson" },
        { "@type": "Person", "name": "Ada Lovelace" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://esy.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Essays",
          "item": "https://esy.com/essays/",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Silk",
          "item": "https://esy.com/essays/silk/",
        },
      ],
    },
  ],
};

export default function SilkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <SilkClient />
      </ArtifactDetailWrapper>
    </>
  );
}
