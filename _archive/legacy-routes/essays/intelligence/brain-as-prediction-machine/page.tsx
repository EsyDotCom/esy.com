import type { Metadata } from "next";
import BrainPredictionMachineClient from "./BrainPredictionMachineClient";

/**
 * THE BRAIN AS A PREDICTION MACHINE
 * =================================
 * A Conceptual Visual Essay
 *
 * Understanding how the brain anticipates the world through
 * predictive processing — using diagrams, not photography.
 *
 * Orchestrator: conceptual-essay-orchestrator.md
 * Research Package: orchestration/projects/brain-as-prediction-machine/research/
 * Spec: orchestration/projects/brain-as-prediction-machine/specs/brain-as-prediction-machine.md
 * Design Research: orchestration/projects/brain-as-prediction-machine/DESIGN-RESEARCH.md
 */

// JSON-LD structured data for rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/brain-as-prediction-machine/#article",
      "headline": "The Brain as a Prediction Machine",
      "alternativeHeadline": "Understanding How Your Brain Anticipates the World",
      "description": "A visual essay explaining how the brain predicts the world instead of just reacting to it. Understand prediction error, perception, learning, and attention through clear diagrams.",
      "url": "https://esy.com/essays/intelligence/brain-as-prediction-machine/",
      "datePublished": "2026-02-03",
      "dateModified": "2026-02-03",
      "author": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://esy.com/logo.png",
        },
      },
      "image": "https://esy.com/og/brain-as-prediction-machine.png",
      "articleSection": "Neuroscience",
      "wordCount": 2000,
      "about": [
        { "@type": "Thing", "name": "Predictive Processing" },
        { "@type": "Thing", "name": "Neuroscience" },
        { "@type": "Thing", "name": "Perception" },
        { "@type": "Thing", "name": "Learning" },
        { "@type": "Thing", "name": "Cognitive Science" },
      ],
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://esy.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Essays",
          "item": "https://esy.com/essays/",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Intelligence",
          "item": "https://esy.com/essays/intelligence/",
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "The Brain as a Prediction Machine",
          "item": "https://esy.com/essays/intelligence/brain-as-prediction-machine/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is predictive processing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Predictive processing is a theory of how the brain works. Instead of passively waiting for sensory input and then reacting, the brain constantly generates predictions about what will happen next and compares these predictions against reality. When there's a mismatch, it generates a 'prediction error' that drives learning.",
          },
        },
        {
          "@type": "Question",
          "name": "What is prediction error?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prediction error is the difference between what the brain predicted would happen and what actually happened. It's not a failure — it's the brain's primary learning signal. Without prediction error, the brain cannot improve its model of the world.",
          },
        },
        {
          "@type": "Question",
          "name": "Is perception a 'controlled hallucination'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In a sense, yes. What we consciously experience is not a direct copy of the world — it's the brain's best guess, constrained by sensory evidence. The 'controlled' part means reality keeps this guess in check. This isn't mystical — it's a practical consequence of how prediction-based brains work.",
          },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "The Brain as a Prediction Machine | A Conceptual Visual Essay | Esy",
  description:
    "A visual essay explaining how the brain predicts the world instead of just reacting to it. Understand prediction error, perception, learning, and attention through clear diagrams.",
  keywords: [
    "predictive processing",
    "brain prediction",
    "prediction error",
    "neuroscience explained",
    "how the brain works",
    "perception science",
    "controlled hallucination",
    "cognitive science",
    "brain efficiency",
    "learning and prediction",
    "visual essay",
    "neuroscience for beginners",
  ],
  openGraph: {
    title: "The Brain as a Prediction Machine",
    description:
      "Your brain doesn't just react — it predicts. A visual essay explaining how prediction shapes every moment of conscious experience.",
    type: "article",
    url: "https://esy.com/essays/intelligence/brain-as-prediction-machine/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/brain-as-prediction-machine.png",
        width: 1200,
        height: 630,
        alt: "The Brain as a Prediction Machine - A Conceptual Visual Essay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Brain as a Prediction Machine | Esy",
    description:
      "Your brain doesn't react to the world — it predicts it. A visual essay on how prediction shapes perception, learning, and attention.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/brain-as-prediction-machine.png"],
  },
  alternates: {
    canonical: "https://esy.com/essays/intelligence/brain-as-prediction-machine/",
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

export default function BrainPredictionMachinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BrainPredictionMachineClient />
    </>
  );
}
