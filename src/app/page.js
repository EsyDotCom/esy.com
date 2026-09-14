import NewsletterHomePage from "../components/NewsletterHome/NewsletterHomePage";

// Previous homepage (marketing-production story, retired 2026-09-13) is
// archived with its metadata at src/archive/homepage-autopilot-story/route-page.js.

const HOME_TITLE = "The Marketing Engineer — a newsletter by Esy";
const HOME_META_DESCRIPTION =
  "Tutorials, guides, and news at the intersection of AI, marketing, and engineering. I build systems that turn marketing data into actions, explain how they work, and show you the results.";

export const metadata = {
  title: HOME_TITLE,
  description: HOME_META_DESCRIPTION,
  keywords: [
    "The Marketing Engineer",
    "marketing engineering",
    "marketing engineering newsletter",
    "Claude Code for marketing",
    "AI marketing systems",
    "marketing automation",
    "SEO automation",
    "Google Analytics automation",
    "marketing data",
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

// The homepage lists the latest articles. Same posture as the article pages: the
// publish/unpublish webhook purges the published-articles tags (and revalidates
// "/") for instant updates; this hourly revalidate is only a backstop.
export const revalidate = 3600;

export default NewsletterHomePage;
