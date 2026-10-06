import type { Metadata } from 'next';
import TeaJourneyIllustratedClient from './TeaJourneyIllustratedClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-tea-journey-illustrated/#article",
      "headline": "Leaves of Time: The Global Journey of Tea",
      "alternativeHeadline": "5,000 Years of Tea History — Illustrated Edition",
      "description": "An award-winning illustrated journey through 5,000 years of tea history—from wild mountain leaves in ancient China to the world's most consumed beverage after water. Featuring stunning SVG illustrations, animated trade routes, and interactive ceremonies.",
      "url": "https://esy.com/essays/the-tea-journey-illustrated/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-tea-journey-illustrated.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Leaves of Time: The Tea Journey", "item": "https://esy.com/essays/the-tea-journey-illustrated/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where did tea originate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tea originated in the misty mountains of southwestern China, likely in Yunnan province, around 3000 BCE. Legend credits Emperor Shen Nung with discovering tea in 2737 BCE when leaves blew into his boiling water. Wild tea trees still grow in these ancient forests."
          }
        },
        {
          "@type": "Question",
          "name": "How did tea spread from China to the world?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tea spread via ancient trade routes: to Japan through Buddhist monks (9th century), to Central Asia via the Silk Road, and to Europe through Portuguese and Dutch traders (16th-17th centuries). The British later established tea plantations in India and Ceylon to break China's monopoly."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Japanese tea ceremony?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Japanese tea ceremony (chanoyu or sadō) is a meditative practice centered on preparing and serving matcha. Developed by Sen no Rikyū in the 16th century, it embodies the principles of harmony (wa), respect (kei), purity (sei), and tranquility (jaku)."
          }
        },
        {
          "@type": "Question",
          "name": "How did tea influence British culture?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tea transformed British society from the 17th century onward. It sparked the Boston Tea Party, drove the Opium Wars with China, established plantation economies in India, and created the enduring tradition of afternoon tea introduced by the Duchess of Bedford in 1840."
          }
        },
        {
          "@type": "Question",
          "name": "What are the main types of tea?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All true tea comes from Camellia sinensis but processing creates distinct types: green tea (unoxidized), white tea (minimal processing), oolong (partially oxidized), black tea (fully oxidized), and pu-erh (fermented). Each region—Darjeeling, Assam, Ceylon, Fujian—produces unique expressions."
          }
        },
        {
          "@type": "Question",
          "name": "Why is tea the second most consumed beverage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tea's global dominance (second only to water) stems from its versatility, health benefits, and cultural significance. From Chinese gongfu to British high tea, Indian chai to Moroccan mint, tea adapts to every culture while maintaining its essential character—hot water transforming a single leaf."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'Leaves of Time: The Global Journey of Tea (Illustrated Edition) | Esy',
  description: 'An award-winning illustrated journey through 5,000 years of tea history—from wild mountain leaves in ancient China to the world\'s most consumed beverage after water. Featuring stunning SVG illustrations, animated trade routes, and interactive ceremonies.',
  keywords: [
    'history of tea',
    'tea origins',
    'Chinese tea illustration',
    'Japanese tea ceremony',
    'matcha history',
    'British tea culture',
    'tea trade routes',
    'Silk Road tea',
    'Assam tea',
    'Darjeeling',
    'Ceylon tea',
    'oolong',
    'pu-erh',
    'Camellia sinensis',
    'tea ceremony illustration',
    'chai history',
    'scrollytelling',
    'illustrated essay',
    'interactive story'
  ],
  openGraph: {
    title: 'Leaves of Time: The Global Journey of Tea (Illustrated Edition)',
    description: 'Stunning SVG illustrations trace 5,000 years of tea history across continents—animated trade routes, ceremonial traditions, and the empires built on a single leaf.',
    type: 'article',
    url: 'https://esy.com/essays/the-tea-journey-illustrated/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-tea-journey-illustrated.png',
        width: 1200,
        height: 630,
        alt: 'Leaves of Time: The Global Journey of Tea - Illustrated Edition'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leaves of Time: The Global Journey of Tea',
    description: 'One leaf. Five millennia. Every culture on Earth. An illustrated journey.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-tea-journey-illustrated.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-tea-journey-illustrated/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TeaJourneyIllustratedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TeaJourneyIllustratedClient />
    </>
  );
}
