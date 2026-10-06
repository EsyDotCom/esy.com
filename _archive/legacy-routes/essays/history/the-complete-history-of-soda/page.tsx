import type { Metadata } from 'next'
import ArtifactDetailWrapper from '@/components/ArtifactDetail'
import SodaHistoryClient from './SodaHistoryClient'

const ESSAY_META = {
  title: 'The Complete History of Soda',
  subtitle: 'From Scientific Discovery to Global Cultural Phenomenon',
  category: 'History',
  readTime: '30 min',
  sourceCount: 27,
  sourceTier: 'Tier-1',
  sectionCount: 7,
  visualizationCount: 6,
  designSystem: 'Subject-derived',
  published: 'January 2026',
  model: 'Claude',
  template: 'Visual Essay',
  backLink: '/essays',
  backLabel: 'Essays',
  palette: [
    { name: 'Copper Flame', color: '#B87333' },
    { name: 'Georgian Green', color: '#2D5A4A' },
    { name: 'Apothecary Gold', color: '#C5A04F' },
    { name: 'Chrome Silver', color: '#7B8B8C' },
    { name: 'Olive Drab', color: '#556B2F' },
    { name: 'Cola Red', color: '#8B0000' },
    { name: 'Pepsi Blue', color: '#1E3A8A' },
  ],
  visualizations: [
    { name: 'Era Progress Bar', type: 'Scroll-driven Indicator' },
    { name: 'Archive Drawer Reveals', type: 'Scroll Animation' },
    { name: 'Ledger Counters', type: 'Animated Numerics' },
    { name: 'Archive Timeline', type: 'Interactive Timeline' },
    { name: 'Key Figures Gallery', type: 'Portrait Cards' },
    { name: 'Era Crossfade', type: 'Color Transitions' },
  ],
  keySources: [
    'Priestley, Impregnating Water with Fixed Air (1772)',
    'Mark Pendergrast, For God, Country and Coca-Cola',
    'Library of Congress, Prints & Photographs Division',
    'National Museum of American History',
    'Donovan, Fizz: How Soda Shook Up the World',
    'Frederick Allen, Secret Formula',
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/the-complete-history-of-soda/#article",
      "headline": "The Complete History of Soda: From Scientific Discovery to Global Cultural Phenomenon",
      "alternativeHeadline": "How a Brewery Accident Became a $400 Billion Industry",
      "description": "Trace 260 years of carbonated history from Joseph Priestley's 1767 brewery experiment to 1.9 billion daily servings. The complete story of Coca-Cola, Pepsi, the Cola Wars, and how bubbles conquered the world.",
      "url": "https://esy.com/essays/history/the-complete-history-of-soda/",
      "datePublished": "2026-01-01",
      "dateModified": "2026-01-01",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-complete-history-of-soda.png",
      "articleSection": "History",
      "inLanguage": "en-US",
      "about": [
        { "@type": "Thing", "name": "Carbonated water" },
        { "@type": "Thing", "name": "Soft drinks" },
        { "@type": "Thing", "name": "Coca-Cola" },
        { "@type": "Thing", "name": "PepsiCo" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Complete History of Soda", "item": "https://esy.com/essays/history/the-complete-history-of-soda/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented carbonated water?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Joseph Priestley invented carbonated water in 1767 when he discovered how to infuse water with carbon dioxide by suspending a bowl of water over a beer vat at a brewery in Leeds, England. He published his method in 1772 and called the result 'an exceedingly pleasant sparkling water.'"
          }
        },
        {
          "@type": "Question",
          "name": "Who commercialized soda water?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Johann Jacob Schweppe, a German-Swiss watchmaker, commercialized carbonated water in 1783 when he founded Schweppes in Geneva. He patented a commercial carbonation process and later expanded to London in 1792, establishing the factory at 141 Drury Lane."
          }
        },
        {
          "@type": "Question",
          "name": "When was Coca-Cola invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Coca-Cola was invented on May 8, 1886, by John Stith Pemberton, an Atlanta pharmacist. It was first sold at Jacobs' Pharmacy for 5 cents per glass. Pemberton's partner Frank Robinson suggested the name and designed the famous script logo."
          }
        },
        {
          "@type": "Question",
          "name": "What was New Coke?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "New Coke was a reformulated version of Coca-Cola launched on April 23, 1985. After 200,000 taste tests showed consumers preferred the sweeter formula, the company changed its century-old recipe. Consumer backlash was immediate—1,500 calls per day flooded the hotline. Coca-Cola Classic returned just 79 days later on July 11, 1985."
          }
        },
        {
          "@type": "Question",
          "name": "How big is the global soft drink industry?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The global soft drink market is estimated at $450-630 billion. Coca-Cola alone serves 1.9 billion beverages daily across 200+ countries. Only North Korea and Cuba do not have official Coca-Cola distribution."
          }
        },
        {
          "@type": "Question",
          "name": "Why did Coca-Cola cost 5 cents for 70 years?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Coca-Cola maintained a 5-cent price from 1886 to 1959 due to three factors: bottling contracts that fixed syrup prices, vending machines designed only for nickels (85% of 460,000 US machines by 1950), and advertising that promised 'As always, five cents.' The company even asked the Treasury to mint a 7.5-cent coin in 1953."
          }
        }
      ]
    },
    {
      "@type": "ItemList",
      "name": "Key Figures in Soda History",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "Person", "name": "Joseph Priestley", "description": "Discovered carbonation in 1767" } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "Person", "name": "Johann Jacob Schweppe", "description": "Commercialized soda water in 1783" } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "Person", "name": "John Stith Pemberton", "description": "Invented Coca-Cola in 1886" } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "Person", "name": "Asa Griggs Candler", "description": "Built Coca-Cola into an empire" } },
        { "@type": "ListItem", "position": 5, "item": { "@type": "Person", "name": "Caleb Bradham", "description": "Created Pepsi-Cola in 1893" } },
        { "@type": "ListItem", "position": 6, "item": { "@type": "Person", "name": "Robert W. Woodruff", "description": "Led Coca-Cola's global expansion" } },
        { "@type": "ListItem", "position": 7, "item": { "@type": "Person", "name": "Roberto Goizueta", "description": "Made the New Coke decision" } }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Complete History of Soda | From 1767 to 1.9 Billion Daily Servings | Esy',
  description: 'Discover how Joseph Priestley\'s 1767 brewery experiment became the world\'s most ubiquitous drink. A visual journey through 260 years of carbonated water, pharmacist inventors, marketing genius, and global dominance.',
  keywords: [
    'history of soda',
    'carbonated water history',
    'Coca-Cola history',
    'Pepsi history',
    'Joseph Priestley carbonation',
    'Johann Jacob Schweppe',
    'John Pemberton',
    'soda fountain history',
    'Cola Wars',
    'New Coke',
    'soft drink origins',
    'Robert Woodruff',
    'Asa Candler'
  ],
  openGraph: {
    title: 'The Complete History of Soda: From Scientific Discovery to Global Phenomenon',
    description: 'How a brewery accident became a $400 billion industry. 260 years of carbonated history from Joseph Priestley to 1.9 billion daily servings.',
    type: 'article',
    url: 'https://esy.com/essays/history/the-complete-history-of-soda/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-complete-history-of-soda.png',
        width: 1200,
        height: 630,
        alt: 'The Complete History of Soda'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Complete History of Soda',
    description: 'From Joseph Priestley\'s 1767 discovery to 1.9 billion daily servings—the complete carbonated story.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-complete-history-of-soda.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/history/the-complete-history-of-soda/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheCompleteHistoryOfSodaPage() {
  return (
    <>
      {/* Preconnect to image CDN for faster image loading */}
      <link rel="preconnect" href="https://images.esy.com" />
      <link rel="dns-prefetch" href="https://images.esy.com" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <SodaHistoryClient />
      </ArtifactDetailWrapper>
    </>
  );
}
