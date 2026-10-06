import type { Metadata } from "next";
import FentanylTimelineClient from "./FentanylTimelineClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/fentanyl-crisis-timeline/#article",
      "headline": "Fentanyl: A Timeline of a Synthetic Drug",
      "alternativeHeadline": "How a Hospital Anesthetic Became a Leading Cause of Overdose Deaths",
      "description": "How did a hospital anesthetic become a leading cause of overdose deaths? A chronological examination of fentanyl's journey from medical innovation to public health crisis.",
      "url": "https://esy.com/essays/history/fentanyl-crisis-timeline/",
      "datePublished": "2025-12-15",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/fentanyl-crisis-timeline.png",
      "articleSection": "Public Health",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "History", "item": "https://esy.com/essays/history/" },
        { "@type": "ListItem", "position": 4, "name": "Fentanyl Crisis Timeline", "item": "https://esy.com/essays/history/fentanyl-crisis-timeline/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When was fentanyl invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fentanyl was synthesized in 1960 by Paul Janssen, a Belgian chemist at Janssen Pharmaceutica. It was developed as a powerful surgical anesthetic and approved for medical use in 1968. It's 50-100 times more potent than morphine."
          }
        },
        {
          "@type": "Question",
          "name": "What is fentanyl used for medically?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Medically, fentanyl is used as an anesthetic during surgery, for chronic pain management (patches, lozenges), and for cancer pain when other opioids fail. It's fast-acting and highly effective for severe pain, but requires careful dosing due to its potency."
          }
        },
        {
          "@type": "Question",
          "name": "Why is illicit fentanyl so dangerous?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Illicit fentanyl is dangerous because it's extremely potent—a dose as small as 2 milligrams (about the size of a few grains of salt) can be lethal. Street drugs are often laced with fentanyl without users' knowledge, and dosing is unpredictable in illegal manufacturing."
          }
        },
        {
          "@type": "Question",
          "name": "How did fentanyl enter the illegal drug supply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Illicit fentanyl began appearing in the US drug supply around 2013, primarily manufactured in clandestine labs in China and later Mexico. It's cheap to produce and highly potent, making it profitable to mix with heroin, cocaine, and counterfeit pills. The opioid epidemic created demand."
          }
        },
        {
          "@type": "Question",
          "name": "How many people die from fentanyl overdoses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Synthetic opioids (primarily fentanyl) now account for over 70,000 US overdose deaths annually—more than car accidents or gun violence. This represents a dramatic increase from fewer than 3,000 in 2013. Fentanyl has become the leading cause of death for Americans ages 18-45."
          }
        },
        {
          "@type": "Question",
          "name": "What is naloxone (Narcan)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Naloxone (brand name Narcan) is an opioid antagonist that can reverse fentanyl overdoses within minutes. It blocks opioid receptors and restores breathing. It's now available over-the-counter in the US. Multiple doses may be needed for fentanyl due to its high potency."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Fentanyl: A Timeline of a Synthetic Drug | Esy",
  description:
    "How did a hospital anesthetic become a leading cause of overdose deaths? A chronological examination of fentanyl's journey from medical innovation to public health crisis.",
  keywords: [
    "fentanyl",
    "opioid crisis",
    "synthetic opioids",
    "drug history",
    "public health",
    "overdose",
    "timeline"
  ],
  openGraph: {
    title: "Fentanyl: A Timeline of a Synthetic Drug",
    description:
      "How did a hospital anesthetic become a leading cause of overdose deaths?",
    type: "article",
    url: "https://esy.com/essays/history/fentanyl-crisis-timeline/",
    publishedTime: "2025-12-15",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/fentanyl-crisis-timeline.png",
        width: 1200,
        height: 630,
        alt: "Fentanyl: A Timeline of a Synthetic Drug"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fentanyl: A Timeline of a Synthetic Drug",
    description:
      "How did a hospital anesthetic become a leading cause of overdose deaths?",
    site: "@EsyResearch",
    images: ["https://esy.com/og/fentanyl-crisis-timeline.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/history/fentanyl-crisis-timeline/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function FentanylTimelinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FentanylTimelineClient />
    </>
  );
}



