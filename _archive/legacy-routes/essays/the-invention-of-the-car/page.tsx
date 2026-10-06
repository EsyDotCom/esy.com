import type { Metadata } from "next";
import CarHistoryClient from "./CarHistoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-invention-of-the-car/#article",
      "headline": "The Invention of the Car: A Sketch-Style History",
      "alternativeHeadline": "From Karl Benz's 1886 Patent to the Electric Future",
      "description":
        "A hand-drawn journey through the invention of the automobile. From Karl Benz's 1886 patent to the electric future — discover how the car changed civilization.",
      "url": "https://esy.com/essays/the-invention-of-the-car/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-invention-of-the-car.png",
      "articleSection": "Technology History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Invention of the Car", "item": "https://esy.com/essays/the-invention-of-the-car/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the first car?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Karl Benz is credited with inventing the first true automobile—the Benz Patent-Motorwagen—which he patented on January 29, 1886."
          }
        },
        {
          "@type": "Question",
          "name": "What was the first mass-produced car?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Ford Model T, introduced in 1908, was the first car mass-produced using assembly line techniques, making automobiles affordable for middle-class Americans."
          }
        },
        {
          "@type": "Question",
          "name": "How did Henry Ford change manufacturing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Henry Ford revolutionized manufacturing with the moving assembly line in 1913, reducing the time to build a car from 12 hours to about 93 minutes and dramatically lowering costs."
          }
        },
        {
          "@type": "Question",
          "name": "When were electric cars invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Electric vehicles existed as early as the 1830s–1890s. They were popular before gasoline cars dominated, and have resurged in the 21st century with advances in battery technology."
          }
        },
        {
          "@type": "Question",
          "name": "How did the car change society?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The automobile transformed society by enabling suburban development, creating new industries, changing urban planning, and giving individuals unprecedented personal mobility."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Invention of the Car | A Sketch-Style History | Esy",
  description:
    "A hand-drawn journey through the invention of the automobile. From Karl Benz's 1886 patent to the electric future — discover how the car changed civilization.",
  keywords: [
    "automobile history",
    "Karl Benz",
    "Ford Model T",
    "assembly line",
    "car invention",
    "automotive history",
    "scrollytelling",
    "electric vehicles",
    "Henry Ford"
  ],
  openGraph: {
    title: "The Invention of the Car | A Sketch-Style History",
    description:
      "A hand-drawn journey through the invention that changed civilization. Interactive scrollytelling experience.",
    type: "article",
    url: "https://esy.com/essays/the-invention-of-the-car/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-invention-of-the-car.png",
        width: 1200,
        height: 630,
        alt: "The Invention of the Car: A Sketch-Style History"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Invention of the Car | A Sketch-Style History",
    description:
      "A hand-drawn journey through the invention that changed civilization.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-invention-of-the-car.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-invention-of-the-car/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  },
  category: "education",
  publisher: "Esy"
};

export default function TheInventionOfTheCarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarHistoryClient />
    </>
  );
}
