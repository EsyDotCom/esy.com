import type { Metadata } from "next";
import HumanEvolutionClient from "./HumanEvolutionClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/human-evolution/#article",
      "headline": "Human Evolution, Visualized",
      "alternativeHeadline": "7 Million Years of Our Story",
      "description":
        "An interactive visual essay tracing the 7-million-year journey from the earliest hominins to modern humans. Explore fossil evidence, genetic discoveries, and the branching tree of human ancestry through data visualizations, timelines, and verified scientific sources.",
      "url": "https://esy.com/essays/history/human-evolution/",
      "datePublished": "2025-12-29",
      "dateModified": "2025-12-29",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/human-evolution.png",
      "articleSection": "History",
      "inLanguage": "en-US",
      "about": [
        { "@type": "Thing", "name": "Human evolution" },
        { "@type": "Thing", "name": "Paleoanthropology" },
        { "@type": "Thing", "name": "Hominins" },
        { "@type": "Thing", "name": "Fossil record" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "History", "item": "https://esy.com/essays/history/" },
        { "@type": "ListItem", "position": 4, "name": "Human Evolution", "item": "https://esy.com/essays/history/human-evolution/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When did humans first evolve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The oldest known Homo sapiens fossils date to approximately 315,000 years ago, discovered at Jebel Irhoud in Morocco. However, our hominin ancestors—the lineage that split from chimpanzees—extend back approximately 6-7 million years."
          }
        },
        {
          "@type": "Question",
          "name": "Did humans evolve from chimpanzees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Humans and chimpanzees share a common ancestor that lived approximately 6-7 million years ago. We are cousins on the evolutionary tree, not descendants of modern chimps."
          }
        },
        {
          "@type": "Question",
          "name": "What is the 'missing link' in human evolution?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The concept of a 'missing link' is outdated. Human evolution is not a linear chain but a branching bush with many species. We have discovered numerous transitional fossils, including Australopithecus, Homo habilis, and Homo erectus, that document the gradual changes in our lineage."
          }
        },
        {
          "@type": "Question",
          "name": "Do modern humans have Neanderthal DNA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Most people of non-African descent carry approximately 1-2% Neanderthal DNA, evidence of interbreeding between Homo sapiens and Neanderthals around 50,000 years ago. Some populations also carry Denisovan DNA."
          }
        },
        {
          "@type": "Question",
          "name": "Where did modern humans originate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Anatomically modern humans (Homo sapiens) evolved in Africa, with the oldest fossils found in Morocco (Jebel Irhoud, 315,000 years ago) and Ethiopia (Omo Kibish, 233,000 years ago). Current evidence suggests a pan-African origin with population structure across the continent."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Human Evolution, Visualized: 7 Million Years of Our Story | Esy",
  description:
    "An interactive visual essay tracing the 7-million-year journey from the earliest hominins to modern humans. Explore fossil evidence, genetic discoveries, and the branching tree of human ancestry.",
  keywords: [
    "human evolution",
    "hominin",
    "fossil record",
    "paleoanthropology",
    "Homo sapiens",
    "Neanderthal",
    "Denisovan",
    "Lucy",
    "Australopithecus",
    "Homo erectus",
    "Out of Africa",
    "human origins",
    "ancient DNA",
    "visual essay",
    "interactive timeline",
    "evolutionary biology"
  ],
  openGraph: {
    title: "Human Evolution, Visualized: 7 Million Years of Our Story",
    description:
      "From the first bipedal steps to the genetic revolution—explore 7 million years of human evolution through interactive timelines and fossil evidence.",
    type: "article",
    url: "https://esy.com/essays/history/human-evolution/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/human-evolution.png",
        width: 1200,
        height: 630,
        alt: "Human Evolution, Visualized: 7 Million Years of Our Story"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Human Evolution, Visualized",
    description:
      "7 million years of our story—from the earliest hominins to modern humans. An interactive visual essay exploring fossil evidence, genetics, and human ancestry.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/human-evolution.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/history/human-evolution/"
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

export default function HumanEvolutionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HumanEvolutionClient />
    </>
  );
}
