import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import TurkanaBoyClient from './v/spec-r2/TurkanaBoyV2Client';
import { IMAGES } from './v/spec-r2/images';
import { ESSAY_META } from './v/spec-r2/meta';
import './v/spec-r2/turkana-boy-v2.css';

export const metadata = createVisualEssayMetadata({
  slug: 'science/turkana-boy',
  basePath: 'essays',
  title: 'Turkana Boy: The First Modern Body | Esy',
  description:
    'KNM-WT 15000 is the most complete early Homo skeleton and the clearest window into when our body plan truly emerged. From a mandibular abscess to Out-of-Africa migration, this essay traces the first draft of the modern human body through 108 bones, 14 visualizations, and 1.53 million years of evidence.',
  ogTitle: 'Turkana Boy: The First Modern Body',
  ogDescription:
    '108 bones, a hole in the jaw, and the child who carried our body plan into the open world.',
  ogImage: IMAGES.fullSkeletonFront,
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
  ],
  publishedTime: '2026-03-06T00:00:00.000Z',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://esy.com/essays/science/turkana-boy/#article',
      headline: 'Turkana Boy: The First Modern Body',
      description:
        'KNM-WT 15000 is the most complete early Homo skeleton and the clearest window into when our body plan truly emerged.',
      image: IMAGES.fullSkeletonFront,
      url: 'https://esy.com/essays/science/turkana-boy/',
      datePublished: '2026-03-06',
      dateModified: '2026-03-06',
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
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://esy.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Essays',
          item: 'https://esy.com/essays/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Turkana Boy: The First Modern Body',
          item: 'https://esy.com/essays/science/turkana-boy/',
        },
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
