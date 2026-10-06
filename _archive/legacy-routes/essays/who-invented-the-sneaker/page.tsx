import type { Metadata } from 'next';
import SneakerHistoryClient from './SneakerHistoryClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/who-invented-the-sneaker/#article",
      "headline": "The History of the Sneaker: From Plimsolls to $75 Billion",
      "alternativeHeadline": "How a Rubber-Soled Shoe Designed for Silence Became a Cultural Force",
      "description": "How a rubber-soled shoe designed for silence became a $75 billion cultural force. From Charles Goodyear to Michael Jordan—the complete sneaker story.",
      "url": "https://esy.com/essays/who-invented-the-sneaker/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/who-invented-the-sneaker.png",
      "articleSection": "Fashion History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Who Invented the Sneaker", "item": "https://esy.com/essays/who-invented-the-sneaker/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented sneakers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sneakers evolved from multiple innovations. Charles Goodyear's 1839 vulcanized rubber made durable soles possible. The first rubber-soled shoes, called plimsolls, appeared in Britain in the 1830s. The Liverpool Rubber Company created the first mass-produced rubber-soled canvas shoes in the 1870s."
          }
        },
        {
          "@type": "Question",
          "name": "Why are they called sneakers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The term 'sneaker' emerged in the late 1800s because rubber soles were so quiet compared to hard leather soles—you could 'sneak' up on someone. In Britain they're still called 'trainers' or 'plimsolls.' The word 'sneaker' is primarily American English."
          }
        },
        {
          "@type": "Question",
          "name": "When did Air Jordans come out?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The first Air Jordan released in 1985, designed by Peter Moore for Nike and Michael Jordan. The NBA initially banned them for violating uniform rules, and Nike paid the $5,000 fine per game—turning controversy into marketing gold. The Air Jordan line has generated over $5 billion in revenue."
          }
        },
        {
          "@type": "Question",
          "name": "Why are sneakers so expensive now?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sneaker prices exploded due to artificial scarcity (limited releases), celebrity collaborations, resale markets, and sneakers becoming status symbols. A shoe that costs $15 to manufacture might retail for $200 and resell for thousands. Sneaker culture transformed footwear into collectible art."
          }
        },
        {
          "@type": "Question",
          "name": "What was Run-DMC's impact on sneaker culture?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Run-DMC's 1986 song 'My Adidas' was hip-hop's first sneaker anthem. They performed it at Madison Square Garden, holding up their Adidas Superstars while the crowd did the same. This led to a $1 million Adidas endorsement—the first non-athlete sneaker deal, merging music and footwear forever."
          }
        },
        {
          "@type": "Question",
          "name": "Who invented Converse Chuck Taylors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Converse introduced the All Star in 1917. Chuck Taylor, a basketball player and salesman, improved the design and promoted it so effectively that his name was added to the ankle patch in 1932. Chuck Taylors became the best-selling sneaker in history, with over 800 million pairs sold."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The History of the Sneaker: From Plimsolls to $75 Billion | Esy',
  description: 'How a rubber-soled shoe designed for silence became a $75 billion cultural force. From Charles Goodyear to Michael Jordan—the complete sneaker story.',
  keywords: [
    'sneaker history',
    'history of sneakers',
    'Air Jordan history',
    'Nike history',
    'Converse Chuck Taylor',
    'sneaker culture',
    'sneakerhead',
    'Run-DMC Adidas',
    'athletic footwear history'
  ],
  openGraph: {
    title: 'The Sneaker Story: From Plimsolls to Phenomenon',
    description: 'How a rubber-soled shoe designed for silence became a $75 billion cultural force that defines identity, status, and style.',
    type: 'article',
    url: 'https://esy.com/essays/who-invented-the-sneaker/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/who-invented-the-sneaker.png',
        width: 1200,
        height: 630,
        alt: 'The History of the Sneaker'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Sneaker Story',
    description: 'From Charles Goodyear to Michael Jordan—the complete sneaker history.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/who-invented-the-sneaker.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/who-invented-the-sneaker/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function SneakerHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SneakerHistoryClient />
    </>
  );
}
