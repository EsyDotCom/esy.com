import { Metadata } from "next";
import GreatFireClient from "./GreatFireClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-great-fire/#article",
      "headline": "The Great Fire of London: From Ashes to Empire",
      "alternativeHeadline": "How 1666's Catastrophe Gave Birth to Modern London",
      "description": "Experience the catastrophic beauty of 1666—when a spark in Pudding Lane consumed medieval London and gave birth to the modern city. A visual essay of destruction, resilience, and Christopher Wren's architectural phoenix.",
      "url": "https://esy.com/essays/the-great-fire/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-great-fire.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Great Fire of London", "item": "https://esy.com/essays/the-great-fire/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How did the Great Fire of London start?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The fire started in Thomas Farriner's bakery on Pudding Lane around 1 AM on September 2, 1666. A spark from the oven ignited nearby fuel, and strong easterly winds quickly spread the flames through the tightly-packed wooden buildings."
          }
        },
        {
          "@type": "Question",
          "name": "How long did the Great Fire of London last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Great Fire burned for four days, from September 2-5, 1666. It was finally stopped by creating firebreaks—demolishing buildings to create gaps the fire couldn't cross—and a fortuitous drop in the wind."
          }
        },
        {
          "@type": "Question",
          "name": "How many people died in the Great Fire of London?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Officially, only six deaths were recorded. However, this number is likely far too low—the poor and homeless weren't counted, and the intense heat would have cremated victims beyond identification. Historians estimate the true toll was much higher."
          }
        },
        {
          "@type": "Question",
          "name": "What was destroyed in the Great Fire of London?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The fire destroyed 13,200 houses, 87 parish churches, St. Paul's Cathedral, and most City authority buildings. About 80% of the City of London was gutted, leaving an estimated 100,000 people homeless."
          }
        },
        {
          "@type": "Question",
          "name": "Who rebuilt London after the Great Fire?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Christopher Wren was the primary architect of the rebuilt city, designing the new St. Paul's Cathedral and 51 city churches. Robert Hooke also played a major role. New building regulations mandated brick and stone construction to prevent future fires."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Monument to the Great Fire?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Monument is a 202-foot Doric column near Pudding Lane, completed in 1677. It stands exactly 202 feet from where the fire started in Farriner's bakery. Designed by Wren and Hooke, it remains the tallest isolated stone column in the world."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Great Fire of London: From Ashes to Empire | Esy",
  description:
    "Experience the catastrophic beauty of 1666—when a spark in Pudding Lane consumed medieval London and gave birth to the modern city. A visual essay of destruction, resilience, and Christopher Wren's architectural phoenix.",
  keywords: [
    "Great Fire of London",
    "1666",
    "Samuel Pepys",
    "Christopher Wren",
    "Pudding Lane",
    "St Paul's Cathedral",
    "Thomas Farriner",
    "London history",
    "fire history",
    "city rebuilding",
    "visual essay"
  ],
  openGraph: {
    title: "The Great Fire of London: From Ashes to Empire",
    description:
      "Experience the catastrophic beauty of 1666—when a spark consumed medieval London and gave birth to the modern city.",
    type: "article",
    url: "https://esy.com/essays/the-great-fire/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-great-fire.png",
        width: 1200,
        height: 630,
        alt: "The Great Fire of London Visual Essay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Great Fire of London: From Ashes to Empire",
    description:
      "Experience the catastrophic beauty of 1666 in this immersive visual essay.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-great-fire.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-great-fire/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheGreatFirePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GreatFireClient />
    </>
  );
}
