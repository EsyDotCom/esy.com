import type { Metadata } from 'next';
import DeepOceanClient from './DeepOceanClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-deep-ocean/#article",
      "headline": "The Deep Ocean: Earth's Final Frontier",
      "alternativeHeadline": "An Immersive Descent to Challenger Deep at 10,935 Meters",
      "description": "An immersive descent into the ocean's depths. From the sunlit surface to Challenger Deep at 10,935 meters—explore the ocean zones, deep-sea creatures, and the history of human exploration.",
      "url": "https://esy.com/essays/the-deep-ocean/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-deep-ocean.png",
      "articleSection": "Science",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Deep Ocean", "item": "https://esy.com/essays/the-deep-ocean/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How deep is the Mariana Trench?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Mariana Trench reaches 10,935 meters (35,876 feet) at Challenger Deep, the deepest known point in Earth's oceans. If Mount Everest were placed here, its peak would still be over a mile underwater. The pressure at this depth is over 1,000 atmospheres."
          }
        },
        {
          "@type": "Question",
          "name": "Who first reached the bottom of the ocean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jacques Piccard and Don Walsh reached Challenger Deep in the bathyscaphe Trieste on January 23, 1960. They spent 20 minutes at the bottom. Only three crewed expeditions have reached this depth—the others were James Cameron (2012) and Victor Vescovo (2019)."
          }
        },
        {
          "@type": "Question",
          "name": "What are the ocean zones?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The ocean has five main zones: Epipelagic (sunlight zone, 0-200m), Mesopelagic (twilight zone, 200-1,000m), Bathypelagic (midnight zone, 1,000-4,000m), Abyssopelagic (abyssal zone, 4,000-6,000m), and Hadalpelagic (hadal zone, 6,000m+, in trenches)."
          }
        },
        {
          "@type": "Question",
          "name": "What creatures live in the deep ocean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Deep-sea creatures include anglerfish with bioluminescent lures, giant squid with eyes the size of dinner plates, zombie worms that eat whale bones, and bacteria that thrive on hydrothermal vents at 400°C. Life exists even at Challenger Deep's crushing depths."
          }
        },
        {
          "@type": "Question",
          "name": "How much of the ocean have we explored?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Less than 20% of the ocean floor has been mapped to high resolution, and less than 0.001% has been directly explored by humans. We have better maps of Mars than of our own ocean floor. The deep sea remains Earth's last great frontier."
          }
        },
        {
          "@type": "Question",
          "name": "What is bioluminescence?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bioluminescence is light produced by living organisms through chemical reactions. In the deep ocean where no sunlight reaches, over 90% of creatures produce their own light—for hunting, communication, camouflage, and attracting mates in the eternal darkness."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Deep Ocean: Earth\'s Final Frontier | Esy',
  description: 'An immersive descent into the ocean\'s depths. From the sunlit surface to Challenger Deep at 10,935 meters—explore the ocean zones, deep-sea creatures, and the history of human exploration.',
  keywords: [
    'deep ocean',
    'Mariana Trench',
    'Challenger Deep',
    'deep sea exploration',
    'ocean zones',
    'abyssal zone',
    'hadal zone',
    'deep sea creatures',
    'bioluminescence',
    'oceanography',
    'Jacques Piccard',
    'James Cameron',
    'Victor Vescovo',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Deep Ocean: Earth\'s Final Frontier | Esy',
    description: 'Descend 10,935 meters into the ocean\'s abyss. An immersive scrollytelling journey through ocean zones, deep-sea creatures, and exploration history.',
    type: 'article',
    url: 'https://esy.com/essays/the-deep-ocean/',
    locale: 'en_US',
    siteName: 'Esy',
    images: [
      {
        url: 'https://esy.com/og/the-deep-ocean.png',
        width: 1200,
        height: 630,
        alt: 'The Deep Ocean - Earth\'s Final Frontier'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Deep Ocean: Earth\'s Final Frontier',
    description: 'Scroll down to descend into the abyss. 71% of Earth, less than 0.001% explored.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-deep-ocean.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-deep-ocean/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function DeepOceanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DeepOceanClient />
    </>
  );
}
