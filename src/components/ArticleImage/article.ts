/* Helpers for the image-led article prototypes (/prototypes/article/): an
 * article page for posts that lead with a picture instead of a video.
 *
 * The prototypes render a real published article (its title, summary and
 * markdown come from the article list, not from sample copy), with a lead
 * image generated through api.esy.com standing in for the video. */

import type { AgenticVideo } from '@/data/agentic-videos';

/** The picture an image-led article opens with. An empty caption shows none;
 *  an empty alt marks it decorative (the title sits right on it). */
export interface LeadImage {
  src: string;
  alt: string;
  caption: string;
}

/** One ## section of the article body. `id` is its anchor, for the table of contents. */
export interface ArticleSection {
  id: string;
  title: string | null; // null for the intro before the first heading
  markdown: string;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Split the markdown at each `## ` heading. The renderer gives headings no ids,
 *  so each section is rendered on its own inside an anchored wrapper; that also
 *  lets a layout place a signup card between two sections. */
export function splitSections(markdown: string): ArticleSection[] {
  const parts = markdown.split(/^(?=## )/m);
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const heading = part.match(/^## (.+)$/m);
      const title = part.startsWith('## ') && heading ? heading[1].trim() : null;
      return { id: title ? slugify(title) : 'intro', title, markdown: part };
    });
}

/** Reading time from the words, since there's no video length to show. */
export function readMinutes(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/** Date-only strings format in UTC so they don't render a day early behind UTC. */
export function longDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

/** Everything a layout needs, resolved once by the route (build.ts). */
export interface ImageArticle {
  article: AgenticVideo;
  /** Null when the article has no image: the cover shows the navy ground alone. */
  image: LeadImage | null;
  sections: ArticleSection[];
  minutes: number;
  topic: { name: string; href: string } | null;
  related: AgenticVideo[];
}

/** Images from other hosts (a Compose thumbnail) skip the optimizer, whose
 *  allowed domains are listed in next.config; local files go through it. */
export const isRemote = (src: string) => /^https?:\/\//.test(src);
