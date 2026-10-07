import type { Metadata } from "next";
import { Suspense } from "react";
import FlavorsOfTheEastClient from "./FlavorsOfTheEastClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/flavors-of-the-east/#article",
      "headline": "Flavors of the East: A Culinary Journey Through Asia",
      "alternativeHeadline": "How Soy Sauce, Fish Sauce, and Fermented Ingredients Shaped Asian Cuisine",
      "description": "Explore the rich culinary history of China, Thailand, and Myanmar through an immersive scrollytelling experience. Discover how soy sauce, fish sauce, and fermented ingredients shaped Asian cuisine across centuries.",
      "url": "https://esy.com/essays/flavors-of-the-east/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/flavors-of-the-east.png",
      "articleSection": "Food History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Flavors of the East", "item": "https://esy.com/essays/flavors-of-the-east/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How old is soy sauce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soy sauce originated in China over 2,000 years ago during the Han Dynasty. The earliest versions were made by fermenting soybeans and grain with salt. Chinese Buddhist monks brought soy sauce to Japan around the 7th century, where shoyu developed its distinct character."
          }
        },
        {
          "@type": "Question",
          "name": "What is fish sauce and where does it come from?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fish sauce is fermented fish and salt, used across Southeast Asia for thousands of years. The Roman garum was a similar product. Thai nam pla, Vietnamese nuoc mam, and other regional varieties provide the umami backbone to dishes from Pad Thai to pho."
          }
        },
        {
          "@type": "Question",
          "name": "What is Mohinga?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mohinga is Myanmar's national dish—a fish-based rice noodle soup traditionally eaten for breakfast. Made with catfish, banana stem, and a complex spice paste, it's served with crispy fritters and fresh herbs. Mohinga represents centuries of Burmese culinary tradition."
          }
        },
        {
          "@type": "Question",
          "name": "What is Lahpet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lahpet is fermented tea leaves, uniquely Burmese. Lahpet thoke (tea leaf salad) combines fermented leaves with crispy beans, sesame, fried garlic, tomatoes, and chilies. It's served at celebrations and offered to guests as a sign of hospitality. No other cuisine uses tea this way."
          }
        },
        {
          "@type": "Question",
          "name": "Why is wok cooking important in Chinese cuisine?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The wok, invented over 2,000 years ago, allowed high-heat cooking with minimal fuel—essential in fuel-scarce China. The curved shape creates different heat zones for simultaneous cooking. 'Wok hei' (breath of the wok) is the coveted smoky char from extremely high heat that defines Chinese stir-fry."
          }
        },
        {
          "@type": "Question",
          "name": "What is the history of Pad Thai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pad Thai was promoted as Thailand's national dish in the 1940s by Prime Minister Phibunsongkhram as part of a nationalist campaign. The dish combined Chinese rice noodles with Thai flavors (tamarind, fish sauce, palm sugar). It unified Chinese and Thai traditions into a distinctly Thai identity."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Flavors of the East: A Culinary Journey Through Asia | Esy",
  description:
    "Explore the rich culinary history of China, Thailand, and Myanmar through an immersive scrollytelling experience. Discover how soy sauce, fish sauce, and fermented ingredients shaped Asian cuisine across centuries.",
  keywords: [
    "Asian cuisine",
    "culinary history",
    "Chinese food",
    "Thai food",
    "Myanmar food",
    "Pad Thai",
    "Tom Yum",
    "Mohinga",
    "Lahpet",
    "scrollytelling",
    "food history",
    "fermented foods",
    "wok cooking"
  ],
  openGraph: {
    title: "Flavors of the East: A Culinary Journey Through Asia",
    description:
      "From ancient Chinese soy fermentation to Myanmar's fermented tea salad — taste is history, flavor is culture.",
    url: "https://esy.com/essays/flavors-of-the-east/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/flavors-of-the-east.png",
        width: 1200,
        height: 630,
        alt: "Flavors of the East - A Culinary Journey Through Asia"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Flavors of the East",
    description: "An immersive journey through Asian culinary history.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/flavors-of-the-east.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/flavors-of-the-east/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function FlavorsOfTheEastPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="flavors-loading">
            <div className="loading-steam" />
          </div>
        }
      >
        <FlavorsOfTheEastClient />
      </Suspense>
    </>
  );
}
