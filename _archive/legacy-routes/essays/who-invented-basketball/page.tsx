import type { Metadata } from "next";
import BasketballHistoryClient from "./BasketballHistoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/who-invented-basketball/#article",
      "headline": "The History of Basketball: From Peach Baskets to Global Phenomenon",
      "alternativeHeadline": "Dr. James Naismith's 1891 Invention That Changed Sports Forever",
      "description": "Experience the 134-year journey of basketball from Dr. James Naismith's invention in 1891 to the modern NBA. An immersive scrollytelling experience through sports history.",
      "url": "https://esy.com/essays/who-invented-basketball/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/who-invented-basketball.png",
      "articleSection": "Sports History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Who Invented Basketball", "item": "https://esy.com/essays/who-invented-basketball/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented basketball?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dr. James Naismith invented basketball in December 1891 at the International YMCA Training School in Springfield, Massachusetts. He was tasked with creating an indoor game to keep students active during winter, and devised 13 original rules using a soccer ball and two peach baskets."
          }
        },
        {
          "@type": "Question",
          "name": "Why were peach baskets used in early basketball?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "James Naismith used peach baskets because they were readily available at the Springfield YMCA. The bottoms weren't cut out initially, so someone had to climb a ladder to retrieve the ball after each score. It wasn't until 1906 that metal hoops with open nets became standard."
          }
        },
        {
          "@type": "Question",
          "name": "What were James Naismith's original 13 rules?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Naismith's original rules included: no running with the ball, no shouldering or holding opponents, and the ball must be thrown or batted with hands. Goals counted as one point, and the team with most points won. Many rules have evolved, but the core concept of shooting into an elevated goal remains."
          }
        },
        {
          "@type": "Question",
          "name": "When was the NBA founded?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The NBA was founded on June 6, 1946, as the Basketball Association of America (BAA). It merged with the National Basketball League (NBL) in 1949 to form the NBA. The league has grown from 11 teams to 30 teams across the US and Canada."
          }
        },
        {
          "@type": "Question",
          "name": "What was the 1992 Dream Team?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 1992 Dream Team was the US Olympic basketball team featuring NBA legends including Michael Jordan, Magic Johnson, Larry Bird, and Charles Barkley. It was the first Olympic team to feature active NBA players and is widely considered the greatest sports team ever assembled. They won gold, winning games by an average of 44 points."
          }
        },
        {
          "@type": "Question",
          "name": "How did basketball become a global sport?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Basketball spread globally through YMCA networks, military bases, and international competitions. The 1992 Dream Team sparked worldwide interest. Today, the NBA features players from over 40 countries, and basketball is played in over 200 nations with an estimated 450 million players worldwide."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "The History of Basketball: From Peach Baskets to Global Phenomenon | Esy",
  description:
    "Experience the 134-year journey of basketball from Dr. James Naismith's invention in 1891 to the modern NBA. An immersive scrollytelling experience through sports history.",
  keywords: [
    "basketball history",
    "James Naismith",
    "NBA history",
    "scrollytelling",
    "basketball origins",
    "sports history",
    "Michael Jordan",
    "Dream Team",
    "peach baskets",
    "Springfield Massachusetts"
  ],
  openGraph: {
    title: "The History of Basketball: From Peach Baskets to Global Phenomenon",
    description:
      "Experience the 134-year journey of basketball through an immersive scrollytelling experience.",
    type: "article",
    url: "https://esy.com/essays/who-invented-basketball/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/who-invented-basketball.png",
        width: 1200,
        height: 630,
        alt: "The History of Basketball - From Peach Baskets to Global Phenomenon"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The History of Basketball | Esy",
    description:
      "Experience the 134-year journey of basketball through an immersive scrollytelling experience.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/who-invented-basketball.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/who-invented-basketball/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function HistoryOfBasketballPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BasketballHistoryClient />
    </>
  );
}
