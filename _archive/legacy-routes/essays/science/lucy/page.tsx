import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import LucyClient from './LucyClient';
import './lucy.css';

const ESSAY_META = {
  title: 'Lucy: Before the Genus Homo',
  subtitle: 'The Fossil That Rewrote the Story of Walking Upright',
  category: 'Science',
  readTime: '35 min',
  sourceCount: 24,
  sourceTier: 'Tier-1',
  sectionCount: 12,
  visualizationCount: 12,
  designSystem: 'Subject-derived',
  published: 'February 2026',
  model: 'claude-opus-4.6',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  clusterParent: {
    slug: 'seven-million-years',
    title: 'Seven Million Years',
    route: '/essays/science/seven-million-years',
  },
  palette: [
    { name: 'Hadar Dark', color: '#1C1610' },
    { name: 'Bone Ivory', color: '#E8DCC8' },
    { name: 'Lucy Amber', color: '#C4893A' },
    { name: 'Afar Sienna', color: '#9B6B3C' },
    { name: 'Ochre Red', color: '#C4572A' },
    { name: 'Rift Grey-Green', color: '#6B7A65' },
    { name: 'Tuff Grey', color: '#8A8477' },
    { name: 'Strata Band', color: '#3D3028' },
  ],
  visualizations: [
    { name: 'Anatomical Comparison', type: 'D3 + SVG Toggle Overlay' },
    { name: 'Pliocene Climate Timeline', type: 'D3 Layered Chart' },
    { name: 'Hadar Site Map', type: 'D3-Geo Interactive Map' },
    { name: 'Dietary Analysis', type: 'D3 Scatter + Voronoi' },
    { name: 'Body Size Dimorphism', type: 'Recharts Grouped Bar' },
    { name: 'Contemporary Species Map', type: 'D3-Geo Animated Map' },
    { name: 'Skeletal Completeness', type: 'Interactive SVG' },
    { name: 'Phylogenetic Position', type: 'D3 Interactive Cladogram' },
    { name: 'Cause of Death Evidence', type: 'Interactive SVG' },
    { name: 'Bipedalism Biomechanics', type: 'Canvas Animation' },
    { name: 'Stratigraphic Column', type: 'Annotated SVG' },
    { name: 'Species Trait Radar', type: 'D3 Radar Chart' },
  ],
  keySources: [
    'Johanson & White 1979, Science -- A. afarensis taxonomy',
    'Kimbel & Delezene 2009, AJPA -- Lucy redux review',
    'Kappelman et al. 2016, Nature -- Tree-fall death hypothesis',
    'Lovejoy 1988, Scientific American -- Human walking evolution',
    'Stern & Susman 1983, AJPA -- Locomotor anatomy',
    'Cerling et al. 2013, PNAS -- Stable isotope diet',
  ],
  relatedInfographics: [
    { title: 'How Our Brains Grew Over 7 Million Years', href: '/infographics/seven-million-years-homo' },
  ],
};

export const metadata = createVisualEssayMetadata({
  slug: 'science/lucy',
  basePath: 'essays',
  title: 'Lucy: Before the Genus Homo \u2014 The Fossil That Rewrote the Story of Walking Upright | Esy',
  description:
    'A comprehensive visual essay on AL 288-1, the 3.2-million-year-old Australopithecus afarensis skeleton that transformed our understanding of bipedalism, hominin diversity, and what it means to be human.',
  ogTitle: 'Lucy: Before the Genus Homo',
  ogDescription:
    'The fossil that rewrote the story of walking upright. An in-depth visual exploration of the most famous skeleton in paleoanthropology.',
  ogImage:
    'https://images.esy.com/essays/lucy/lucy-og.8b2a30ed17.webp',
  keywords: [
    'Lucy',
    'Australopithecus afarensis',
    'AL 288-1',
    'bipedalism',
    'paleoanthropology',
    'human evolution',
    'Hadar',
    'Ethiopia',
    'fossil',
    'Pliocene',
    'visual essay',
  ],
  publishedTime: '2026-02-24T00:00:00.000Z',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/science/lucy/#article",
      "headline": "Lucy: Before the Genus Homo \u2014 The Fossil That Rewrote the Story of Walking Upright",
      "description":
        "A comprehensive visual essay on AL 288-1, the 3.2-million-year-old Australopithecus afarensis skeleton that transformed our understanding of bipedalism, hominin diversity, and what it means to be human.",
      "image": "https://images.esy.com/essays/lucy/lucy-og.8b2a30ed17.webp",
      "url": "https://esy.com/essays/science/lucy/",
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
        "@id": "https://esy.com/essays/science/lucy/",
      },
      "keywords":
        "Lucy, Australopithecus afarensis, AL 288-1, bipedalism, paleoanthropology, human evolution, Hadar, Ethiopia",
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
          "name": "Lucy: Before the Genus Homo",
          "item": "https://esy.com/essays/science/lucy/",
        },
      ],
    },
  ],
};

export default function LucyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <LucyClient />
      </ArtifactDetailWrapper>
    </>
  );
}
