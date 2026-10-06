import { Metadata } from "next";
import RnbHistoryClient from "./RnbHistoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/rnb-history/#article",
      "headline": "R&B: The Heartbeat That Taught Pop to Feel",
      "alternativeHeadline": "A Definitive Visual History of Rhythm & Blues",
      "description": "Explore the complete history of R&B—from its 1949 naming to its continuous reinvention across Soul, Funk, Quiet Storm, New Jack Swing, and contemporary alternative R&B. An immersive visual journey through eight decades of innovation, economic struggle, and cultural transformation.",
      "url": "https://esy.com/essays/history/rnb-history/",
      "datePublished": "2024-12-27",
      "dateModified": "2024-12-27",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/rnb-history.png",
      "articleSection": "History",
      "inLanguage": "en-US",
      "keywords": ["R&B", "rhythm and blues", "soul music", "Motown", "Stax", "Atlantic Records", "Aretha Franklin", "visual essay"]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "History", "item": "https://esy.com/essays/history/" },
        { "@type": "ListItem", "position": 4, "name": "R&B History", "item": "https://esy.com/essays/history/rnb-history/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When was the term 'rhythm and blues' coined?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The term 'rhythm and blues' was coined by Jerry Wexler, a Billboard magazine reporter, in June 1949. He introduced it to replace the derogatory term 'race records' that had been used to classify Black popular music since the 1920s."
          }
        },
        {
          "@type": "Question",
          "name": "What are the major cities that shaped R&B music?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "R&B developed distinct sounds in several American cities: New Orleans (rolling piano, second-line rhythms), Memphis (raw Southern soul at Stax), Detroit (polished Motown sound), Chicago (electric blues), Philadelphia (orchestral 'soul in a tuxedo'), and Atlanta (contemporary production hub)."
          }
        },
        {
          "@type": "Question",
          "name": "Who were the Funk Brothers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Funk Brothers were Motown's house band who played on more #1 hits than the Beatles, Rolling Stones, Beach Boys, and Elvis combined. Despite their extraordinary contributions, they were not credited on album covers until 1971 and received no royalties—only $10 per song."
          }
        },
        {
          "@type": "Question",
          "name": "How did technology shape R&B's evolution?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Each major technology shift created a new R&B era: electric amplification enabled jump blues (1940s), multitrack recording enabled layered soul production (1960s), synthesizers created electronic R&B (1970s), drum machines like the TR-808 transformed the sound in the 1980s, and Auto-Tune created new vocal possibilities in the late 1990s."
          }
        },
        {
          "@type": "Question",
          "name": "What is the relationship between R&B and hip-hop?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "R&B and hip-hop co-evolved in symbiosis rather than competition. Hip-hop sampled R&B from the beginning, while R&B adopted hip-hop production starting with New Jack Swing in 1987. The Billboard chart merger in 1999 (creating 'Hot R&B/Hip-Hop Songs') officially recognized this fusion."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "R&B: The Heartbeat That Taught Pop to Feel — A Visual History | Esy",
  description:
    "Explore the complete history of R&B—from its 1949 naming to contemporary alternative R&B. An immersive visual journey through Motown, Stax, Philadelphia International, and the evolution of Black popular music.",
  keywords: [
    "R&B history",
    "rhythm and blues",
    "soul music history",
    "Motown",
    "Stax Records",
    "Atlantic Records",
    "Aretha Franklin",
    "Stevie Wonder",
    "Marvin Gaye",
    "soul music",
    "funk music",
    "new jack swing",
    "hip-hop soul",
    "visual essay",
    "music history",
    "Jerry Wexler",
    "Ruth Brown",
    "Philadelphia International",
  ],
  openGraph: {
    title: "R&B: The Heartbeat That Taught Pop to Feel — A Visual History",
    description:
      "From race records to rhythm and blues—an immersive visual essay tracing R&B's 75-year journey.",
    url: "https://esy.com/essays/history/rnb-history/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/rnb-history.png",
        width: 1200,
        height: 630,
        alt: "R&B: The Heartbeat That Taught Pop to Feel — A Visual History",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "R&B: The Heartbeat That Taught Pop to Feel — A Visual History",
    description:
      "From race records to rhythm and blues—an immersive visual essay tracing R&B's 75-year journey.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/rnb-history.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/history/rnb-history/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function RnbHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RnbHistoryClient />
    </>
  );
}
