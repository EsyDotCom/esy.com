import type { Metadata } from 'next';
import DiamondCartelClient from './DiamondCartelClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-diamond-cartel/#article",
      "headline": "A Diamond is Forever: The Manufactured Desire That Built an Empire",
      "alternativeHeadline": "How De Beers Created the Diamond Engagement Ring Tradition",
      "description": "How De Beers convinced the world that love could be measured in carats—and built that illusion on colonial exploitation, artificial scarcity, and the blood of African miners.",
      "url": "https://esy.com/essays/the-diamond-cartel/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-diamond-cartel.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Diamond Cartel", "item": "https://esy.com/essays/the-diamond-cartel/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the diamond engagement ring tradition?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "De Beers and their advertising agency N.W. Ayer created the modern diamond engagement ring tradition through a brilliant 1938 marketing campaign. Before this, diamond engagement rings were rare and not culturally expected."
          }
        },
        {
          "@type": "Question",
          "name": "Who created the 'A Diamond is Forever' slogan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Frances Gerety, a copywriter at N.W. Ayer, wrote 'A Diamond is Forever' in 1947. She never married and wore no diamond herself. The slogan became one of the most successful in advertising history."
          }
        },
        {
          "@type": "Question",
          "name": "How did De Beers control diamond prices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "De Beers controlled diamond prices through a near-monopoly on diamond mining and distribution. They stockpiled diamonds to create artificial scarcity, controlled supply channels, and discouraged resale to maintain the illusion of rarity and value."
          }
        },
        {
          "@type": "Question",
          "name": "Who was Cecil Rhodes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cecil Rhodes was a British imperialist who founded De Beers in 1888. He consolidated South African diamond mines into a monopoly, exploited African labor, and used diamond wealth to fund colonial expansion across Africa."
          }
        },
        {
          "@type": "Question",
          "name": "What are blood diamonds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blood diamonds (conflict diamonds) are diamonds mined in war zones and sold to finance armed conflict against governments. The term gained prominence in the 1990s during brutal civil wars in Sierra Leone, Angola, and the Democratic Republic of Congo."
          }
        },
        {
          "@type": "Question",
          "name": "Are lab-grown diamonds real diamonds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lab-grown diamonds are chemically, physically, and optically identical to mined diamonds. They're created using high-pressure high-temperature (HPHT) or chemical vapor deposition (CVD) processes and are increasingly disrupting the traditional diamond industry."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'A Diamond is Forever: The Manufactured Desire That Built an Empire | Esy',
  description: 'How De Beers convinced the world that love could be measured in carats—and built that illusion on colonial exploitation, artificial scarcity, and the blood of African miners.',
  keywords: [
    'De Beers',
    'diamond history',
    'blood diamonds',
    'diamond engagement rings',
    'a diamond is forever',
    'Cecil Rhodes',
    'diamond monopoly',
    'N.W. Ayer',
    'Frances Gerety',
    'conflict diamonds',
    'lab diamonds',
    'diamond industry',
    'manufactured desire',
    'marketing history'
  ],
  openGraph: {
    title: 'A Diamond is Forever: The Manufactured Desire That Built an Empire',
    description: 'How De Beers convinced the world that love could be measured in carats—and built that illusion on colonial exploitation, artificial scarcity, and the blood of African miners.',
    type: 'article',
    url: 'https://esy.com/essays/the-diamond-cartel/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-diamond-cartel.png',
        width: 1200,
        height: 630,
        alt: 'A Diamond is Forever - The Diamond Cartel Visual Essay'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Diamond is Forever: The Manufactured Desire That Built an Empire',
    description: 'The most successful marketing manipulation in history. A visual essay.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-diamond-cartel.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-diamond-cartel/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function DiamondCartelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DiamondCartelClient />
    </>
  );
}
