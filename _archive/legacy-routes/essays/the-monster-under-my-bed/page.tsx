import { Metadata } from "next";
import { Suspense } from "react";
import MonsterStoryClient from "./MonsterStoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-monster-under-my-bed/#article",
      "headline": "The Monster Under My Bed",
      "alternativeHeadline": "A Children's Story About Unlikely Friendship",
      "description":
        "An interactive bedtime story about a child who discovers the monster under their bed is actually afraid of the dark. A heartwarming tale of unlikely friendship.",
      "url": "https://esy.com/essays/the-monster-under-my-bed/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-monster-under-my-bed.png",
      "articleSection": "Children's Stories",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Monster Under My Bed", "item": "https://esy.com/essays/the-monster-under-my-bed/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is this story about?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This interactive bedtime story follows a child who discovers the monster under their bed is actually afraid of the dark—leading to an unlikely friendship."
          }
        },
        {
          "@type": "Question",
          "name": "What age group is this story for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Monster Under My Bed is designed for children ages 3–8, perfect for bedtime reading with gentle themes of friendship and overcoming fears."
          }
        },
        {
          "@type": "Question",
          "name": "How does the interactive scrollytelling work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As you scroll, the story unfolds with animated illustrations and text that reveal the narrative step by step, creating an immersive reading experience."
          }
        },
        {
          "@type": "Question",
          "name": "What lesson does the story teach?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The story teaches children that things that seem scary might be misunderstood, and that kindness can turn fear into friendship."
          }
        },
        {
          "@type": "Question",
          "name": "Can I read this story to my child at bedtime?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The story is designed as a calming bedtime experience with gentle pacing, soothing visuals, and a heartwarming resolution perfect for winding down."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Monster Under My Bed — A Children's Story | Esy",
  description:
    "An interactive bedtime story about a child who discovers the monster under their bed is actually afraid of the dark. A heartwarming tale of unlikely friendship.",
  keywords: [
    "children's story",
    "bedtime story",
    "interactive story",
    "scrollytelling",
    "monster",
    "friendship",
    "fear of the dark",
    "kids",
    "picture book"
  ],
  openGraph: {
    title: "The Monster Under My Bed — A Children's Story",
    description:
      "An interactive bedtime story about a child who discovers the monster under their bed is actually afraid of the dark.",
    url: "https://esy.com/essays/the-monster-under-my-bed/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-monster-under-my-bed.png",
        width: 1200,
        height: 630,
        alt: "The Monster Under My Bed — A Children's Story"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Monster Under My Bed — A Children's Story",
    description:
      "A heartwarming tale of unlikely friendship.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-monster-under-my-bed.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-monster-under-my-bed/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  },
  category: "children",
  publisher: "Esy"
};

export default function MonsterStoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="monster-story-loading" />}>
        <MonsterStoryClient />
      </Suspense>
    </>
  );
}
