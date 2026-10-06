import type { Metadata } from "next";
import PizzaHistoryClient from "./PizzaHistoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-history-of-pizza/#article",
      "headline": "From Hearth to Heritage: The 10,000-Year Journey of Pizza",
      "alternativeHeadline": "From Ancient Flatbreads to UNESCO Cultural Heritage",
      "description":
        "An immersive visual essay tracing pizza's complete history—from ancient flatbreads and the 997 CE first documentation through Naples street food, the Margherita legend, immigrant America, and the UNESCO-recognized artisanal renaissance.",
      "url": "https://esy.com/essays/the-history-of-pizza/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-history-of-pizza.png",
      "articleSection": "Food History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The History of Pizza", "item": "https://esy.com/essays/the-history-of-pizza/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When was pizza first documented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word 'pizza' first appears in a 997 CE Latin document from Gaeta, Italy, though flatbreads with toppings existed for millennia before."
          }
        },
        {
          "@type": "Question",
          "name": "Who invented the Margherita pizza?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Legend credits Raffaele Esposito of Naples, who in 1889 allegedly created a pizza with tomato, mozzarella, and basil for Queen Margherita, though historians debate the details."
          }
        },
        {
          "@type": "Question",
          "name": "How did pizza come to America?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Italian immigrants brought pizza to the United States in the late 19th century. Lombardi's in New York, opened in 1905, is often cited as the first American pizzeria."
          }
        },
        {
          "@type": "Question",
          "name": "Why is Neapolitan pizza UNESCO-recognized?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In 2017, UNESCO inscribed the art of Neapolitan pizza-making ('Pizzaiuolo') as Intangible Cultural Heritage, recognizing its craft traditions, social rituals, and cultural significance."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Neapolitan pizza different?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Authentic Neapolitan pizza uses specific flour, San Marzano tomatoes, fresh mozzarella, and is cooked in a wood-fired oven at around 900°F for 60–90 seconds, creating a soft, charred crust."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "From Hearth to Heritage: The 10,000-Year Journey of Pizza | Esy",
  description:
    "An immersive visual essay tracing pizza's complete history—from ancient flatbreads and the 997 CE first documentation through Naples street food, the Margherita legend, immigrant America, and the UNESCO-recognized artisanal renaissance.",
  keywords: [
    "history of pizza",
    "pizza origins",
    "Margherita pizza",
    "Raffaele Esposito",
    "Naples pizza",
    "Neapolitan pizza",
    "pizza etymology",
    "Lombardi pizza",
    "pizza history timeline",
    "UNESCO pizza",
    "visual essay",
    "food history"
  ],
  openGraph: {
    title: "From Hearth to Heritage: The 10,000-Year Journey of Pizza",
    description:
      "An immersive visual essay tracing humanity's most beloved food from ancient flatbreads to UNESCO cultural heritage.",
    type: "article",
    url: "https://esy.com/essays/the-history-of-pizza/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-history-of-pizza.png",
        width: 1200,
        height: 630,
        alt: "From Hearth to Heritage: The 10,000-Year Journey of Pizza"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "From Hearth to Heritage: The 10,000-Year Journey of Pizza",
    description:
      "An immersive visual essay tracing pizza's 10,000-year journey from ancient hearths to UNESCO recognition.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-history-of-pizza.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-history-of-pizza/"
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

export default function PizzaHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PizzaHistoryClient />
    </>
  );
}
