import type { Metadata } from "next";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import OriginOfToyClient from "./OriginOfToyClient";

/**
 * THE ETYMOLOGY OF PLAY
 * =====================
 * How "Toy" Traveled from Sin to Innocence
 * 
 * A visual essay spanning seven centuries of linguistic transformation,
 * from medieval scandal to childhood innocence.
 * 
 * Research Package: ./research/
 * Fixes Documentation: ./Fixes/
 */

const ESSAY_META = {
  title: "The Etymology of Play",
  subtitle: "How 'Toy' Traveled from Sin to Innocence",
  category: "Etymology",
  readTime: "18 min",
  sourceCount: 18,
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
    { name: "Aged Cream", color: "#F5F0E8" },
    { name: "Scholarly Brown", color: "#5C4033" },
    { name: "Illuminated Gold", color: "#C9A84C" },
    { name: "Terracotta Wood", color: "#B5651D" },
    { name: "Parchment", color: "#E8DCC8" },
  ],
  visualizations: [
    { name: "Building Blocks Progress", type: "Stacking Letters T-O-Y-S" },
    { name: "Word Transformation Hero", type: "Scroll-Lock Animation" },
    { name: "Era Treatments", type: "Visual Morphing" },
    { name: "Etymology Timeline", type: "Interactive Timeline" },
    { name: "Chapter Image Gallery", type: "Archival Photography" },
    { name: "Dictionary Archaeology", type: "Gradual Reveals" },
  ],
  keySources: [
    "Middle English Dictionary, University of Michigan",
    "Samuel Johnson's Dictionary (1755)",
    "Folger Shakespeare Library",
    "Huizinga, Homo Ludens (1950)",
    "V&A Museum Toy Collections",
    "Ariès, Centuries of Childhood",
  ],
};

// JSON-LD structured data for rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-origin-of-toy/#article",
      "headline": "The Etymology of Play",
      "alternativeHeadline": "How 'Toy' Traveled from Sin to Innocence",
      "description": "Unravel the surprising etymology of 'toy'—a word that once meant amorous dalliance and worthless trifles before becoming synonymous with children's playthings. An immersive visual essay spanning seven centuries.",
      "url": "https://esy.com/essays/etymology/the-origin-of-toy/",
      "datePublished": "2025-12-15",
      "dateModified": "2025-12-17",
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
      "image": "https://esy.com/og/the-origin-of-toy.png",
      "articleSection": "Etymology",
      "wordCount": 5000,
      "about": [
        { "@type": "Thing", "name": "Etymology" },
        { "@type": "Thing", "name": "English Language History" },
        { "@type": "Thing", "name": "Medieval English" },
        { "@type": "Thing", "name": "Toys" },
        { "@type": "Thing", "name": "Childhood" }
      ],
      "mentions": [
        { "@type": "Person", "name": "William Shakespeare" },
        { "@type": "Person", "name": "Samuel Johnson" }
      ],
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Origin of Toy", "item": "https://esy.com/essays/etymology/the-origin-of-toy/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What did 'toy' originally mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Before the 16th century, 'toy' primarily meant amorous dalliance, flirtation, or worthless trifles. Shakespeare used it to mean both 'plaything' and 'idle fancy' or 'trifle.'"
          }
        },
        {
          "@type": "Question",
          "name": "When did 'toy' start meaning children's plaything?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The shift began in the late 16th century and solidified by the Victorian era (1888). Samuel Johnson's dictionary was among the first to formally define toys as 'playthings for children.'"
          }
        },
        {
          "@type": "Question",
          "name": "What is the etymology of the word 'toy'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word 'toy' likely derives from Middle Dutch 'toi' meaning 'tools' or 'trash,' or Middle English 'toye' meaning 'amorous sport.' Its journey from scandal to innocence spans seven centuries of English linguistic evolution."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Etymology of Play | How 'Toy' Traveled from Sin to Innocence | Esy",
  description:
    "Unravel the surprising etymology of 'toy'—a word that once meant amorous dalliance and worthless trifles before becoming synonymous with children's playthings. An immersive visual essay spanning seven centuries.",
  keywords: [
    "toy etymology",
    "origin of the word toy",
    "word history",
    "plaything etymology",
    "etymology visual essay",
    "medieval English",
    "Shakespeare toys",
    "childhood history",
    "toymaking history",
    "Nuremberg toys",
    "dictionary history",
    "word origins",
    "linguistic evolution",
    "English language history",
  ],
  openGraph: {
    title: "The Etymology of Play",
    description:
      "How 'toy' traveled from medieval scandal to childhood innocence—an immersive journey through seven centuries of linguistic transformation.",
    type: "article",
    url: "https://esy.com/essays/etymology/the-origin-of-toy/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-origin-of-toy.png",
        width: 1200,
        height: 630,
        alt: "TOYE → TOY: The Etymology of Play - How 'Toy' Traveled from Sin to Innocence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Etymology of Play | Esy",
    description:
      "Before 'toy' meant plaything, it meant scandal. An immersive visual essay on the word's surprising 700-year journey.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-origin-of-toy.png"],
  },
  alternates: {
    canonical: "https://esy.com/essays/etymology/the-origin-of-toy/",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  authors: [{ name: "Esy", url: "https://esy.com" }],
  publisher: "Esy",
  category: "education",
};

export default function OriginOfToyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <OriginOfToyClient />
      </ArtifactDetailWrapper>
    </>
  );
}
