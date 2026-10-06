import type { Metadata } from 'next';
import ChipManufacturingClient from './ChipManufacturingClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/how-a-chip-is-manufactured/#article",
      "headline": "How a Chip Is Manufactured: From Sand to Silicon",
      "alternativeHeadline": "A Visual Guide to the Most Precise Industrial Process on Earth",
      "description": "A visual guide to the most precise industrial process on Earth. Learn how modern semiconductor chips are manufactured through 9 stages of atomic-scale precision, from raw quartz sand to finished silicon devices.",
      "url": "https://esy.com/essays/how-a-chip-is-manufactured/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/how-a-chip-is-manufactured.png",
      "articleSection": "Technology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "How a Chip Is Manufactured", "item": "https://esy.com/essays/how-a-chip-is-manufactured/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How are computer chips made from sand?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Silicon is extracted from quartz sand (silicon dioxide) through reduction with carbon at 1800°C. The resulting metallurgical-grade silicon is further purified to 99.9999999% purity (9 nines). This ultrapure silicon is melted and grown into single-crystal ingots, then sliced into wafers for chip manufacturing."
          }
        },
        {
          "@type": "Question",
          "name": "What is photolithography?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Photolithography is the process of transferring circuit patterns onto silicon wafers using light. Wafers are coated with light-sensitive photoresist, then exposed through a mask. Modern EUV lithography uses 13.5nm extreme ultraviolet light to create features smaller than 7 nanometers."
          }
        },
        {
          "@type": "Question",
          "name": "What is EUV lithography?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EUV (Extreme Ultraviolet) lithography uses 13.5nm wavelength light to create the smallest chip features. Each EUV machine costs $150+ million, weighs 180 tons, and requires droplets of molten tin hit by lasers to generate the light. Only ASML produces these machines, making them critical to advanced chip production."
          }
        },
        {
          "@type": "Question",
          "name": "How small are modern transistors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Modern transistors are 3-5 nanometers—about 20 silicon atoms wide. A human hair is 80,000-100,000 nanometers thick. Apple's M2 chip contains 20 billion transistors; NVIDIA's H100 has 80 billion. We're approaching physical limits where quantum effects become significant."
          }
        },
        {
          "@type": "Question",
          "name": "Why do chip fabs need to be so clean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A single dust particle can ruin a chip worth thousands of dollars. Cleanrooms are rated by particles per cubic foot—a Class 1 cleanroom has fewer than 1 particle larger than 0.5 microns per cubic foot. Outside air has millions. Workers wear full 'bunny suits' and pass through air showers."
          }
        },
        {
          "@type": "Question",
          "name": "Who manufactures the most advanced chips?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TSMC (Taiwan Semiconductor Manufacturing Company) produces about 90% of the world's most advanced chips. Samsung and Intel also have leading-edge fabs. A single advanced fab costs $20+ billion to build and requires 3-4 years. This concentration in Taiwan creates significant geopolitical concerns."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'How a Chip Is Manufactured: From Sand to Silicon | Esy',
  description: 'A visual guide to the most precise industrial process on Earth. Learn how modern semiconductor chips are manufactured through 9 stages of atomic-scale precision, from raw quartz sand to finished silicon devices.',
  keywords: [
    'semiconductor manufacturing',
    'how chips are made',
    'silicon wafer',
    'photolithography',
    'transistor',
    'integrated circuit',
    'TSMC',
    'chip fabrication',
    'EUV lithography',
    "Moore's Law"
  ],
  openGraph: {
    title: 'How a Chip Is Manufactured: From Sand to Silicon',
    description: 'A visual guide to the most precise industrial process on Earth. 9 stages of atomic-scale precision.',
    type: 'article',
    url: 'https://esy.com/essays/how-a-chip-is-manufactured/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/how-a-chip-is-manufactured.png',
        width: 1200,
        height: 630,
        alt: 'How a Chip Is Manufactured - Visual Essay'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How a Chip Is Manufactured: From Sand to Silicon',
    description: 'A visual guide to the most precise industrial process on Earth.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/how-a-chip-is-manufactured.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/how-a-chip-is-manufactured/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function ChipManufacturingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ChipManufacturingClient />
    </>
  );
}
