import type { Metadata } from "next";
import { Suspense } from "react";
import AlphabetTrainClient from "./AlphabetTrainClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/alphabet-adventure-train/#article",
      "headline": "The Alphabet Adventure Train",
      "alternativeHeadline": "Learn Your ABCs with a Magical Train Journey",
      "description": "Join the magical Alphabet Adventure Train! A fun, interactive scrollytelling experience that teaches children ages 3-5 all 26 letters through colorful train carts, friendly characters, and phonics sounds.",
      "url": "https://esy.com/essays/alphabet-adventure-train/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/alphabet-adventure-train.png",
      "articleSection": "Children's Education",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Alphabet Adventure Train", "item": "https://esy.com/essays/alphabet-adventure-train/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What age is the Alphabet Adventure Train for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Alphabet Adventure Train is designed for children ages 3-5 (preschool and kindergarten). It's perfect for children who are beginning to learn letter recognition, letter sounds, and early phonics skills."
          }
        },
        {
          "@type": "Question",
          "name": "How does the train teach the alphabet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Each train cart represents a different letter from A to Z. As children scroll through the experience, they see each letter with colorful illustrations, friendly characters, and associated words. The visual storytelling format makes letter learning engaging and memorable."
          }
        },
        {
          "@type": "Question",
          "name": "Does this include phonics sounds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The Alphabet Adventure Train incorporates phonics by associating each letter with words that demonstrate the letter's sound. Children see and hear how each letter sounds at the beginning of familiar words, building foundational phonemic awareness."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this to help my child learn to read?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! Letter recognition is the first step in learning to read. The Alphabet Adventure Train builds this foundation by making letters memorable through characters, colors, and a fun train journey narrative that children want to revisit."
          }
        },
        {
          "@type": "Question",
          "name": "How long does the train journey take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The experience takes about 5-10 minutes to scroll through all 26 letters, though children can go at their own pace. Many children enjoy repeating the journey, focusing on different letters each time or pausing at their favorites."
          }
        },
        {
          "@type": "Question",
          "name": "Is this experience free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the Alphabet Adventure Train is completely free. Esy creates interactive educational experiences to make learning accessible and engaging for all children, with no subscriptions or purchases required."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Alphabet Adventure Train — Learn Your ABCs | Esy",
  description:
    "Join the magical Alphabet Adventure Train! A fun, interactive scrollytelling experience that teaches children ages 3-5 all 26 letters through colorful train carts, friendly characters, and phonics sounds.",
  keywords: [
    "alphabet",
    "ABC",
    "letters",
    "phonics",
    "children's story",
    "interactive learning",
    "scrollytelling",
    "preschool",
    "kindergarten",
    "early literacy",
    "learn to read",
    "educational"
  ],
  openGraph: {
    title: "The Alphabet Adventure Train — Learn Your ABCs",
    description:
      "All aboard! A magical train journey through the alphabet for young learners.",
    url: "https://esy.com/essays/alphabet-adventure-train/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/alphabet-adventure-train.png",
        width: 1200,
        height: 630,
        alt: "The Alphabet Adventure Train - Learn Your ABCs"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Alphabet Adventure Train — Learn Your ABCs",
    description:
      "A magical train journey through the alphabet for ages 3-5.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/alphabet-adventure-train.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/alphabet-adventure-train/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function AlphabetTrainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="alphabet-train-loading" />}>
        <AlphabetTrainClient />
      </Suspense>
    </>
  );
}
