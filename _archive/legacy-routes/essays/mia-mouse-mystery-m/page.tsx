import type { Metadata } from "next";
import { Suspense } from "react";
import MiaMouseClient from "./MiaMouseClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/mia-mouse-mystery-m/#article",
      "headline": "Mia Mouse and the Mystery M",
      "alternativeHeadline": "A Children's Story About Curiosity and Friendship",
      "description": "Follow curious Mia Mouse as she discovers mysterious M-shaped crumbs leading to a wonderful surprise! An interactive scrollytelling story for ages 3-6 about curiosity, friendship, and the joy of discovery.",
      "url": "https://esy.com/essays/mia-mouse-mystery-m/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/mia-mouse-mystery-m.png",
      "articleSection": "Children's Stories",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Mia Mouse and the Mystery M", "item": "https://esy.com/essays/mia-mouse-mystery-m/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What age group is this story for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mia Mouse and the Mystery M is designed for children ages 3-6 (preschool through early kindergarten). The simple narrative, colorful visuals, and engaging mystery are perfect for young readers who are developing curiosity and early literacy skills."
          }
        },
        {
          "@type": "Question",
          "name": "What does Mia Mouse learn in this story?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mia learns about curiosity and following clues. As she follows the mysterious M-shaped crumbs, she discovers that being curious leads to wonderful surprises. The story also reinforces the letter M and introduces simple counting concepts."
          }
        },
        {
          "@type": "Question",
          "name": "How does the interactive scrollytelling work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As you scroll through the story, animated scenes unfold showing Mia's adventure. Each scroll reveals new parts of the mystery, keeping young readers engaged. Parents can read along while children enjoy the moving illustrations."
          }
        },
        {
          "@type": "Question",
          "name": "Is this story good for bedtime reading?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The story has a gentle pace and a happy, heartwarming ending that makes it perfect for bedtime. The scrolling format allows parents to control the pace, making it easy to wind down with your child."
          }
        },
        {
          "@type": "Question",
          "name": "What educational value does this story have?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The story reinforces letter recognition (especially the letter M), basic counting, and problem-solving through following clues. It also teaches social-emotional skills like curiosity, patience, and the joy of friendship."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Mia Mouse and the Mystery M — A Children's Story | Esy",
  description:
    "Follow curious Mia Mouse as she discovers mysterious M-shaped crumbs leading to a wonderful surprise! An interactive scrollytelling story for ages 3-6.",
  keywords: [
    "children's story",
    "interactive story",
    "letter M",
    "ages 3-6",
    "early reader",
    "scrollytelling",
    "friendship story",
    "picture book",
    "Mia Mouse",
    "counting"
  ],
  openGraph: {
    title: "Mia Mouse and the Mystery M — A Children's Story",
    description:
      "An interactive scrollytelling adventure about curiosity and friendship for ages 3-6",
    url: "https://esy.com/essays/mia-mouse-mystery-m/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/mia-mouse-mystery-m.png",
        width: 1200,
        height: 630,
        alt: "Mia Mouse and the Mystery M - Children's Story"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mia Mouse and the Mystery M — A Children's Story",
    description:
      "Follow curious Mia Mouse on an adventure of curiosity and friendship!",
    site: "@EsyResearch",
    images: ["https://esy.com/og/mia-mouse-mystery-m.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/mia-mouse-mystery-m/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function MiaMousePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="mia-mouse-story-loading" />}>
        <MiaMouseClient />
      </Suspense>
    </>
  );
}
