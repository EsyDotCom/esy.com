import { Metadata } from "next";
import ThinkingMachineClient from "./ThinkingMachineClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-thinking-machine/#article",
      "headline": "The Thinking Machine: A Visual History of AI",
      "alternativeHeadline": "From Turing to ChatGPT—80 Years of Artificial Intelligence",
      "description": "From Alan Turing's wartime imaginings to ChatGPT—an immersive visual journey through 80 years of artificial intelligence. Experience the dreamers, the winters, and the revolution through archival photography and cinematic scroll-driven storytelling.",
      "url": "https://esy.com/essays/the-thinking-machine/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-thinking-machine.png",
      "articleSection": "Technology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Thinking Machine", "item": "https://esy.com/essays/the-thinking-machine/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When was artificial intelligence invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The field of artificial intelligence was formally founded at the Dartmouth Conference in 1956, where John McCarthy coined the term. However, foundational ideas came earlier from Alan Turing's 1950 paper 'Computing Machinery and Intelligence.'"
          }
        },
        {
          "@type": "Question",
          "name": "What is the Turing Test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Turing Test, proposed by Alan Turing in 1950, evaluates a machine's ability to exhibit intelligent behavior indistinguishable from a human. If a human evaluator cannot reliably tell the machine from a human through conversation, the machine passes the test."
          }
        },
        {
          "@type": "Question",
          "name": "What were the AI winters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI winters were periods of reduced funding and interest in AI research, occurring roughly from 1974-1980 and 1987-1993. They followed cycles of overpromising and underdelivering, when AI failed to meet inflated expectations."
          }
        },
        {
          "@type": "Question",
          "name": "Who invented deep learning?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Geoffrey Hinton, Yann LeCun, and Yoshua Bengio are considered the 'godfathers of deep learning.' Hinton's 2006 breakthrough in training deep neural networks ignited the current AI revolution. They shared the 2018 Turing Award for this work."
          }
        },
        {
          "@type": "Question",
          "name": "When was ChatGPT released?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ChatGPT was released by OpenAI on November 30, 2022. It reached 100 million users in two months, making it the fastest-growing consumer application in history and bringing large language models into mainstream awareness."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between AI and machine learning?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI is the broader concept of machines simulating human intelligence. Machine learning is a subset of AI where systems learn from data rather than explicit programming. Deep learning, using neural networks with many layers, is a further subset of machine learning."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Thinking Machine: A Visual History of AI | Esy",
  description:
    "From Alan Turing's wartime imaginings to ChatGPT—an immersive visual journey through 80 years of artificial intelligence. Experience the dreamers, the winters, and the revolution through archival photography and cinematic scroll-driven storytelling.",
  keywords: [
    "artificial intelligence history",
    "AI history",
    "Alan Turing",
    "machine learning",
    "neural networks",
    "deep learning",
    "Geoffrey Hinton",
    "ChatGPT",
    "OpenAI",
    "Dartmouth conference",
    "AI winter",
    "computer science history",
    "Turing test",
    "visual essay",
    "interactive history",
  ],
  openGraph: {
    title: "The Thinking Machine: A Visual History of Artificial Intelligence",
    description:
      "From Turing's question to ChatGPT's answer—80 years of humanity's quest to build minds from mathematics. An immersive photo-driven visual essay.",
    url: "https://esy.com/essays/the-thinking-machine/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-thinking-machine.png",
        width: 1200,
        height: 630,
        alt: "The Thinking Machine: A Visual History of AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Thinking Machine: A Visual History of AI",
    description:
      "From Turing to ChatGPT—80 years of artificial intelligence history through immersive visual storytelling.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-thinking-machine.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-thinking-machine/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function ThinkingMachinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ThinkingMachineClient />
    </>
  );
}
