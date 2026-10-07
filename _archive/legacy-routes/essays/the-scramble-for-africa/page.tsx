import type { Metadata } from 'next';
import ScrambleForAfricaClient from './ScrambleForAfricaClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-scramble-for-africa/#article",
      "headline": "The Scramble for Africa: How Europe Carved Up a Continent",
      "alternativeHeadline": "From 10% to 90% Control in a Single Generation (1870-1914)",
      "description": "An immersive visual essay chronicling how European powers went from controlling 10% of Africa in 1870 to 90% by 1914—the causes, the resistance, and the lasting legacy.",
      "url": "https://esy.com/essays/the-scramble-for-africa/",
      "datePublished": "2025-12-12",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-scramble-for-africa.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Scramble for Africa", "item": "https://esy.com/essays/the-scramble-for-africa/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What was the Scramble for Africa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Scramble for Africa (1881-1914) was the rapid colonization of the African continent by European powers. In 1870, Europeans controlled about 10% of Africa; by 1914, they controlled over 90%. Only Ethiopia and Liberia remained independent."
          }
        },
        {
          "@type": "Question",
          "name": "What was the Berlin Conference of 1884?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Berlin Conference (1884-1885) was a meeting of 14 European nations that established rules for colonizing Africa. No Africans were invited. It allowed European powers to claim territory simply by notifying others and demonstrating 'effective occupation.'"
          }
        },
        {
          "@type": "Question",
          "name": "Which African country was never colonized?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ethiopia was never colonized, defeating Italian forces at the Battle of Adwa in 1896—the first major African victory over a European colonial power. Emperor Menelik II's modern army and tactical brilliance preserved Ethiopian independence."
          }
        },
        {
          "@type": "Question",
          "name": "What happened in the Congo Free State?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Congo Free State (1885-1908) was King Leopold II of Belgium's personal colony, where brutal rubber quotas led to mass atrocities. An estimated 10 million Congolese died from murder, starvation, and disease. It remains history's most horrific colonial regime."
          }
        },
        {
          "@type": "Question",
          "name": "How did the Scramble for Africa affect modern borders?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "European powers drew straight-line borders that ignored ethnic, linguistic, and cultural boundaries. These artificial borders, largely unchanged since independence, continue to cause conflicts by splitting communities and trapping rivals together."
          }
        },
        {
          "@type": "Question",
          "name": "Why did Europeans colonize Africa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "European colonization was driven by industrial demand for raw materials (rubber, copper, diamonds), nationalist competition between powers, missionary religious fervor, and racist ideologies that claimed a 'civilizing mission' over African peoples."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Scramble for Africa: How Europe Carved Up a Continent | Esy',
  description: 'An immersive visual essay chronicling how European powers went from controlling 10% of Africa in 1870 to 90% by 1914—the causes, the resistance, and the lasting legacy.',
  keywords: [
    'Scramble for Africa',
    'colonialism',
    'Berlin Conference',
    'African history',
    'European imperialism',
    'Battle of Adwa',
    'Congo Free State',
    'Leopold II',
    'Menelik II',
    'colonial borders',
    'partition of Africa',
  ],
  openGraph: {
    title: 'The Scramble for Africa: How Europe Carved Up a Continent',
    description: 'An immersive visual essay on the colonization of Africa (1870-1914)—the architects, the resisters, and the borders that remain.',
    type: 'article',
    url: 'https://esy.com/essays/the-scramble-for-africa/',
    siteName: 'Esy',
    locale: 'en_US',
    publishedTime: '2025-12-12',
    authors: ['Esy'],
    images: [
      {
        url: 'https://esy.com/og/the-scramble-for-africa.png',
        width: 1200,
        height: 630,
        alt: 'The Scramble for Africa - Visual Essay'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Scramble for Africa',
    description: 'How Europe partitioned a continent in a single generation.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-scramble-for-africa.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-scramble-for-africa/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function ScrambleForAfricaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrambleForAfricaClient />
    </>
  );
}
