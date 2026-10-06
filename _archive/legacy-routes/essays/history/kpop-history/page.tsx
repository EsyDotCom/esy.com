import { Metadata } from "next";
import KPopHistoryClient from "./KPopHistoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/kpop-history/#article",
      "headline": "K-POP HISTORY: The Factory, The Fever, The Future",
      "alternativeHeadline": "A Visual History of Korean Pop Music's Global Conquest",
      "description": "From trot singers under Japanese occupation to BTS at the UN, trace the complete history of K-pop—its training systems, its fandom revolutions, its technological innovations, and its transformation into the world's most sophisticated pop music machine.",
      "url": "https://esy.com/essays/history/kpop-history/",
      "datePublished": "2024-12-29",
      "dateModified": "2024-12-29",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/kpop-history.png",
      "articleSection": "History",
      "inLanguage": "en-US",
      "keywords": ["K-pop history", "Korean pop music", "BTS", "BLACKPINK", "SM Entertainment", "Lee Soo-man", "Hallyu", "Korean Wave", "idol training", "visual essay", "music history", "TVXQ", "Girls Generation", "PSY Gangnam Style", "NewJeans"]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "History", "item": "https://esy.com/essays/history/" },
        { "@type": "ListItem", "position": 4, "name": "K-Pop History", "item": "https://esy.com/essays/history/kpop-history/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When did K-pop begin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "K-pop as we know it began on April 11, 1992, when Seo Taiji and Boys performed 'Nan Arayo' (I Know) on MBC's talent show. Their fusion of American hip-hop and Korean pop revolutionized Korean music and marked the birth of the modern K-pop era."
          }
        },
        {
          "@type": "Question",
          "name": "What is the K-pop trainee system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The trainee system is K-pop's signature talent development method, pioneered by Lee Soo-man at SM Entertainment. Aspiring idols train for 2-7 years in singing, dancing, languages, and media skills before debuting. Agencies invest millions per trainee, creating highly polished performers."
          }
        },
        {
          "@type": "Question",
          "name": "Who are the 'Big Four' K-pop agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Big Four are SM Entertainment (founded 1989), YG Entertainment (1996), JYP Entertainment (1997), and HYBE (formerly Big Hit, 2005). Together they dominate the K-pop industry, though their market share has declined as smaller agencies succeed."
          }
        },
        {
          "@type": "Question",
          "name": "What was 'Gangnam Style' and why did it matter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PSY's 'Gangnam Style' (2012) became the first YouTube video to reach 1 billion views, introducing K-pop to global mainstream audiences. While PSY was dismissed as a novelty, his success proved K-pop could achieve worldwide viral reach, paving the way for BTS and BLACKPINK."
          }
        },
        {
          "@type": "Question",
          "name": "How did BTS become globally successful?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BTS succeeded through a social media-first strategy, self-produced music with personal messages, and deep fan engagement through platforms like V Live and Weverse. Unlike earlier K-pop acts, they didn't localize for Western markets but brought Korean content directly to global audiences."
          }
        },
        {
          "@type": "Question",
          "name": "What are K-pop generations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "K-pop is divided into generations: 1st Gen (1992-2003) includes H.O.T. and S.E.S.; 2nd Gen (2003-2012) includes TVXQ, Super Junior, Girls' Generation; 3rd Gen (2012-2018) includes BTS, BLACKPINK, EXO; 4th Gen (2018-present) includes Stray Kids, NewJeans, aespa."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "K-POP HISTORY: The Factory, The Fever, The Future — A Visual History | Esy",
  description:
    "From 1926 to present: trace the complete history of K-pop from trot singers to global superstars. Featuring 380+ figures, 12 era-specific visual treatments, and the industrial systems, fandom revolutions, and technological innovations that built a $10 billion cultural phenomenon.",
  keywords: [
    "K-pop history",
    "Korean pop music",
    "BTS",
    "BLACKPINK",
    "SM Entertainment",
    "Lee Soo-man",
    "HYBE",
    "Bang Si-hyuk",
    "Hallyu",
    "Korean Wave",
    "idol training system",
    "TVXQ",
    "Girls Generation",
    "Super Junior",
    "EXO",
    "PSY Gangnam Style",
    "NewJeans",
    "Seo Taiji",
    "H.O.T.",
    "visual essay",
    "music history",
    "K-pop fandom",
    "ARMY",
    "trainee system"
  ],
  openGraph: {
    title: "K-POP HISTORY: The Factory, The Fever, The Future — A Visual History",
    description:
      "From 1926 to present: trace the complete history of K-pop. An immersive visual essay featuring archival photography and era-morphing design.",
    url: "https://esy.com/essays/history/kpop-history/",
    siteName: "Esy",
    images: [
      {
        url: "https://esy.com/og/kpop-history.png",
        width: 1200,
        height: 630,
        alt: "K-POP HISTORY: The Factory, The Fever, The Future visual essay"
      }
    ],
    locale: "en_US",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "K-POP HISTORY: The Factory, The Fever, The Future — A Visual History",
    description:
      "From 1926 to present: trace the complete history of K-pop. An immersive visual essay.",
    images: ["https://esy.com/og/kpop-history.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/history/kpop-history/"
  }
};

export default function KPopHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KPopHistoryClient />
    </>
  );
}
