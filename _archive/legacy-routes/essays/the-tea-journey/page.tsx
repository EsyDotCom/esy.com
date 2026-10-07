import type { Metadata } from 'next';
import TeaJourneyClient from './TeaJourneyClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-tea-journey/#article",
      "headline": "Leaves of Time: The Global Journey of Tea",
      "alternativeHeadline": "5,000 Years of Tea History—From Wild Mountain Leaves to World Dominance",
      "description": "An immersive journey through 5,000 years of tea history—from wild mountain leaves in ancient China to the world's most consumed beverage after water. Discover how a simple leaf shaped empires, sparked revolutions, and connected cultures across continents.",
      "url": "https://esy.com/essays/the-tea-journey/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-tea-journey.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Tea Journey", "item": "https://esy.com/essays/the-tea-journey/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where does tea come from originally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tea originated in southwest China, in the mountainous regions where wild tea trees (Camellia sinensis) still grow. Legend credits Emperor Shen Nung with discovering tea around 2737 BCE when leaves blew into his boiling water. Historical evidence confirms tea cultivation in Yunnan province for at least 5,000 years."
          }
        },
        {
          "@type": "Question",
          "name": "What caused the Boston Tea Party?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Boston Tea Party (1773) was a protest against British taxation without representation. The Tea Act gave the British East India Company a monopoly on tea sales in America. Colonists dumped 342 chests of tea into Boston Harbor—a pivotal event leading to the American Revolution."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Japanese tea ceremony?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Japanese tea ceremony (chanoyu) is a ritualized practice of preparing and serving matcha (powdered green tea). Developed by Sen no Rikyū in the 16th century, it embodies Zen Buddhist principles of harmony, respect, purity, and tranquility. Each movement is deliberate and meaningful."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between green and black tea?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All true teas come from the same plant, Camellia sinensis. The difference is processing: green tea leaves are quickly heated to prevent oxidation, preserving their color. Black tea leaves are fully oxidized, turning dark. Oolong is partially oxidized—between green and black."
          }
        },
        {
          "@type": "Question",
          "name": "How did tea change British culture?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tea transformed British society from the 1700s onward. It created afternoon tea rituals, influenced pottery (fine china), shaped trade policy (Opium Wars), and even affected architecture (tea rooms). British tea consumption drove colonial expansion into India and Ceylon (Sri Lanka)."
          }
        },
        {
          "@type": "Question",
          "name": "What is chai tea?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "'Chai' simply means 'tea' in Hindi—so 'chai tea' is redundant. Masala chai is spiced tea made with black tea, milk, and spices like cardamom, cinnamon, ginger, and cloves. It originated in India and became popular worldwide through coffee shop chains in the 1990s."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'Leaves of Time: The Global Journey of Tea | Esy',
  description: 'An immersive journey through 5,000 years of tea history—from wild mountain leaves in ancient China to the world\'s most consumed beverage after water. Discover how a simple leaf shaped empires, sparked revolutions, and connected cultures across continents.',
  keywords: [
    'history of tea',
    'tea origins',
    'Chinese tea',
    'Japanese tea ceremony',
    'matcha history',
    'British tea culture',
    'Boston Tea Party',
    'Silk Road tea trade',
    'Assam tea',
    'Darjeeling',
    'Ceylon tea',
    'oolong',
    'pu-erh',
    'Camellia sinensis',
    'tea ceremony',
    'chai',
    'scrollytelling'
  ],
  openGraph: {
    title: 'Leaves of Time: The Global Journey of Tea | Esy',
    description: 'From wild mountain leaves to world dominance—5,000 years of tea history in one immersive journey.',
    type: 'article',
    url: 'https://esy.com/essays/the-tea-journey/',
    locale: 'en_US',
    siteName: 'Esy',
    images: [
      {
        url: 'https://esy.com/og/the-tea-journey.png',
        width: 1200,
        height: 630,
        alt: 'Leaves of Time - The Global Journey of Tea'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leaves of Time: The Global Journey of Tea',
    description: 'One leaf. Five millennia. Every culture on Earth.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-tea-journey.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-tea-journey/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TeaJourneyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TeaJourneyClient />
    </>
  );
}
