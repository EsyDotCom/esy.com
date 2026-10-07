import { Metadata } from "next";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import OriginOfDickClient from "./OriginOfDickClient";

/**
 * THE WORD THAT CHANGED ITS STRIPES
 * ==================================
 * A Visual Etymology Essay on the Word "Dick"
 *
 * From medieval pet name to modern taboo—tracing 600 years
 * of semantic transformation through rhyming slang, military
 * jargon, and cultural anxiety.
 *
 * This is a scholarly etymology study—educational, not sensational.
 */

const ESSAY_META = {
  title: "The Origin of the Word Dick",
  subtitle: "600 Years of Linguistic Transformation",
  category: "Etymology",
  readTime: "18 min",
  sourceCount: 12,
  sourceTier: "Tier-1",
  sectionCount: 6,
  visualizationCount: 5,
  designSystem: "Subject-derived",
  published: "December 2025",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Medieval Ink", color: "#1A1A2E" },
    { name: "Royal Gold", color: "#C9A84C" },
    { name: "Detective Grey", color: "#4A5568" },
    { name: "Military Green", color: "#3D4F2F" },
    { name: "Modern Slate", color: "#334155" },
  ],
  visualizations: [
    { name: "Rhyming Slang Chain", type: "Animated Sequence" },
    { name: "Semantic Timeline", type: "Interactive Timeline" },
    { name: "Era Typography Shifts", type: "Visual Morphing" },
    { name: "Name Frequency Graph", type: "Data Visualization" },
    { name: "Cultural Context Cards", type: "Interactive Cards" },
  ],
  keySources: [
    "Oxford English Dictionary, historical entries",
    "Eric Partridge, A Dictionary of Slang",
    "Medieval naming records",
    "Social Security Administration name statistics",
    "Jonathon Green, Cassell's Dictionary of Slang",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-origin-of-the-word-dick/#article",
      "headline": "The Origin of the Word Dick: Etymology & History",
      "alternativeHeadline": "600 Years of Linguistic Transformation",
      "description": "How did a medieval nickname for Richard become one of English's most versatile words? A scholarly visual essay tracing 600 years of linguistic transformation.",
      "url": "https://esy.com/essays/etymology/the-origin-of-the-word-dick/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-origin-of-the-word-dick.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Origin of the Word Dick", "item": "https://esy.com/essays/etymology/the-origin-of-the-word-dick/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where does the word 'dick' come from?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dick originated as a medieval nickname for Richard. Through rhyming slang (Richard → Rick → Dick), it became a common pet name in 13th-century England, following the same pattern as William → Will → Bill and Robert → Rob → Bob."
          }
        },
        {
          "@type": "Question",
          "name": "What did 'dick' mean historically?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Before becoming slang, 'dick' had several respectable meanings: a generic term for any man (like 'guy'), a leather apron worn by workers, a detective (as in 'private dick'), and even a riding whip. Each usage was perfectly acceptable in polite society."
          }
        },
        {
          "@type": "Question",
          "name": "When did 'dick' become slang?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The anatomical slang meaning first appeared in British military contexts around the 1890s. It remained primarily military/working-class slang until the mid-20th century, when it entered mainstream awareness while becoming increasingly taboo."
          }
        },
        {
          "@type": "Question",
          "name": "What is the 'Tom, Dick, and Harry' expression?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The phrase 'Tom, Dick, and Harry' dates to the 1600s and uses the most common English names to mean 'any ordinary person' or 'everyone.' It shows how Dick was once such a standard name that it represented the average man."
          }
        },
        {
          "@type": "Question",
          "name": "Why don't people name their children Dick anymore?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The name Dick virtually disappeared after the 1960s due to its vulgar associations. While Richard remains popular, parents universally avoid the diminutive Dick. Famous Dicks like Dick Van Dyke and Dick Clark became notable exceptions from an earlier era."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Origin of the Word Dick | Etymology & History | Esy",
  description: "How did a medieval nickname for Richard become one of English's most versatile words? A scholarly visual essay tracing 600 years of linguistic transformation.",
  keywords: [
    "etymology",
    "word origin",
    "linguistic history",
    "English language",
    "name etymology",
    "slang history",
    "semantic change",
    "historical linguistics"
  ],
  openGraph: {
    title: "The Origin of the Word Dick | A Visual Etymology",
    description: "From medieval pet name to modern taboo—600 years of semantic transformation explored through typography and archival research.",
    type: "article",
    url: "https://esy.com/essays/etymology/the-origin-of-the-word-dick/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-origin-of-the-word-dick.png",
        width: 1200,
        height: 630,
        alt: "The Origin of the Word Dick - Etymology Visual Essay"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Origin of the Word Dick | Etymology Visual Essay",
    description: "600 years of linguistic transformation—from medieval nickname to modern taboo.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-origin-of-the-word-dick.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/etymology/the-origin-of-the-word-dick/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function OriginOfDickPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <OriginOfDickClient />
      </ArtifactDetailWrapper>
    </>
  );
}
