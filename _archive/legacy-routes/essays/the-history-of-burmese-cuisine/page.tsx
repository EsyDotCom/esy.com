import { Metadata } from "next";
import BurmeseCuisineClient from "./BurmeseCuisineClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-history-of-burmese-cuisine/#article",
      "headline": "The History, Evolution, and Authenticity of Burmese Cuisine",
      "alternativeHeadline": "From Pyu Fermentation to Diaspora Tables",
      "description":
        "From Pyu fermentation to diaspora tables: explore 2,000 years of Burmese culinary heritage through ngapi, mohinga, laphet thoke, and the crossroads flavors of Myanmar. မြန်မာအစားအစာ သမိုင်း",
      "url": "https://esy.com/essays/the-history-of-burmese-cuisine/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://upload.wikimedia.org/wikipedia/commons/4/40/Myanmar%E2%80%99s_Traditional_Food_-_Mohinga.jpg",
      "articleSection": "Food History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The History of Burmese Cuisine", "item": "https://esy.com/essays/the-history-of-burmese-cuisine/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the cornerstone of Burmese cuisine?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fermentation and ngapi (fermented fish paste) underpin many Burmese dishes, providing the umami base across regions."
          }
        },
        {
          "@type": "Question",
          "name": "What is Myanmar's national dish?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mohinga, a rice noodle soup with fish broth and aromatics, is widely regarded as Myanmar's national dish."
          }
        },
        {
          "@type": "Question",
          "name": "What is laphet thoke?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Laphet thoke is a tea leaf salad made with fermented tea leaves, crunchy beans, nuts, aromatics, and citrus—an iconic Burmese staple."
          }
        },
        {
          "@type": "Question",
          "name": "How did trade routes influence Burmese food?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Crossroads trade brought Indian, Chinese, and Thai influences, layering spices, noodles, and stir-fry techniques onto indigenous ferments."
          }
        },
        {
          "@type": "Question",
          "name": "How has the diaspora shaped modern Burmese cuisine?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Diaspora kitchens preserved classics like mohinga and laphet thoke while adapting to new ingredients, making Burmese flavors more global."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The History, Evolution, and Authenticity of Burmese Cuisine | Esy",
  description:
    "From Pyu fermentation to diaspora tables: explore 2,000 years of Burmese culinary heritage through ngapi, mohinga, laphet thoke, and the crossroads flavors of Myanmar. မြန်မာအစားအစာ သမိုင်း",
  keywords: [
    "Burmese cuisine",
    "Myanmar food",
    "mohinga",
    "laphet thoke",
    "ngapi",
    "fermented fish paste",
    "tea leaf salad",
    "si pyan",
    "Burmese curry",
    "Southeast Asian food history",
    "Myanmar culinary traditions",
    "Burmese food culture",
    "Mandalay cuisine",
    "Yangon street food",
    "Shan noodles"
  ],
  authors: [{ name: "Esy Visual Essays" }],
  openGraph: {
    title: "The History, Evolution, and Authenticity of Burmese Cuisine",
    description:
      "A visual journey through 2,000 years of Myanmar's culinary heritage — from ancient fermentation to modern diaspora kitchens.",
    type: "article",
    url: "https://esy.com/essays/the-history-of-burmese-cuisine/",
    locale: "en_US",
    siteName: "Esy",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/4/40/Myanmar%E2%80%99s_Traditional_Food_-_Mohinga.jpg",
        width: 1200,
        height: 630,
        alt: "Mohinga - Myanmar's national dish, a fish-based rice noodle soup"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The History of Burmese Cuisine | Esy Visual Essay",
    description:
      "Explore 2,000 years of Myanmar's culinary heritage through an immersive visual journey.",
    site: "@EsyResearch",
    images: ["https://upload.wikimedia.org/wikipedia/commons/4/40/Myanmar%E2%80%99s_Traditional_Food_-_Mohinga.jpg"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-history-of-burmese-cuisine/"
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

export default function BurmeseCuisinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BurmeseCuisineClient />
    </>
  );
}
