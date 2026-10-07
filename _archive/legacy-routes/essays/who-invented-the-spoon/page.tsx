import type { Metadata } from "next";
import SpoonHistoryClient from "./SpoonHistoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/who-invented-the-spoon/#article",
      "headline": "The History of the Spoon: 30,000 Years of Humanity's Essential Tool",
      "alternativeHeadline": "From Prehistoric Bone Carvings to Modern Stainless Steel",
      "description": "From prehistoric bone carvings to modern stainless steel, discover the extraordinary 30,000-year journey of the spoon—humanity's oldest and most universal eating utensil. An immersive scrollytelling experience.",
      "url": "https://esy.com/essays/who-invented-the-spoon/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/who-invented-the-spoon.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Who Invented the Spoon", "item": "https://esy.com/essays/who-invented-the-spoon/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the spoon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No single person invented the spoon—it evolved independently across virtually every human culture. The earliest spoons date back 30,000 years, carved from bone, wood, and shells. The word 'spoon' comes from an ancient word meaning 'chip of wood' or 'splinter.'"
          }
        },
        {
          "@type": "Question",
          "name": "What were the first spoons made of?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The earliest spoons were made from natural materials: seashells, carved wood, animal bones, and horns. Shells were particularly common—the Latin word for spoon, 'cochlea,' means 'snail shell.' Prehistoric humans simply used cupped hands before developing tools."
          }
        },
        {
          "@type": "Question",
          "name": "What are apostle spoons?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Apostle spoons were silver spoons popular in 15th-17th century Europe, with handles topped by figures of the twelve apostles. A complete set of 13 (including Jesus) was extremely valuable. Godparents traditionally gave them at christenings—origin of 'born with a silver spoon in your mouth.'"
          }
        },
        {
          "@type": "Question",
          "name": "Why is a teaspoon called a teaspoon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The teaspoon emerged in 17th century Europe alongside the tea-drinking craze from China. These smaller spoons were designed specifically for stirring tea and measuring sugar. The teaspoon became standardized as a unit of measurement (about 5ml) used in cooking worldwide."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'born with a silver spoon' mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The phrase 'born with a silver spoon in your mouth' means born into wealth and privilege. It originated from the tradition of wealthy godparents giving silver apostle spoons at christenings. Poor children received cheaper pewter or wooden spoons—or nothing at all."
          }
        },
        {
          "@type": "Question",
          "name": "When were metal spoons invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bronze spoons appeared around 3000 BCE in ancient Egypt and Mesopotamia. Silver spoons became status symbols in ancient Rome. The wealthy used gold and silver, while commoners used wood or horn. Modern stainless steel spoons weren't common until the 20th century."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The History of the Spoon: 30,000 Years of Humanity's Essential Tool | Esy",
  description:
    "From prehistoric bone carvings to modern stainless steel, discover the extraordinary 30,000-year journey of the spoon—humanity's oldest and most universal eating utensil. An immersive scrollytelling experience.",
  keywords: [
    "spoon history",
    "history of cutlery",
    "eating utensils history",
    "scrollytelling",
    "silver spoon origin",
    "apostle spoons",
    "teaspoon history",
    "ancient spoons",
    "medieval spoons"
  ],
  openGraph: {
    title: "The History of the Spoon: 30,000 Years | Esy",
    description:
      "Discover the 30,000-year journey of the spoon through an immersive scrollytelling experience.",
    type: "article",
    url: "https://esy.com/essays/who-invented-the-spoon/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/who-invented-the-spoon.png",
        width: 1200,
        height: 630,
        alt: "The History of the Spoon - 30,000 Years"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The History of the Spoon | Esy",
    description:
      "Discover the 30,000-year journey of the spoon through an immersive scrollytelling experience.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/who-invented-the-spoon.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/who-invented-the-spoon/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function HistoryOfTheSpoonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpoonHistoryClient />
    </>
  );
}
