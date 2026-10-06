/**
 * The Word "Han" — Etymology, Empire, and Identity Across East Asia
 * Visual Essay on the origin and evolution of "Han" (漢/韓)
 *
 * Created: December 14, 2025
 * @see /orchestration/skills/visual-essay-invocation/specs/the-word-han.md
 */
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import TheWordHanClient from "./TheWordHanClient";

const ESSAY_META = {
  title: "漢 / 韓 — How One Word Shaped East Asia",
  subtitle: "The 2,200-Year Journey of the Word 'Han' Through Four Civilizations",
  category: "Etymology",
  readTime: "25 min",
  sourceCount: 16,
  sourceTier: "Tier-1",
  sectionCount: 7,
  visualizationCount: 5,
  designSystem: "Subject-derived",
  published: "December 2025",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Imperial Red", color: "#8B0000" },
    { name: "Bronze Gold", color: "#C9A84C" },
    { name: "Jade Green", color: "#00695C" },
    { name: "Ink Black", color: "#1A1A1A" },
    { name: "Silk White", color: "#FAF7F0" },
  ],
  visualizations: [
    { name: "Character Evolution", type: "Animated Calligraphy" },
    { name: "Civilization Map", type: "Interactive Map" },
    { name: "Dynasty Timeline", type: "Interactive Timeline" },
    { name: "Cross-Language Comparison", type: "Parallel Display" },
    { name: "Key Figures Gallery", type: "Portrait Cards" },
  ],
  keySources: [
    "Records of the Grand Historian (Sima Qian)",
    "King Sejong, Hunminjeongeum (1443)",
    "Oxford English Dictionary",
    "Victor Mair, The Columbia History of Chinese Literature",
    "Cambridge History of China",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-han/#article",
      "headline": "漢 / 韓 — How One Word Shaped East Asia",
      "alternativeHeadline": "The 2,200-Year Journey of the Word 'Han' Through Four Civilizations",
      "description": "From a river's name to four civilizations: trace the 2,200-year journey of the word 'Han' through China, Korea, Japan, and Vietnam. Discover how one morpheme became embedded in ethnic identity, writing systems, and national consciousness.",
      "url": "https://esy.com/essays/etymology/the-word-han/",
      "datePublished": "2025-12-14",
      "dateModified": "2025-12-17",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-word-han-gold.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 3, "name": "The Word Han", "item": "https://esy.com/essays/etymology/the-word-han/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does 'Han' mean in Chinese?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Chinese Han (漢) originally meant the Han River in central China. It became the name of the Han Dynasty (206 BCE – 220 CE), China's most influential dynasty, and eventually the ethnic identifier 'Han Chinese' (漢族), describing 92% of China's population—the world's largest ethnic group at over 1.3 billion people."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'Han' mean in Korean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Korean Han (韓) is a different character meaning 'great' or 'leader.' It was the name of ancient Korean confederacies (Samhan) and now appears in Hanguk (韓國, Korea), Hangul (the Korean alphabet), and Hanja (Chinese characters used in Korean). It's etymologically distinct from the Chinese Han (漢)."
          }
        },
        {
          "@type": "Question",
          "name": "Why is it called Hangul?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hangul combines Han (韓, 'great/Korean') with gul (글, 'script'). King Sejong created this alphabet in 1443 to give common Koreans a writing system independent of Chinese characters. The name emphasizes it as the 'great script' or 'Korean script'—a nationalist assertion of cultural identity."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between Hanja and Kanji?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hanja (韓字/漢字, 'Han characters') is the Korean name for Chinese characters used in Korean writing. Kanji (漢字, same characters) is the Japanese term. Both derive from 'Han' meaning Chinese/Han Dynasty. The characters are largely the same but with different local pronunciations and some variant forms."
          }
        },
        {
          "@type": "Question",
          "name": "Who was Liu Bang and the Han Dynasty?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Liu Bang was a peasant rebel who became Emperor Gaozu, founding the Han Dynasty in 206 BCE after overthrowing the Qin Dynasty. The 400-year Han Dynasty was so influential that Chinese people call themselves 'Han people,' Chinese characters are 'Han characters,' and Chinese language is 'Hanyu.'"
          }
        },
        {
          "@type": "Question",
          "name": "Are Chinese Han and Korean Han related?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Despite sounding identical in English, Chinese Han (漢) and Korean Han (韓) are etymologically distinct. They use different characters with different origins: 漢 refers to the Han River/Dynasty, while 韓 comes from ancient Korean tribal names. They share cultural contact but not linguistic origin."
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: "the-word-han",
  basePath: "essays/etymology",
  title: "漢 / 韓 — How One Word Shaped East Asia | Esy Visual Essay",
  description:
    "From a river's name to four civilizations: trace the 2,200-year journey of the word 'Han' through China, Korea, Japan, and Vietnam. Discover how one morpheme became embedded in ethnic identity, writing systems, and national consciousness—and why there are actually two etymologically distinct 'Hans.'",
  ogTitle: "漢 / 韓 — How One Word Shaped East Asia",
  ogDescription:
    "The 2,200-year journey of the word 'Han' from a river's name to four civilizations. Two words, same sound, different origins—shared heritage, distinct identity.",
  twitterDescription:
    "From Han River to Han Dynasty to Han Chinese to Hangul—how one word (and its Korean twin) shaped the identities of billions across East Asia.",
  keywords: [
    "Han etymology",
    "Han Dynasty",
    "Han Chinese",
    "Hangul",
    "Hanguk",
    "Hanja",
    "Kanji",
    "Korean Han",
    "Chinese Han",
    "漢",
    "韓",
    "King Sejong",
    "Liu Bang",
    "East Asian history",
    "Chinese characters",
    "visual essay",
    "scrollytelling",
    "typography",
    "etymology",
    "linguistics",
  ],
  imageAlt:
    "The Word Han — Bronze inscription character glowing gold on dark background",
  ogImage: "https://esy.com/og/the-word-han-gold.png",
});

export default function TheWordHanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordHanClient />
      </ArtifactDetailWrapper>
    </>
  );
}
