import { Metadata } from "next";
import HowMoneyIsCreatedClient from "./HowMoneyIsCreatedClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/how-money-is-created/#article",
      "headline": "How Money Is Created",
      "alternativeHeadline": "The Mechanics of Credit, Banking, and Monetary Systems",
      "description":
        "A mechanical, step-by-step explanation of how money is actually created in modern economies. Learn how commercial banks create money through lending, how central banks influence the system, and why \"printing money\" is an incomplete explanation.",
      "url": "https://esy.com/essays/how-money-is-created/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://esy.com/esy-logo.png"
        }
      },
      "image": "https://esy.com/og/how-money-is-created.png",
      "articleSection": "Economics",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "How Money Is Created", "item": "https://esy.com/essays/how-money-is-created/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do commercial banks create money?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When a bank issues a loan, it simultaneously records a loan asset and a matching deposit liability. The deposit is new money—loans create deposits on the bank’s balance sheet."
          }
        },
        {
          "@type": "Question",
          "name": "What role do central banks play in money creation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Central banks set the conditions—interest rates, liquidity, and regulatory frameworks. They create base money and influence lending but commercial banks create most money through credit."
          }
        },
        {
          "@type": "Question",
          "name": "How does newly created money circulate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Borrowers spend loan proceeds on wages, goods, and investment. Those payments become deposits elsewhere. Velocity matters: money impacts the economy when it moves through spending and wages."
          }
        },
        {
          "@type": "Question",
          "name": "How is money destroyed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Loan repayment or default contracts the bank’s balance sheet: the loan asset and matching deposit liability are reduced, extinguishing the money created when the loan was issued."
          }
        },
        {
          "@type": "Question",
          "name": "Does quantitative easing print money?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "QE is an asset swap: the central bank buys assets and credits bank reserves. It increases reserves but does not directly hand out spending money; effects depend on subsequent lending and market behavior."
          }
        },
        {
          "@type": "Question",
          "name": "How does government spending affect money creation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Government spending injects money via taxes or bond-financed outlays, distinct from bank lending. It doesn’t require loan repayment and operates under different constraints than private credit creation."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "How Money Is Created: The Mechanics of Credit, Banking, and Monetary Systems | Esy",
  description:
    'A mechanical, step-by-step explanation of how money is actually created in modern economies. Learn how commercial banks create money through lending, how central banks influence the system, and why "printing money" is an incomplete explanation.',
  keywords: [
    "money creation",
    "credit creation",
    "banking system",
    "central banking",
    "monetary policy",
    "quantitative easing",
    "money supply",
    "endogenous money",
    "fractional reserve banking",
    "economics",
    "visual essay",
    "process essay"
  ],
  openGraph: {
    title: "How Money Is Created: The Mechanics of Credit, Banking, and Monetary Systems",
    description: "A mechanical explanation of how money is actually created—through credit, not printing presses.",
    type: "article",
    url: "https://esy.com/essays/how-money-is-created/",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/how-money-is-created.png",
        width: 1200,
        height: 630,
        alt: "How Money Is Created - Visual Essay"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "How Money Is Created | Visual Essay",
    description: "A mechanical explanation of how money is actually created—through credit, not printing presses.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/how-money-is-created.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/how-money-is-created/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  },
  authors: [{ name: "Esy", url: "https://esy.com" }],
  publisher: "Esy",
  category: "education"
};

export default function HowMoneyIsCreatedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HowMoneyIsCreatedClient />
    </>
  );
}


