// Articles of The Marketing Engineer live under one namespace:
// esy.com/engineer/<slug>/. /engineer is the publication's front page
// and index; the namespace keeps articles out of the site root, so they read
// as the publication's own and never compete with top-level routes. (They sat
// at the root briefly, 2026-09-14; src/app/[slug] 308s those URLs here.)
// One helper so every link, canonical URL, and sitemap entry agrees.

/** Where "latest articles" points: the Latest section on /engineer (the homepage until 2026-09-18). */
export const LATEST_ARTICLES_HREF = "/engineer/#latest";

/** Canonical path for one article (trailing slash, per next.config trailingSlash). */
export function articlePath(slug: string): string {
  return `/engineer/${slug}/`;
}

// What an article slug may look like: lowercase words joined by single
// hyphens. Anything else is rejected before touching the article list, so
// junk probes (wp-login.php, .env, …) 404 without a lookup.
const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isArticleSlugShape(slug: string): boolean {
  return ARTICLE_SLUG_PATTERN.test(slug);
}
