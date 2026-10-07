import type { Metadata } from "next";
import EternalHoneyClient from "./EternalHoneyClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/eternal-honey/#article",
      "headline": "Eternal Honey: Into the Pyramid",
      "alternativeHeadline": "How 3,000-Year-Old Honey Remains Perfectly Edible",
      "description": "Descend into the Great Pyramid of Giza where 3,000-year-old honey was discovered still perfectly edible. A parallax journey through Egyptian tombs and the science of honey's immortality.",
      "url": "https://esy.com/essays/eternal-honey/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/eternal-honey.png",
      "articleSection": "Science",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Eternal Honey", "item": "https://esy.com/essays/eternal-honey/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Was 3,000-year-old honey really found in Egyptian tombs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, archaeologists have discovered honey pots in Egyptian tombs, including those around the time of Tutankhamun, with honey still perfectly preserved and edible after 3,000+ years. This remarkable preservation inspired the title 'food of the gods' in ancient cultures."
          }
        },
        {
          "@type": "Question",
          "name": "Why did Egyptians put honey in tombs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ancient Egyptians believed the deceased needed sustenance for their journey to the afterlife. Honey was placed in tombs as food for the dead, used in the embalming process, and offered to the gods. Its eternal nature made it symbolically perfect for eternal life."
          }
        },
        {
          "@type": "Question",
          "name": "What makes honey antibacterial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Honey's antibacterial properties come from multiple factors: glucose oxidase enzyme produces hydrogen peroxide, extremely low water content dehydrates bacteria, acidic pH creates a hostile environment, and some honeys contain unique compounds like methylglyoxal."
          }
        },
        {
          "@type": "Question",
          "name": "How did ancient Egyptians harvest honey?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ancient Egyptians were among the first beekeepers, depicted in tomb paintings from 2400 BCE. They kept bees in horizontal clay tubes and harvested honey using smoke to calm the bees. Beekeeping was so important it was supervised by royal officials."
          }
        },
        {
          "@type": "Question",
          "name": "What scientific properties prevent honey from spoiling?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Three key factors: 1) Low water content (about 17%) prevents microbial growth through osmosis, 2) High sugar concentration dehydrates any bacteria, 3) Acidic pH (3.4-6.1) inhibits microorganisms. Together these create an environment where nothing can survive."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Eternal Honey: Into the Pyramid | Esy",
  description:
    "Descend into the Great Pyramid of Giza where 3,000-year-old honey was discovered still perfectly edible. A parallax journey through Egyptian tombs and the science of honey's immortality.",
  keywords: [
    "eternal honey",
    "Egyptian pyramid",
    "Tutankhamun tomb",
    "honey never spoils",
    "Great Pyramid of Giza",
    "Howard Carter discovery",
    "ancient Egypt honey",
    "honey preservation science",
    "archaeological discovery",
    "scrollytelling",
    "parallax experience",
    "interactive history"
  ],
  openGraph: {
    title: "Eternal Honey: Into the Pyramid",
    description:
      "Descend into the Great Pyramid where 3,000-year-old honey was found still edible. A parallax journey through tombs and science.",
    type: "article",
    url: "https://esy.com/essays/eternal-honey/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/eternal-honey.png",
        width: 1200,
        height: 630,
        alt: "Eternal Honey - Pyramid Edition"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Eternal Honey: Into the Pyramid",
    description:
      "Descend into the Great Pyramid where 3,000-year-old honey was found still edible.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/eternal-honey.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/eternal-honey/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function EternalHoneyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EternalHoneyClient />
    </>
  );
}
