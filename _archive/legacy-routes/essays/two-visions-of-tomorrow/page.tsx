import type { Metadata } from "next";
import TwoVisionsClient from "./TwoVisionsClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/two-visions-of-tomorrow/#article",
      "headline": "Two Visions of Tomorrow: 1984 vs Brave New World",
      "alternativeHeadline": "Which Dystopia Did We Get: Surveillance or Pleasure?",
      "description": "An immersive photorealistic visual essay exploring the competing dystopian visions of George Orwell and Aldous Huxley — and how we ended up living in both. Which future did we get: surveillance or pleasure?",
      "url": "https://esy.com/essays/two-visions-of-tomorrow/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/two-visions-of-tomorrow.png",
      "articleSection": "Literature",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Two Visions of Tomorrow", "item": "https://esy.com/essays/two-visions-of-tomorrow/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between 1984 and Brave New World?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1984 depicts control through fear, surveillance, and pain—Big Brother watching your every move. Brave New World depicts control through pleasure, consumption, and distraction—people too drugged on soma and entertainment to care about freedom. Orwell feared what we hate; Huxley feared what we love."
          }
        },
        {
          "@type": "Question",
          "name": "What did Neil Postman say about Orwell vs Huxley?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In 'Amusing Ourselves to Death' (1985), Neil Postman argued Huxley was more prophetic than Orwell. He wrote: 'Orwell feared those who would deprive us of information. Huxley feared those who would give us so much that we would be reduced to passivity.' Television and entertainment, not totalitarianism, would destroy us."
          }
        },
        {
          "@type": "Question",
          "name": "When were 1984 and Brave New World written?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aldous Huxley published Brave New World in 1932, responding to American consumerism and scientific progress. George Orwell published 1984 in 1949, responding to Stalinism and totalitarianism. Both authors envisioned futures about 600 years (Huxley) or 35 years (Orwell) ahead."
          }
        },
        {
          "@type": "Question",
          "name": "Which dystopia are we living in today?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Modern life contains elements of both dystopias. We have Orwell's surveillance state (mass data collection, facial recognition, always-on cameras) combined with Huxley's pleasure principle (infinite entertainment, social media dopamine hits, consumerism). The smartphone embodies both prophecies simultaneously."
          }
        },
        {
          "@type": "Question",
          "name": "What is Big Brother in 1984?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Big Brother is the all-seeing leader of Oceania in 1984, whose face appears on posters with the warning 'Big Brother is watching you.' He represents the totalitarian surveillance state—telescreens in every home, Thought Police monitoring citizens, and the Party controlling all information and history."
          }
        },
        {
          "@type": "Question",
          "name": "What is soma in Brave New World?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soma is the government-provided drug in Brave New World that induces happiness and contentment. Citizens take 'soma holidays' to escape any negative feelings. It represents how pleasure and chemical happiness can be used as tools of social control—no need for force when people drug themselves into compliance."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Two Visions of Tomorrow: 1984 vs Brave New World | Esy",
  description:
    "An immersive photorealistic visual essay exploring the competing dystopian visions of George Orwell and Aldous Huxley — and how we ended up living in both. Which future did we get: surveillance or pleasure?",
  keywords: [
    "1984",
    "Brave New World",
    "George Orwell",
    "Aldous Huxley",
    "dystopia",
    "surveillance",
    "totalitarianism",
    "visual essay",
    "scrollytelling",
    "literary analysis",
    "Orwell vs Huxley",
    "Neil Postman",
    "Amusing Ourselves to Death"
  ],
  openGraph: {
    title: "Two Visions of Tomorrow: 1984 vs Brave New World",
    description:
      "Which dystopia did we get? An immersive exploration of Orwell's fear and Huxley's pleasure — and how the smartphone fulfills both prophecies.",
    type: "article",
    url: "https://esy.com/essays/two-visions-of-tomorrow/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/two-visions-of-tomorrow.png",
        width: 1200,
        height: 630,
        alt: "Two Visions of Tomorrow - 1984 vs Brave New World"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Two Visions of Tomorrow: 1984 vs Brave New World",
    description:
      "Which dystopia did we get? An immersive exploration of Orwell's fear and Huxley's pleasure.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/two-visions-of-tomorrow.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/two-visions-of-tomorrow/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TwoVisionsOfTomorrowPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TwoVisionsClient />
    </>
  );
}












