import { Anton, Figtree, JetBrains_Mono, Young_Serif } from "next/font/google";

// Lullo's storybook type, so the film pages and the clip.art book match.
export const storySerif = Young_Serif({ weight: "400", subsets: ["latin"], display: "swap", variable: "--film-story" });
export const storySans = Figtree({ weight: ["400", "500", "600", "700"], subsets: ["latin"], display: "swap", variable: "--film-ui" });

// The /films index's title-sequence type: a condensed display face for the huge
// words, and a mono for the small caps labels.
export const filmCond = Anton({ weight: "400", subsets: ["latin"], display: "swap", variable: "--film-cond" });
export const filmMono = JetBrains_Mono({ weight: ["500", "700"], subsets: ["latin"], display: "swap", variable: "--film-mono" });
