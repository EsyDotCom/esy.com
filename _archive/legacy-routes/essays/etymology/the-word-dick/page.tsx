import { Metadata } from "next";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import TheWordDickClient from "./TheWordDickClient";

/**
 * THE WORD DICK: FROM ROYAL NICKNAME TO MODERN TABOO
 * ===================================================
 * A Typography-Forward Visual Essay on Etymology
 *
 * Built from spec: orchestration/skills/visual-essay-invocation/specs/the-word-dick.md
 * Research package: src/app/essays/visual/the-word-dick/research/
 *
 * Visual Treatment: Typography-forward with era-specific transformations
 * - Words themselves become visual elements
 * - 6 distinct era typography treatments
 * - Scroll-lock sequences drive typographic metamorphosis
 */

const ESSAY_META = {
  title: "The Word Dick: From Royal Nickname to Modern Taboo",
  subtitle: "800 Years of Semantic Transformation",
  category: "Etymology",
  readTime: "20 min",
  sourceCount: 14,
  sourceTier: "Tier-1",
  sectionCount: 6,
  visualizationCount: 6,
  designSystem: "Subject-derived",
  published: "December 2025",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Medieval Ink", color: "#1A1A2E" },
    { name: "Royal Gold", color: "#C9A84C" },
    { name: "Victorian Plum", color: "#581C87" },
    { name: "Detective Grey", color: "#4A5568" },
    { name: "Modern Slate", color: "#334155" },
  ],
  visualizations: [
    { name: "6-Era Typography Shifts", type: "Visual Morphing" },
    { name: "Rhyming Slang Chain", type: "Animated Sequence" },
    { name: "Semantic Evolution Timeline", type: "Interactive Timeline" },
    { name: "Name Popularity Graph", type: "Data Visualization" },
    { name: "Scroll-Lock Sequences", type: "Typographic Metamorphosis" },
    { name: "Cultural Context Cards", type: "Interactive Cards" },
  ],
  keySources: [
    "Oxford English Dictionary, historical entries",
    "Eric Partridge, A Dictionary of Slang",
    "Chronicle of Robert of Gloucester (c. 1300)",
    "Social Security Administration name statistics",
    "Jonathon Green, Cassell's Dictionary of Slang",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-dick/#article",
      "headline": "The Word Dick: From Royal Nickname to Modern Taboo",
      "alternativeHeadline": "800 Years of Semantic Transformation",
      "description": "How did a medieval nickname for Richard become one of English's most loaded words? A scholarly visual essay tracing 800 years of semantic transformation.",
      "url": "https://esy.com/essays/etymology/the-word-dick/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-word-dick.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Word Dick", "item": "https://esy.com/essays/etymology/the-word-dick/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is Dick a nickname for Richard?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dick emerged from medieval rhyming slang. Richard became Rick through common shortening, and Rick became Dick through rhyming substitution—a popular naming pattern in 13th-century England alongside Rob/Bob and Will/Bill."
          }
        },
        {
          "@type": "Question",
          "name": "When did 'dick' become a vulgar word?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The anatomical slang meaning emerged in British military slang around the 1890s. Before this, 'dick' was a respectable everyman term (like 'Tom, Dick, and Harry') used since the 16th century."
          }
        },
        {
          "@type": "Question",
          "name": "What did 'dick' mean in Victorian times?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In the Victorian era, 'dick' primarily meant a detective or fellow, as in 'private dick.' The phrase 'clever dick' emerged to describe a know-it-all. The word was entirely respectable in polite society."
          }
        },
        {
          "@type": "Question",
          "name": "How did the meaning of 'dick' change over time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "From 1300s nickname for Richard, to 1500s 'everyman' term, to 1800s slang for detective, to 1890s anatomical slang, to 20th-century taboo—dick underwent complete semantic transformation across eight centuries."
          }
        },
        {
          "@type": "Question",
          "name": "Is 'Dick' still used as a name today?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The name Dick has dramatically declined since the 1960s due to vulgar associations. While older generations named Dick remain, parents today almost universally avoid it, making it effectively extinct as a baby name."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Word Dick: From Royal Nickname to Modern Taboo | Esy",
  description: "How did a medieval nickname for Richard become one of English's most loaded words? A scholarly visual essay tracing 800 years of semantic transformation.",
  keywords: [
    "etymology",
    "word origin",
    "dick etymology",
    "Richard nickname",
    "linguistic history",
    "English language history",
    "semantic change",
    "historical linguistics",
    "slang history"
  ],
  openGraph: {
    title: "The Word Dick | A Visual Etymology",
    description: "From medieval pet name to modern taboo—800 years of semantic transformation explored through typography and archival research.",
    type: "article",
    url: "https://esy.com/essays/etymology/the-word-dick/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-word-dick.png",
        width: 1200,
        height: 630,
        alt: "The Word Dick - Etymology Visual Essay"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Word Dick | Etymology Visual Essay",
    description: "How a 13th-century nickname became unspeakable. A scholarly etymology study.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-word-dick.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/etymology/the-word-dick/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheWordDickPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordDickClient />
      </ArtifactDetailWrapper>
    </>
  );
}
