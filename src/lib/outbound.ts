/* Outbound links and link equity (Zev, 2026-11-07): esy.com passes link equity only to ESY's own
 * properties. Every other outside link is rel="nofollow". One rule for the whole site, so a page, a
 * component or an article renderer asks here instead of deciding on its own. */

/** ESY's own sites: followed links are allowed to these and their subdomains. */
export const OWN_DOMAINS = ['esy.com', 'clip.art', 'seopage.com', 'seo.page', 'octomason.com'] as const;

/** True for relative links, in-page anchors, mailto/tel, and absolute links to an own domain. */
export function isOwnHref(href: string): boolean {
  if (!/^[a-z][a-z0-9+.-]*:/i.test(href) && !href.startsWith('//')) return true; // relative, #anchor
  if (/^(mailto|tel):/i.test(href)) return true;
  try {
    const host = new URL(href, 'https://esy.com').hostname.toLowerCase();
    return OWN_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`));
  } catch {
    return false;
  }
}

/**
 * The rel for a link. Own links keep any rel passed in (or none); outside links always get nofollow,
 * plus noopener/noreferrer when they open in a new tab. `extra` (e.g. "sponsored", "me") is kept.
 */
export function relFor(href: string, { newTab = false, extra = '' }: { newTab?: boolean; extra?: string } = {}): string | undefined {
  const parts = new Set(extra.split(/\s+/).filter(Boolean));
  if (!isOwnHref(href)) parts.add('nofollow');
  if (newTab) { parts.add('noopener'); if (!isOwnHref(href)) parts.add('noreferrer'); }
  return parts.size ? [...parts].join(' ') : undefined;
}
