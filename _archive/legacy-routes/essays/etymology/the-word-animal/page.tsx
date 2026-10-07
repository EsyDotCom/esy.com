import { Metadata } from "next";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import WordAnimalClient from "./WordAnimalClient";

/**
 * ANIMUS — THE LIVING WORD
 * =========================
 * A Photorealistic Visual Essay on the Etymology of "Animal"
 * 
 * Created through Visual Essay Orchestrator Pipeline:
 * - Phase 1: Intake (scope, audience, requirements)
 * - Phase 2: Research (FIGURES.md, QUOTES.md, TIMELINE.md, CITATIONS.md)
 * - Phase 3: Spec Construction (6-layer invocation)
 * - Phase 4: Production (this implementation)
 * - Phase 5: Audit (pending)
 * - Phase 6: Publish (pending)
 * 
 * Research Package: ./research/
 * Invocation Spec: ./specs/invocation-spec.md
 */

const ESSAY_META = {
  title: "ANIMUS — The Living Word",
  subtitle: "How Seven Letters Named Every Creature That Breathes",
  category: "Etymology",
  readTime: "22 min",
  sourceCount: 14,
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
    { name: "Ancient Stone", color: "#8B8272" },
    { name: "Breath Gold", color: "#C9A84C" },
    { name: "Bestiary Red", color: "#8B2500" },
    { name: "Linnaeus Green", color: "#2D5A4A" },
    { name: "Darwin Brown", color: "#5C4033" },
  ],
  visualizations: [
    { name: "PIE Root Tree", type: "Animated Etymology" },
    { name: "Bestiary Gallery", type: "Photorealistic Cards" },
    { name: "Classification Timeline", type: "Interactive Timeline" },
    { name: "Era Typography Shifts", type: "Visual Morphing" },
    { name: "Key Figures Gallery", type: "Portrait Cards" },
  ],
  keySources: [
    "Aristotle, De Anima (On the Soul)",
    "Carl Linnaeus, Systema Naturae (1735)",
    "Charles Darwin, On the Origin of Species (1859)",
    "Oxford English Dictionary, 'animal' entry",
    "Jane Goodall, In the Shadow of Man",
  ],
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-animal/#article",
      "headline": "ANIMUS — The Living Word",
      "alternativeHeadline": "How Seven Letters Named Every Creature That Breathes",
      "description": "From PIE *h₂enh₁- (to breathe) to Kingdom Animalia—trace the 2,500-year journey of the word 'animal' through ancient philosophy, medieval theology, Renaissance naturalism, Linnaean classification, and Darwinian evolution.",
      "url": "https://esy.com/essays/etymology/the-word-animal/",
      "datePublished": "2025-12-12",
      "dateModified": "2025-12-12",
      "author": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com"
      },
      "image": "https://esy.com/og/the-word-animal.png",
      "articleSection": "History",
      "wordCount": 6000,
      "about": [
        { "@type": "Thing", "name": "Etymology" },
        { "@type": "Thing", "name": "Latin Language" },
        { "@type": "Thing", "name": "Natural History" },
        { "@type": "Thing", "name": "Animal Kingdom" },
        { "@type": "Thing", "name": "Evolution" }
      ],
      "mentions": [
        { "@type": "Person", "name": "Aristotle" },
        { "@type": "Person", "name": "Carl Linnaeus" },
        { "@type": "Person", "name": "Charles Darwin" },
        { "@type": "Person", "name": "Jane Goodall" }
      ],
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Word Animal", "item": "https://esy.com/essays/etymology/the-word-animal" }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "ANIMUS — The Word That Named Every Creature | Etymology Visual Essay",
  description: "From Latin 'anima' (breath, soul) to Kingdom Animalia—2,500 years of the word 'animal' through Aristotle, medieval bestiaries, Linnaeus, and Darwin. An immersive photorealistic visual essay.",
  keywords: [
    "animal etymology",
    "origin of the word animal",
    "anima meaning",
    "animalis latin",
    "aristotle animals",
    "linnaeus animalia",
    "darwin evolution animals",
    "medieval bestiary",
    "word history",
    "etymology visual essay",
    "natural history",
    "biological classification"
  ],
  openGraph: {
    title: "ANIMUS — The Living Word",
    description: "How seven letters named every creature that breathes. A 2,500-year etymology journey.",
    url: "https://esy.com/essays/etymology/the-word-animal/",
    siteName: "Esy",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-word-animal.png",
        width: 1200,
        height: 630,
        alt: "ANIMUS → ANIMAL: The Word That Named Every Creature That Breathes"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ANIMUS — The Living Word",
    description: "From breath to beast: 2,500 years of the word 'animal'.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-word-animal.png"],
  },
  alternates: {
    canonical: "https://esy.com/essays/etymology/the-word-animal/"
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

export default function WordAnimalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <WordAnimalClient />
      </ArtifactDetailWrapper>
    </>
  );
}


