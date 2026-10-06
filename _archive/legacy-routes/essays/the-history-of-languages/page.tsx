import { Metadata } from "next";
import LanguagesClient from "./LanguagesClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-history-of-languages/#article",
      "headline": "The History of Languages: Humanity's Greatest Invention",
      "alternativeHeadline": "From First Utterance to 7,000 Living Tongues",
      "description":
        "From the first human utterance to 7,000 living tongues—journey through the evolution of language, the rise and fall of writing systems, and the voices that connect us across time and space. A photographic visual essay.",
      "url": "https://esy.com/essays/the-history-of-languages/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-history-of-languages.png",
      "articleSection": "Linguistics",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The History of Languages", "item": "https://esy.com/essays/the-history-of-languages/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How did human language begin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Early language likely emerged from gesture and vocal calls, evolving into symbolic speech over tens of thousands of years as humans formed larger social groups."
          }
        },
        {
          "@type": "Question",
          "name": "What was the first writing system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sumerian cuneiform and Egyptian hieroglyphics are among the earliest known writing systems, appearing over 5,000 years ago to record trade, ritual, and governance."
          }
        },
        {
          "@type": "Question",
          "name": "What is Proto-Indo-European?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Proto-Indo-European is the reconstructed ancestor of many languages from Icelandic to Hindi; linguists infer its vocabulary and grammar from shared roots across daughter languages."
          }
        },
        {
          "@type": "Question",
          "name": "How do languages go extinct?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Languages disappear when speaker communities shift to dominant tongues due to migration, policy, or economic pressure. Without intergenerational transmission, a language becomes endangered then extinct."
          }
        },
        {
          "@type": "Question",
          "name": "How are endangered languages preserved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Preservation involves community teaching, documentation, and revitalization programs—recordings, orthographies, school curricula, and digital archives to keep languages in daily use."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The History of Languages: Humanity's Greatest Invention | Esy",
  description:
    "From the first human utterance to 7,000 living tongues—journey through the evolution of language, the rise and fall of writing systems, and the voices that connect us across time and space. A photographic visual essay.",
  keywords: [
    "history of languages",
    "language evolution",
    "linguistics",
    "writing systems",
    "ancient languages",
    "Proto-Indo-European",
    "Sumerian cuneiform",
    "Egyptian hieroglyphics",
    "Rosetta Stone",
    "endangered languages",
    "language families",
    "babel",
    "communication",
    "human speech",
    "visual essay",
    "educational"
  ],
  openGraph: {
    title: "The History of Languages: Humanity's Greatest Invention",
    description:
      "From cave paintings to emoji—7,000 languages, 100,000 years, one human story. An immersive visual journey.",
    url: "https://esy.com/essays/the-history-of-languages/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-history-of-languages.png",
        width: 1200,
        height: 630,
        alt: "Mama — The Word That Every Language Shares: The History of Languages visual essay"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The History of Languages: Humanity's Greatest Invention",
    description:
      "From the first word spoken to the last language endangered—the story of how humans learned to share their minds.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-history-of-languages.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-history-of-languages/"
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

export default function TheHistoryOfLanguagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LanguagesClient />
    </>
  );
}
