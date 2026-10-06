import { Metadata } from 'next';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import OriginOfSexClient from './OriginOfSexClient';

const ESSAY_META = {
  title: 'The Word That Divided Everything',
  subtitle: 'An Etymology of Sex — 2,000 Years of Semantic Transformation',
  category: 'Etymology',
  readTime: '22 min',
  sourceCount: 14,
  sourceTier: 'Tier-1',
  sectionCount: 7,
  visualizationCount: 5,
  designSystem: 'Subject-derived',
  published: 'December 2025',
  model: 'Claude',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Latin Stone', color: '#8B8272' },
    { name: 'Scientific White', color: '#F8F8F8' },
    { name: 'Linnaeus Green', color: '#2D5A4A' },
    { name: 'Freud Burgundy', color: '#722F37' },
    { name: 'Modern Rose', color: '#9F1239' },
  ],
  visualizations: [
    { name: 'Etymology Chain', type: 'Animated Sequence' },
    { name: 'Semantic Evolution Timeline', type: 'Interactive Timeline' },
    { name: 'Era Typography Shifts', type: 'Visual Morphing' },
    { name: 'Scientific Classification', type: 'Diagram Display' },
    { name: 'Cultural Context Cards', type: 'Interactive Cards' },
  ],
  keySources: [
    "Oxford English Dictionary, 'sex' entry",
    'Carl Linnaeus, Systema Naturae (1735)',
    'Sigmund Freud, Three Essays on Sexuality (1905)',
    'D.H. Lawrence, Pansies (1929)',
    'Judith Butler, Gender Trouble (1990)',
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-origin-of-sex/#article",
      "headline": "The Word That Divided Everything: An Etymology of Sex",
      "alternativeHeadline": "2,000 Years of Semantic Transformation",
      "description": "From Latin 'secare' (to cut) to modern taboo—trace the 2,000-year journey of the word 'sex' through civilizations, science, and scandal. A visual essay on language and desire.",
      "url": "https://esy.com/essays/etymology/the-origin-of-sex/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-origin-of-sex.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Origin of Sex", "item": "https://esy.com/essays/etymology/the-origin-of-sex/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the etymology of the word 'sex'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word 'sex' comes from Latin 'sexus,' derived from 'secare' meaning 'to cut' or 'to divide.' Originally it referred to the division of organisms into male and female categories—a biological classification, not an act."
          }
        },
        {
          "@type": "Question",
          "name": "When did 'sex' start meaning intercourse?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word 'sex' didn't commonly mean sexual intercourse until the 20th century. D.H. Lawrence's 1929 poem first used 'sex' to mean the act itself. Before this, people used euphemisms or Latin medical terms."
          }
        },
        {
          "@type": "Question",
          "name": "How did Linnaeus use the word 'sex'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Carl Linnaeus used 'sex' purely scientifically in his 1735 classification system, categorizing plants by their reproductive organs. His 'sexual system' of botany scandalized some contemporaries who found it improper to discuss plant reproduction."
          }
        },
        {
          "@type": "Question",
          "name": "How did Freud change the meaning of 'sex'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sigmund Freud expanded 'sex' from biology to psychology, introducing concepts of sexuality, libido, and unconscious desire. His early 20th-century work made sex central to human psychology and gave the word its modern psychological dimensions."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between sex and gender?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Historically 'sex' and 'gender' were interchangeable. In the mid-20th century, scholars began distinguishing biological sex (physical characteristics) from gender (social and cultural roles). This distinction remains debated today."
          }
        },
        {
          "@type": "Question",
          "name": "Why did 'sex' become taboo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As 'sex' absorbed meanings related to intercourse and desire in the 20th century, it inherited the taboos surrounding those topics. Victorian euphemism gave way to explicit terminology, making the once-clinical word charged with modern anxieties."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Word That Divided Everything | An Etymology of Sex | Esy',
  description: 'From Latin "secare" (to cut) to modern taboo—trace the 2,000-year journey of the word "sex" through civilizations, science, and scandal. A visual essay on language and desire.',
  keywords: [
    'etymology',
    'word history',
    'sex etymology',
    'linguistics',
    'Latin origins',
    'Linnaeus',
    'Freud',
    'language evolution',
    'word meaning',
    'visual essay',
    'typography',
  ],
  openGraph: {
    title: 'The Word That Divided Everything: An Etymology of Sex',
    description: 'How a Latin word meaning "to divide" became the most charged word in the English language. 2,000 years of transformation.',
    type: 'article',
    url: 'https://esy.com/essays/etymology/the-origin-of-sex/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-origin-of-sex.png',
        width: 1200,
        height: 630,
        alt: 'SEX — In the beginning, there was division. A visual essay on the etymology of the word sex.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Word That Divided Everything | Visual Essay',
    description: 'The 2,000-year evolution of a single word—from sorting to scandal.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-origin-of-sex.png'],
  },
  alternates: {
    canonical: 'https://esy.com/essays/etymology/the-origin-of-sex/',
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function OriginOfSexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <OriginOfSexClient />
      </ArtifactDetailWrapper>
    </>
  );
}
