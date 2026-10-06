import type { Metadata } from "next";
import PrintingPressClient from "./PrintingPressClient";

/**
 * THE PRINTING PRESS: A GLOBAL TIMELINE HISTORY
 * =============================================
 * From Tang Dynasty China to the Reformation — How Humanity Learned to Multiply Words
 *
 * A 700-year visual essay spanning four civilizations, four eras, and eight key figures.
 * Corrects the Eurocentric framing: printing wasn't invented once, but multiple times.
 *
 * Research Package: ./research/
 * Spec: /orchestration/skills/visual-essay-invocation/specs/the-printing-press.md
 */

// JSON-LD structured data for rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-printing-press/#article",
      "headline": "The Printing Press: A Global Timeline History",
      "alternativeHeadline": "From Tang Dynasty China to the Reformation — How Humanity Learned to Multiply Words",
      "description": "The printing press wasn't invented once. It was invented multiple times, across different civilizations. A 700-year visual essay from the Diamond Sutra (868 CE) to Luther's viral pamphlets, exploring how the same innovation had radically different impacts in different contexts.",
      "url": "https://esy.com/essays/the-printing-press/",
      "datePublished": "2025-12-18",
      "dateModified": "2025-12-18",
      "author": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://esy.com/logo.png"
        }
      },
      "image": "https://esy.com/og/the-printing-press.png",
      "articleSection": "History",
      "wordCount": 7000,
      "about": [
        { "@type": "Thing", "name": "Printing Press History" },
        { "@type": "Thing", "name": "Johannes Gutenberg" },
        { "@type": "Thing", "name": "Movable Type" },
        { "@type": "Thing", "name": "Chinese Printing" },
        { "@type": "Thing", "name": "Diamond Sutra" },
        { "@type": "Thing", "name": "Korean Printing" },
        { "@type": "Thing", "name": "Protestant Reformation" }
      ],
      "mentions": [
        { "@type": "Person", "name": "Johannes Gutenberg" },
        { "@type": "Person", "name": "Bi Sheng" },
        { "@type": "Person", "name": "Martin Luther" },
        { "@type": "Person", "name": "William Caxton" },
        { "@type": "Person", "name": "Aldus Manutius" }
      ],
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Printing Press", "item": "https://esy.com/essays/the-printing-press/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the printing press?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Johannes Gutenberg of Mainz, Germany, around 1440 — but the full answer is more nuanced. Gutenberg didn't invent printing itself. Chinese woodblock printing dates to the 9th century, and Bi Sheng created ceramic movable type around 1040. Korea produced metal movable type by the 1230s. What Gutenberg invented was a system: movable metal type + oil-based ink + wooden screw press. This synthesis made mass production of books economically viable in Europe for the first time."
          }
        },
        {
          "@type": "Question",
          "name": "What is the oldest printed book?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Diamond Sutra, dated May 11, 868 CE, is the oldest dated complete printed book. It was discovered in the Mogao Caves near Dunhuang, China, in 1900 and is now held at the British Library. It predates Gutenberg's Bible by nearly 600 years."
          }
        },
        {
          "@type": "Question",
          "name": "Why didn't movable type revolutionize China?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chinese has over 45,000 unique characters, requiring thousands of individual type pieces. European alphabets have only 26 letters. Additionally, China already had an efficient woodblock printing system, and low labor costs made the investment in movable type less economical. The same innovation had radically different impacts in different contexts."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Printing Press: A Global Timeline History | Who Invented the Printing Press? | Esy",
  description:
    "The printing press wasn't invented once — it was invented multiple times. A 700-year visual essay from the Diamond Sutra (868 CE) to Luther's viral pamphlets. Discover how Gutenberg synthesized, rather than invented, the technology that changed the world.",
  keywords: [
    "who invented the printing press",
    "printing press history",
    "Gutenberg",
    "Johannes Gutenberg",
    "Bi Sheng",
    "movable type",
    "Diamond Sutra",
    "Jikji",
    "printing history China",
    "printing history Korea",
    "Gutenberg Bible",
    "history of books",
    "Martin Luther printing",
    "Protestant Reformation printing",
    "visual essay",
    "timeline history",
  ],
  openGraph: {
    title: "The Printing Press: A Global Timeline History",
    description:
      "From Tang Dynasty China to the Reformation — how humanity learned to multiply words. The story doesn't begin where you think.",
    type: "article",
    url: "https://esy.com/essays/the-printing-press/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-printing-press.png",
        width: 1200,
        height: 630,
        alt: "The Printing Press: A Global Timeline History — From the Diamond Sutra (868 CE) to the Reformation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Printing Press: A Global Timeline History | Esy",
    description:
      "The story doesn't begin where you think. 700 years from the Diamond Sutra to Luther's pamphlets.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-printing-press.png"],
  },
  alternates: {
    canonical: "https://esy.com/essays/the-printing-press/",
  },
  robots: {
    index: false,
    follow: false,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  authors: [{ name: "Esy", url: "https://esy.com" }],
  publisher: "Esy",
  category: "education",
};

export default function PrintingPressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PrintingPressClient />
    </>
  );
}
