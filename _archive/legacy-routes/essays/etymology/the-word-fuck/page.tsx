import { Metadata } from "next";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import TheWordFuckClient from "./TheWordFuckClient";

/**
 * F*CK: A LINGUISTIC BIOGRAPHY
 * ============================
 * A Typography-Forward Visual Essay on Etymology
 *
 * Built from production pipeline with all 9 gates passed
 * Research package: src/app/essays/etymology/the-word-fuck/research/
 *
 * Visual Treatment: Era-shifting typography (5 distinct periods)
 * - Medieval (1310-1500): Blackletter, manuscript aesthetics
 * - Early Print (1500-1700): Transitional serif, woodcut vibes
 * - Victorian (1800-1960): Redactions, censorship stamps
 * - Counterculture (1960-1990): Typewriter, punk zine
 * - Digital (1990-present): Clean sans-serif, platform UI
 */

const ESSAY_META = {
  title: "F*ck: A Linguistic Biography",
  subtitle: "From Medieval Manuscripts to Digital Ubiquity",
  category: "Etymology",
  readTime: "25 min",
  sourceCount: 16,
  sourceTier: "Tier-1",
  sectionCount: 7,
  visualizationCount: 6,
  designSystem: "Subject-derived",
  published: "December 2025",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Blackletter Ink", color: "#1A1A1A" },
    { name: "Manuscript Cream", color: "#F0E6D3" },
    { name: "Censorship Red", color: "#CC0000" },
    { name: "Typewriter Grey", color: "#4A4A4A" },
    { name: "Digital Blue", color: "#2563EB" },
  ],
  visualizations: [
    { name: "5-Era Typography Shifts", type: "Visual Morphing" },
    { name: "Censorship Timeline", type: "Interactive Timeline" },
    { name: "Etymology Chain", type: "Animated Sequence" },
    { name: "Redaction Effects", type: "Scroll Animation" },
    { name: "Court Case Cards", type: "Interactive Cards" },
    { name: "Dictionary Entry Evolution", type: "Gradual Reveals" },
  ],
  keySources: [
    "Oxford English Dictionary, historical entries",
    "Dr. Paul Booth, Chester County Court records (1310)",
    "Cohen v. California (1971)",
    "FCC v. Pacifica Foundation (1978)",
    "Jesse Sheidlower, The F-Word",
    "Geoffrey Hughes, An Encyclopedia of Swearing",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-fuck/#article",
      "headline": "F*ck: A Linguistic Biography",
      "alternativeHeadline": "From Medieval Manuscripts to Digital Ubiquity",
      "description": "A scholarly visual essay tracing the etymology, censorship history, and cultural journey of English's most versatile taboo word—from 1310 court records to algorithmic moderation.",
      "url": "https://esy.com/essays/etymology/the-word-fuck/",
      "datePublished": "2025-12-23",
      "dateModified": "2025-12-23",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-word-fuck.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "contentRating": "Mature - contains discussion of profanity in historical/linguistic context"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 4, "name": "The Word F*ck", "item": "https://esy.com/essays/etymology/the-word-fuck/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the origin of the word 'fuck'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word is of Germanic origin, likely borrowed into English in the 15th century from Low German, Flemish, or Dutch. It derives from Proto-Germanic *fukkōną, meaning 'to strike' or 'to move back and forth,' with a secondary meaning of 'to copulate.' It is NOT derived from any acronym."
          }
        },
        {
          "@type": "Question",
          "name": "What is the earliest written use of 'fuck'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The earliest confirmed sexual use is 'Roger Fuckebythenavele' in Chester County Court records from 1310-1311, discovered by Dr. Paul Booth in 2015. The earliest in running text is the 'Flen flyys' poem (c. 1475), where it appears encoded in a cipher."
          }
        },
        {
          "@type": "Question",
          "name": "Is 'fuck' really an acronym?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. All acronym etymologies ('Fornication Under Consent of the King,' 'For Unlawful Carnal Knowledge,' etc.) are false. Acronyms as we use them today are a 20th-century phenomenon, but the word existed centuries earlier. These are backronyms invented in the 1960s."
          }
        },
        {
          "@type": "Question",
          "name": "When did 'fuck' first appear in dictionaries?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Penguin English Dictionary became the first general dictionary to include it in 1965. The Oxford English Dictionary added it in 1972. For 170 years (1795-1965), no mainstream English dictionary included the word due to obscenity laws and social taboo."
          }
        },
        {
          "@type": "Question",
          "name": "Is saying 'fuck' illegal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not in the United States. The Supreme Court ruled in Cohen v. California (1971) that 'fuck' is not legally obscene and is protected speech. However, the FCC can regulate 'indecent' content on broadcast television and radio under FCC v. Pacifica Foundation (1978)."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "F*ck: A Linguistic Biography | Etymology Visual Essay | Esy",
  description: "From medieval manuscripts to digital ubiquity—a scholarly visual essay tracing the etymology, censorship history, and cultural journey of English's most versatile taboo word.",
  keywords: [
    "etymology",
    "word origin",
    "fuck etymology",
    "profanity history",
    "linguistic history",
    "English language history",
    "censorship history",
    "historical linguistics",
    "taboo words",
    "Proto-Germanic",
    "OED",
    "Cohen v California",
    "FCC v Pacifica"
  ],
  openGraph: {
    title: "F*ck: A Linguistic Biography",
    description: "From medieval manuscripts to algorithmic moderation—the story of English's most versatile taboo word, told through typography and archival research.",
    type: "article",
    url: "https://esy.com/essays/etymology/the-word-fuck/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-word-fuck.png",
        width: 1200,
        height: 630,
        alt: "F*ck: A Linguistic Biography - Etymology Visual Essay"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "F*ck: A Linguistic Biography",
    description: "How a Germanic root became English's most loaded word. A scholarly etymology study.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-word-fuck.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/etymology/the-word-fuck/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheWordFuckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordFuckClient />
      </ArtifactDetailWrapper>
    </>
  );
}
