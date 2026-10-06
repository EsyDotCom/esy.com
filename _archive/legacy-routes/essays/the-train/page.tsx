import type { Metadata } from 'next';
import TrainClient from './TrainClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-train/#article",
      "headline": "The Train: Iron Horse of Industry",
      "alternativeHeadline": "From Steam Locomotives to 375 MPH Maglev Trains",
      "description": "From Trevithick's first steam locomotive to 375 mph maglev trains — the complete history of rail transport with interactive SVG animations and wheel mechanics.",
      "url": "https://esy.com/essays/the-train/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-train.png",
      "articleSection": "Technology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Train", "item": "https://esy.com/essays/the-train/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the first train?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Richard Trevithick built the first steam locomotive to run on rails in 1804 in Wales. However, George Stephenson's 'Rocket' (1829) is often credited as the first practical locomotive, winning the Rainhill Trials and launching the railway age."
          }
        },
        {
          "@type": "Question",
          "name": "What was the first passenger railway?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Liverpool and Manchester Railway, opened in 1830, was the first intercity passenger railway. It used steam locomotives exclusively and demonstrated that rail could be commercially viable for passenger transport, sparking railway mania worldwide."
          }
        },
        {
          "@type": "Question",
          "name": "When was the transcontinental railroad completed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The First Transcontinental Railroad was completed on May 10, 1869, at Promontory Summit, Utah. The Central Pacific and Union Pacific railroads met, linking the American East and West coasts by rail for the first time."
          }
        },
        {
          "@type": "Question",
          "name": "What is a bullet train?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bullet train is the nickname for Japan's Shinkansen high-speed rail, launched in 1964 for the Tokyo Olympics. The original trains reached 130 mph. Modern Shinkansen travel at over 200 mph and have transported 10 billion passengers with zero fatalities."
          }
        },
        {
          "@type": "Question",
          "name": "How fast is the fastest train?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The fastest train is Japan's experimental L0 Series maglev, which reached 375 mph (603 km/h) in 2015. In regular service, China's Shanghai Maglev operates at 268 mph, while conventional high-speed rail maxes out around 220 mph."
          }
        },
        {
          "@type": "Question",
          "name": "How do maglev trains work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maglev (magnetic levitation) trains use powerful electromagnets to suspend the train above the track, eliminating friction. Alternating magnetic fields in the guideway propel the train forward. With no contact, maglev trains can achieve higher speeds with less noise and maintenance."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Train | Iron Horse of Industry | Esy',
  description: 'From Trevithick\'s first steam locomotive to 375 mph maglev trains — the complete history of rail transport with interactive SVG animations and wheel mechanics.',
  keywords: [
    'train history',
    'railroad history',
    'locomotive',
    'steam engine',
    'Stephenson Rocket',
    'transcontinental railroad',
    'Shinkansen',
    'bullet train',
    'maglev',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Train | Iron Horse of Industry',
    description: 'From 1804 steam locomotives to 375 mph maglev trains. Interactive scrollytelling experience.',
    type: 'article',
    url: 'https://esy.com/essays/the-train/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-train.png',
        width: 1200,
        height: 630,
        alt: 'The Train - Iron Horse of Industry'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Train | Iron Horse of Industry',
    description: 'The complete history of rail transport from steam to maglev.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-train.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-train/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheTrainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrainClient />
    </>
  );
}
