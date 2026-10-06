import type { Metadata } from 'next';
import GoldenCrunchClient from './GoldenCrunchClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-golden-crunch/#article",
      "headline": "The Golden Crunch: The Origins, Journey & Global Rise of Fried Chicken",
      "alternativeHeadline": "From West African Traditions to a Multi-Hundred-Billion-Dollar Global Industry",
      "description": "An immersive journey into the deep, complex origins of fried chicken—from West African traditions and Scottish frying techniques to its role in American soul food and its transformation into a multi-hundred-billion-dollar global industry.",
      "url": "https://esy.com/essays/the-golden-crunch/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-golden-crunch.png",
      "articleSection": "Food History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Golden Crunch", "item": "https://esy.com/essays/the-golden-crunch/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where did fried chicken originate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fried chicken has dual origins: West African traditions of seasoning and frying chicken, and Scottish techniques of deep-frying chicken in fat. Enslaved Africans brought their culinary knowledge to the American South, where these traditions merged into what became Southern fried chicken."
          }
        },
        {
          "@type": "Question",
          "name": "Why is fried chicken associated with African American culture?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "During slavery, chickens were one of the few animals enslaved people were allowed to raise. Fried chicken became a portable, reliable food that could be sold for income or carried on journeys. During Jim Crow, it was one of the few foods Black travelers could buy due to segregated restaurants."
          }
        },
        {
          "@type": "Question",
          "name": "Who founded KFC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Harland Sanders founded Kentucky Fried Chicken in 1952 at age 62, after years of selling his pressure-fried chicken from a gas station in Corbin, Kentucky. His secret recipe of '11 herbs and spices' and franchising model built KFC into a global empire with over 27,000 locations."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Maillard reaction in fried chicken?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Maillard reaction is the chemical process that creates fried chicken's golden-brown crust and complex flavors. When proteins and sugars in the breading are heated above 280°F (140°C), they undergo browning reactions that produce hundreds of flavor compounds. This is the science behind 'the crunch.'"
          }
        },
        {
          "@type": "Question",
          "name": "How big is the global fried chicken market?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The global fried chicken market exceeds $50 billion annually and continues growing. KFC alone operates in over 150 countries. In South Korea, fried chicken (chimaek, chicken + beer) is a national obsession. The dish has been reinvented across cultures from Japanese karaage to Nashville hot chicken."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Green Book's connection to fried chicken?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Negro Motorist Green Book (1936-1967) listed safe restaurants and lodgings for Black travelers during segregation. Fried chicken was crucial as portable food since many restaurants refused service to Black Americans. Families often packed fried chicken for long road trips when stopping to eat was dangerous."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Golden Crunch: The Origins, Journey & Global Rise of Fried Chicken | Esy',
  description: 'An immersive journey into the deep, complex origins of fried chicken—from West African traditions and Scottish frying techniques to its role in American soul food and its transformation into a multi-hundred-billion-dollar global industry.',
  keywords: [
    'fried chicken history',
    'soul food origins',
    'African American cuisine',
    'West African culinary traditions',
    'Scottish frying techniques',
    'Jim Crow era food',
    'Green Book',
    'KFC history',
    'Popeyes history',
    'Chick-fil-A history',
    'fast food industry',
    'global fried chicken market',
    'culinary anthropology',
    'Maillard reaction',
    'scrollytelling',
    'visual essay',
    'food history',
    'cultural migration'
  ],
  openGraph: {
    title: 'The Golden Crunch: The Origins, Journey & Global Rise of Fried Chicken | Esy',
    description: 'From survival food to global empire: the untold story of fried chicken.',
    type: 'article',
    url: 'https://esy.com/essays/the-golden-crunch/',
    locale: 'en_US',
    siteName: 'Esy',
    images: [
      {
        url: 'https://esy.com/og/the-golden-crunch.png',
        width: 1200,
        height: 630,
        alt: 'The Golden Crunch - The History of Fried Chicken'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Golden Crunch: The Origins, Journey & Global Rise of Fried Chicken',
    description: 'Explore the migration, oppression, creativity, identity, capitalism, and globalization behind America\'s most iconic food.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-golden-crunch.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-golden-crunch/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function GoldenCrunchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GoldenCrunchClient />
    </>
  );
}
