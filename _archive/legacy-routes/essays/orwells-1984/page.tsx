import type { Metadata } from "next";
import OrwellsClient from "./OrwellsClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/orwells-1984/#article",
      "headline": "The Architecture of Unfreedom: George Orwell's 1984",
      "alternativeHeadline": "How George Orwell Built 1984 from the Horrors He Witnessed",
      "description": "A photorealistic visual essay revealing how George Orwell built 1984 from the horrors he witnessed — Burma, Spain, the BBC, and Stalin's USSR. Every element of Oceania traced to its real-world origin.",
      "url": "https://esy.com/essays/orwells-1984/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/orwells-1984.png",
      "articleSection": "Literature",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Orwell's 1984", "item": "https://esy.com/essays/orwells-1984/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What inspired George Orwell to write 1984?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Orwell drew from his experiences as a colonial policeman in Burma, fighting fascism in the Spanish Civil War, and working at the BBC during WWII. Stalin's Soviet Union and Nazi Germany provided the totalitarian models. His tuberculosis while writing on the Isle of Jura added urgency to his vision."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Ministry of Truth based on?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Ministry of Truth was based on Orwell's time at the BBC (1941-1943), where he wrote propaganda for the Eastern Service. The censorship, rewriting of news, and bureaucratic culture he witnessed there directly influenced Minitrue. The BBC's Senate House building inspired the ministry's architecture."
          }
        },
        {
          "@type": "Question",
          "name": "What is Room 101 based on?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Room 101 was a conference room at BBC Broadcasting House where Orwell attended tedious meetings. He transformed this mundane annoyance into the ultimate torture chamber—the room that contains your worst fear. In 1984, Room 101 is where the Party breaks Winston with his terror of rats."
          }
        },
        {
          "@type": "Question",
          "name": "Did Orwell fight in the Spanish Civil War?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Orwell joined the POUM militia in Spain in 1936 to fight Franco's fascists. He was shot through the throat by a sniper and nearly died. More traumatic was watching the Communist Party purge his fellow socialists—he witnessed how revolutionary movements devour their own, inspiring the Party's betrayals in 1984."
          }
        },
        {
          "@type": "Question",
          "name": "Why did Orwell write 1984 on the Isle of Jura?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "After his wife Eileen's death in 1945, Orwell retreated to a remote farmhouse on Jura, Scotland. He wrote 1984 while dying of tuberculosis, often typing in bed. The isolation and harsh conditions mirrored the bleakness of Oceania. He finished the manuscript in late 1948 (reversing the year gave '1984')."
          }
        },
        {
          "@type": "Question",
          "name": "What is doublethink in 1984?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Doublethink is holding two contradictory beliefs simultaneously and accepting both. Orwell observed this in Stalinist apologetics—intellectuals who defended Soviet purges while knowing they were atrocities. The concept shows how totalitarianism corrupts not just society, but the individual mind's capacity for truth."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The Architecture of Unfreedom: George Orwell's 1984 | Esy",
  description:
    "A photorealistic visual essay revealing how George Orwell built 1984 from the horrors he witnessed — Burma, Spain, the BBC, and Stalin's USSR. Every element of Oceania traced to its real-world origin.",
  keywords: [
    "1984",
    "George Orwell",
    "Nineteen Eighty-Four",
    "Big Brother",
    "totalitarianism",
    "surveillance",
    "Spanish Civil War",
    "Stalin",
    "visual essay",
    "scrollytelling",
    "Ministry of Truth",
    "Room 101",
    "doublethink",
    "thoughtcrime",
    "BBC propaganda",
    "Jura Scotland",
    "literary analysis",
    "historical biography"
  ],
  openGraph: {
    title: "The Architecture of Unfreedom: George Orwell's 1984",
    description:
      "How George Orwell built 1984 from the horrors he witnessed. Every element of Oceania traced to its real-world origin — Burma, Spain, the BBC, Stalin's USSR.",
    type: "article",
    url: "https://esy.com/essays/orwells-1984/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/orwells-1984.png",
        width: 1200,
        height: 630,
        alt: "The Architecture of Unfreedom - George Orwell's 1984"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Architecture of Unfreedom: George Orwell's 1984",
    description:
      "A photorealistic visual essay revealing the real-world origins of Oceania.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/orwells-1984.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/orwells-1984/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function OrwellsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OrwellsClient />
    </>
  );
}












