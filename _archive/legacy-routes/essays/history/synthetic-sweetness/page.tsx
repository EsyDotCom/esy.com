import type { Metadata } from "next";
import SyntheticSweetnessClient from "./SyntheticSweetnessClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/synthetic-sweetness/#article",
      "headline": "Synthetic Sweetness: How Chemistry Changed the Taste of America",
      "alternativeHeadline": "The Accidental Discoveries That Created Zero-Calorie Sweetness",
      "description":
        "A photo-driven visual essay chronicling humanity's 8,000-year quest for sweetness—from sugar cane fields to laboratory accidents. Discover how every artificial sweetener was discovered by someone who tasted something they shouldn't have.",
      "url": "https://esy.com/essays/history/synthetic-sweetness/",
      "datePublished": "2025-12-20",
      "dateModified": "2025-12-20",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/synthetic-sweetness.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "History", "item": "https://esy.com/essays/history/" },
        { "@type": "ListItem", "position": 4, "name": "Synthetic Sweetness", "item": "https://esy.com/essays/history/synthetic-sweetness/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are artificial sweeteners safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Current regulatory consensus says yes, at levels within established ADIs (Acceptable Daily Intakes). However, the WHO's 2023 guideline recommends against using them for weight control, and scientific debate continues."
          }
        },
        {
          "@type": "Question",
          "name": "How was saccharin discovered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In June 1878, chemist Constantine Fahlberg noticed a sweet taste on his fingers at dinner after working in Ira Remsen's laboratory at Johns Hopkins. He traced it to a compound he'd synthesized—saccharin, 300 times sweeter than sugar."
          }
        },
        {
          "@type": "Question",
          "name": "Why is cyclamate banned in the US but legal in Europe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The US banned cyclamate in 1969 based on a rat study showing bladder tumors. The mechanism causing those tumors doesn't apply to humans. Most other countries have re-evaluated the evidence and approved cyclamate."
          }
        },
        {
          "@type": "Question",
          "name": "What did the WHO say about artificial sweeteners in 2023?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In May 2023, the WHO recommended against using non-sugar sweeteners for weight control, citing lack of long-term benefit evidence. This was a conditional recommendation based on systematic review."
          }
        },
        {
          "@type": "Question",
          "name": "When did US sweetener consumption peak?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "US per capita sweetener consumption peaked in 1999 at 153.6 pounds per year. By 2023, it had declined 19.6% to 123.5 pounds—still historically unprecedented, but down from the peak."
          }
        },
        {
          "@type": "Question",
          "name": "Is stevia really natural?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stevia comes from a plant, but commercial products are highly processed extracts involving water extraction, chemical precipitation, and crystallization. 'Natural' describes origin, not production method."
          }
        },
        {
          "@type": "Question",
          "name": "What is the ADI for aspartame?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The JECFA (WHO/FAO) ADI for aspartame is 40 mg/kg body weight per day. The FDA's ADI is 50 mg/kg. For a 70kg adult, that's roughly 14 cans of diet soda to exceed the JECFA limit."
          }
        },
        {
          "@type": "Question",
          "name": "Why did Roosevelt call someone an 'idiot' over saccharin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In 1907, Harvey Wiley tried to ban saccharin as an adulterant. President Roosevelt, who used saccharin on his doctor's orders, told Wiley: 'Anybody who says saccharin is injurious to health is an idiot.'"
          }
        },
        {
          "@type": "Question",
          "name": "What is the most potent sweetener?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Advantame, approved by the FDA in 2014, is 20,000 times sweeter than sugar—the most potent high-intensity sweetener approved for use."
          }
        },
        {
          "@type": "Question",
          "name": "How many artificial sweeteners were discovered accidentally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All of the major ones: saccharin (1878), cyclamate (1937), aspartame (1965), acesulfame-K (1967), and sucralose (1976) were all discovered when chemists accidentally tasted compounds they were working with."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Synthetic Sweetness: How Chemistry Changed the Taste of America | Esy",
  description:
    "A photo-driven visual essay chronicling humanity's 8,000-year quest for sweetness—from sugar cane fields to laboratory accidents. Discover how every artificial sweetener was discovered by someone who tasted something they shouldn't have.",
  keywords: [
    "artificial sweeteners",
    "saccharin",
    "aspartame",
    "sucralose",
    "stevia",
    "sugar history",
    "FDA approval",
    "cyclamate",
    "diet soda",
    "sweetener safety",
    "non-nutritive sweeteners",
    "food additives",
    "visual essay",
    "historical documentary"
  ],
  openGraph: {
    title: "Synthetic Sweetness: How Chemistry Changed the Taste of America",
    description:
      "From sugar cane to saccharin—the 8,000-year quest for sweetness without consequences.",
    type: "article",
    url: "https://esy.com/essays/history/synthetic-sweetness/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/synthetic-sweetness.png",
        width: 1200,
        height: 630,
        alt: "Synthetic Sweetness: How Chemistry Changed the Taste of America"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Synthetic Sweetness: How Chemistry Changed the Taste of America",
    description:
      "Every artificial sweetener was discovered by accident. A visual essay about science, regulation, and the taste we can't escape.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/synthetic-sweetness.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/history/synthetic-sweetness/"
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

export default function SyntheticSweetnessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SyntheticSweetnessClient />
    </>
  );
}
