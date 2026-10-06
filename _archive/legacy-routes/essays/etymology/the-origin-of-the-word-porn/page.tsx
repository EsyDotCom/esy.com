import type { Metadata } from 'next';
import ArtifactDetailWrapper from '@/components/ArtifactDetail';
import OriginOfPornClient from './OriginOfPornClient';

const ESSAY_META = {
  title: 'Πόρνη: The Etymology of a Forbidden Word',
  subtitle: 'From Ancient Greek Slave Markets to Modern Digital Discourse',
  category: 'Etymology',
  readTime: '22 min',
  sourceCount: 14,
  sourceTier: 'Tier-1',
  sectionCount: 6,
  visualizationCount: 5,
  designSystem: 'Subject-derived',
  published: 'December 2025',
  model: 'Claude',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Greek Marble', color: '#E8E0D0' },
    { name: 'Attic Red', color: '#A0522D' },
    { name: 'Victorian Black', color: '#1A1A1A' },
    { name: 'Pompeii Terracotta', color: '#CC5500' },
    { name: 'Digital Grey', color: '#4A5568' },
  ],
  visualizations: [
    { name: 'Etymology Chain', type: 'Animated Sequence' },
    { name: 'Historical Timeline', type: 'Interactive Timeline' },
    { name: 'Era Typography Shifts', type: 'Visual Morphing' },
    { name: 'Legal Milestones', type: 'Interactive Cards' },
    { name: 'Semantic Evolution', type: 'Gradual Reveals' },
  ],
  keySources: [
    "Oxford English Dictionary, 'pornography' entry",
    'Ancient Greek lexicons',
    'Pompeii archaeological records (1850s)',
    'Miller v. California (1973)',
    'Walter Kendrick, The Secret Museum',
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-origin-of-the-word-porn/#article",
      "headline": "Πόρνη: The Etymology of a Forbidden Word",
      "alternativeHeadline": "From Ancient Greek Slave Markets to Modern Digital Discourse",
      "description": "From ancient Greek slave markets to modern digital discourse—trace the 2,500-year journey of a word that society couldn't stop using or openly discuss.",
      "url": "https://esy.com/essays/etymology/the-origin-of-the-word-porn/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-origin-of-the-word-porn.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Origin of the Word Porn", "item": "https://esy.com/essays/etymology/the-origin-of-the-word-porn/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the origin of the word 'pornography'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word 'pornography' derives from the ancient Greek 'pornographos' (πορνογράφος), meaning 'writing about prostitutes.' It combines 'porne' (πόρνη), meaning prostitute, with 'graphein' (γράφειν), meaning to write or describe."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'porne' mean in ancient Greek?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Greek word 'porne' (πόρνη) literally means 'bought woman' or 'one who is sold.' It derives from the verb 'pernemi' meaning 'to sell,' particularly associated with the slave trade in ancient Greek society."
          }
        },
        {
          "@type": "Question",
          "name": "When did 'pornography' enter the English language?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word 'pornography' entered English in the 1850s, initially as a scholarly term used by archaeologists describing erotic artifacts from Pompeii. It gained broader usage during Victorian-era debates about obscenity and censorship."
          }
        },
        {
          "@type": "Question",
          "name": "How has the meaning of pornography evolved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Originally a clinical term for ancient erotica, 'pornography' evolved through Victorian moral panic, 20th-century legal battles over obscenity, and the digital revolution to become one of the most searched terms on the internet—a journey from academic archives to algorithmic feeds."
          }
        },
        {
          "@type": "Question",
          "name": "Why is pornography called a 'forbidden word'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Despite being one of the most commonly searched terms online, 'pornography' remains socially taboo to discuss openly. This paradox—ubiquitous yet unspeakable—has characterized the word throughout its 2,500-year history."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'Πόρνη: The Etymology of a Forbidden Word | Esy',
  description: 'From ancient Greek slave markets to modern digital discourse—trace the 2,500-year journey of a word that society couldn\'t stop using or openly discuss.',
  keywords: [
    'etymology',
    'word origin',
    'pornography history',
    'Greek language',
    'linguistic history',
    'cultural history',
    'Victorian era',
    'word evolution',
    'visual essay',
  ],
  openGraph: {
    title: 'Πόρνη: The Etymology of a Forbidden Word',
    description: 'From ancient Greek slave markets to modern discourse—the linguistic journey of a word that shaped cultural taboos.',
    type: 'article',
    url: 'https://esy.com/essays/etymology/the-origin-of-the-word-porn/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-origin-of-the-word-porn.png',
        width: 1200,
        height: 630,
        alt: 'The Origin of the Word Porn - A Visual Essay on Etymology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Πόρνη: Etymology of a Forbidden Word | Visual Essay',
    description: 'The 2,500-year journey of a word society couldn\'t stop using or openly discuss.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-origin-of-the-word-porn.png'],
  },
  alternates: {
    canonical: 'https://esy.com/essays/etymology/the-origin-of-the-word-porn/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function OriginOfPornPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <OriginOfPornClient />
      </ArtifactDetailWrapper>
    </>
  );
}
