import type { Metadata } from 'next';
import WhoInventedTheForkClient from './WhoInventedTheForkClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/who-invented-the-fork/#article",
      "headline": "Who Invented the Fork? A History of the World's Most Controversial Utensil",
      "alternativeHeadline": "4,000 Years of Fork History, Scandals, and Evolution",
      "description": "Discover how a simple pronged tool went from 'devil's instrument' to dining essential. A visual journey through 4,000 years of fork history, scandals, and surprising evolution.",
      "url": "https://esy.com/essays/who-invented-the-fork/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/who-invented-the-fork.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Who Invented the Fork", "item": "https://esy.com/essays/who-invented-the-fork/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the eating fork?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The eating fork was developed in the Byzantine Empire around the 4th century CE. While no single inventor is credited, Byzantine royalty popularized personal table forks. Princess Theodora Anna Doukaina is often cited as an early adopter in the 11th century."
          }
        },
        {
          "@type": "Question",
          "name": "Why did Europeans resist using forks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Europeans considered forks effeminate, pretentious, and even blasphemous. The Church taught that God gave humans fingers to eat with. When Byzantines introduced forks to Venice, clergy condemned them as decadent Eastern corruption."
          }
        },
        {
          "@type": "Question",
          "name": "Which fork is the salad fork?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The salad fork is typically the smaller fork placed to the left of (outside of) the dinner fork in a formal place setting. It's positioned furthest from the plate because salad is often served before the main course."
          }
        },
        {
          "@type": "Question",
          "name": "How did Catherine de Medici influence fork use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When Catherine de Medici married France's King Henry II in 1533, she brought Italian dining customs including fork use to the French court. Her influence helped make forks fashionable among French nobility, though widespread adoption took another century."
          }
        },
        {
          "@type": "Question",
          "name": "What side does the fork go on?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Western table settings, forks are placed on the left side of the plate, with the tines facing up (American style) or down (European/Continental style). Multiple forks are arranged in order of use, from outside in toward the plate."
          }
        },
        {
          "@type": "Question",
          "name": "When did the four-tined fork become standard?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The four-tined fork became standard in the early 19th century. Earlier forks had two or three tines. The German-designed four-tine fork proved ideal for both piercing and scooping food, becoming the global standard by the 1850s."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'Who Invented the Fork? A History of the World\'s Most Controversial Utensil | Esy',
  description: 'Discover how a simple pronged tool went from "devil\'s instrument" to dining essential. A visual journey through 4,000 years of fork history, scandals, and surprising evolution.',
  keywords: [
    'who invented the fork',
    'fork history',
    'fork origin',
    'which fork is the salad fork',
    'what side does the fork go on',
    'Byzantine fork',
    'Catherine de Medici fork',
    'Thomas Coryat fork',
    'fork scandal',
    'dining utensil history',
    'culinary history',
    'table etiquette'
  ],
  openGraph: {
    title: 'Who Invented the Fork? | Esy Visual Essay',
    description: 'A 4,000-year journey from devil\'s tool to dinner essential. The surprising, scandalous history of the fork.',
    type: 'article',
    url: 'https://esy.com/essays/who-invented-the-fork/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/who-invented-the-fork.png',
        width: 1200,
        height: 630,
        alt: 'Who Invented the Fork - Visual Essay'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Invented the Fork?',
    description: 'The scandalous history of the world\'s most civilizing utensil.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/who-invented-the-fork.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/who-invented-the-fork/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function WhoInventedTheForkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhoInventedTheForkClient />
    </>
  );
}
