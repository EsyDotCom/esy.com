import { Metadata } from "next";
import JazzHistoryClient from "./JazzHistoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/history/jazz-history/#article",
      "headline": "Jazz: The Sound of Freedom in Real Time",
      "alternativeHeadline": "A Visual History of America's Original Art Form",
      "description": "From the mystery of Buddy Bolden's single photograph to the stages of Lincoln Center, trace how African diasporic traditions, European instruments, and the unique conditions of New Orleans produced America's most influential art form—and how it spread across the world as both music and cultural force.",
      "url": "https://esy.com/essays/history/jazz-history/",
      "datePublished": "2025-12-27",
      "dateModified": "2025-12-27",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/jazz-history.png",
      "articleSection": "History",
      "inLanguage": "en-US",
      "keywords": ["Jazz history", "Jazz music", "Buddy Bolden", "Louis Armstrong", "Duke Ellington", "Charlie Parker", "Bebop", "New Orleans jazz", "visual essay", "music history"]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "History", "item": "https://esy.com/essays/history/" },
        { "@type": "ListItem", "position": 4, "name": "Jazz History", "item": "https://esy.com/essays/history/jazz-history/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When and where did jazz originate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jazz originated in New Orleans around the 1890s-1900s, emerging from the collision of African diasporic traditions, European instruments, and the unique multicultural conditions of the city. Buddy Bolden, known as the first 'King' of jazz, organized his band around 1895, though no recordings of his music survive."
          }
        },
        {
          "@type": "Question",
          "name": "What was the first jazz recording?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The first commercial jazz recording was made on February 26, 1917, by the Original Dixieland Jazz Band (ODJB), a white group, for Victor Records. However, jazz had existed for decades before this recording—Black musicians were systematically excluded from early recording opportunities."
          }
        },
        {
          "@type": "Question",
          "name": "Who are the most influential jazz musicians?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Key figures include Louis Armstrong, who revolutionized jazz with his Hot Five/Hot Seven recordings (1925-1928); Duke Ellington, who composed over 1,000 works; Charlie Parker and Dizzy Gillespie, who pioneered bebop; Miles Davis, who led multiple jazz movements; and John Coltrane, who brought spiritual dimension to modal jazz."
          }
        },
        {
          "@type": "Question",
          "name": "What is bebop and when did it emerge?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bebop emerged in the early 1940s at venues like Minton's Playhouse in Harlem, pioneered by Charlie Parker, Dizzy Gillespie, and Thelonious Monk. It featured complex harmonies, virtuosic solos, and faster tempos, representing both an artistic revolution and a cultural assertion of Black artistic autonomy."
          }
        },
        {
          "@type": "Question",
          "name": "Was jazz really born in Storyville?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No—this is a common myth. Jazz developed throughout New Orleans, not specifically in Storyville (the red-light district). Scholar Bruce Boyd Raeburn of Tulane demonstrated that Storyville's closure in 1917 was 'essentially a non-event' for jazz. Musicians left New Orleans as part of the Great Migration, traveling primarily via the Illinois Central Railroad to Chicago."
          }
        },
        {
          "@type": "Question",
          "name": "Is jazz dead?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Tokyo rivals New York as a jazz capital. Kamasi Washington's 'The Epic' (2015) proved the market for ambitious jazz. Esperanza Spalding won the Grammy for Best New Artist in 2011. Jazz at Lincoln Center has introduced the music to new audiences. Contemporary artists continue to innovate while honoring tradition."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Jazz: The Sound of Freedom in Real Time — A Visual History | Esy",
  description:
    "From the mystery of Buddy Bolden's single photograph to the stages of Lincoln Center, trace how African diasporic traditions and European instruments produced America's most influential art form. An immersive visual essay featuring archival photography from the Library of Congress.",
  keywords: [
    "Jazz history",
    "Jazz music",
    "Buddy Bolden",
    "Louis Armstrong",
    "Duke Ellington",
    "Billie Holiday",
    "Charlie Parker",
    "Dizzy Gillespie",
    "Thelonious Monk",
    "Miles Davis",
    "John Coltrane",
    "Bebop",
    "Swing era",
    "New Orleans jazz",
    "Cotton Club",
    "52nd Street",
    "Minton's Playhouse",
    "visual essay",
    "music history",
    "William Gottlieb",
    "Library of Congress",
  ],
  openGraph: {
    title: "Jazz: The Sound of Freedom in Real Time — A Visual History",
    description:
      "From Buddy Bolden to bebop to the world—an immersive visual essay tracing jazz's journey through archival photography.",
    url: "https://esy.com/essays/history/jazz-history/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/jazz-history.png",
        width: 1200,
        height: 630,
        alt: "Jazz: The Sound of Freedom in Real Time — A Visual History",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jazz: The Sound of Freedom in Real Time — A Visual History",
    description:
      "From Buddy Bolden to bebop to the world—an immersive visual essay tracing jazz's journey through archival photography.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/jazz-history.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/history/jazz-history/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function JazzHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JazzHistoryClient />
    </>
  );
}
