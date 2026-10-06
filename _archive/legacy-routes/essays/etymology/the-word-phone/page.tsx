/**
 * Phonē: From Voice to Device
 * Visual Essay on the Etymology of "Phone"
 *
 * @see /orchestration/skills/visual-essay-invocation/specs/the-word-phone.md
 * @see /docs/VISUAL_ESSAY_METADATA_PATTERN.md
 */
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import TheWordPhoneClient from "./TheWordPhoneClient";

const ESSAY_META = {
  title: "Phonē: From Voice to Device",
  subtitle: "The 2,800-Year Biography of the Word in Your Pocket",
  category: "Etymology",
  readTime: "28 min",
  sourceCount: 18,
  sourceTier: "Tier-1",
  sectionCount: 6,
  visualizationCount: 6,
  designSystem: "Subject-derived",
  published: "February 2026",
  model: "claude-opus-4.6",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Greek Ink", color: "#0A0A0F" },
    { name: "Papyrus Cream", color: "#F0E8D8" },
    { name: "Attic Terracotta", color: "#C4923A" },
    { name: "Telegraph Copper", color: "#B87333" },
    { name: "Technical Blue", color: "#2B4C7E" },
    { name: "Smartphone Glass", color: "#A8C8E8" },
  ],
  visualizations: [
    { name: "Semantic Constellation", type: "Interactive SVG" },
    { name: "Compound Anatomy Diagrams", type: "SVG Morphological Breakdown" },
    { name: "Word Family Tree", type: "Branching SVG Visualization" },
    { name: "Linguistic Starburst", type: "Radial SVG" },
    { name: "Compound Cascade", type: "Animated Sequence" },
    { name: "Fossil Comparison", type: "Parallel Etymology" },
  ],
  keySources: [
    "Robert Beekes, Etymological Dictionary of Greek (2010)",
    "Liddell, Scott & Jones, Greek-English Lexicon",
    "Oxford English Dictionary, 'phone' and 'telephone' entries",
    "Aristotle, De Interpretatione",
    "US Patent 174,465, Alexander Graham Bell (1876)",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-phone/#article",
      headline: "Phon\u0113: From Voice to Device",
      alternativeHeadline:
        "The 2,800-Year Biography of the Word in Your Pocket",
      description:
        "From ancient Greek \u03c6\u03c9\u03bd\u03ae (phon\u0113, 'voice') through the 19th-century compound explosion to the smartphone era \u2014 trace how a word meaning 'voice' became the name for a device rarely used for voice.",
      image:
        "https://images.esy.com/essays/the-word-phone/the-word-phone-og.027ce054f6.webp",
      url: "https://esy.com/essays/etymology/the-word-phone/",
      datePublished: "2026-02-13",
      dateModified: "2026-02-13",
      author: {
        "@type": "Organization",
        name: "Esy",
        url: "https://esy.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Esy",
        url: "https://esy.com",
        logo: {
          "@type": "ImageObject",
          url: "https://esy.com/esy-logo.png",
        },
      },
      articleSection: "Etymology",
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://esy.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Etymology",
          item: "https://esy.com/essays/etymology/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "The Word Phone",
          item: "https://esy.com/essays/etymology/the-word-phone/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where does the word 'phone' come from?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The word 'phone' comes from the ancient Greek \u03c6\u03c9\u03bd\u03ae (phon\u0113), meaning 'voice,' 'sound,' or 'utterance.' It entered English as a combining form in the 19th century (-phone), was famously used in 'telephone' (far-sound) after Bell's 1876 patent, and was clipped to 'phone' by 1878.",
          },
        },
        {
          "@type": "Question",
          name: "Who invented the word 'telephone'?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The word 't\u00e9l\u00e9phone' was first coined around 1828 by French musician Jean-Fran\u00e7ois Sudr\u00e9 for a musical signaling system. German scientist Philipp Reis used 'Telephon' for his sound-transmitting device in 1861. Alexander Graham Bell made the word globally famous with his 1876 patent.",
          },
        },
        {
          "@type": "Question",
          name: "Why do we still call smartphones 'phones'?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This is an example of 'semantic fossilization' \u2014 where a word preserves an obsolete meaning. 'Phone' (from Greek for 'voice') now names a device primarily used for texting, photography, browsing, and apps. Voice calling is among its least-used functions, yet the ancient word persists.",
          },
        },
        {
          "@type": "Question",
          name: "What other English words come from Greek phon\u0113?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Over 30 English words descend from \u03c6\u03c9\u03bd\u03ae including: telephone, microphone, phonograph, saxophone, xylophone, megaphone, symphony, cacophony, euphony, phonetics, phonology, polyphony, and homophone. The -phone suffix typically means 'sound-transmitting device.'",
          },
        },
      ],
    },
  ],
};

export const metadata = createVisualEssayMetadata({
  slug: "the-word-phone",
  basePath: "essays/etymology",
  title: "Phon\u0113: From Voice to Device | Esy Visual Essay",
  description:
    "The 2,800-year biography of the word in your pocket. From ancient Greek \u03c6\u03c9\u03bd\u03ae ('voice') through telephone, phonograph, and saxophone to the smartphone era \u2014 a visual etymology of the most ubiquitous noun of the 21st century.",
  ogTitle: "Phon\u0113: From Voice to Device",
  ogDescription:
    "From Greek \u03c6\u03c9\u03bd\u03ae ('voice') to the device in your pocket \u2014 the 2,800-year journey of the word phone.",
  twitterDescription:
    "A word meaning 'voice' now names a device rarely used for voice. The 2,800-year etymology of phone \u2014 a visual essay.",
  keywords: [
    "phone etymology",
    "telephone history",
    "phon\u0113",
    "Greek etymology",
    "Alexander Graham Bell",
    "word origin",
    "smartphone",
    "linguistic clipping",
    "visual essay",
    "scrollytelling",
    "etymology",
    "phonograph",
    "microphone",
    "saxophone etymology",
    "semantic fossilization",
  ],
  ogImage:
    "https://images.esy.com/essays/the-word-phone/the-word-phone-og.027ce054f6.webp",
  imageAlt:
    "Phon\u0113: From Voice to Device \u2014 a visual essay tracing the Greek word for voice across 2,800 years to the modern smartphone",
});

export default function TheWordPhonePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordPhoneClient />
      </ArtifactDetailWrapper>
    </>
  );
}
