import type { Metadata } from "next";
import WineHistoryClient from "./WineHistoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-invention-of-wine/#article",
      "headline": "The Invention of Wine: 8,000 Years in a Glass",
      "alternativeHeadline": "From Neolithic Georgia to Modern Bordeaux",
      "description":
        "An immersive journey through 8,000 years of winemaking—from Neolithic Georgia to modern Bordeaux. Discover how fermented grapes became humanity's most civilized beverage.",
      "url": "https://esy.com/essays/the-invention-of-wine/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-invention-of-wine.png",
      "articleSection": "Food History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Invention of Wine", "item": "https://esy.com/essays/the-invention-of-wine/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where was wine first invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Archaeological evidence points to the South Caucasus region—modern-day Georgia—as the birthplace of wine, with residue from fermented grapes dating back to around 6000 BCE."
          }
        },
        {
          "@type": "Question",
          "name": "How old is winemaking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Winemaking is approximately 8,000 years old, predating the invention of the wheel and written language. It is one of humanity's oldest fermented beverages."
          }
        },
        {
          "@type": "Question",
          "name": "Who was Dionysus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dionysus was the Greek god of wine, fertility, and ecstasy. His cult celebrated wine's transformative power, and Roman culture later adopted him as Bacchus."
          }
        },
        {
          "@type": "Question",
          "name": "How did wine spread around the world?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Wine spread through ancient trade routes—Phoenicians brought vines to the Mediterranean, Greeks to Southern Europe, and Romans throughout their empire. Later, European colonization introduced wine to the Americas, South Africa, and Australia."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Bordeaux wines famous?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bordeaux's combination of terroir (soil, climate, geography), centuries of viticultural expertise, and a classification system dating to 1855 established it as the world's most prestigious wine region."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Invention of Wine: 8,000 Years in a Glass | Esy",
  description:
    "An immersive journey through 8,000 years of winemaking—from Neolithic Georgia to modern Bordeaux. Discover how fermented grapes became humanity's most civilized beverage.",
  keywords: [
    "history of wine",
    "wine invention",
    "ancient wine",
    "Georgia wine origin",
    "viticulture history",
    "Dionysus",
    "winemaking",
    "wine regions",
    "Bordeaux",
    "scrollytelling"
  ],
  openGraph: {
    title: "The Invention of Wine: 8,000 Years in a Glass",
    description:
      "From Neolithic Georgia to billion-dollar châteaux—the story of humanity's oldest fermented beverage.",
    type: "article",
    url: "https://esy.com/essays/the-invention-of-wine/",
    locale: "en_US",
    siteName: "Esy",
    images: [
      {
        url: "https://esy.com/og/the-invention-of-wine.png",
        width: 1200,
        height: 630,
        alt: "The Invention of Wine: 8,000 Years in a Glass"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Invention of Wine: 8,000 Years in a Glass",
    description:
      "Before writing, before the wheel—there was wine.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-invention-of-wine.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-invention-of-wine/"
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

export default function WineHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WineHistoryClient />
    </>
  );
}
