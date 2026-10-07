import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import TurkanaBoyClient from './TurkanaBoyClient';
import { IMAGES } from './images';
import { ESSAY_META } from './meta';
import './turkana-boy.css';

export const metadata = createVisualEssayMetadata({
  slug: 'science/turkana-boy/v/claude-opus-4-6',
  basePath: 'essays',
  canonicalOverride: '/essays/science/turkana-boy',
  title: 'Turkana Boy: The First Modern Body (Claude Opus 4.6) | Esy',
  description:
    'A visual essay on KNM-WT 15000, built by Claude Opus 4.6 as a model comparison variant. Fresh research, independent prose, and distinct design sensibility.',
  ogTitle: 'Turkana Boy: The First Modern Body',
  ogDescription:
    '108 bones, one jaw lesion, and the first body in our lineage built for range.',
  ogImage: IMAGES.turkanaBoyReconstruction,
  keywords: [
    'Turkana Boy',
    'KNM-WT 15000',
    'Nariokotome',
    'Homo ergaster',
    'Homo erectus',
    'human evolution',
    'paleoanthropology',
    'Lake Turkana',
    'body plan',
    'visual essay',
    'Claude Opus 4.6',
  ],
  publishedTime: '2026-03-05T00:00:00.000Z',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://esy.com/essays/science/turkana-boy/v/claude-opus-4-6/#article',
      headline: 'Turkana Boy: The First Modern Body',
      description:
        'A visual essay on KNM-WT 15000, the most complete early Homo skeleton ever found, and the anatomy that made long-range human movement possible.',
      image: IMAGES.turkanaBoyReconstruction,
      url: 'https://esy.com/essays/science/turkana-boy/v/claude-opus-4-6/',
      datePublished: '2026-03-05',
      dateModified: '2026-03-05',
      author: {
        '@type': 'Organization',
        name: 'Esy',
        url: 'https://esy.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Esy',
        url: 'https://esy.com',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://esy.com/essays/science/turkana-boy/',
      },
      keywords:
        'Turkana Boy, KNM-WT 15000, Nariokotome, Homo ergaster, Homo erectus, human evolution, paleoanthropology, Lake Turkana',
      articleSection: 'Science',
      isAccessibleForFree: true,
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esy.com/' },
        { '@type': 'ListItem', position: 2, name: 'Essays', item: 'https://esy.com/essays/' },
        { '@type': 'ListItem', position: 3, name: 'Turkana Boy: The First Modern Body', item: 'https://esy.com/essays/science/turkana-boy/' },
      ],
    },
  ],
};

export default function TurkanaBoyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TurkanaBoyClient />
      </ArtifactDetailWrapper>
    </>
  );
}
