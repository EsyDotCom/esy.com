import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import TheWordNiggerClient from './TheWordNiggerClient';

const ESSAY_META = {
  title: 'The Weight of a Word',
  subtitle: 'A History of the N-Word in America',
  category: 'Etymology',
  readTime: '30 min',
  sourceCount: 18,
  sourceTier: 'Tier-1',
  sectionCount: 8,
  visualizationCount: 5,
  designSystem: 'Subject-derived',
  published: 'December 2025',
  model: 'Claude',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Archive Black', color: '#0D0D0D' },
    { name: 'Document Cream', color: '#E8DCC8' },
    { name: 'Resistance Gold', color: '#C9A84C' },
    { name: 'Jim Crow Sepia', color: '#704214' },
    { name: 'Freedom Blue', color: '#1E3A5F' },
  ],
  visualizations: [
    { name: 'Etymology Chain', type: 'Animated Sequence' },
    { name: 'Archival Photography', type: 'Documentary Treatment' },
    { name: 'Historical Timeline', type: 'Interactive Timeline' },
    { name: 'Era Typography Shifts', type: 'Visual Morphing' },
    { name: 'Key Figures Gallery', type: 'Portrait Cards' },
  ],
  keySources: [
    'Randall Kennedy, Nigger: The Strange Career of a Troublesome Word',
    'Oxford English Dictionary',
    'Frederick Douglass, Narrative (1845)',
    'James Baldwin, The Fire Next Time',
    'Ida B. Wells, Southern Horrors',
    'W.E.B. Du Bois, The Souls of Black Folk',
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-nigger/#article",
      "headline": "The Weight of a Word: A History of the N-Word in America",
      "alternativeHeadline": "How a Latin Color Term Became the Most Offensive Word in English",
      "description": "Trace the etymology, history, and applied use of America's most charged word—from Latin 'niger' through the slave trade, Jim Crow, Civil Rights, and contemporary debates. A documentary visual essay featuring archival photography and museum-grade typography.",
      "url": "https://esy.com/essays/etymology/the-word-nigger/",
      "datePublished": "2025-12-26",
      "dateModified": "2025-12-26",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-word-nigger.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US",
      "about": {
        "@type": "Thing",
        "name": "Etymology and history of racial language in America"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Word Nigger", "item": "https://esy.com/essays/etymology/the-word-nigger/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where does the N-word come from etymologically?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word derives from Latin 'niger' meaning 'black' (a neutral color descriptor). Through Spanish/Portuguese 'negro' in the Atlantic slave trade, it entered English in the 1570s. The shift from neutral color term to racial slur occurred through the word's association with slavery and dehumanization."
          }
        },
        {
          "@type": "Question",
          "name": "When was the N-word first used in English?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Oxford English Dictionary traces the first written English use to 1574, spelled 'Negar.' Early variants included 'niger,' 'neger,' and 'nigar.' These appear in travel writings and colonial records, already entangled with the emerging slave trade."
          }
        },
        {
          "@type": "Question",
          "name": "When did dictionaries start labeling the N-word as offensive?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dictionaries gradually added usage warnings: Webster's 1934 edition labeled it 'vulgar,' the 1961 edition added 'usually offensive.' By the 2000s, major dictionaries call it 'one of the most offensive words in English' with extensive usage notes."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between inter-group and intra-group use of the N-word?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Scholars distinguish between inter-group use (the slur directed from outsiders, carrying historical weight of dehumanization) and intra-group use (complex, variable meanings within African American communities, sometimes involving solidarity or reclamation). This distinction remains debated."
          }
        },
        {
          "@type": "Question",
          "name": "When did 'the N-word' euphemism emerge?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The euphemism 'the N-word' emerged in mainstream media during the 1980s as broadcasting standards evolved. By the 2000s, dictionaries added entries for 'the N-word' itself—a word referring to another word, acknowledging what could not be directly said in public discourse."
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: 'the-word-nigger',
  basePath: 'essays/etymology',
  title: 'The Weight of a Word: A History of the N-Word | Esy Visual Essay',
  description: 'Trace the etymology, history, and applied use of America\'s most charged word—from Latin \'niger\' through the slave trade, Jim Crow, Civil Rights, and contemporary debates. A documentary visual essay featuring archival photography.',
  ogTitle: 'The Weight of a Word: A History of the N-Word in America',
  ogDescription: 'How a Latin color term became infrastructure for dehumanization—and how people fought back. 400 years of etymology, history, and resistance.',
  keywords: [
    'N-word history',
    'etymology of racial slurs',
    'history of racist language',
    'Jim Crow',
    'Civil Rights movement',
    'Frederick Douglass',
    'James Baldwin',
    'Ida B. Wells',
    'W.E.B. Du Bois',
    'American history',
    'racial language',
    'Randall Kennedy',
    'linguistic history',
    'visual essay',
  ],
  publishedTime: '2025-12-26T00:00:00.000Z',
});

export default function TheWordNiggerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordNiggerClient />
      </ArtifactDetailWrapper>
    </>
  );
}

