import type { Metadata } from "next";
import RwandaGenocideClient from "./RwandaGenocideClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-rwanda-genocide/#article",
      "headline": "Kwibuka: A Hundred Days of Darkness, A Generation of Light",
      "alternativeHeadline": "The 1994 Genocide Against the Tutsi and Rwanda's Remarkable Transformation",
      "description": "How colonial division and international abandonment enabled the murder of one million Rwandans—and how a shattered nation chose reconciliation over revenge to become Africa's most remarkable transformation.",
      "url": "https://esy.com/essays/the-rwanda-genocide/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-rwanda-genocide.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Rwanda Genocide", "item": "https://esy.com/essays/the-rwanda-genocide/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What happened during the Rwandan genocide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Between April and July 1994, extremist Hutu militias and civilians systematically murdered approximately one million Tutsi and moderate Hutu over 100 days. It was one of the fastest genocides in history, with neighbors killing neighbors using machetes and clubs."
          }
        },
        {
          "@type": "Question",
          "name": "What caused the Rwandan genocide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The genocide had roots in Belgian colonial policies that created rigid ethnic divisions between Hutu and Tutsi. Decades of political manipulation, propaganda dehumanizing Tutsi as 'cockroaches,' and the assassination of President Habyarimana triggered the violence."
          }
        },
        {
          "@type": "Question",
          "name": "Why didn't the world stop the Rwandan genocide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Despite clear warnings, the UN reduced its peacekeeping force during the genocide. The US avoided using the word 'genocide' to evade intervention obligations. Belgium withdrew after 10 soldiers were killed. The international community's failure remains a profound moral stain."
          }
        },
        {
          "@type": "Question",
          "name": "What are Gacaca courts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gacaca courts were community-based justice tribunals Rwanda created to handle the overwhelming number of genocide suspects. Between 2002-2012, these grassroots courts tried nearly two million cases, blending traditional reconciliation with formal justice."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'Kwibuka' mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "'Kwibuka' means 'to remember' in Kinyarwanda. It's the name for Rwanda's annual 100-day mourning period commemorating the genocide. Rwandans light flames, hold vigils, and honor victims while reaffirming their commitment to 'never again.'"
          }
        },
        {
          "@type": "Question",
          "name": "How has Rwanda recovered from the genocide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rwanda has achieved remarkable recovery: economic growth averaging 8% annually, near-universal healthcare, Africa's highest percentage of women in parliament (61%), and the continent's cleanest cities. President Paul Kagame's government emphasizes national unity over ethnic identity."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Kwibuka: A Hundred Days of Darkness, A Generation of Light | Esy",
  description:
    "How colonial division and international abandonment enabled the murder of one million Rwandans—and how a shattered nation chose reconciliation over revenge to become Africa's most remarkable transformation. A photorealistic visual essay bearing witness to the 1994 Genocide against the Tutsi.",
  keywords: [
    "Rwanda genocide",
    "1994 genocide",
    "Tutsi",
    "Hutu",
    "Kwibuka",
    "Paul Kagame",
    "Kigali",
    "genocide remembrance",
    "reconciliation",
    "Gacaca courts",
    "African history",
    "colonialism",
    "UN failure",
    "RPF",
    "East Africa",
    "never again",
    "visual essay",
    "scrollytelling",
  ],
  openGraph: {
    title: "Kwibuka: A Hundred Days of Darkness, A Generation of Light",
    description:
      "How colonial division and international abandonment enabled the murder of one million Rwandans—and how a shattered nation chose reconciliation over revenge.",
    type: "article",
    url: "https://esy.com/essays/the-rwanda-genocide/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-rwanda-genocide.png",
        width: 1200,
        height: 630,
        alt: "Kwibuka - Rwanda Genocide Memorial Visual Essay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kwibuka: A Hundred Days of Darkness, A Generation of Light",
    description:
      "A photorealistic visual essay bearing witness to the 1994 Genocide against the Tutsi in Rwanda.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-rwanda-genocide.png"]
  },
  authors: [{ name: "Esy" }],
  alternates: {
    canonical: "https://esy.com/essays/the-rwanda-genocide/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function RwandaGenocidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RwandaGenocideClient />
    </>
  );
}
