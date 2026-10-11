// Fonts are self-hosted from src/fonts/ (scripts/fetch-google-fonts.py), so builds never fetch from Google.
import localFont from "next/font/local";

// Lullo's storybook type, so the film pages and the clip.art book match.
export const storySerif = localFont({
  src: [
    { path: "../../fonts/young-serif/young-serif-400-normal.woff2", weight: "400", style: "normal" },
  ],
  variable: "--film-story",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
export const storySans = localFont({
  src: [
    { path: "../../fonts/figtree/figtree-300-900-normal.woff2", weight: "300 900", style: "normal" },
  ],
  variable: "--film-ui",
  display: "swap",
});

// The /films index's title-sequence type: a condensed display face for the huge
// words, and a mono for the small caps labels.
export const filmCond = localFont({
  src: [
    { path: "../../fonts/anton/anton-400-normal.woff2", weight: "400", style: "normal" },
  ],
  variable: "--film-cond",
  display: "swap",
});
export const filmMono = localFont({
  src: [
    { path: "../../fonts/jetbrains-mono/jetbrains-mono-100-800-normal.woff2", weight: "100 800", style: "normal" },
  ],
  variable: "--film-mono",
  display: "swap",
});
