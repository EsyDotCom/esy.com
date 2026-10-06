/**
 * The Semiconductor Story — How Eight Rebellious Scientists Built Modern Civilization
 * Visual Essay on the history and technological evolution of the semiconductor industry
 *
 * Created: December 18, 2025
 * @see /orchestration/skills/visual-essay-invocation/specs/the-semiconductor-story.md
 */
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";
import TheSemiconductorStoryClient from "./TheSemiconductorStoryClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/the-semiconductor-story/#article",
      "headline": "The Semiconductor Story: How Eight Rebellious Scientists Built Modern Civilization",
      "alternativeHeadline": "From the First Transistor to the Geopolitics of Chips",
      "description": "Trace the complete history of the semiconductor industry from Bell Labs 1947 to modern geopolitics. Discover how a handful of scientists and entrepreneurs built the invisible foundation of modern civilization.",
      "url": "https://esy.com/essays/the-semiconductor-story/",
      "datePublished": "2025-12-18",
      "dateModified": "2025-12-18",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-semiconductor-story.png",
      "articleSection": "Technology History",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "The Semiconductor Story", "item": "https://esy.com/essays/the-semiconductor-story/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who invented the transistor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The transistor was invented on December 16, 1947, at Bell Labs by John Bardeen and Walter Brattain, with William Shockley as their team leader. All three shared the 1956 Nobel Prize in Physics. Bardeen and Brattain built the point-contact transistor, while Shockley later developed the more practical bipolar junction transistor."
          }
        },
        {
          "@type": "Question",
          "name": "What is Moore's Law?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Moore's Law is the observation made by Gordon Moore in 1965 that the number of transistors on an integrated circuit doubles approximately every two years. Originally a prediction based on five data points, it became a self-fulfilling prophecy that guided semiconductor industry R&D investments for over 50 years."
          }
        },
        {
          "@type": "Question",
          "name": "Who were the Traitorous Eight?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Traitorous Eight were eight engineers who left Shockley Semiconductor in 1957 to found Fairchild Semiconductor: Robert Noyce, Gordon Moore, Julius Blank, Victor Grinich, Jean Hoerni, Eugene Kleiner, Jay Last, and Sheldon Roberts. William Shockley coined the term as an insult, but it became a badge of honor. These founders and their employees went on to create Intel, AMD, and dozens of other semiconductor companies."
          }
        },
        {
          "@type": "Question",
          "name": "What is TSMC and why is it important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TSMC (Taiwan Semiconductor Manufacturing Company) was founded by Morris Chang in 1987. It pioneered the 'pure-play foundry' model, manufacturing chips designed by other companies without competing with them. Today, TSMC produces over 60% of the world's semiconductors and 90% of advanced chips, making Taiwan strategically critical to global technology."
          }
        },
        {
          "@type": "Question",
          "name": "What is EUV lithography?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EUV (Extreme Ultraviolet) lithography is the cutting-edge technology used to print the smallest chip features. It uses 13.5nm wavelength light created by vaporizing tin droplets with lasers. ASML, a Dutch company, is the sole manufacturer of EUV machines, which cost $150-350 million each and took 30 years to develop."
          }
        },
        {
          "@type": "Question",
          "name": "What is the CHIPS Act?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The CHIPS and Science Act, signed by President Biden in August 2022, commits $52 billion to rebuild domestic semiconductor manufacturing in the United States. It was passed in response to supply chain vulnerabilities exposed during the COVID-19 pandemic and growing geopolitical concerns about reliance on Taiwan for advanced chips."
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: "the-semiconductor-story",
  title: "The Semiconductor Story: How Eight Rebellious Scientists Built Modern Civilization | Esy Visual Essay",
  description:
    "From the first transistor to the geopolitics of chips: trace the 80-year history of the semiconductor industry through the scientists, entrepreneurs, and visionaries who built the invisible foundation of modern civilization.",
  ogTitle: "The Semiconductor Story",
  ogDescription:
    "How a handful of rebellious scientists invented the transistor, created Silicon Valley, and built the technology that powers everything—now at the center of geopolitical competition.",
  twitterDescription:
    "From Bell Labs 1947 to Taiwan today: the complete visual history of the semiconductor industry and why chips have become the new oil.",
  keywords: [
    "semiconductor history",
    "transistor invention",
    "Bell Labs",
    "Silicon Valley",
    "Moore's Law",
    "Intel",
    "TSMC",
    "Morris Chang",
    "Robert Noyce",
    "Gordon Moore",
    "Andy Grove",
    "Traitorous Eight",
    "integrated circuit",
    "microprocessor",
    "EUV lithography",
    "ASML",
    "CHIPS Act",
    "chip shortage",
    "supply chain",
    "visual essay",
    "scrollytelling",
    "technology history",
  ],
  imageAlt:
    "The Semiconductor Story — Silicon chip die glowing with circuit traces on dark background",
  ogImage: "https://esy.com/og/the-semiconductor-story.png",
});

export default function TheSemiconductorStoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheSemiconductorStoryClient />
    </>
  );
}
