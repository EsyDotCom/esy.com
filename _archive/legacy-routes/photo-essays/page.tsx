import { Metadata } from "next";
import PhotoEssaysClient from "./PhotoEssaysClient";
import { photoEssays } from "@/data/visualEssays";

/**
 * Photo Essays Landing Page
 * 
 * SEO Strategy:
 * - Target keyword: "photo essays" (600/mo, KD 1)
 * - Secondary: "photo essay examples", "documentary photography", "visual storytelling"
 * - Featured snippet target: "What is a Photo Essay?" definition paragraph
 * - Schema: CollectionPage + BreadcrumbList for rich results
 */

// Build article schemas for each photo essay in the collection
const articleSchemas = photoEssays.map(essay => ({
  "@type": "Article",
  "headline": essay.title,
  "alternativeHeadline": essay.subtitle,
  "description": essay.description,
  "url": `https://esy.com${essay.href}`,
  "author": {
    "@type": "Organization",
    "name": "Esy",
    "url": "https://esy.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Esy",
    "url": "https://esy.com"
  },
  "articleSection": essay.category,
  "inLanguage": "en-US"
}));

// JSON-LD structured data - CollectionPage + BreadcrumbList
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://esy.com/photo-essays#collection",
      "name": "Photo Essays - Documentary Visual Storytelling",
      "description": "Immersive photo essays exploring history, culture, and humanity through archival photography. Documentary visual storytelling built on scholarly research.",
      "url": "https://esy.com/photo-essays",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": photoEssays.map((essay, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": essay.title,
          "url": `https://esy.com${essay.href}`
        }))
      },
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://esy.com/#website",
        "name": "Esy",
        "url": "https://esy.com"
      },
      "about": [
        {
          "@type": "Thing",
          "name": "Photo Essays"
        },
        {
          "@type": "Thing",
          "name": "Documentary Photography"
        },
        {
          "@type": "Thing",
          "name": "Visual Storytelling"
        }
      ],
      "hasPart": articleSchemas,
      "numberOfItems": photoEssays.length,
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://esy.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Essays",
          "item": "https://esy.com/essays"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Photo Essays",
          "item": "https://esy.com/photo-essays"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://esy.com/photo-essays#webpage",
      "url": "https://esy.com/photo-essays",
      "name": "Photo Essays - Documentary Visual Storytelling | Esy",
      "description": "Immersive photo essays exploring history through archival photography. Experience the Manhattan Project, Holocaust, AI history, and more.",
      "isPartOf": {
        "@id": "https://esy.com/#website"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://esy.com/og/photo-essays.jpg"
      },
      "breadcrumb": {
        "@id": "https://esy.com/photo-essays#breadcrumb"
      },
      "inLanguage": "en-US"
    }
  ]
};

// Metadata following SEO specialist best practices
export const metadata: Metadata = {
  // Title: Keyword front-loaded, 55 chars (under 60)
  title: "Photo Essays | Documentary Visual Storytelling | Esy",
  
  // Description: 158 chars with CTA (under 160)
  description: "Immersive photo essays exploring history through archival photography. Experience the Manhattan Project, Holocaust, and AI history. Start your journey now.",
  
  // Keywords for semantic SEO
  keywords: [
    "photo essays",
    "photo essay examples",
    "documentary photography",
    "visual storytelling",
    "archival photography",
    "photojournalism",
    "historical photography",
    "photo documentary",
    "visual narrative",
    "immersive storytelling"
  ],
  
  // Open Graph for social sharing
  openGraph: {
    title: "Photo Essays | Documentary Visual Storytelling",
    description: "Immersive photo essays exploring history through archival photography and documentary visual narratives.",
    url: "https://esy.com/photo-essays",
    siteName: "Esy",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/photo-essays.jpg",
        width: 1200,
        height: 630,
        alt: "Photo Essays - Documentary visual storytelling through archival photography"
      }
    ]
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Photo Essays | Documentary Visual Storytelling",
    description: "Immersive photo essays exploring history through archival photography.",
    images: ["https://esy.com/og/photo-essays.jpg"],
    creator: "@esywriting"
  },
  
  // Canonical URL
  alternates: {
    canonical: "https://esy.com/photo-essays/"
  },
  
  // Robots directives
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1
  },
  
  // Authors and publisher
  authors: [{ name: "Esy", url: "https://esy.com" }],
  publisher: "Esy",
  
  // Category
  category: "education"
};

export default function PhotoEssaysPage() {
  return (
    <>
      {/* JSON-LD Structured Data for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PhotoEssaysClient />
    </>
  );
}











