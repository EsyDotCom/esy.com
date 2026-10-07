import type { Metadata } from 'next';
import FirearmClient from './FirearmClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-firearm/#article",
      "headline": "The Firearm: From Fire Lance to Modern Precision",
      "alternativeHeadline": "800 Years of Controlled Explosions",
      "description": "From Chinese fire lances to AK-47s — the complete history of firearms with rotating revolver cylinder, ammunition counter, muzzle flash effects, and bullet trajectory animations.",
      "url": "https://esy.com/essays/the-firearm/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-firearm.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Firearm", "item": "https://esy.com/essays/the-firearm/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the first gun?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Chinese invented the first guns. Fire lances (bamboo tubes filled with gunpowder) appeared around 950 CE. The first true metal-barreled guns emerged in China during the 13th century, spreading to Europe through Mongol conquests and the Silk Road."
          }
        },
        {
          "@type": "Question",
          "name": "When was the revolver invented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Samuel Colt patented the first practical revolver in 1836. His revolving cylinder design allowed firing multiple shots without reloading. The Colt Paterson and later Colt Single Action Army became iconic weapons of the American West."
          }
        },
        {
          "@type": "Question",
          "name": "What was the first machine gun?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Gatling gun (1861) was the first successful rapid-fire weapon, using a hand crank to rotate barrels. The first true automatic machine gun was Hiram Maxim's 1884 design, which used recoil energy to fire 600 rounds per minute."
          }
        },
        {
          "@type": "Question",
          "name": "Why is the AK-47 so popular?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The AK-47, designed by Mikhail Kalashnikov in 1947, became the world's most produced firearm due to its reliability, simplicity, and durability. It works in extreme conditions, requires minimal maintenance, and has been manufactured in over 100 million units."
          }
        },
        {
          "@type": "Question",
          "name": "How did gunpowder change warfare?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gunpowder weapons ended the dominance of armored knights and castle fortifications. Cannons destroyed medieval walls, while firearms allowed infantry to defeat cavalry. This democratized warfare—a peasant with a musket could kill a noble knight."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between a rifle and a musket?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Muskets have smooth-bore barrels while rifles have spiral grooves (rifling) that spin the bullet for accuracy. Muskets were faster to load but inaccurate beyond 50 yards. Rifles, though slower to load, were accurate to 300+ yards, revolutionizing warfare."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'The Firearm | From Fire Lance to Modern Precision | Esy',
  description: 'From Chinese fire lances to AK-47s — the complete history of firearms with rotating revolver cylinder, ammunition counter, muzzle flash effects, and bullet trajectory animations.',
  keywords: [
    'firearm history',
    'gun history',
    'fire lance',
    'handgonne',
    'Colt revolver',
    'AK-47',
    'weapons history',
    'military history',
    'Samuel Colt',
    'scrollytelling'
  ],
  openGraph: {
    title: 'The Firearm | From Fire Lance to Modern Precision',
    description: '800 years of controlled explosions. Interactive scrollytelling with rotating cylinder and muzzle flash effects.',
    type: 'article',
    url: 'https://esy.com/essays/the-firearm/',
    siteName: 'Esy',
    locale: 'en_US',
    images: [
      {
        url: 'https://esy.com/og/the-firearm.png',
        width: 1200,
        height: 630,
        alt: 'The Firearm - From Fire Lance to Modern Precision'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Firearm | From Fire Lance to Modern Precision',
    description: 'The complete history of firearms from bamboo tubes to assault rifles.',
    site: '@EsyResearch',
    images: ['https://esy.com/og/the-firearm.png']
  },
  alternates: {
    canonical: 'https://esy.com/essays/the-firearm/'
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  }
};

export default function TheFirearmPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FirearmClient />
    </>
  );
}
