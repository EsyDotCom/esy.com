import type { Metadata } from 'next';
import CocoaOdysseyClient from './CocoaOdysseyClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-cocoa-odyssey/#article",
      "headline": "The Cocoa Odyssey: From Ancient Ritual to Global Chocolate Empire",
      "alternativeHeadline": "4,000 Years of Chocolate History—From Sacred Mesoamerican Drink to Billion-Dollar Industry",
      "description": "An immersive journey through 4,000 years of cocoa history—from Mesoamerican sacred rituals to the multi-billion dollar chocolate empires of today. Explore botanical origins, colonial transformation, and modern industry.",
      "url": "https://esy.com/essays/the-cocoa-odyssey/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-cocoa-odyssey.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Cocoa Odyssey", "item": "https://esy.com/essays/the-cocoa-odyssey/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where does cocoa come from originally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cocoa (Theobroma cacao, meaning 'food of the gods') originated in the Amazon basin of South America around 5,300 years ago. The Olmec, Maya, and Aztec civilizations cultivated cacao in Mesoamerica, using it for sacred rituals, currency, and a bitter ceremonial drink called 'xocolatl.'"
          }
        },
        {
          "@type": "Question",
          "name": "Did the Aztecs really use cocoa as money?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, cacao beans were currency in Mesoamerica. The Aztec empire collected cacao as tribute, and prices were standardized: a turkey cost 100 beans, a tomato cost 1 bean. Counterfeiting existed—people filled empty bean shells with mud. Cacao remained currency in parts of Mexico until the 1840s."
          }
        },
        {
          "@type": "Question",
          "name": "Who invented milk chocolate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Daniel Peter, a Swiss chocolatier, invented milk chocolate in 1875 after 8 years of experimentation. His neighbor Henri Nestlé had invented condensed milk, which Peter used to solve the problem of mixing milk and cocoa. Their partnership created the Nestlé chocolate empire."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between cacao and cocoa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cacao refers to the raw bean and tree. Cocoa typically means processed cacao—roasted and often alkalized (Dutch-processed). The distinction is modern; historically both spellings were used interchangeably. Today, 'cacao' often implies raw, less-processed products marketed as healthier."
          }
        },
        {
          "@type": "Question",
          "name": "How much of the world's chocolate comes from Africa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "About 70% of the world's cocoa comes from West Africa, primarily Côte d'Ivoire and Ghana. This is ironic since cacao is native to the Americas—Europeans transplanted it to African colonies. The industry has faced criticism over child labor and farmer poverty despite billion-dollar profits."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'bean to bar' chocolate mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bean-to-bar chocolate is made by companies that control the entire process: sourcing raw cacao beans, roasting, grinding, conching, and tempering. This craft chocolate movement emerged in the 2000s as an alternative to industrial chocolate, emphasizing transparency, single-origin beans, and fair trade practices."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Cocoa Odyssey: From Ancient Ritual to Global Chocolate Empire | Esy',
  description: 'An immersive journey through 4,000 years of cocoa history—from Mesoamerican sacred rituals to the multi-billion dollar chocolate empires of today. Explore botanical origins, colonial transformation, and modern industry.',
  keywords: [
    'cocoa history',
    'chocolate history',
    'cacao origins',
    'Mesoamerican cocoa',
    'Maya chocolate',
    'Aztec cacao',
    'chocolate industry',
    'cocoa production',
    'bean to bar',
    'cocoa trade routes',
    'chocolate corporations',
    'Mars chocolate',
    'Hershey history',
    'cocoa sustainability',
    'scrollytelling',
    'visual essay'
  ],
  openGraph: {
    title: 'The Cocoa Odyssey: From Ancient Ritual to Global Chocolate Empire | Esy',
    description: 'From sacred Mesoamerican drink to billion-dollar empires—the untold story of how a bitter bean conquered the world.',
    type: 'article',
    url: 'https://esy.com/essays/the-cocoa-odyssey/',
    locale: 'en_US',
    siteName: 'Esy',
    images: [
      {
        url: 'https://esy.com/og/the-cocoa-odyssey.png',
        width: 1200,
        height: 630,
        alt: 'The Cocoa Odyssey - From Ancient Ritual to Global Chocolate Empire'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Cocoa Odyssey: From Ancient Ritual to Global Chocolate Empire',
    description: 'Before it was a candy bar, cocoa was currency, medicine, and divine gift. The story of civilization\'s sweetest obsession.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-cocoa-odyssey.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-cocoa-odyssey/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function CocoaOdysseyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CocoaOdysseyClient />
    </>
  );
}
