import { Figtree, Young_Serif } from "next/font/google";

// Milo's storybook type, so the film pages and the clip.art book match.
export const storySerif = Young_Serif({ weight: "400", subsets: ["latin"], display: "swap", variable: "--film-story" });
export const storySans = Figtree({ weight: ["400", "500", "600", "700"], subsets: ["latin"], display: "swap", variable: "--film-ui" });
