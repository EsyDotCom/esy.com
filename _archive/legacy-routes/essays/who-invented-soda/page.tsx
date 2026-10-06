import type { Metadata } from 'next';
import SodaHistoryClient from './SodaHistoryClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/who-invented-soda/#article",
      "headline": "The Origins of Soda: From Pharmacy to Phenomenon",
      "alternativeHeadline": "How Carbonated Water Became Humanity's Favorite Way to Celebrate",
      "description": "How carbonated water became humanity's favorite way to celebrate, refresh, and rebel. From Joseph Priestley's 1767 discovery to the Cola Wars—the complete fizzy history.",
      "url": "https://esy.com/essays/who-invented-soda/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/who-invented-soda.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Who Invented Soda", "item": "https://esy.com/essays/who-invented-soda/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented soda?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Joseph Priestley invented carbonated water in 1767 when he discovered how to infuse water with carbon dioxide by suspending a bowl of water over a beer vat at a brewery in Leeds, England. Johann Jacob Schweppe commercialized the process in 1783, founding Schweppes."
          }
        },
        {
          "@type": "Question",
          "name": "Why was soda originally sold in pharmacies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Early carbonated water was believed to have medicinal properties, mimicking natural mineral springs. Pharmacies sold 'soda water' as a health tonic. Pharmacists added flavored syrups to make medicine more palatable—leading to drinks like Coca-Cola (originally a patent medicine containing coca leaf extract)."
          }
        },
        {
          "@type": "Question",
          "name": "What were the Cola Wars?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Cola Wars were the intense marketing rivalry between Coca-Cola and Pepsi from the 1980s onward. Pepsi's 'Pepsi Challenge' blind taste tests and youth-focused marketing challenged Coca-Cola's dominance. This competition included celebrity endorsements, Super Bowl ads, and the infamous 'New Coke' disaster of 1985."
          }
        },
        {
          "@type": "Question",
          "name": "Who invented Coca-Cola?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "John Pemberton, an Atlanta pharmacist, invented Coca-Cola in 1886. Originally marketed as a patent medicine for headaches and fatigue, it contained coca leaf extract (source of cocaine) and kola nuts (caffeine). Asa Candler bought the formula for $2,300 and built it into a global empire."
          }
        },
        {
          "@type": "Question",
          "name": "When were soda fountains popular?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soda fountains peaked in popularity from the 1880s through the 1960s. These ornate marble and brass fixtures were social gathering places in drugstores across America. The rise of bottled sodas and fast-food restaurants led to their decline, though some retro fountains survive today."
          }
        },
        {
          "@type": "Question",
          "name": "What is the most popular soda in the world?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Coca-Cola is the world's most popular soda, sold in over 200 countries. The brand is so ubiquitous that 'Coke' became synonymous with soda in many regions. Pepsi, Sprite, and Dr Pepper round out the global top sellers. The industry is worth over $400 billion annually."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Origins of Soda: From Pharmacy to Phenomenon | Esy',
  description: 'How carbonated water became humanity\'s favorite way to celebrate, refresh, and rebel. From Joseph Priestley\'s 1767 discovery to the Cola Wars—the complete fizzy history.',
  keywords: [
    'history of soda',
    'carbonated beverages history',
    'Coca-Cola history',
    'Pepsi history',
    'Joseph Priestley carbonation',
    'soda fountain history',
    'soft drink origins',
    'Cola Wars'
  ],
  openGraph: {
    title: 'The Origins of Soda: From Pharmacy to Phenomenon',
    description: 'How carbonated water became humanity\'s favorite way to celebrate, refresh, and rebel—one bubble at a time.',
    type: 'article',
    url: 'https://esy.com/essays/who-invented-soda/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/who-invented-soda.png',
        width: 1200,
        height: 630,
        alt: 'The Origins of Soda'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Origins of Soda',
    description: 'From Joseph Priestley to the Cola Wars—the complete fizzy history.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/who-invented-soda.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/who-invented-soda/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function SodaHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SodaHistoryClient />
    </>
  );
}
