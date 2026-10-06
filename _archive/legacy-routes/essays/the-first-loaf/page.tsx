import type { Metadata } from 'next';
import OriginOfBreadClient from './OriginOfBreadClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-first-loaf/#article",
      "headline": "The Origin of Bread: A Cinematic History of Humanity's First Food",
      "alternativeHeadline": "30,000 Years of Grain, Fermentation, and Civilization",
      "description": "A mythic and scientific journey through 30,000 years. Grain falls through darkness, landing on stone. Civilization begins when hunger meets imagination.",
      "url": "https://esy.com/essays/the-first-loaf/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-first-loaf.png",
      "articleSection": "Food History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The First Loaf", "item": "https://esy.com/essays/the-first-loaf/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When was bread invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The earliest bread-like foods date to around 30,000 years ago—flatbreads made from ground wild grains. Leavened (risen) bread emerged around 4000-3000 BCE in ancient Egypt, likely when wild yeast accidentally fermented dough. Bread predates the wheel and written language."
          }
        },
        {
          "@type": "Question",
          "name": "How did ancient people discover fermentation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fermentation was discovered by accident. Wild yeast from the air or unwashed hands fell into wet grain dough. When left sitting, the dough rose as yeast ate sugars and produced carbon dioxide. Ancient Egyptians learned to save and reuse this 'magic' starter dough."
          }
        },
        {
          "@type": "Question",
          "name": "What were the first grains used for bread?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The earliest breads used wild grains like einkorn, emmer wheat, and barley. These ancient grains were gathered before agriculture. By 10,000 BCE, humans in the Fertile Crescent began deliberately cultivating wheat—one of the defining moments that sparked the Agricultural Revolution."
          }
        },
        {
          "@type": "Question",
          "name": "How did bread change human civilization?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bread enabled settlement and civilization. Grain could be stored year-round, ending the nomadic hunter-gatherer life. Cities formed around grain storage. Bread became currency, religious offering, and the foundation of class systems (white bread for nobles, dark bread for peasants)."
          }
        },
        {
          "@type": "Question",
          "name": "What is sourdough bread?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sourdough is the original leavened bread, made with wild yeast and lactobacillus bacteria instead of commercial yeast. The 'starter' is a living culture of microorganisms that ferments dough slowly. Some sourdough starters have been maintained for over 100 years, passed down through generations."
          }
        },
        {
          "@type": "Question",
          "name": "Why did ancient Egyptians worship bread?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Egyptians saw bread-making as divine transformation—dead grain becoming living, risen dough. Bread was offered to gods, placed in tombs for the afterlife, and used as wages for pyramid workers. The hieroglyph for bread also meant 'life.' Egyptian priests developed over 40 bread varieties."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Origin of Bread: A Cinematic History of Humanity\'s First Food | Esy',
  description: 'A mythic and scientific journey through 30,000 years. Grain falls through darkness, landing on stone. Civilization begins when hunger meets imagination.',
  keywords: [
    'bread history',
    'origin of bread',
    'ancient grains',
    'einkorn',
    'emmer',
    'fermentation discovery',
    'neolithic food',
    'first bread',
    'wild yeast',
    'saccharomyces',
    'culinary anthropology',
    'food history'
  ],
  openGraph: {
    title: 'The Origin of Bread: A Cinematic History',
    description: 'Grain falls through darkness. Civilization begins when hunger meets imagination.',
    type: 'article',
    url: 'https://esy.com/essays/the-first-loaf/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-first-loaf.png',
        width: 1200,
        height: 630,
        alt: 'The Origin of Bread - A Cinematic History'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Origin of Bread',
    description: 'A mythic journey through 30,000 years of humanity\'s first food.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-first-loaf.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-first-loaf/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function OriginOfBreadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OriginOfBreadClient />
    </>
  );
}
