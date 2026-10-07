import { Metadata } from "next";
import RockAndRollClient from "./RockAndRollClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/rock-and-roll/#article",
      "headline": "Rock & Roll: The Noise That Remade the World",
      "alternativeHeadline": "A Definitive Visual History of Rock and Roll",
      "description": "Explore the complete history of rock and roll—from its convergence in Black musical innovation through electric blues, gospel, and boogie-woogie to its global explosion. An immersive visual essay tracing how the noise that was never invented became the sound that remade the world.",
      "url": "https://esy.com/essays/rock-and-roll/",
      "datePublished": "2025-12-27",
      "dateModified": "2025-12-27",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/rock-and-roll.png",
      "articleSection": "Music History",
      "inLanguage": "en-US",
      "keywords": ["rock and roll", "rock history", "Sister Rosetta Tharpe", "Chuck Berry", "Elvis Presley", "Little Richard", "Sun Studio", "Chess Records", "British Invasion", "visual essay"]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Rock & Roll", "item": "https://esy.com/essays/rock-and-roll/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented rock and roll?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rock and roll was not invented by a single person—it converged. Multiple streams of African American musical innovation (boogie-woogie, jump blues, electric blues, gospel, rhythm & blues) merged in the late 1940s. Key pioneers include Sister Rosetta Tharpe, who pioneered electric guitar distortion before 1944; Fats Domino, whose 'The Fat Man' (1949) was the first rock record to sell a million copies; and Little Richard, who called himself 'the architect of rock 'n' roll.'"
          }
        },
        {
          "@type": "Question",
          "name": "What was the first rock and roll record?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The search for rock's 'first record' is impossible to resolve definitively. Candidates include Sister Rosetta Tharpe's 'Strange Things Happening Every Day' (1944), Fats Domino's 'The Fat Man' (1949), and 'Rocket 88' by Jackie Brenston with Ike Turner (1951). As music critic Nick Tosches wrote: 'It is impossible to discern the first modern rock record, just as it is impossible to discern where blue becomes indigo in the spectrum.'"
          }
        },
        {
          "@type": "Question",
          "name": "Where did rock and roll originate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rock and roll emerged from specific American cities with distinct musical ecosystems: New Orleans contributed the rhythmic foundation (the backbeat, rumba-boogie piano); Memphis and Sun Studio enabled the racial crossover; Chicago's Chess Records electrified the blues; and Cleveland's Alan Freed popularized the term 'rock and roll' on radio starting in 1951."
          }
        },
        {
          "@type": "Question",
          "name": "Who coined the term 'rock and roll'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The term 'rock and roll' existed in Black culture for decades before DJ Alan Freed popularized it on radio. On July 11, 1951, Freed debuted 'The Moondog Rock 'n' Roll Party' on WJW Cleveland. The idea came from Leo Mintz, who ran Record Rendezvous and noticed white teenagers buying R&B records. Freed later admitted: 'It was more Leo's idea than mine.'"
          }
        },
        {
          "@type": "Question",
          "name": "Why was the British Invasion significant to rock and roll?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The British Invasion (1964-1966) was a feedback loop: American blues records reached Britain through GIs and imports; British bands like the Rolling Stones and Beatles reinterpreted and amplified this music; they then brought it back to America, where white American teenagers discovered their own musical heritage through British interpreters. The Stones even recorded at Chess Records, 2120 South Michigan Avenue, paying tribute to Muddy Waters and Chuck Berry."
          }
        },
        {
          "@type": "Question",
          "name": "How did technology shape rock and roll?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Technology was rock's co-author. The solid-body electric guitar (Fender Telecaster 1950, Gibson Les Paul 1952) eliminated feedback at high volumes. Tube amplifier distortion became rock's signature sound. Sam Phillips's slapback echo defined the Sun Sound. The 45 RPM single (1949) made records affordable for teenagers. The transistor radio (1954) enabled private listening. These weren't just tools—they shaped rock's DNA."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Rock & Roll: The Noise That Remade the World — A Visual History | Esy",
  description:
    "Explore the complete history of rock and roll—from its convergence in Black musical innovation to its global explosion. An immersive visual essay tracing seven decades of electric rebellion, racial reckoning, and cultural transformation.",
  keywords: [
    "rock and roll history",
    "rock music history",
    "Sister Rosetta Tharpe",
    "Chuck Berry",
    "Little Richard",
    "Elvis Presley",
    "Fats Domino",
    "Sun Studio",
    "Chess Records",
    "Sam Phillips",
    "British Invasion",
    "Beatles",
    "Rolling Stones",
    "electric guitar history",
    "Muddy Waters",
    "Big Mama Thornton",
    "visual essay",
    "music history",
    "rock origins",
    "payola scandal",
  ],
  openGraph: {
    title: "Rock & Roll: The Noise That Remade the World — A Visual History",
    description:
      "From the convergence of Black musical traditions to global explosion—an immersive visual essay tracing rock's seven-decade journey.",
    url: "https://esy.com/essays/rock-and-roll/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/rock-and-roll.png",
        width: 1200,
        height: 630,
        alt: "Rock & Roll: The Noise That Remade the World — A Visual History",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rock & Roll: The Noise That Remade the World — A Visual History",
    description:
      "From the convergence of Black musical traditions to global explosion—an immersive visual essay tracing rock's seven-decade journey.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/rock-and-roll.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/rock-and-roll/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function RockAndRollPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RockAndRollClient />
    </>
  );
}
