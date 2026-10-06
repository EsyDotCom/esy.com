import type { Metadata } from "next";
import { Suspense } from "react";
import GuidesClient from "./GuidesClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://esy.com/essays/guides/#webpage",
      "name": "Essay Writing Guides",
      "description": "Step-by-step interactive guides to master essay writing. Learn structure, thesis statements, introductions, arguments, and more through visual tutorials.",
      "url": "https://esy.com/essays/guides/",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Esy",
        "url": "https://esy.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Writing Guides", "item": "https://esy.com/essays/guides/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I write a good thesis statement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A strong thesis statement is specific, arguable, and previews your essay's main points. It should make a clear claim that you'll support with evidence. Avoid vague statements like 'This essay will discuss...' Instead, state your position directly: 'The industrial revolution fundamentally changed family structures by...'"
          }
        },
        {
          "@type": "Question",
          "name": "What is the 5-paragraph essay structure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 5-paragraph essay includes an introduction (with thesis), three body paragraphs (each with a topic sentence, evidence, and analysis), and a conclusion. While useful for beginners, advanced essays often move beyond this structure to accommodate complex arguments."
          }
        },
        {
          "@type": "Question",
          "name": "How do I start an essay introduction?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Start with a hook—a surprising fact, question, quote, or anecdote that engages readers. Then provide context that narrows from general to specific, leading to your thesis statement at the end of the introduction paragraph."
          }
        },
        {
          "@type": "Question",
          "name": "How do I write a strong conclusion?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A strong conclusion restates your thesis in new words, synthesizes your main points (don't just repeat them), and ends with a broader implication, call to action, or thought-provoking question. Avoid introducing new arguments in your conclusion."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between argumentative and expository essays?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Argumentative essays make a claim and persuade readers using evidence and reasoning—you're taking a side. Expository essays explain or inform without arguing a position. Argumentative essays use persuasive techniques; expository essays present balanced information objectively."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Essay Writing Guides - Learn to Write Better Essays | Esy",
  description:
    "Step-by-step interactive guides to master essay writing. Learn structure, thesis statements, introductions, arguments, and more through visual tutorials.",
  keywords: [
    "how to write an essay",
    "essay writing guide",
    "essay structure guide",
    "thesis statement guide",
    "essay writing tips",
    "academic writing guide",
    "essay introduction",
    "essay conclusion",
    "argumentative essay guide",
  ],
  openGraph: {
    title: "Essay Writing Guides - Learn to Write Better Essays",
    description:
      "Master essay writing with interactive step-by-step guides. From brainstorming to final draft.",
    url: "https://esy.com/essays/guides/",
    type: "website",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/guides.png",
        width: 1200,
        height: 630,
        alt: "Essay Writing Guides - Esy"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Essay Writing Guides | Esy",
    description:
      "Master essay writing with interactive step-by-step guides.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/guides.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/guides/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="guides-loading" />}>
        <GuidesClient />
      </Suspense>
    </>
  );
}
