import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import TheSwordClient from './TheSwordClient';
import './the-sword.css';

const ESSAY_META = {
  title: 'The Sword',
  subtitle: 'For 5,000 Years, the Most Important Object a Human Could Own',
  category: 'History',
  readTime: '28 min',
  sourceCount: 22,
  sourceTier: 'Tier-1',
  sectionCount: 8,
  visualizationCount: 5,
  designSystem: 'Subject-derived',
  published: 'January 2025',
  model: 'Claude',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Tamahagane', color: '#2B2D42' },
    { name: 'Forge Orange', color: '#D4622B' },
    { name: 'Hamon White', color: '#E8E4DE' },
    { name: 'Damascus Silver', color: '#A8A9AD' },
    { name: 'Oxide Brown', color: '#5C4742' },
    { name: 'Silk Indigo', color: '#2C3E6B' },
  ],
  visualizations: [
    { name: 'Forging Process', type: 'Scroll-Lock Sequence' },
    { name: 'Blade Anatomy', type: 'Annotated SVG' },
    { name: 'Cross-Cultural Comparison', type: 'Split Comparison' },
    { name: '5,000-Year Timeline', type: 'Vertical Timeline' },
    { name: 'Fuller Progress Bar', type: 'Scroll Indicator' },
  ],
  keySources: [
    'Metropolitan Museum of Art, Arms & Armor Collection',
    'Kapp, Kapp & Yoshihara, The Craft of the Japanese Sword',
    'Verhoeven et al., Damascus Steel: Theory and Practice',
    'Davidson, The Sword in Anglo-Saxon England',
    'Oakeshott, The Medieval Sword',
    'Musashi, The Book of Five Rings',
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Sword: For 5,000 Years, the Most Important Object a Human Could Own',
  description:
    'A visual essay tracing 5,000 years of sword-making, sword-fighting, and sword-meaning across Japanese, European, and Islamic traditions.',
  author: {
    '@type': 'Organization',
    name: 'Esy.com',
    url: 'https://esy.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Esy.com',
    url: 'https://esy.com',
  },
  datePublished: '2025-01-03T00:00:00.000Z',
  image: 'https://esy.com/og/the-sword-og.webp',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://esy.com/essays/the-sword',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://esy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Essays',
        item: 'https://esy.com/essays',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'The Sword',
        item: 'https://esy.com/essays/the-sword',
      },
    ],
  },
};

export const metadata = {
  title: 'The Sword | Esy',
  description:
    'A visual essay tracing 5,000 years of sword-making, sword-fighting, and sword-meaning across Japanese, European, and Islamic traditions.',
  openGraph: {
    title: 'The Sword: For 5,000 Years, the Most Important Object a Human Could Own',
    description:
      'A visual essay tracing 5,000 years of sword-making, sword-fighting, and sword-meaning across Japanese, European, and Islamic traditions.',
    url: 'https://esy.com/essays/the-sword',
    siteName: 'Esy.com',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Sword: 5,000 Years of Blade, Blood, and Meaning',
    description:
      'How the sword became the most important object a human could own.',
  },
  keywords: [
    'sword history',
    'katana',
    'Damascus steel',
    'medieval sword',
    'samurai',
    'Masamune',
    'Ulfberht',
    'metallurgy',
    'pattern welding',
    'Crusades',
    'visual essay',
  ],
};

export default function TheSwordPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheSwordClient />
      </ArtifactDetailWrapper>
    </>
  );
}
