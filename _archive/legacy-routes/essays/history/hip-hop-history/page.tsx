import { Metadata } from "next";
import HipHopHistoryClient from "./HipHopHistoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/hip-hop-history/#article",
      "headline": "Hip-Hop: From the Bronx to the World",
      "alternativeHeadline": "A Definitive Visual History of Hip-Hop Culture",
      "description": "Explore the complete history of Hip-Hop culture—from its birth in the devastated South Bronx of the 1970s to its current status as the world's most consumed music genre. An immersive visual journey through five decades of innovation, resistance, and global transformation.",
      "url": "https://esy.com/essays/history/hip-hop-history/",
      "datePublished": "2025-12-27",
      "dateModified": "2025-12-27",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/hip-hop-history.png",
      "articleSection": "History",
      "inLanguage": "en-US",
      "keywords": ["Hip-Hop", "Hip-Hop history", "DJ Kool Herc", "Bronx", "rap music", "breaking", "graffiti", "visual essay"]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "History", "item": "https://esy.com/essays/history/" },
        { "@type": "ListItem", "position": 4, "name": "Hip-Hop History", "item": "https://esy.com/essays/history/hip-hop-history/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When and where did Hip-Hop originate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hip-Hop originated on August 11, 1973, at a back-to-school party at 1520 Sedgwick Avenue in the South Bronx, New York. DJ Kool Herc, a Jamaican-American DJ, pioneered the 'merry-go-round' technique of extending instrumental breaks, while his sister Cindy Campbell organized the party that sparked a cultural revolution."
          }
        },
        {
          "@type": "Question",
          "name": "What are the five elements of Hip-Hop?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The five elements of Hip-Hop are: DJing (turntablism), MCing (rapping), breaking (b-boying/b-girling), graffiti writing, and knowledge (consciousness and self-improvement). Afrika Bambaataa and the Universal Zulu Nation codified these elements in the early days of the culture."
          }
        },
        {
          "@type": "Question",
          "name": "Who is considered the 'Father of Hip-Hop'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DJ Kool Herc (Clive Campbell) is widely considered the 'Father of Hip-Hop.' Born in Jamaica and raised in the Bronx, Herc pioneered the technique of isolating and extending the instrumental 'breaks' in funk records, creating the foundation for Hip-Hop music and dance."
          }
        },
        {
          "@type": "Question",
          "name": "What was the first commercially successful Hip-Hop record?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "'Rapper's Delight' by the Sugarhill Gang, released on September 16, 1979, was the first Hip-Hop single to achieve mainstream commercial success, reaching #36 on the Billboard Hot 100. It was released on Sylvia Robinson's Sugar Hill Records."
          }
        },
        {
          "@type": "Question",
          "name": "How did the South Bronx's conditions lead to Hip-Hop's creation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The South Bronx in the early 1970s was devastated by Robert Moses's Cross Bronx Expressway, redlining, arson-for-profit schemes, and 'planned shrinkage' policies that deliberately reduced city services. When the city abandoned young people, they invented their own systems of expression, community, and status—Hip-Hop emerged as that creative response to destruction."
          }
        },
        {
          "@type": "Question",
          "name": "When did Hip-Hop become the most consumed music genre?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In 2017, Hip-Hop and R&B officially surpassed rock as America's most consumed music genre according to Nielsen. In 2018, Kendrick Lamar's 'DAMN.' became the first Hip-Hop album to win the Pulitzer Prize for Music."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Hip-Hop: From the Bronx to the World — A Visual History | Esy",
  description:
    "Explore the complete history of Hip-Hop culture—from its birth in the South Bronx of the 1970s to its status as the world's most consumed music genre. An immersive visual journey through five decades of innovation, resistance, and global transformation.",
  keywords: [
    "Hip-Hop history",
    "Hip-Hop culture",
    "DJ Kool Herc",
    "South Bronx",
    "rap music history",
    "breaking",
    "b-boy",
    "graffiti",
    "Grandmaster Flash",
    "Afrika Bambaataa",
    "Run-DMC",
    "Tupac Shakur",
    "Notorious B.I.G.",
    "golden age Hip-Hop",
    "visual essay",
    "music history",
    "1520 Sedgwick Avenue",
    "block party",
    "five elements",
  ],
  openGraph: {
    title: "Hip-Hop: From the Bronx to the World — A Visual History",
    description:
      "From 1520 Sedgwick Avenue to global dominance—an immersive visual essay tracing Hip-Hop's 50-year journey.",
    url: "https://esy.com/essays/history/hip-hop-history/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/hip-hop-history.png",
        width: 1200,
        height: 630,
        alt: "Hip-Hop: From the Bronx to the World — A Visual History",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hip-Hop: From the Bronx to the World — A Visual History",
    description:
      "From 1520 Sedgwick Avenue to global dominance—an immersive visual essay tracing Hip-Hop's 50-year journey.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/hip-hop-history.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/history/hip-hop-history/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function HipHopHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HipHopHistoryClient />
    </>
  );
}
