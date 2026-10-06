import { Metadata } from "next";
import HolocaustClient from "./HolocaustClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-holocaust/#article",
      "headline": "Never Forget: Bearing Witness to the Holocaust",
      "alternativeHeadline": "Six Million Names, Six Million Stories",
      "description":
        "The systematic murder of six million Jews and millions of others—told through the faces who lived it, died in it, and survived to testify. A photorealistic visual essay bearing witness to humanity's darkest chapter.",
      "url": "https://esy.com/essays/the-holocaust/",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-holocaust.png",
      "articleSection": "History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Holocaust", "item": "https://esy.com/essays/the-holocaust/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What was the Holocaust?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Holocaust (Shoah) was the systematic, state-sponsored persecution and murder of six million Jews by the Nazi regime and its collaborators between 1933 and 1945."
          }
        },
        {
          "@type": "Question",
          "name": "How many people died in the Holocaust?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Six million Jews were murdered, along with millions of others including Roma, disabled people, political prisoners, LGBTQ+ individuals, and Slavic peoples."
          }
        },
        {
          "@type": "Question",
          "name": "What were concentration camps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Concentration camps were detention facilities where prisoners were held in inhumane conditions, forced into labor, and often murdered. Death camps like Auschwitz were specifically designed for mass extermination."
          }
        },
        {
          "@type": "Question",
          "name": "Who were some notable Holocaust survivors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Notable survivors include Elie Wiesel (author of Night), Primo Levi, and Viktor Frankl. Anne Frank, whose diary became one of the most-read books about the Holocaust, died in Bergen-Belsen in 1945."
          }
        },
        {
          "@type": "Question",
          "name": "Why is Holocaust remembrance important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Remembrance honors the victims, preserves survivor testimony, educates future generations, and serves as a warning against antisemitism, hatred, and genocide."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Never Forget: Bearing Witness to the Holocaust | Esy",
  description:
    "The systematic murder of six million Jews and millions of others—told through the faces who lived it, died in it, and survived to testify. A photorealistic visual essay bearing witness to humanity's darkest chapter.",
  keywords: [
    "Holocaust",
    "Shoah",
    "Nazi Germany",
    "World War II",
    "genocide",
    "Anne Frank",
    "Elie Wiesel",
    "Auschwitz",
    "concentration camps",
    "Jewish history",
    "remembrance",
    "never forget",
    "antisemitism",
    "visual essay",
    "historical documentary"
  ],
  openGraph: {
    title: "Never Forget: Bearing Witness to the Holocaust",
    description:
      "The systematic murder of six million Jews—told through the faces who lived it, died in it, and survived to testify.",
    url: "https://esy.com/essays/the-holocaust/",
    type: "article",
    siteName: "Esy",
    locale: "en_US",
    images: [
      {
        url: "https://esy.com/og/the-holocaust.png",
        width: 1200,
        height: 630,
        alt: "Never Forget: Bearing Witness to the Holocaust"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Never Forget: Bearing Witness to the Holocaust",
    description:
      "A visual essay bearing witness to humanity's darkest chapter. Six million names. Six million stories. Never forget.",
    site: "@EsyResearch",
    images: ["https://esy.com/og/the-holocaust.png"]
  },
  alternates: {
    canonical: "https://esy.com/essays/the-holocaust/"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1
  },
  category: "education",
  publisher: "Esy"
};

export default function TheHolocaustPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HolocaustClient />
    </>
  );
}
