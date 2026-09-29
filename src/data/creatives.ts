/* Creatives made with Esy, newest first (2026-09-29): ads, explainers and
 * other marketing video and image work, as opposed to films (/films), which
 * are stories. The homepage's "02 Creatives" lists them and plays the newest
 * one in its showcase band. Only real, published work goes here; every fact
 * in `credits` comes from the piece's own write-up.
 */

export type CreativeCard = {
  slug: string;
  title: string;
  /** Shown in the ledger's role line and the band's kicker, e.g. "Explainer video · 1:15". */
  kind: string;
  /** Who it was made for. */
  client: string;
  /** The one-sentence pitch, set as the band's logline. */
  logline: string;
  summary: string;
  youtubeId: string;
  /** Four stills that stand in for a logo in the ledger. */
  frames: string[];
  credits: [string, string][];
  /** The write-up of how it was made (an article slug). */
  articleSlug: string;
};

const EXPLAINER = 'how-we-made-our-explainer-video-in-code';
const still = (name: string) => `/images/articles/${EXPLAINER}/${name}`;

export const CREATIVES: CreativeCard[] = [
  {
    slug: 'seopage-explainer',
    title: 'The SEOPage explainer',
    kind: 'Explainer video · 1:15',
    client: 'SEOPage',
    logline: 'Why ChatGPT recommends your competitor, and how to fix it.',
    summary:
      'A 75-second explainer for plumbers, roofers and HVAC owners, built in code in one working session, with the real product as the demo and three cuts from one timeline.',
    youtubeId: 'gB9rg92S6ZA',
    frames: [still('hook.jpg'), still('builder-score.jpg'), still('vertical.jpg'), still('thumbnails-feed.jpg')],
    credits: [
      ['Made for', 'SEOPage'],
      ['Built in', 'Remotion, with the real product as the demo'],
      ['Voice', '13 lines, generated from the script'],
      ['Sound', '33 effects on 86 cues, mixed to -14 LUFS'],
      ['Cuts', 'YouTube · LinkedIn and X · Reels, TikTok and Shorts'],
      ['Made by', 'Zev, in one working session'],
    ],
    articleSlug: EXPLAINER,
  },
];
