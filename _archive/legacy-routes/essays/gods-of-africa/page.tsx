import { Metadata } from "next";
import GodsOfAfricaClient from "./GodsOfAfricaClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/gods-of-africa/#article",
      "headline": "Gods of Africa: A Journey from Light to Terror",
      "alternativeHeadline": "Creator Deities, Tricksters, and Nightmare Entities of African Mythology",
      "description": "Explore the majestic creator deities, cunning tricksters, and terrifying entities of African mythology. From Olodumare's divine radiance to the nightmare of Popobawa—a visual journey across the continent's sacred traditions.",
      "url": "https://esy.com/essays/gods-of-africa/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/gods-of-africa.png",
      "articleSection": "Mythology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Gods of Africa", "item": "https://esy.com/essays/gods-of-africa/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Olodumare in African mythology?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Olodumare is the supreme creator god in Yoruba religion, representing the source of all existence. As 'Owner of Endless Space,' Olodumare is omnipotent but distant, delegating earthly affairs to the Orishas while remaining the ultimate source of divine power."
          }
        },
        {
          "@type": "Question",
          "name": "Who is Anansi the spider?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Anansi is the trickster god of the Akan people of Ghana, usually depicted as a spider. Known for cunning and wit rather than strength, Anansi stories traveled with enslaved Africans to the Caribbean and Americas, becoming 'Aunt Nancy' in some traditions."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Tikoloshe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Tikoloshe is a malevolent dwarf-like creature in Zulu and Xhosa folklore. Said to be summoned by witches to cause harm, it attacks people in their sleep. Many South Africans still raise their beds on bricks to stay out of its reach."
          }
        },
        {
          "@type": "Question",
          "name": "Who is Eshu in Yoruba religion?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Eshu (also Elegba or Legba) is the Orisha of crossroads, communication, and fate in Yoruba religion. Neither good nor evil, Eshu is the divine messenger who must be propitiated first in any ritual, as he controls the pathways between humans and gods."
          }
        },
        {
          "@type": "Question",
          "name": "What is Popobawa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Popobawa ('bat wing' in Swahili) is a terrifying entity from Zanzibar that allegedly attacks people at night. First reported in the 1960s, Popobawa panics have periodically gripped the island, with victims describing a shapeshifting creature with batlike wings."
          }
        },
        {
          "@type": "Question",
          "name": "How did African gods spread to the Americas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The transatlantic slave trade carried African religions to the Americas, where they syncretized with Catholicism. Yoruba Orishas became the basis of Santería (Cuba), Candomblé (Brazil), and Vodou (Haiti), with deities like Shango and Oshun remaining central figures."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Gods of Africa — A Journey from Light to Terror | Esy",
  description:
    "Explore the majestic creator deities, cunning tricksters, and terrifying entities of African mythology. From Olodumare's divine radiance to the nightmare of Popobawa—a visual journey across the continent's sacred traditions.",
  keywords: [
    "African mythology",
    "African gods",
    "Olodumare",
    "Nyame",
    "Anansi",
    "Eshu",
    "Yoruba religion",
    "Akan mythology",
    "Egyptian mythology",
    "Apophis",
    "Anubis",
    "Tikoloshe",
    "Popobawa",
    "African religion",
    "creator gods",
    "trickster gods",
    "visual essay",
    "mythology",
    "African art",
    "sacred traditions",
  ],
  openGraph: {
    title: "Gods of Africa — A Journey from Light to Terror",
    description:
      "From radiant creators to nightmare entities—explore African mythology through an immersive visual essay.",
    url: "https://esy.com/essays/gods-of-africa/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/gods-of-africa.png",
        width: 1200,
        height: 630,
        alt: "Gods of Africa — A Journey from Light to Terror",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gods of Africa — A Journey from Light to Terror",
    description:
      "From radiant creators to nightmare entities—explore African mythology through an immersive visual essay.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/gods-of-africa.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/gods-of-africa/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function GodsOfAfricaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GodsOfAfricaClient />
    </>
  );
}
