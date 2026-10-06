/**
 * Words Have Histories: The Curious Journey of "Pussy"
 * Visual Essay on Etymology and Semantic Evolution
 *
 * A typography-forward visual essay exploring how a simple pet-name
 * for cats became one of the most controversial words in English.
 *
 * Created via Visual Essay Orchestrator pipeline: December 14, 2025
 * @see /orchestration/skills/visual-essay-invocation/specs/the-word-pussy.md
 */
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import TheWordPussyClient from "./TheWordPussyClient";

const ESSAY_META = {
  title: "Words Have Histories: The Curious Journey of 'Pussy'",
  subtitle: "500 Years of Etymology from Pet-Name to Taboo",
  category: "Etymology",
  readTime: "20 min",
  sourceCount: 14,
  sourceTier: "Tier-1",
  sectionCount: 6,
  visualizationCount: 5,
  designSystem: "Subject-derived",
  published: "December 2025",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Cat Grey", color: "#6B7280" },
    { name: "Nursery Pink", color: "#F9A8D4" },
    { name: "Victorian Plum", color: "#581C87" },
    { name: "Taboo Red", color: "#991B1B" },
    { name: "Modern Slate", color: "#334155" },
  ],
  visualizations: [
    { name: "Semantic Drift Timeline", type: "Interactive Timeline" },
    { name: "Euphemism Treadmill", type: "Animated Sequence" },
    { name: "Era Typography Shifts", type: "Visual Morphing" },
    { name: "Dictionary Entry Evolution", type: "Gradual Reveals" },
    { name: "Cultural Context Cards", type: "Interactive Cards" },
  ],
  keySources: [
    "Oxford English Dictionary, historical entries",
    "Samuel Johnson, A Dictionary of the English Language (1755)",
    "Steven Pinker, The Stuff of Thought",
    "Keith Allan & Kate Burridge, Forbidden Words",
    "Historical nursery rhyme collections",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-pussy/#article",
      "headline": "Words Have Histories: The Curious Journey of 'Pussy'",
      "alternativeHeadline": "500 Years of Etymology from Pet-Name to Taboo",
      "description": "From Germanic pet-names for cats to modern taboo—trace the 500-year etymological journey of the word 'pussy' through affection, euphemism, and semantic evolution. A typography-forward visual essay.",
      "url": "https://esy.com/essays/etymology/the-word-pussy/",
      "datePublished": "2025-12-14",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-word-pussy.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Word Pussy", "item": "https://esy.com/essays/etymology/the-word-pussy/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the original meaning of 'pussy'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The original meaning was simply 'cat.' The word appeared in English by the 1500s, likely from Dutch 'poes' or Low German 'puse,' both affectionate names for cats. 'Puss' and 'pussy' were innocent pet-names for centuries—appearing in nursery rhymes and children's stories."
          }
        },
        {
          "@type": "Question",
          "name": "When did 'pussy' become a vulgar word?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The vulgar meaning developed gradually from the 17th century onward. By the 1800s, 'pussy' was recorded as slang for female genitalia, likely through metaphorical association with softness and fur. The double meaning made the word increasingly awkward, eventually overwhelming the original cat sense."
          }
        },
        {
          "@type": "Question",
          "name": "What is the euphemism treadmill?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The euphemism treadmill is a linguistic phenomenon where words created to be polite alternatives eventually absorb the taboo of what they replace. 'Pussy' followed this path—starting as an innocent pet-name, becoming a euphemism, then becoming the new taboo term itself."
          }
        },
        {
          "@type": "Question",
          "name": "Is 'pussy' related to 'pusillanimous'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. 'Pussycat' (coward) and 'pusillanimous' (cowardly) are false cognates with different origins. Pusillanimous comes from Latin 'pusillus' (very small) + 'animus' (spirit). The similarity is coincidental, though 'pussy' meaning coward may have been influenced by the perceived timidity of cats."
          }
        },
        {
          "@type": "Question",
          "name": "Why did 'pussy' disappear from children's media?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As the vulgar meaning became dominant in the late 20th century, the innocent 'pussycat' became unusable in children's contexts. Classic rhymes like 'Pussycat, Pussycat, where have you been?' became awkward. This is an example of how semantic change can permanently alter a word's usability."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'pussy' etymology teach about language?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The word demonstrates several linguistic principles: semantic drift (meaning change over time), the euphemism treadmill, pejoration (becoming more negative), and taboo contamination. A word's fate is shaped by cultural attitudes, not just dictionary definitions. Meaning lives in use, not etymology."
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: "the-word-pussy",
  basePath: "essays/etymology",
  title: "Words Have Histories: The Curious Journey of 'Pussy' | Esy Visual Essay",
  description:
    "From Germanic pet-names for cats to modern taboo—trace the 500-year etymological journey of the word 'pussy' through affection, euphemism, and semantic evolution. A typography-forward visual essay.",
  ogTitle: "Words Have Histories: The Curious Journey of 'Pussy'",
  ogDescription:
    "How did a word for cats become one of the most controversial words in English? A visual essay on etymology, taboo, and the life of language.",
  twitterDescription:
    "From Old Norse to modern taboo—the fascinating 500-year etymology of the word 'pussy' through typography, linguistics, and cultural evolution.",
  keywords: [
    "pussy etymology",
    "word origin",
    "etymology",
    "linguistic history",
    "semantic evolution",
    "taboo words",
    "euphemism treadmill",
    "Old Norse",
    "Germanic languages",
    "Samuel Johnson dictionary",
    "typography history",
    "visual essay",
    "scrollytelling",
  ],
});

export default function TheWordPussyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordPussyClient />
      </ArtifactDetailWrapper>
    </>
  );
}



