// Articles live under one namespace: esy.com/articles/<slug>/ (2026-10-09; it
// was /engineer/<slug>/, which now 308s here). People browse them by topic
// (/topics/), so there's no /articles index: /articles and /engineer go to
// /topics. One flat address per article, whatever topics it's filed under,
// so renaming a topic never breaks a link. (They sat at the site root briefly,
// 2026-09-14; src/app/[slug] 308s those URLs here too.)
// One helper so every link, canonical URL, and sitemap entry agrees.

/** Where "latest articles" points: the topics, where articles are browsed. */
export const LATEST_ARTICLES_HREF = "/topics/";

/** Canonical path for one article (trailing slash, per next.config trailingSlash). */
export function articlePath(slug: string): string {
  return `/articles/${slug}/`;
}

// What an article slug may look like: lowercase words joined by single
// hyphens. Anything else is rejected before touching the article list, so
// junk probes (wp-login.php, .env, …) 404 without a lookup.
const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isArticleSlugShape(slug: string): boolean {
  return ARTICLE_SLUG_PATTERN.test(slug);
}
