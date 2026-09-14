import { Cormorant_Garamond } from "next/font/google";

// The publication's display serif, shared by the homepage and the topic hubs.
// The global stylesheet only ships Cormorant at weight 400, so these real
// 600/700 cuts keep headlines from faux-bolding. Exposed as --nl-serif, which
// NewsletterHome.css reads.
export const nlSerif = Cormorant_Garamond({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--nl-serif",
});
