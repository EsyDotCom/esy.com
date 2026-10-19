// Share links for an AI Marketing News post (prototype, 2026-10-19).
//
// Every link is a plain URL to the network's own share page: no scripts, no
// SDKs, no trackers. The post's canonical address is what gets shared; in the
// prototype it carries ?src=proto-sh<n> so a click from here never counts as a
// real share.

export type ShareNetwork = 'x' | 'linkedin' | 'facebook' | 'threads' | 'email';

export interface ShareTarget {
  /** The post's canonical address, e.g. https://esy.com/news/<slug>/ */
  url: string;
  /** The post's headline. */
  title: string;
}

/** The address to share, tagged so prototype clicks stay out of real counts. */
export function taggedUrl(url: string, tag: string): string {
  const u = new URL(url);
  u.searchParams.set('src', tag);
  return u.toString();
}

const enc = encodeURIComponent;

/** Each network's own share page, in the order the footer shows them. */
export function shareLinks({ url, title }: ShareTarget): { network: ShareNetwork; label: string; href: string }[] {
  return [
    { network: 'x', label: 'Share on X', href: `https://x.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
    { network: 'linkedin', label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { network: 'facebook', label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { network: 'threads', label: 'Share on Threads', href: `https://www.threads.com/intent/post?text=${enc(`${title} ${url}`)}` },
    { network: 'email', label: 'Share by email', href: `mailto:?subject=${enc(title)}&body=${enc(`${title}\n\n${url}`)}` },
  ];
}

/**
 * Google's "Add as a preferred source" deeplink (Search Central, "Preferred
 * sources", updated 2026-09-18): it opens Google's source preferences with
 * the site filled in. Preferences work per domain, so this is esy.com as a
 * whole, not /news alone.
 */
export const PREFERRED_SOURCE_URL = 'https://www.google.com/preferences/source?q=esy.com';
