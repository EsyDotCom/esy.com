import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import HomoNalediClient from './HomoNalediClient';
import './homo-naledi.css';

const ESSAY_META = {
  title: 'Homo naledi: The Small-Brained Species That Buried Its Dead',
  subtitle: '1,500 Bones, 560 Cubic Centimetres, and the Question of What Makes Us Human',
  category: 'Science',
  readTime: '38 min',
  sourceCount: 24,
  sourceTier: 'Tier-1',
  sectionCount: 12,
  visualizationCount: 14,
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
    { name: 'Dinaledi Dark', color: '#0D0E12' },
    { name: 'Cave Charcoal', color: '#1A1C22' },
    { name: 'Bone Ivory', color: '#E8DCC8' },
    { name: 'Dolomite Grey', color: '#6B7A8A' },
    { name: 'Signal Amber', color: '#C4893A' },
    { name: 'Ochre Earth', color: '#9B6B3C' },
    { name: 'Flowstone Cream', color: '#C9BFA8' },
    { name: 'Deep Passage', color: '#2A2D35' },
  ],
  visualizations: [
    { name: 'Cave Cross-Section', type: 'D3 + SVG Interactive' },
    { name: 'Anatomical Mosaic', type: 'Custom SVG + React State' },
    { name: 'Brain Size vs. Behaviour', type: 'D3 Scatter + Voronoi' },
    { name: 'Dating Timeline', type: 'D3 Layered Timeline' },
    { name: 'Dinaledi Chamber Floor Plan', type: 'D3 + SVG' },
    { name: 'Skull Comparison', type: 'D3 + Interactive SVG Toggle' },
    { name: 'Hand Morphology', type: 'Annotated SVG + D3' },
    { name: 'Disposal Evidence Flowchart', type: 'D3 Force / Tree Layout' },
    { name: 'South African Cave Sites Map', type: 'D3-Geo + TopoJSON' },
    { name: 'Body Proportion Comparison', type: 'Recharts Grouped Bar' },
    { name: 'Phylogenetic Position', type: 'D3 Interactive Cladogram' },
    { name: 'Species Coexistence Timeline', type: 'D3 Gantt Chart' },
    { name: 'DH1 Cranium 3D Viewer', type: 'React Three Fiber' },
    { name: 'Naledi Hand 3D Viewer', type: 'React Three Fiber' },
  ],
  keySources: [
    'Berger et al. 2015, eLife -- H. naledi type description',
    'Dirks et al. 2015, eLife -- Geological and taphonomic context',
    'Hawks et al. 2017, eLife -- Lesedi Chamber, Neo skull',
    'Dirks et al. 2017, eLife -- Age of H. naledi (U-Th, ESR)',
    'Kivell et al. 2015, Nat. Commun. -- Hand morphology',
    'Harcourt-Smith et al. 2015, Nat. Commun. -- Foot morphology',
  ],
  relatedInfographics: [
    { title: 'How Our Brains Grew Over 7 Million Years', href: '/infographics/seven-million-years-homo' },
  ],
};

export const metadata = createVisualEssayMetadata({
  slug: 'science/homo-naledi',
  basePath: 'essays',
  title: 'Homo naledi: The Small-Brained Species That Buried Its Dead | Esy',
  description:
    'A comprehensive visual essay on Homo naledi, the small-brained hominin from the Rising Star Cave system that may have practiced deliberate body disposal 300,000 years ago.',
  ogTitle: 'Homo naledi: The Small-Brained Species That Buried Its Dead',
  ogDescription:
    '1,500 bones, 560 cubic centimetres, and the question of what makes us human. An in-depth visual exploration of the most paradoxical species in paleoanthropology.',
  ogImage:
    'https://images.esy.com/essays/homo-naledi/homo-naledi-facial-reconstruction.e82db47297.webp',
  keywords: [
    'Homo naledi',
    'Rising Star Cave',
    'paleoanthropology',
    'human evolution',
    'Dinaledi Chamber',
    'Lee Berger',
    'deliberate body disposal',
    'South Africa',
    'Cradle of Humankind',
    'visual essay',
  ],
  publishedTime: '2026-02-25T00:00:00.000Z',
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/science/homo-naledi/#article",
      "headline": "Homo naledi: The Small-Brained Species That Buried Its Dead",
      "description":
        "A comprehensive visual essay on Homo naledi, the small-brained hominin from the Rising Star Cave system that may have practiced deliberate body disposal 300,000 years ago.",
      "image": "https://images.esy.com/essays/homo-naledi/homo-naledi-facial-reconstruction.e82db47297.webp",
      "url": "https://esy.com/essays/science/homo-naledi/",
      "datePublished": "2026-02-25",
      "dateModified": "2026-02-25",
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
        "@id": "https://esy.com/essays/science/homo-naledi/",
      },
      "keywords":
        "Homo naledi, Rising Star Cave, paleoanthropology, human evolution, Dinaledi Chamber, deliberate body disposal",
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
          "name": "Homo naledi",
          "item": "https://esy.com/essays/science/homo-naledi/",
        },
      ],
    },
  ],
};

export default function HomoNalediPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <HomoNalediClient />
      </ArtifactDetailWrapper>
    </>
  );
}
