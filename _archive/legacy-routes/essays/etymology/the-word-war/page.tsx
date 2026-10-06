/**
 * WAR — The Conquered Word
 * Visual Essay on the Etymology of "War"
 *
 * Created: January 4, 2026
 * @see /docs/VISUAL_ESSAY_METADATA_PATTERN.md
 */
import { createVisualEssayMetadata } from "@/lib/visual-essay-metadata";
import ArtifactDetailWrapper from "@/components/ArtifactDetail";
import TheWordWarClient from "./TheWordWarClient";

const ESSAY_META = {
  title: "WAR — The Conquered Word",
  subtitle: "How a Germanic Word for Confusion Became English Through Conquest",
  category: "Etymology",
  readTime: "25 min",
  sourceCount: 18,
  sourceTier: "Tier-1",
  sectionCount: 8,
  visualizationCount: 5,
  designSystem: "Subject-derived",
  published: "January 2026",
  model: "Claude",
  template: "Visual Essay",
  backLink: "/essays",
  backLabel: "Essays",
  palette: [
    { name: "Conquest Iron", color: "#2C2C2C" },
    { name: "Norman Gold", color: "#C9A84C" },
    { name: "Blood Red", color: "#8B0000" },
    { name: "Parchment", color: "#E8DCC8" },
    { name: "Battlefield Green", color: "#3D4F2F" },
  ],
  visualizations: [
    { name: "PIE Root Tree", type: "Animated Etymology" },
    { name: "Language Migration Map", type: "Interactive Map" },
    { name: "War Words Timeline", type: "Interactive Timeline" },
    { name: "Cross-Language Comparison", type: "Parallel Display" },
    { name: "Era Typography Shifts", type: "Visual Morphing" },
  ],
  keySources: [
    "Oxford English Dictionary, 'war' entry",
    "Peterborough Chronicle (c. 1121)",
    "Calvert Watkins, American Heritage Dictionary of IE Roots",
    "Albert Baugh, A History of the English Language",
    "Time Magazine, 'World War' coinage (1939)",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://esy.com/essays/etymology/the-word-war/#article",
      "headline": "WAR — The Conquered Word: How a Germanic Word for Confusion Became English",
      "alternativeHeadline": "From PIE *wers- to Modern English: The 3,000-Year Journey of a Word",
      "description": "The word 'war' is itself a survivor of war. It arrived in English through the Norman Conquest, replacing native Old English terms. Trace the 3,000-year journey from Proto-Indo-European 'confusion' to modern armed conflict.",
      "url": "https://esy.com/essays/etymology/the-word-war/",
      "datePublished": "2026-01-04",
      "dateModified": "2026-01-04",
      "author": { "@type": "Organization", "name": "Esy", "url": "https://esy.com" },
      "publisher": {
        "@type": "Organization",
        "name": "Esy",
        "url": "https://esy.com",
        "logo": { "@type": "ImageObject", "url": "https://esy.com/esy-logo.png" }
      },
      "image": "https://esy.com/og/the-word-war.png",
      "articleSection": "Etymology",
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://esy.com" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://esy.com/essays/" },
        { "@type": "ListItem", "position": 3, "name": "Etymology", "item": "https://esy.com/essays/etymology/" },
        { "@type": "ListItem", "position": 4, "name": "The Word War", "item": "https://esy.com/essays/etymology/the-word-war/" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the origin of the English word 'war'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The English word 'war' comes from Old North French 'werre,' which derived from Frankish '*werra' (reconstructed). This Frankish word ultimately traces back to Proto-Indo-European '*wers-' meaning 'to confuse, mix up.' The word entered English after the Norman Conquest of 1066."
          }
        },
        {
          "@type": "Question",
          "name": "When was 'war' first used in English?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The first recorded use of 'war' in English appears in the Peterborough Chronicle, written c.1121-1122. The entry describes events of 1116 and uses the spelling 'wyrre' to describe King Henry I's conflict in Normandy."
          }
        },
        {
          "@type": "Question",
          "name": "Why do Romance languages use 'guerra' instead of a Latin word?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Romance languages abandoned the Latin word 'bellum' (war) because it became phonetically identical to 'bellus' (beautiful) in Vulgar Latin. To avoid confusion, speakers adopted the Frankish Germanic word '*werra,' which became 'guerre' in French, 'guerra' in Spanish, Italian, and Portuguese."
          }
        },
        {
          "@type": "Question",
          "name": "What did the word 'war' originally mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Proto-Indo-European root '*wers-' meant 'to confuse, mix up.' The Germanic descendant '*werra' meant 'confusion, strife, quarrel.' The semantic shift from 'disorder' to 'organized armed conflict' occurred gradually over centuries."
          }
        },
        {
          "@type": "Question",
          "name": "What Old English words did 'war' replace?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Before the Norman Conquest, English used native words like 'guþ' (pronounced 'guth'), 'wig,' 'gewin,' and 'hild' for war and battle. The French-derived 'werre' displaced these terms after 1066. Some survive only in personal names like Wigmund and Guthrum."
          }
        },
        {
          "@type": "Question",
          "name": "Why do Germanic languages have different words for 'war'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Despite being related languages, Germanic tongues use completely different words: English 'war' (from French), German 'Krieg' (from 'stubbornness'), and Dutch 'oorlog' (from 'fate/decree'). The OED notes that 'no Germanic nation in early historic times had in living use any word properly meaning war.'"
          }
        },
        {
          "@type": "Question",
          "name": "When was the term 'World War' first used?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The term 'world war' first appeared in English in 1848 in The People's Journal (Scotland). The designations 'World War I' and 'World War II' were coined by Time Magazine on June 12, 1939, before WWII had even officially begun."
          }
        },
        {
          "@type": "Question",
          "name": "What is the origin of 'War on Poverty' and similar phrases?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The figurative 'War on X' construction became prominent in 20th-century American politics. Attorney General Homer Cummings declared a 'War on Crime' in 1933. President Lyndon B. Johnson famously declared 'War on Poverty' in his 1964 State of the Union address. Nixon's 'War on Drugs' followed in 1971."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'warrior' mean etymologically?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "'Warrior' comes from Old North French 'werreier,' meaning 'one who wages war.' It first appeared in English around 1300 in the Chronicle of Robert of Gloucester. The word combines the root 'werre' (war) with the agent suffix '-ier.'"
          }
        },
        {
          "@type": "Question",
          "name": "How do other languages conceptualize 'war'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Different languages encode different concepts in their words for war: English 'war' (confusion), German 'Krieg' (stubbornness), Dutch 'oorlog' (fate), Russian 'voyna' (warrior activity), Arabic 'harb' (blade/weapon), Chinese 'zhanzheng' (battle-struggle), and Hindi 'yuddh' (to fight)."
          }
        }
      ]
    }
  ]
};

