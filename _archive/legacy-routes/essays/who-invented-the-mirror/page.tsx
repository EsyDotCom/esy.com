import type { Metadata } from 'next';
import MirrorHistoryClient from './MirrorHistoryClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/who-invented-the-mirror/#article",
      "headline": "The History of the Mirror: 8,000 Years of Reflection",
      "alternativeHeadline": "From Polished Obsidian to Smart Mirrors—Humanity's Quest to See Itself",
      "description": "From polished obsidian to smart mirrors—humanity's eternal quest to see itself. Discover the fascinating 8,000-year history of the mirror.",
      "url": "https://esy.com/essays/who-invented-the-mirror/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/who-invented-the-mirror.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Who Invented the Mirror", "item": "https://esy.com/essays/who-invented-the-mirror/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the mirror?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The first mirrors were polished obsidian stone, used in Anatolia (modern Turkey) around 6000 BCE. Metal mirrors appeared in Mesopotamia and Egypt around 4000 BCE. The modern silvered glass mirror was invented by German chemist Justus von Liebig in 1835 using a silver nitrate process."
          }
        },
        {
          "@type": "Question",
          "name": "Why were Venetian mirrors so valuable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Venetian glassmakers on the island of Murano perfected clear glass mirrors in the 16th century. Venice guarded this technology so fiercely that mirror makers faced death for revealing secrets. A single Venetian mirror could cost more than a ship. France eventually smuggled out workers to break the monopoly."
          }
        },
        {
          "@type": "Question",
          "name": "What were mirrors made of before glass?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Before glass mirrors, people used polished obsidian (volcanic glass), then polished copper, bronze, silver, and gold. These metal mirrors gave distorted, dim reflections compared to modern glass. The wealthy used polished silver; common people used still water or polished bronze."
          }
        },
        {
          "@type": "Question",
          "name": "Where does the superstition about breaking mirrors come from?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The '7 years bad luck' superstition comes from ancient Rome, where mirrors were believed to reflect the soul. Romans believed the soul regenerated every 7 years. Breaking a mirror meant damaging your soul until it could repair itself. The superstition persisted because mirrors were extremely expensive."
          }
        },
        {
          "@type": "Question",
          "name": "How did Justus von Liebig change mirrors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In 1835, German chemist Justus von Liebig developed the silver nitrate process for coating glass with a thin, even layer of metallic silver. This made mirrors cheaper, clearer, and more widely available. Before Liebig, mirrors used mercury-tin amalgam, which was toxic and produced inferior reflections."
          }
        },
        {
          "@type": "Question",
          "name": "How do modern mirrors work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Modern mirrors use glass coated with a thin layer of aluminum or silver on the back. Light passes through the glass, bounces off the metal coating, and returns through the glass. The glass protects the metal from oxidation. Aluminum is now more common than silver due to cost and durability."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The History of the Mirror: 8,000 Years of Reflection | Esy',
  description: 'From polished obsidian to smart mirrors—humanity\'s eternal quest to see itself. Discover the fascinating 8,000-year history of the mirror.',
  keywords: [
    'history of mirrors',
    'mirror invention',
    'Venetian mirrors',
    'obsidian mirrors',
    'Justus von Liebig',
    'silvered glass',
    'reflection history',
    'mirror technology'
  ],
  openGraph: {
    title: 'The Mirror: 8,000 Years of Reflection',
    description: 'From polished obsidian to the screen in your pocket—humanity\'s eternal quest to see itself.',
    type: 'article',
    url: 'https://esy.com/essays/who-invented-the-mirror/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/who-invented-the-mirror.png',
        width: 1200,
        height: 630,
        alt: 'The History of the Mirror'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Mirror',
    description: '8,000 years of humanity asking: Who is that looking back?',
    site: '@EsyResearch',
    images: ['https://esy.com/og/who-invented-the-mirror.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/who-invented-the-mirror/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function MirrorHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MirrorHistoryClient />
    </>
  );
}
