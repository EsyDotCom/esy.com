import type { Metadata } from "next";
import PalestineIsraelClient from "./PalestineIsraelClient";

/**
 * ERETZ / FILASTIN: A Land of Many Names, A People's Many Griefs
 * ==============================================================
 * A Photographic History from Deep Antiquity to Today
 *
 * A comprehensive visual essay tracing the history of the land known as
 * Palestine, Israel, and many other names across four millennia.
 *
 * Research Package: /orchestration/skills/visual-essay-invocation/research/palestine-israel/
 * Spec: /orchestration/skills/visual-essay-invocation/specs/palestine-israel.md
 * Design Research: /orchestration/skills/visual-essay-invocation/specs/palestine-israel-design-research.md
 *
 * CONTENT WARNING: This essay documents contested history and ongoing conflict,
 * including war, displacement, and violence.
 */

// JSON-LD structured data for rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/palestine-israel/#article",
      "headline": "Eretz / Filastin: A Land of Many Names",
      "alternativeHeadline": "A Photographic History from Deep Antiquity to Today",
      "description": "A comprehensive visual essay tracing the history of the land known as Palestine, Israel, Canaan, Judea, and many other names—from deep antiquity through the present conflict. Explores archaeology, empires, nationalisms, and the contested claims of two peoples.",
      "url": "https://esy.com/essays/history/palestine-israel/",
      "datePublished": "2024-12-23",
      "dateModified": "2024-12-23",
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
      "image": "https://esy.com/og/palestine-israel.png",
      "articleSection": "History",
      "wordCount": 25000,
      "about": [
        { "@type": "Thing", "name": "History of Palestine" },
        { "@type": "Thing", "name": "History of Israel" },
        { "@type": "Thing", "name": "Israeli-Palestinian Conflict" },
        { "@type": "Thing", "name": "Middle East History" },
        { "@type": "Thing", "name": "Ancient Near East" },
        { "@type": "Thing", "name": "British Mandate" },
        { "@type": "Thing", "name": "Zionism" },
        { "@type": "Thing", "name": "Palestinian Nationalism" }
      ],
      "inLanguage": "en-US",
      "contentWarning": "Contains descriptions of war, displacement, and ongoing conflict"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "History", "item": "https://esy.com/essays?category=History" },
        { "@type": "ListItem", "position": 3, "name": "Palestine / Israel", "item": "https://esy.com/essays/history/palestine-israel/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is the land called both Palestine and Israel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The land has had many names across history: Canaan (Bronze Age), Israel and Judah (Iron Age kingdoms), Palaestina (Roman renaming in 135 CE), Jund Filastin (early Islamic), Palestine (British Mandate), and Israel (1948). Each name reflects different rulers and identities."
          }
        },
        {
          "@type": "Question",
          "name": "Who is indigenous to Palestine/Israel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both Jews and Palestinian Arabs have deep historical connections to the land. Jews trace a 3,000-year connection through archaeology, text, and continuous presence. Palestinian Arabs have 1,300+ years of continuous presence as the majority population. The 'indigenous' framework, designed for post-1500 colonialism, doesn't map cleanly onto this situation."
          }
        },
        {
          "@type": "Question",
          "name": "What was the Nakba?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Nakba ('catastrophe' in Arabic) refers to the displacement of 700,000+ Palestinians during the 1948 war that accompanied Israel's creation. Many fled fearing violence; others were directly expelled. Palestinian villages were destroyed, and refugees were not allowed to return. Their descendants now number 5-6 million."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Eretz / Filastin: A Land of Many Names | Palestine & Israel History | Esy",
  description:
    "A comprehensive visual essay tracing the history of the land known as Palestine, Israel, Canaan, and many other names—from deep antiquity through the present conflict. Explore archaeology, empires, nationalisms, and the contested claims of two peoples.",
  keywords: [
    "Palestine history",
    "Israel history",
    "Israeli-Palestinian conflict",
    "Nakba",
    "1948 war",
    "Zionism history",
    "Palestinian nationalism",
    "Jerusalem history",
    "British Mandate Palestine",
    "Ottoman Palestine",
    "ancient Israel",
    "Canaan",
    "Holy Land history",
    "Middle East conflict",
    "two-state solution",
    "Gaza history",
    "West Bank history",
    "occupation history",
    "visual essay",
  ],
  openGraph: {
    title: "Eretz / Filastin: A Land of Many Names",
    description:
      "A photographic history from deep antiquity to today. Explore 4,000 years of contested history through archaeology, empires, and modern nationalisms.",
    type: "article",
    url: "https://esy.com/essays/history/palestine-israel/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/palestine-israel.png",
        width: 1200,
        height: 630,
        alt: "Eretz / Filastin: A Land of Many Names - A Photographic History from Deep Antiquity to Today",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eretz / Filastin: A Land of Many Names | Esy",
    description:
      "A photographic history of Palestine/Israel from deep antiquity to today. 4,000 years of contested history explored.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/palestine-israel.png"],
  },
  alternates: {
    canonical: "https://esy.com/essays/history/palestine-israel/",
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

export default function PalestineIsraelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PalestineIsraelClient />
    </>
  );
}
