import { Metadata } from "next";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import RapHistoryClient from "./RapHistoryClient";

const ESSAY_META = {
  title: "RAP: The World's Loudest Archive",
  subtitle: "A Visual History of Hip-Hop's Most Powerful Art Form",
  category: "History",
  subcategory: "Music",
  readTime: "45 min",
  sourceCount: 32,
  sourceTier: "Tier-1",
  sectionCount: 16,
  visualizationCount: 7,
  designSystem: "Subject-derived",
  published: "December 2024",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Neon Playground", color: "#39FF14" },
    { name: "Boombox Black", color: "#1A1A2E" },
    { name: "Chrome Heat", color: "#C0C0C0" },
    { name: "Casefile Noir", color: "#2C2C2C" },
    { name: "Trap Architecture", color: "#8B0000" },
    { name: "Algorithm Glitch", color: "#00D4FF" },
    { name: "Global Patchwork", color: "#F59E0B" },
  ],
  visualizations: [
    { name: "Vinyl Progress Bar", type: "Scroll-driven Indicator" },
    { name: "12 Era Design Skins", type: "Visual Morphing" },
    { name: "Scroll-Lock Hero", type: "Pinned Animation" },
    { name: "Chapter Timelines", type: "Interactive Timeline" },
    { name: "Key Figures Gallery", type: "Portrait Cards" },
    { name: "Sources & Glossary", type: "Categorized Reference" },
    { name: "Image Credits System", type: "Attribution Grid" },
  ],
  keySources: [
    "Jeff Chang, Can't Stop Won't Stop (2005)",
    "Tricia Rose, Black Noise (1994)",
    "Dan Charnas, The Big Payback (2010)",
    "Cornell University Hip-Hop Collection",
    "Smithsonian NMAAHC",
    "Adam Bradley, Book of Rhymes (2009)",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/rap-history/#article",
      "headline": "RAP: The World's Loudest Archive",
      "alternativeHeadline": "A Visual History of Hip-Hop's Most Powerful Art Form",
      "description": "From the Bronx block parties of 1973 to global streaming dominance, trace the complete history of rap music—its origins in African diasporic oral traditions, its regional revolutions, its subgenre explosions, and its transformation into the world's default pop language.",
      "url": "https://esy.com/essays/history/rap-history/",
      "datePublished": "2024-12-28",
      "dateModified": "2024-12-28",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/rap-history.png",
      "articleSection": "History",
      "inLanguage": "en-US",
      "keywords": ["Rap history", "Hip-hop history", "DJ Kool Herc", "Grandmaster Flash", "Run-DMC", "Public Enemy", "N.W.A", "Tupac", "Biggie", "Jay-Z", "Kendrick Lamar", "visual essay", "music history"]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "History", "item": "https://esy.com/essays/history/" },
        { "@type": "ListItem", "position": 4, "name": "RAP History", "item": "https://esy.com/essays/history/rap-history/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When and where did rap music originate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rap music originated in the South Bronx, New York City, on August 11, 1973, when DJ Kool Herc hosted a back-to-school party at 1520 Sedgwick Avenue. He invented the 'breakbeat' technique—isolating and extending percussion breaks—which became the foundation of hip-hop."
          }
        },
        {
          "@type": "Question",
          "name": "What was the first rap record?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "'Rapper's Delight' by The Sugarhill Gang, released in September 1979, is widely credited as the first commercially successful rap record, though earlier recordings exist. It sampled Chic's 'Good Times' and introduced rap to mainstream audiences worldwide."
          }
        },
        {
          "@type": "Question",
          "name": "Who are the most influential rappers of all time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Key figures include DJ Kool Herc (founder), Grandmaster Flash (technical pioneer), Rakim (revolutionized lyricism), Chuck D (political voice), Tupac and Biggie (defining East/West), Jay-Z (business model), Eminem (global crossover), and Kendrick Lamar (modern literary standard)."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between hip-hop and rap?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As KRS-One famously stated: 'Rap is something you do. Hip-hop is something you live.' Hip-hop is the broader culture encompassing four elements: DJing, MCing (rapping), graffiti, and breakdancing. Rap specifically refers to the vocal art form of rhythmic speech over beats."
          }
        },
        {
          "@type": "Question",
          "name": "How did rap spread beyond New York?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rap spread through regional scenes developing unique sounds: Los Angeles (gangsta rap via N.W.A, G-funk via Dr. Dre), Houston (chopped and screwed via DJ Screw), Atlanta (Dirty South via OutKast, trap via T.I. and Gucci Mane), Miami (bass music via 2 Live Crew), and eventually globally to every continent."
          }
        },
        {
          "@type": "Question",
          "name": "What is trap music?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trap is a subgenre of rap that emerged from Atlanta in the early 2000s, characterized by 808 drum machine patterns, rapid hi-hats, dark melodies, and lyrics about street life. Pioneered by artists like T.I., Gucci Mane, and Young Jeezy, it became the dominant sound of 2010s hip-hop."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "RAP: The World's Loudest Archive — A Visual History | Esy",
  description:
    "From the Bronx to the world: trace the complete history of rap music from 1973 to present. Featuring 275+ artists, 12 era-specific visual treatments, and the cultural, technological, and political forces that shaped hip-hop's journey to global dominance.",
  keywords: [
    "Rap history",
    "Hip-hop history",
    "DJ Kool Herc",
    "Grandmaster Flash",
    "Afrika Bambaataa",
    "Run-DMC",
    "Public Enemy",
    "N.W.A",
    "Tupac Shakur",
    "Notorious B.I.G.",
    "Jay-Z",
    "Kanye West",
    "Kendrick Lamar",
    "Drake",
    "Trap music",
    "Drill music",
    "visual essay",
    "music history",
    "Black music history",
    "American music"
  ],
  openGraph: {
    title: "RAP: The World's Loudest Archive — A Visual History",
    description:
      "From the Bronx to the world: trace the complete history of rap music from 1973 to present. An immersive visual essay featuring archival photography.",
    url: "https://esy.com/essays/history/rap-history/",
    siteName: "Esy",
    images: [
      {
        url: "https://esy.com/og/rap-history.png",
        width: 1200,
        height: 630,
        alt: "RAP: The World's Loudest Archive visual essay"
      }
    ],
    locale: "en_US",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "RAP: The World's Loudest Archive — A Visual History",
    description:
      "From the Bronx to the world: trace the complete history of rap music. An immersive visual essay.",
    images: ["https://esy.com/og/rap-history.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/history/rap-history/"
  }
};

export default function RapHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <RapHistoryClient />
      </ArtifactDetailWrapper>
    </>
  );
}