export const metadata = createVisualEssayMetadata({
  slug: "the-word-war",
  basePath: "essays/etymology",
  title: "WAR — The Conquered Word | Esy Visual Essay",
  description:
    "The word 'war' is itself a survivor of war. From Proto-Indo-European 'confusion' to Norman French 'werre' to Modern English—trace the 3,000-year journey of a word that arrived in English through conquest, replacing native Old English terms after 1066.",
  ogTitle: "WAR — The Conquered Word",
  ogDescription:
    "From PIE *wers- 'to confuse' through Frankish *werra to Modern English—the 3,000-year etymology of a word that arrived through conquest.",
  twitterDescription:
    "The word 'war' arrived in English through the Norman Conquest. Trace its 3,000-year journey from 'confusion' to 'armed conflict.'",
  keywords: [
    "war etymology",
    "war word origin",
    "werra frankish",
    "guerre french",
    "bellum latin",
    "norman conquest language",
    "peterborough chronicle",
    "proto-indo-european",
    "germanic languages war",
    "war on poverty etymology",
    "world war term origin",
    "warrior etymology",
    "warfare etymology",
    "visual essay",
    "scrollytelling",
    "linguistics",
  ],
  publishedTime: "2026-01-04",
  modifiedTime: "2026-01-04",
});

export default function TheWordWarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailWrapper meta={ESSAY_META}>
        <TheWordWarClient />
      </ArtifactDetailWrapper>
    </>
  );
}
