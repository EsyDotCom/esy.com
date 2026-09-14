import NewsletterHomePage from "../components/NewsletterHome/NewsletterHomePage";

// Previous homepage (marketing-production story, retired 2026-09-13) is
// archived with its metadata at src/archive/homepage-autopilot-story/route-page.js.

const HOME_TITLE = "The Marketing Engineer — a newsletter by Esy";
const HOME_META_DESCRIPTION =
  "I build systems that turn marketing data into actions, explain how they work, and show you the results. Claude Code, analytics, and search data on live sites — one system per issue.";

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

// The homepage lists the latest published issues. Same posture as /engineer:
// the publish/unpublish webhook purges the published-articles tags for instant
// updates, and this hourly revalidate is only a backstop if a webhook is missed.
export const revalidate = 3600;

export default NewsletterHomePage;
