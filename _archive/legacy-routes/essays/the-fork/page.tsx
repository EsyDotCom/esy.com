import { Metadata } from 'next';
import TheForkClient from './TheForkClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-fork/#article",
      "headline": "The Distance Between: A History of the Fork",
      "alternativeHeadline": "2,000 Years of the Utensil That Measured Civilization",
      "description": "The fork was once condemned as satanic vanity. Now it's invisible. An immersive photorealistic journey through 2,000 years of the utensil that measured civilization itself.",
      "url": "https://esy.com/essays/the-fork/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-fork.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Fork", "item": "https://esy.com/essays/the-fork/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When was the fork invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Two-pronged forks for cooking date back to ancient Egypt and Rome. The table fork for eating was developed in the Byzantine Empire around the 4th century, but didn't reach Western Europe until the 11th century and wasn't widely adopted until the 17th-18th centuries."
          }
        },
        {
          "@type": "Question",
          "name": "Why was the fork considered sinful?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Medieval European clergy condemned forks as excessive vanity and an insult to God. When Byzantine princess Maria Argyropoulina used a golden fork in Venice in 1004, church officials declared her death shortly after was divine punishment for her 'sinful' eating habits."
          }
        },
        {
          "@type": "Question",
          "name": "Who brought the fork to England?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Thomas Coryat introduced fork-eating to England in 1608 after traveling through Italy. He was mocked as 'Furcifer' (fork-bearer) and his adoption was considered effeminate and ridiculous by English society, which ate with knives and fingers."
          }
        },
        {
          "@type": "Question",
          "name": "Why do forks have four tines?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Early forks had two tines like pitchforks. Three-tined forks emerged in the 18th century for better food stability. Four tines became standard in the 19th century, offering the ideal balance between spearing food and scooping it without dropping."
          }
        },
        {
          "@type": "Question",
          "name": "Which side does the fork go on?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In European and American formal dining, the fork goes on the left side of the plate. This convention developed because right-handed diners hold their knife in the right hand for cutting. Forks are placed in order of use, from outside in."
          }
        },
        {
          "@type": "Question",
          "name": "When did forks become common in America?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Forks became widespread in America during the mid-1800s. Before then, most Americans ate with knives and spoons. The fork's adoption coincided with industrialization making cutlery affordable and Victorian-era emphasis on refined table manners."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Distance Between | A History of the Fork | Esy',
  description: 'The fork was once condemned as satanic vanity. Now it\'s invisible. An immersive photorealistic journey through 2,000 years of the utensil that measured civilization itself.',
  keywords: [
    'fork history',
    'eating utensils',
    'Byzantine Empire',
    'Catherine de Medici',
    'Thomas Coryat',
    'dining etiquette',
    'cultural history',
    'material culture',
    'visual essay',
    'photorealistic',
  ],
  openGraph: {
    title: 'The Distance Between: A History of the Fork',
    description: 'The fork was once condemned as satanic vanity. Now it\'s invisible. 2,000 years of civilization on a prong.',
    type: 'article',
    url: 'https://esy.com/essays/the-fork/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-fork.png',
        width: 1200,
        height: 630,
        alt: 'The Distance Between - A Visual Essay on the History of the Fork',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Distance Between | Visual Essay',
    description: 'The fork was once condemned as satanic vanity. Now it\'s invisible.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-fork.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-fork/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheForkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheForkClient />
    </>
  );
}
