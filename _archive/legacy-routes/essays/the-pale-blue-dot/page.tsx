import type { Metadata } from 'next';
import PaleBlueDotClient from './PaleBlueDotClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-pale-blue-dot/#article",
      "headline": "The Pale Blue Dot: A Cosmic Perspective",
      "alternativeHeadline": "Voyager 1's Most Humbling Photograph, 6 Billion Kilometers Away",
      "description": "Experience Carl Sagan's Pale Blue Dot like never before. Scroll to zoom out from Earth to 6 billion kilometers—the distance where Voyager 1 captured the most humbling photograph ever taken.",
      "url": "https://esy.com/essays/the-pale-blue-dot/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-pale-blue-dot.png",
      "articleSection": "Science",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Pale Blue Dot", "item": "https://esy.com/essays/the-pale-blue-dot/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Pale Blue Dot photo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Pale Blue Dot is a photograph of Earth taken by Voyager 1 on February 14, 1990, from 6 billion kilometers away. Earth appears as a tiny speck less than 0.12 pixels across, suspended in a scattered ray of sunlight—showing our planet's insignificance in the cosmic void."
          }
        },
        {
          "@type": "Question",
          "name": "Who requested the Pale Blue Dot photo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Carl Sagan requested that NASA turn Voyager 1's cameras back toward Earth before the mission ended. Some NASA officials worried it was scientifically useless, but Sagan argued for its philosophical value. It became one of the most influential images ever taken."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Voyager 1 now?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Voyager 1 is currently over 24 billion kilometers from Earth in interstellar space—the first human-made object to leave our solar system. It entered interstellar space in 2012 and continues transmitting data, though its signal takes over 22 hours to reach Earth."
          }
        },
        {
          "@type": "Question",
          "name": "What is Carl Sagan's Pale Blue Dot speech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Carl Sagan's Pale Blue Dot speech reflects on humanity's place in the cosmos: 'Everyone you love, everyone you know, everyone you ever heard of...lived out their lives on a mote of dust suspended in a sunbeam.' It's a plea for human unity and environmental stewardship."
          }
        },
        {
          "@type": "Question",
          "name": "Why is the Pale Blue Dot important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Pale Blue Dot provides cosmic perspective on human existence. Seeing Earth as an insignificant speck challenges our self-importance while emphasizing our responsibility to protect our only home. It's become a symbol of environmental awareness and human unity."
          }
        },
        {
          "@type": "Question",
          "name": "How far is 6 billion kilometers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "6 billion kilometers is about 40 astronomical units (AU)—40 times the distance from Earth to the Sun. Light takes 5.5 hours to travel this distance. At Voyager 1's speed of 61,000 km/h, it took 12 years to reach this point from Earth."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Pale Blue Dot: A Cosmic Perspective | Esy',
  description: 'Experience Carl Sagan\'s Pale Blue Dot like never before. Scroll to zoom out from Earth to 6 billion kilometers—the distance where Voyager 1 captured the most humbling photograph ever taken.',
  keywords: [
    'Pale Blue Dot',
    'Carl Sagan',
    'Voyager 1',
    'Earth from space',
    'cosmic perspective',
    'NASA',
    'space exploration',
    'astronomy',
    'humanity',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Pale Blue Dot: A Cosmic Perspective | Esy',
    description: 'Scroll to zoom out 6 billion kilometers. Experience Carl Sagan\'s Pale Blue Dot—the most humbling photograph ever taken.',
    type: 'article',
    url: 'https://esy.com/essays/the-pale-blue-dot/',
    locale: 'en_US',
    siteName: 'Esy',
    images: [
      {
        url: 'https://esy.com/og/the-pale-blue-dot.png',
        width: 1200,
        height: 630,
        alt: 'The Pale Blue Dot - A Cosmic Perspective'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pale Blue Dot: A Cosmic Perspective',
    description: 'Everyone you love, everyone you know, everyone who ever lived—on a mote of dust suspended in a sunbeam.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-pale-blue-dot.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-pale-blue-dot/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function PaleBlueDotPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PaleBlueDotClient />
    </>
  );
}
