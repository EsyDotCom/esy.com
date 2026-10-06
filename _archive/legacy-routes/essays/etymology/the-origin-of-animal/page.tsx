import { Metadata } from "next";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import AnimalEtymologyClient from "./AnimalEtymologyClient";

/**
 * THE ORIGIN OF ANIMAL
 * ====================
 * A Photorealistic Visual Essay on the Etymology of "Animal"
 * 
 * From Latin "anima" (breath, soul) to modern zoological classification—
 * tracing 2,500 years of the word that defined life itself.
 */

const ESSAY_META = {
  title: "ANIMA — The Origin of the Word Animal",
  subtitle: "The Breath That Named the Living",
  category: "Etymology",
  readTime: "20 min",
  sourceCount: 12,
  sourceTier: "Tier-1",
  sectionCount: 5,
  visualizationCount: 5,
  designSystem: "Subject-derived",
  published: "December 2025",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Ancient Stone", color: "#8B8272" },
    { name: "Breath Gold", color: "#C9A84C" },
    { name: "Bestiary Red", color: "#8B2500" },
    { name: "Taxonomy Green", color: "#2D5A4A" },
    { name: "Manuscript Cream", color: "#F5F0E1" },
  ],
  visualizations: [
    { name: "Etymology Root Tree", type: "Animated Etymology" },
    { name: "Bestiary Gallery", type: "Photorealistic Cards" },
    { name: "Classification Timeline", type: "Interactive Timeline" },
    { name: "Era Typography Shifts", type: "Visual Morphing" },
    { name: "Key Figures Gallery", type: "Portrait Cards" },
  ],
  keySources: [
    "Aristotle, De Anima",
    "Carl Linnaeus, Systema Naturae (1735)",
    "Medieval bestiary manuscripts",
    "Oxford English Dictionary, 'animal' entry",
    "Charles Darwin, On the Origin of Species",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-origin-of-animal/#article",
      "headline": "ANIMA — The Origin of the Word Animal",
      "alternativeHeadline": "The Breath That Named the Living",
      "description":
        "From Latin 'anima' meaning breath and soul, to modern biology's kingdom classifications—trace the 2,500-year journey of the word 'animal' through philosophy, medieval bestiaries, and scientific revolution.",
      "url": "https://esy.com/essays/etymology/the-origin-of-animal/",
      "datePublished": "2025-12-12",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-origin-of-animal.png",
      "articleSection": "Etymology",
      "wordCount": 5000,
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Origin of Animal", "item": "https://esy.com/essays/etymology/the-origin-of-animal/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the origin of the word 'animal'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word 'animal' comes from Latin 'animalis', meaning 'having breath or soul', derived from 'anima' (breath, soul, spirit)—reflecting ancient belief that breath distinguished the living from the dead."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'anima' mean in Latin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "'Anima' in Latin means breath, soul, or life force. Ancient Romans believed anima was what animated living creatures, giving them movement and vitality."
          }
        },
        {
          "@type": "Question",
          "name": "How did Aristotle classify animals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aristotle classified animals based on their souls' capabilities—nutritive (plants), sensitive (animals that perceive), and rational (humans)—establishing foundations for biological taxonomy."
          }
        },
        {
          "@type": "Question",
          "name": "What were medieval bestiaries?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Medieval bestiaries were illustrated compendiums of animals, mixing natural observation with moral allegory. Each animal represented virtues or vices, teaching Christian lessons through nature."
          }
        },
        {
          "@type": "Question",
          "name": "How did Linnaeus change animal classification?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Carl Linnaeus created binomial nomenclature (genus + species) and systematic taxonomy, organizing all life into kingdoms, classes, orders—the basis of modern biological classification still used today."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "ANIMA — The Origin of the Word Animal | Etymology Visual Essay",
  description:
    "From Latin 'anima' meaning breath and soul, to modern biology's kingdom classifications—trace the 2,500-year journey of the word 'animal' through philosophy, medieval bestiaries, and scientific revolution.",
  keywords: [
    "animal etymology",
    "origin of the word animal",
    "anima meaning",
    "Latin animal",
    "animalis",
    "word history",
    "etymology",
    "Aristotle animals",
    "medieval bestiary",
    "Linnaeus taxonomy",
    "biological classification",
    "visual essay"
  ],
  openGraph: {
    title: "ANIMA — The Origin of the Word Animal",
    description:
      "The word that named every creature that breathes. A 2,500-year etymology journey.",
    url: "https://esy.com/essays/etymology/the-origin-of-animal/",
    siteName: "Esy",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-origin-of-animal.png",
        width: 1200,
        height: 630,
        alt: "ANIMA — The etymology of the word Animal"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ANIMA — The Origin of the Word Animal",
    description:
      "From breath to beast: the 2,500-year journey of a word.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-origin-of-animal.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/etymology/the-origin-of-animal/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  },
  authors: [{ name: "Esy", url: "https://esy.com" }],
  publisher: "Esy",
  category: "education"
};

export default function AnimalEtymologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <AnimalEtymologyClient />
      </ArtifactDetailWrapper>
    </>
  );
}
