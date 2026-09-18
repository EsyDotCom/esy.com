import NewsletterHomePage from "../components/NewsletterHome/NewsletterHomePage";
import { HeroStage } from "../components/HomeHero";

// The homepage sells Esy OS (2026-09-18): hero B · Stage, a working copy of
// the office's Books page under a plain promise. The other directions (Split,
// Tour) are components in src/components/HomeHero and stay clickable at
// /prototypes/.
//
// Earlier homepages:
// - The Marketing Engineer front page (2026-09-13 → 09-18) now lives at
//   /engineer (src/app/engineer/page.js, NewsletterHomePage).
// - The marketing-production story (retired 2026-09-13) is archived with its
//   metadata at src/archive/homepage-autopilot-story/route-page.js.

const HOME_TITLE = "Esy OS — your AI team's work and spend, on one page";
const HOME_META_DESCRIPTION =
  "Esy runs AI workers that make your marketing and keeps the books: what was made, what it cost for each client, and what's waiting for your sign-off.";

export const metadata = {
  title: HOME_TITLE,
  description: HOME_META_DESCRIPTION,
  keywords: [
    "Esy OS",
    "AI workers",
    "AI marketing production",
    "AI cost tracking",
    "AI spend by client",
    "AI budgets",
    "marketing automation",
  ],
  // og:image / twitter:image come from src/app/opengraph-image.tsx —
  // don't pin images here or they override the generated card.
  openGraph: {
    title: HOME_TITLE,
    description: HOME_META_DESCRIPTION,
    type: "website",
    url: "https://esy.com",
    siteName: "Esy",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_META_DESCRIPTION,
    site: "@EsyDotCom",
  },
  alternates: {
    canonical: "https://esy.com",
  },
};

// Same sections as /engineer (latest articles, the properties, the clip.art
// case study, the author, the weekly email); only the hero differs. Same
// posture as /engineer: webhook purges for instant updates, hourly backstop.
export const revalidate = 3600;

export default function HomePage() {
  return <NewsletterHomePage hero={<HeroStage />} />;
}
