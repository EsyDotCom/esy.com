import type { Metadata } from 'next';
import SkyscraperClient from './SkyscraperClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-skyscraper/#article",
      "headline": "The Skyscraper: Reaching for the Sky",
      "alternativeHeadline": "From the 10-Story Home Insurance Building to 163-Floor Burj Khalifa",
      "description": "From the 10-story Home Insurance Building to 163-floor Burj Khalifa — watch buildings construct floor-by-floor with elevator progress, steel frame animations, and height comparisons.",
      "url": "https://esy.com/essays/the-skyscraper/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-skyscraper.png",
      "articleSection": "Architecture",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Skyscraper", "item": "https://esy.com/essays/the-skyscraper/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What was the first skyscraper?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Home Insurance Building in Chicago (1885) is considered the first skyscraper. At 10 stories and 138 feet, it was the first building to use a steel skeleton frame to bear the weight, allowing taller construction than load-bearing masonry walls."
          }
        },
        {
          "@type": "Question",
          "name": "Why did skyscrapers develop in Chicago?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chicago pioneered skyscrapers after the Great Fire of 1871 destroyed the city center. Rebuilding demanded innovation, and architects like William Le Baron Jenney developed steel-frame construction. High land values in the rebuilt Loop incentivized building upward."
          }
        },
        {
          "@type": "Question",
          "name": "How tall is the Burj Khalifa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Burj Khalifa in Dubai stands 2,717 feet (828 meters) tall with 163 floors, making it the world's tallest building since 2010. It's nearly twice the height of the Empire State Building and took six years to construct."
          }
        },
        {
          "@type": "Question",
          "name": "Who invented the safety elevator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Elisha Otis invented the safety elevator in 1852, demonstrating it dramatically at the 1854 World's Fair by cutting the rope while standing on the platform. His automatic safety brake made passenger elevators viable, enabling the skyscraper age."
          }
        },
        {
          "@type": "Question",
          "name": "What is the tallest building in America?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One World Trade Center in New York City is America's tallest building at 1,776 feet (symbolizing 1776, the year of American independence). It was completed in 2014 and surpassed the Empire State Building, which held the record from 1931-1970."
          }
        },
        {
          "@type": "Question",
          "name": "How do skyscrapers stay standing in wind?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Modern skyscrapers use tuned mass dampers—massive counterweights that swing opposite to building movement. Taipei 101 has a 730-ton pendulum visible to visitors. Aerodynamic shapes and structural bracing also reduce wind stress on tall buildings."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Skyscraper | Reaching for the Sky | Esy',
  description: 'From the 10-story Home Insurance Building to 163-floor Burj Khalifa — watch buildings construct floor-by-floor with elevator progress, steel frame animations, and height comparisons.',
  keywords: [
    'skyscraper history',
    'tall buildings',
    'Empire State Building',
    'Burj Khalifa',
    'architecture history',
    'Otis elevator',
    'steel frame construction',
    'Chicago school',
    'Art Deco',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Skyscraper | Reaching for the Sky',
    description: 'An elevator rises as you scroll through 139 years of vertical ambition — from 42m to 828m.',
    type: 'article',
    url: 'https://esy.com/essays/the-skyscraper/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-skyscraper.png',
        width: 1200,
        height: 630,
        alt: 'The Skyscraper - Reaching for the Sky'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Skyscraper | Reaching for the Sky',
    description: 'The complete history of skyscrapers from Chicago 1885 to Dubai 2010.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-skyscraper.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-skyscraper/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheSkyscraperPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SkyscraperClient />
    </>
  );
}
