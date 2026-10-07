import { Metadata } from "next";
import { Suspense } from "react";
import StarsStoryClient from "./StarsStoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-night-the-stars-fell/#article",
      "headline": "The Night the Stars Fell",
      "alternativeHeadline": "A Children's Story About a Brave Little Girl",
      "description":
        "An interactive bedtime story about a brave little girl who helps a fallen star find its way home. Scroll to unfold the magic. A scrollytelling experience for children.",
      "url": "https://esy.com/essays/the-night-the-stars-fell/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-night-the-stars-fell.png",
      "articleSection": "Children's Stories",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Night the Stars Fell", "item": "https://esy.com/essays/the-night-the-stars-fell/" }
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
            "text": "This interactive story follows a brave little girl who discovers a fallen star and embarks on a magical journey to help it return to the night sky."
          }
        },
        {
          "@type": "Question",
          "name": "What age group is this story for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Night the Stars Fell is designed for children ages 3–8, with beautiful visuals and gentle themes of kindness and wonder."
          }
        },
        {
          "@type": "Question",
          "name": "How does the scrollytelling work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As you scroll, the story unfolds with animated illustrations and text, creating an interactive reading experience that reveals the narrative step by step."
          }
        },
        {
          "@type": "Question",
          "name": "What lesson does the story teach?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The story teaches children about bravery, kindness, and the magic of helping others—even when the journey seems impossible."
          }
        },
        {
          "@type": "Question",
          "name": "Is this suitable for bedtime?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The story features a calming night-sky theme, gentle pacing, and a heartwarming ending—perfect for winding down before sleep."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Night the Stars Fell — A Children's Story | Esy",
  description:
    "An interactive bedtime story about a brave little girl who helps a fallen star find its way home. Scroll to unfold the magic. A scrollytelling experience for children.",
  keywords: [
    "children's story",
    "bedtime story",
    "interactive story",
    "scrollytelling",
    "stars",
    "night sky",
    "kids",
    "picture book",
    "digital story"
  ],
  openGraph: {
    title: "The Night the Stars Fell — A Children's Story",
    description:
      "An interactive bedtime story about a brave little girl who helps a fallen star find its way home. Scroll to unfold the magic.",
    url: "https://esy.com/essays/the-night-the-stars-fell/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-night-the-stars-fell.png",
        width: 1200,
        height: 630,
        alt: "The Night the Stars Fell — A Children's Story"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Night the Stars Fell — A Children's Story",
    description:
      "An interactive bedtime story. Scroll to unfold the magic.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-night-the-stars-fell.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-night-the-stars-fell/"
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

export default function TheNightTheStarsFellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="stars-story-loading" />}>
        <StarsStoryClient />
      </Suspense>
    </>
  );
}
