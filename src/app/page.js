import NewsletterHomePage from "../components/NewsletterHome/NewsletterHomePage";
import { EduFrontPage, resolveDesks } from "../components/EducationHero";
import { getAllAgenticArticles } from "../lib/published-articles";

// The homepage is a Marketing Engineering publication (2026-09-25): hero A ·
// Front Page, a centred promise and the weekly email over the four desks
// (Build, Grow, Operate, Learn), each linking its latest articles. esy.com
// teaches; the software no longer leads above the fold. The other directions
// stay clickable at /prototypes/education/.
//
// Earlier homepages:
// - The Esy OS hero, E · Stage Tour (2026-09-18 → 09-25), is HeroStageTour in
//   src/components/HomeHero, still clickable at /prototypes/hero/stage-tour/.
// - The Marketing Engineer front page (2026-09-13 → 09-18) lives at
//   /engineer (src/app/engineer/page.js, NewsletterHomePage).
// - The marketing-production story (retired 2026-09-13) is archived with its
//   metadata at src/archive/homepage-autopilot-story/route-page.js.

const HOME_TITLE = "Esy — Marketing Engineering for the AI era";
const HOME_META_DESCRIPTION =
  "Learn to build the AI systems that run marketing: SEO, AI coding tools, marketing agents, and the integrations between them. Practical lessons from production, one email a week.";

export const metadata = {
  title: HOME_TITLE,
  description: HOME_META_DESCRIPTION,
  keywords: [
    "Marketing Engineering",
    "AI for marketing",
    "AI marketing agents",
    "AI SEO",
    "AI coding tools",
    "Claude Code",
    "Clay",
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

// Same sections as /engineer (latest articles, the properties, the case
// studies, the author, the weekly email); only the hero differs. Same
// posture as /engineer: webhook purges for instant updates, hourly backstop.
export const revalidate = 3600;

export default async function HomePage() {
  // The desks link real articles, so they resolve against the same list the
  // Latest section reads.
  const desks = resolveDesks(await getAllAgenticArticles());
  return <NewsletterHomePage hero={<EduFrontPage desks={desks} />} />;
}
