import type { Metadata } from 'next';
import HighHeelsHistoryClient from './HighHeelsHistoryClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/who-invented-high-heels/#article",
      "headline": "Who Invented High Heels? A History in Five Centuries",
      "alternativeHeadline": "From Persian Cavalry to Parisian Runways",
      "description": "From Persian cavalry to Parisian runways—discover the extraordinary 500-year journey of the high heel, from military equipment to fashion icon.",
      "url": "https://esy.com/essays/who-invented-high-heels/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/who-invented-high-heels.png",
      "articleSection": "Fashion History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Who Invented High Heels", "item": "https://esy.com/essays/who-invented-high-heels/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented high heels?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "High heels originated with Persian cavalry in the 10th century. The raised heel helped horsemen stay in their stirrups while shooting arrows. Persian diplomats brought heeled shoes to Europe in the 1590s, where aristocrats adopted them as symbols of status and military prowess."
          }
        },
        {
          "@type": "Question",
          "name": "Did men wear high heels before women?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, high heels were originally worn by men. Persian soldiers used them for horseback riding, and European aristocratic men wore them to appear taller and more powerful. Louis XIV of France wore red heels as a symbol of royal status. Women only began wearing heels in the 1600s to adopt masculine fashion."
          }
        },
        {
          "@type": "Question",
          "name": "Why did Louis XIV wear red heels?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Louis XIV established red heels as an exclusive marker of French nobility. Only those in the king's favor could wear red heels at Versailles. This sumptuary law reinforced social hierarchy. Christian Louboutin later revived the red sole as a luxury trademark in 1993."
          }
        },
        {
          "@type": "Question",
          "name": "Who invented the stiletto heel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Roger Vivier invented the modern stiletto heel in 1954, made possible by a steel spike inside the heel. Salvatore Ferragamo and André Perugia also contributed to the design. The stiletto—named after the Italian dagger—became synonymous with feminine glamour in the 1950s."
          }
        },
        {
          "@type": "Question",
          "name": "When did high heels become feminine?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "High heels shifted to being primarily feminine in the late 1700s during the Enlightenment. As men embraced rational, practical clothing, women kept the impractical heel as a marker of femininity. By the Victorian era, heels were firmly associated with women's fashion and sexuality."
          }
        },
        {
          "@type": "Question",
          "name": "Why are Louboutin shoes so expensive?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Christian Louboutin's signature red soles (introduced in 1993) became a status symbol. The shoes are handcrafted in Italy, and the brand maintains exclusivity through high prices ($700+) and limited retail distribution. The red sole is legally trademarked and instantly recognizable."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'Who Invented High Heels? The Complete History | Esy',
  description: 'From Persian cavalry to Parisian runways—discover the extraordinary 500-year journey of the high heel, from military equipment to fashion icon.',
  keywords: [
    'high heels history',
    'who invented high heels',
    'stiletto history',
    'Louis XIV heels',
    'fashion history',
    'shoe history',
    'Louboutin history',
    'Persian heels',
    'Roger Vivier stiletto'
  ],
  openGraph: {
    title: 'Who Invented High Heels? A History in Five Centuries',
    description: 'From Persian cavalrymen to Parisian runways—the extraordinary journey of fashion\'s most provocative invention.',
    type: 'article',
    url: 'https://esy.com/essays/who-invented-high-heels/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/who-invented-high-heels.png',
        width: 1200,
        height: 630,
        alt: 'The History of High Heels'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Invented High Heels?',
    description: 'From Persian cavalry to Parisian runways—the 500-year journey of the high heel.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/who-invented-high-heels.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/who-invented-high-heels/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function HighHeelsHistoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HighHeelsHistoryClient />
    </>
  );
}
