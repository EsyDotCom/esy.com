import type { Metadata } from "next";
import { Suspense } from "react";
import SammySnailClient from "./SammySnailClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/sammy-snail-super-speed/#article",
      "headline": "Sammy Snail's Super Speed Day",
      "alternativeHeadline": "A Children's Adventure About Speed, Silliness, and Being Yourself",
      "description": "Join Sammy Snail on his magical super-speed adventure through the forest! A fun, interactive scrollytelling story about excitement, silliness, and learning that slow can be special too.",
      "url": "https://esy.com/essays/sammy-snail-super-speed/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/sammy-snail-super-speed.png",
      "articleSection": "Children's Stories",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Sammy Snail's Super Speed Day", "item": "https://esy.com/essays/sammy-snail-super-speed/" }
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
            "text": "Sammy Snail's Super Speed Day is an interactive story about a small snail who discovers he has super speed! Through his adventure, he learns that being yourself—even if you're slow—is what makes you special."
          }
        },
        {
          "@type": "Question",
          "name": "What age group is this story for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This story is designed for children ages 4-5 (preschool and early kindergarten). The simple narrative, colorful visuals, and silly moments are perfect for young readers and listeners."
          }
        },
        {
          "@type": "Question",
          "name": "How does the interactive scrollytelling work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As you scroll through the story, animated scenes unfold showing Sammy's adventure. The scrolling pace lets children follow along at their own speed, creating an engaging reading experience."
          }
        },
        {
          "@type": "Question",
          "name": "What lesson does this story teach?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The story teaches children that it's okay to be different—being slow like Sammy doesn't mean you're less special. It also shows how adventures with friends are more fun than going fast alone."
          }
        },
        {
          "@type": "Question",
          "name": "Can I read this to my child at bedtime?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The story has a calming, happy ending that makes it suitable for bedtime. The gentle pacing and positive message help children wind down while enjoying Sammy's silly adventure."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Sammy Snail's Super Speed Day — A Children's Adventure | Esy",
  description:
    "Join Sammy Snail on his magical super-speed adventure through the forest! A fun, interactive scrollytelling story about excitement, silliness, and learning that slow can be special too.",
  keywords: [
    "children's story",
    "interactive story",
    "scrollytelling",
    "Sammy Snail",
    "speed",
    "adventure",
    "friendship",
    "forest",
    "ages 4-5",
    "preschool"
  ],
  openGraph: {
    title: "Sammy Snail's Super Speed Day — A Children's Adventure",
    description:
      "A magical adventure where a tiny snail discovers super speed!",
    url: "https://esy.com/essays/sammy-snail-super-speed/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/sammy-snail-super-speed.png",
        width: 1200,
        height: 630,
        alt: "Sammy Snail's Super Speed Day"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sammy Snail's Super Speed Day",
    description: "A fun adventure for ages 4-5 about a snail with super speed!",
    site: "@EsyResearch",
    images: ["https://esy.com/og/sammy-snail-super-speed.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/sammy-snail-super-speed/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function SammySnailPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="sammy-loading" />}>
        <SammySnailClient />
      </Suspense>
    </>
  );
}
