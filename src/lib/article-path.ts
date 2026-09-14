// Articles of The Marketing Engineer live at the site root: esy.com/<slug>/.
// The publication IS the site, so its articles get the shortest URLs — and a
// root URL carries no section name that a future rename could break (the path
// has already moved /learn → /agentic → /engineer). The homepage is the front
// page. One helper so every link, canonical URL, and sitemap entry agrees.

/** Where "latest articles" points: the Latest section on the homepage. */
export const LATEST_ARTICLES_HREF = "/#latest";

/** Canonical path for one article (trailing slash, per next.config trailingSlash). */
export function articlePath(slug: string): string {
  return `/${slug}/`;
}

// What an article slug may look like: lowercase words joined by single
// hyphens. The root [slug] route rejects anything else before touching the
// article list, so junk probes (wp-login.php, .env, …) 404 without a lookup.
const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isArticleSlugShape(slug: string): boolean {
  return ARTICLE_SLUG_PATTERN.test(slug);
}
