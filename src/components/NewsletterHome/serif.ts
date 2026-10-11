// Fonts are self-hosted from src/fonts/ (scripts/fetch-google-fonts.py), so builds never fetch from Google.
import localFont from "next/font/local";

// The publication's display serif, shared by the homepage and the topic hubs.
// The global stylesheet only ships Cormorant at weight 400, so these real
// 600/700 cuts keep headlines from faux-bolding. Exposed as --nl-serif, which
// NewsletterHome.css reads.
export const nlSerif = localFont({
  src: [
    { path: "../../fonts/cormorant-garamond/cormorant-garamond-300-700-normal.woff2", weight: "300 700", style: "normal" },
  ],
  variable: "--nl-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
