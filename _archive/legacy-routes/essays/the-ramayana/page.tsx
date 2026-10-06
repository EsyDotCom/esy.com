import { Metadata } from "next";
import RamayanaClient from "./RamayanaClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-ramayana/#article",
      "headline": "The Journey Home: The Ramayana in Art and Symbol",
      "alternativeHeadline": "2,500 Years of the World's Greatest Quest Narrative",
      "description": "Experience humanity's oldest quest narrative through 2,500 years of artistic interpretation—from Chola bronzes to Balinese shadow puppets, from Pahari miniatures to the temple walls of Angkor. An immersive scroll-driven visual essay.",
      "url": "https://esy.com/essays/the-ramayana/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-ramayana.png",
      "articleSection": "Mythology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Ramayana", "item": "https://esy.com/essays/the-ramayana/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Ramayana about?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Ramayana tells the story of Prince Rama's exile, his wife Sita's abduction by the demon king Ravana, and Rama's quest to rescue her with the help of the monkey god Hanuman. It's a profound exploration of dharma (duty), love, and the triumph of good over evil."
          }
        },
        {
          "@type": "Question",
          "name": "Who wrote the Ramayana?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The original Ramayana is attributed to the sage Valmiki, composed in Sanskrit around 500-100 BCE. Hundreds of versions exist across Asia, including Tulsidas's Hindi Ramcharitmanas (1574) and Kamban's Tamil Ramavataram (12th century)."
          }
        },
        {
          "@type": "Question",
          "name": "Who is Hanuman?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hanuman is the monkey god who becomes Rama's greatest devotee and ally. Son of the wind god Vayu, he possesses immense strength, the ability to fly, and unwavering loyalty. He leaps across the ocean to find Sita and plays a crucial role in defeating Ravana."
          }
        },
        {
          "@type": "Question",
          "name": "Why is the Ramayana important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Ramayana has shaped South and Southeast Asian culture for over 2,500 years. It defines ideals of dharma, kingship, and devotion. Its influence extends from Indian temple architecture to Indonesian shadow puppetry to the bas-reliefs of Angkor Wat."
          }
        },
        {
          "@type": "Question",
          "name": "What is Diwali's connection to the Ramayana?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Diwali, the Festival of Lights, celebrates Rama and Sita's return to Ayodhya after 14 years of exile. Citizens lit oil lamps to welcome them home, symbolizing the victory of light over darkness and good over evil—a tradition continued today."
          }
        },
        {
          "@type": "Question",
          "name": "How did the Ramayana spread across Asia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Indian traders, monks, and cultural exchange carried the Ramayana across Southeast Asia from the early centuries CE. Thailand, Indonesia, Cambodia, Myanmar, and Laos developed their own versions, integrating local traditions while preserving the core narrative."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Journey Home: The Ramayana in Art and Symbol | Esy",
  description:
    "Experience humanity's oldest quest narrative through 2,500 years of artistic interpretation—from Chola bronzes to Balinese shadow puppets, from Pahari miniatures to the temple walls of Angkor. An immersive scroll-driven visual essay.",
  keywords: [
    "Ramayana",
    "Hindu mythology",
    "Indian epic",
    "Rama",
    "Sita",
    "Hanuman",
    "Ravana",
    "dharma",
    "visual essay",
    "Indian art",
    "Pahari miniatures",
    "Chola bronze",
    "Angkor Wat",
    "mythology",
    "interactive storytelling",
    "Diwali",
    "Ram Lila",
    "Sanskrit epic",
    "Valmiki",
  ],
  openGraph: {
    title: "The Journey Home: The Ramayana in Art and Symbol",
    description:
      "Humanity's oldest quest narrative through 2,500 years of art—from Chola bronzes to Angkor reliefs. An immersive scroll-driven visual essay.",
    url: "https://esy.com/essays/the-ramayana/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-ramayana.png",
        width: 1200,
        height: 630,
        alt: "The Journey Home: The Ramayana in Art and Symbol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Journey Home: The Ramayana in Art and Symbol",
    description:
      "Experience the Ramayana through 2,500 years of art—an immersive visual essay.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-ramayana.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-ramayana/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function RamayanaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RamayanaClient />
    </>
  );
}
