import type { Metadata } from "next";
import HoneyNeverSpoilsClient from "./HoneyNeverSpoilsClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/honey-never-spoils/#article",
      "headline": "Honey Never Spoils: The Eternal Elixir",
      "alternativeHeadline": "Why 3,000-Year-Old Honey Is Still Perfectly Edible",
      "description": "Discover why 3,000-year-old honey found in Egyptian tombs is still perfectly edible. Explore the science behind honey's eternal shelf life through interactive animations and historical discovery.",
      "url": "https://esy.com/essays/honey-never-spoils/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/honey-never-spoils.png",
      "articleSection": "Science",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Honey Never Spoils", "item": "https://esy.com/essays/honey-never-spoils/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why does honey never spoil?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Honey never spoils due to three key properties: extremely low water content (about 17%), high sugar concentration that draws water out of bacteria, and an acidic pH of 3.4-6.1 that inhibits microbial growth. Additionally, bees add an enzyme that produces small amounts of hydrogen peroxide."
          }
        },
        {
          "@type": "Question",
          "name": "Is 3,000-year-old honey really edible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible. The honey may crystallize over time, but crystallization doesn't indicate spoilage—just gently warm it to restore its liquid state. Properly sealed honey is essentially eternal."
          }
        },
        {
          "@type": "Question",
          "name": "Why did ancient Egyptians put honey in tombs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ancient Egyptians placed honey in tombs as food for the afterlife, believing the deceased would need sustenance on their journey. They also used honey for its medicinal properties, as an embalming agent, and as an offering to the gods. Honey symbolized eternal life and preservation."
          }
        },
        {
          "@type": "Question",
          "name": "What makes honey antibacterial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Honey's antibacterial properties come from multiple factors: the enzyme glucose oxidase produces hydrogen peroxide, its low water activity dehydrates bacteria, its high acidity creates a hostile environment, and some honeys (like Manuka) contain unique compounds like methylglyoxal that actively kill bacteria."
          }
        },
        {
          "@type": "Question",
          "name": "Can honey go bad if stored improperly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While pure honey is incredibly stable, it can ferment if water is introduced (raising moisture above 20%) or if the container isn't sealed properly. Storing honey in humid conditions or dipping wet utensils into the jar can allow fermentation. Keep honey sealed and dry for eternal shelf life."
          }
        },
        {
          "@type": "Question",
          "name": "Why does honey crystallize?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Honey crystallizes because it's a supersaturated solution of glucose and fructose. Over time, glucose separates from water and forms crystals. This is natural and doesn't mean the honey is spoiled. Different honeys crystallize at different rates depending on their glucose-to-fructose ratio."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Honey Never Spoils: The Eternal Elixir | Esy",
  description:
    "Discover why 3,000-year-old honey found in Egyptian tombs is still perfectly edible. Explore the science behind honey's eternal shelf life through interactive animations and historical discovery.",
  keywords: [
    "honey never spoils",
    "eternal food",
    "Egyptian honey",
    "Tutankhamun tomb",
    "honey science",
    "why honey lasts forever",
    "honey antimicrobial",
    "honeycomb",
    "bees",
    "food preservation",
    "ancient Egypt",
    "natural preservative",
    "scrollytelling"
  ],
  openGraph: {
    title: "Honey Never Spoils: The Eternal Elixir",
    description:
      "3,000-year-old honey from Egyptian tombs is still edible. Discover the science behind honey's immortality.",
    type: "article",
    url: "https://esy.com/essays/honey-never-spoils/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/honey-never-spoils.png",
        width: 1200,
        height: 630,
        alt: "Honey Never Spoils - The Eternal Elixir"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Honey Never Spoils: The Eternal Elixir",
    description:
      "3,000-year-old honey from Egyptian tombs is still edible. Discover the science behind honey's immortality.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/honey-never-spoils.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/honey-never-spoils/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function HoneyNeverSpoilsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HoneyNeverSpoilsClient />
    </>
  );
}
