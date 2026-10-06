import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import SevenMillionYearsClient from './SevenMillionYearsClient';
import './seven-million-years.css';

const ESSAY_META = {
  title: 'Seven Million Years',
  subtitle: 'The Complete Visual History of Our Kind',
  category: 'Science',
  readTime: '40 min',
  sourceCount: 23,
  sourceTier: 'Tier-1',
  sectionCount: 11,
  visualizationCount: 9,
  designSystem: 'Subject-derived',
  published: 'February 2026',
  model: 'claude-opus-4.6',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Stratum Dark', color: '#1A1610' },
    { name: 'Bone Ivory', color: '#E8DCC8' },
    { name: 'Ochre Red', color: '#C4572A' },
    { name: 'Yellow Ochre', color: '#C89B3C' },
    { name: 'Flint Grey', color: '#8A8477' },
    { name: 'Rift Sienna', color: '#8B5E3C' },
  ],
  visualizations: [
    { name: 'Phylogenetic Tree', type: 'D3 Interactive Cladogram' },
    { name: 'Species Timeline', type: 'Interactive Gantt Chart' },
    { name: 'Brain Volume Chart', type: 'Recharts Scatter Plot' },
    { name: 'Migration Map', type: 'D3-Geo Animated Map' },
    { name: 'Climate Overlay', type: 'D3 Layered Chart' },
    { name: 'Species Comparison', type: 'Recharts Radar Chart' },
    { name: 'Tool Technology Timeline', type: 'D3 Stepped Timeline' },
    { name: 'Body Size Comparison', type: 'Recharts Bar Chart' },
    { name: 'Global Migration Animation', type: 'D3-Geo World Map' },
  ],
  keySources: [
    'Brunet et al. 2002, Nature -- Sahelanthropus tchadensis',
    'White et al. 2009, Science -- Ardipithecus ramidus',
    'Hublin et al. 2017, Nature -- Earliest Homo sapiens',
    'Green et al. 2010, Science -- Neanderthal Genome',
    'Reich et al. 2010, Nature -- Denisovan Genome',
    'Stringer 2012, Lone Survivors',
  ],
  relatedInfographics: [
    { title: 'How Our Brains Grew Over 7 Million Years', href: '/infographics/seven-million-years-homo' },
  ],
};

export const metadata = createVisualEssayMetadata({
  slug: 'science/seven-million-years',
  basePath: 'essays',
  title: 'Seven Million Years: The Complete Visual History of Our Kind | Esy',
  description:
    'A comprehensive visual essay tracing 7 million years of hominin evolution -- from the earliest bipedal apes to the sole surviving species. Featuring interactive migration maps, species comparisons, and the story of why we\'re the last ones standing.',
  ogTitle: 'Seven Million Years: The Complete Visual History of Our Kind',
  ogDescription:
    'A comprehensive visual essay tracing 7 million years of hominin evolution -- from the earliest bipedal apes to the sole surviving species.',
  ogImage:
    'https://images.esy.com/essays/seven-million-years/seven-million-years-og.f9e61cbb59.webp',
  keywords: [
    'human evolution',
    'hominid',
    'paleoanthropology',
    'Homo sapiens',
    'Neanderthal',
    'fossil record',
    'deep time',
    'migration',
    'visual essay',
  ],
  publishedTime: '2026-02-24T00:00:00.000Z',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/science/seven-million-years/#article",
      "headline": "Seven Million Years: The Complete Visual History of Our Kind",
      "description":
        "A comprehensive visual essay tracing 7 million years of hominin evolution -- from the earliest bipedal apes to the sole surviving species. Featuring interactive migration maps, species comparisons, and the story of why we're the last ones standing.",
      "url": "https://esy.com/essays/science/seven-million-years/",
      "datePublished": "2026-02-24",
      "dateModified": "2026-02-24",
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
        "@id": "https://esy.com/essays/science/seven-million-years/",
      },
      "keywords":
        "human evolution, hominid, paleoanthropology, Homo sapiens, Neanderthal, fossil record, deep time, migration",
      "articleSection": "Science",
      "isAccessibleForFree": true,
      "inLanguage": "en-US",
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
          "name": "Seven Million Years",
          "item": "https://esy.com/essays/science/seven-million-years/",
        },
      ],
    },
  ],
};

export default function SevenMillionYearsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <SevenMillionYearsClient />
      </ArtifactDetailWrapper>
    </>
  );
}
