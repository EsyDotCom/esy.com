import type { Metadata } from "next";
import { FlashlightBuilderClient } from "./FlashlightBuilderClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/build-a-flashlight/#article",
      "headline": "Build Your Own LED Flashlight",
      "alternativeHeadline": "An Interactive Experience in Electronics and Physics",
      "description": "An interactive experience where you choose components, understand the physics, and build a working digital flashlight. Your decisions shape the final artifact.",
      "url": "https://esy.com/essays/build-a-flashlight/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/build-a-flashlight.png",
      "articleSection": "Education",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Build a Flashlight", "item": "https://esy.com/essays/build-a-flashlight/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Ohm's Law?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ohm's Law states that voltage equals current times resistance (V = I × R). It's fundamental to understanding circuits. In a flashlight, you use Ohm's Law to calculate the resistor needed to limit current to the LED—preventing burnout while achieving desired brightness."
          }
        },
        {
          "@type": "Question",
          "name": "How does an LED work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "LED stands for Light Emitting Diode. When current flows through the semiconductor material, electrons combine with holes and release energy as photons (light). LEDs are efficient because they convert electricity directly to light with minimal heat, unlike incandescent bulbs."
          }
        },
        {
          "@type": "Question",
          "name": "Why do LEDs need resistors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "LEDs have almost no resistance when forward-biased. Without a resistor, current would spike uncontrollably, destroying the LED. A resistor limits current to a safe level (typically 10-20mA for standard LEDs). Calculate it using: R = (Vsource - Vled) / I."
          }
        },
        {
          "@type": "Question",
          "name": "What makes LEDs more efficient than incandescent bulbs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Incandescent bulbs work by heating a filament until it glows—90% of energy becomes heat, only 10% light. LEDs convert electricity directly to photons through electroluminescence, achieving 80-90% efficiency. They also last 25-50 times longer and contain no fragile filaments."
          }
        },
        {
          "@type": "Question",
          "name": "What affects LED brightness?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "LED brightness depends on current—more current means more photons and brighter light, up to the LED's maximum rating. Beyond that, excess heat destroys the LED. Brightness is measured in lumens. Voltage must exceed the LED's forward voltage (typically 2-3V) but doesn't directly control brightness."
          }
        },
        {
          "@type": "Question",
          "name": "What battery should I use for an LED flashlight?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common choices include AA batteries (1.5V each), 9V batteries, or rechargeable lithium cells (3.7V). Your battery voltage must exceed the LED's forward voltage, with the excess dropped across a resistor. Higher voltage batteries need larger resistors to maintain safe current."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Build Your Own LED Flashlight | Esy",
  description:
    "An interactive experience where you choose components, understand the physics, and build a working digital flashlight. Your decisions shape the final artifact.",
  keywords: [
    "LED flashlight",
    "electronics",
    "Ohm's law",
    "interactive learning",
    "circuit design",
    "educational",
    "STEM",
    "maker"
  ],
  openGraph: {
    title: "Build Your Own LED Flashlight",
    description:
      "Choose components, understand the tradeoffs, and create a working digital flashlight.",
    type: "article",
    url: "https://esy.com/essays/build-a-flashlight/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/build-a-flashlight.png",
        width: 1200,
        height: 630,
        alt: "Build Your Own LED Flashlight - Interactive Essay"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Own LED Flashlight",
    description:
      "Choose components, understand the tradeoffs, and create a working digital flashlight.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/build-a-flashlight.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/build-a-flashlight/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function BuildAFlashlightPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FlashlightBuilderClient />
    </>
  );
}
