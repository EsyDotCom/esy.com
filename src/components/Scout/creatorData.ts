/* The public creators (src/data/scout/creators.json) and their esy.com/scout/<slug> addresses, in a
 * plain module so server pages (static params, metadata) and client components share one source. */
import data from '@/data/scout/creators.json';

type Hop = { at: string; does?: string; basis?: string; url?: string };
type Step = { name: string; price?: string; kind?: string; what?: string; basis?: string; url?: string };
type LinkRow = { kind?: string; handle?: string; url: string; label?: string };
type Platform = { name: string; followers?: number; url?: string };
export type PublicCreator = { id: string; name: string; avatar: string; readOn: string; game: string | null; platforms: Platform[]; routes: { from: string; kind?: string; hops: Hop[] }[]; ladder: Step[]; links: LinkRow[] };

export const CREATOR_LIST = data.creators as PublicCreator[];

/** esy.com/scout/<slug>: the creator's name, lowercased and hyphenated ("Nick Saraev" → nick-saraev). */
export const slugOf = (c: PublicCreator) => c.name.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
export const bySlug = (slug: string) => CREATOR_LIST.find((c) => slugOf(c) === slug);

// ── Each creator's FAQ (2026-11-07) ─────────────────────────────────────────────────────────
// Zev: a "Who is …?" FAQ on every creator page, at least seven questions, each answer citing the
// creator's own links. Built only from the public snapshot, so every answer is checkable and the
// rules hold: audiences and prices as shown that day, Esy's reading labelled, no earnings.

/** A run of answer text; with `href`, a citation link to the creator's own page. */
export type FaqPart = { text: string; href?: string };
export type FaqItem = { q: string; a: FaqPart[] };

const plat = (n: string) => n.replace(/\s*\(.*$/, '');
const aud = (n?: number) => (n == null ? '' : n >= 1e6 ? `${(n / 1e6).toFixed(1).replace(/\.0$/, '')}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n));
const when = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
/** "a, b and c" from parts, keeping each part's link. */
function list(items: FaqPart[]): FaqPart[] {
  return items.flatMap((p, i) => [p, ...(i < items.length - 2 ? [{ text: ', ' }] : i === items.length - 2 ? [{ text: ' and ' }] : [])]);
}
/** The first money figure in a price, as a number, for "cheapest paid" ("From $5K" → 5000). */
function value(price?: string) {
  const m = (price ?? '').match(/\$\s*([\d,]+(?:\.\d+)?)\s*([KkMm])?/);
  return m ? parseFloat(m[1].replace(/,/g, '')) * (m[2] ? (/k/i.test(m[2]) ? 1e3 : 1e6) : 1) : NaN;
}

export function faqFor(c: PublicCreator): FaqItem[] {
  const first = c.name.split(' ')[0];
  const top = c.platforms[0];
  const read = when(c.readOn);
  const linkOf = (name: string) => c.links.find((l) => plat(l.kind ?? '').toLowerCase() === plat(name).toLowerCase())?.url;
  const free = c.ladder.filter((l) => l.kind === 'free');
  const paid = c.ladder.filter((l) => l.kind !== 'free' && value(l.price) > 0).sort((a, b) => value(a.price) - value(b.price));
  const community = c.ladder.find((l) => /skool|community|group|membership/i.test(`${l.name} ${l.what ?? ''}`));
  const items: FaqItem[] = [];

  // 1. Who is …?
  items.push({ q: `Who is ${c.name}?`, a: [
    { text: `${c.name} is a creator who posts on ` },
    ...list(c.platforms.map((p) => ({ text: plat(p.name), href: p.url ?? linkOf(p.name) }))),
    { text: top ? `, with the biggest audience on ${plat(top.name)} (${aud(top.followers)} followers as shown on ${read}).` : '.' },
    ...(c.game ? [{ text: ` Esy’s reading of their game plan: ${c.game.split(/(?<=[.!?])\s/)[0]}` }] : []),
  ] });

  // 2. Where they post and how big each audience is.
  if (c.platforms.length) items.push({ q: `Where does ${c.name} post, and how big is their audience?`, a: [
    { text: `As each profile showed on ${read}: ` },
    ...list(c.platforms.map((p) => ({ text: `${plat(p.name)} ${aud(p.followers)}`, href: p.url ?? linkOf(p.name) }))),
    { text: '. Counts change; follow the links for today’s numbers.' },
  ] });

  // 3. The funnel: where each platform sends people.
  const routes = c.routes.map((r) => ({ from: r.from, hop: r.hops.find((h) => h.url) ?? r.hops[0] })).filter((r) => r.hop);
  if (routes.length) items.push({ q: `How does ${c.name} get customers from social media?`, a: [
    ...routes.slice(0, 4).flatMap((r, i) => [
      { text: `${i ? ' ' : ''}On ${r.from}, people are sent to ` },
      { text: r.hop!.at, href: r.hop!.url },
      { text: r.hop!.does ? ` (${r.hop!.does.replace(/\.$/, '')}).` : '.' },
    ]),
  ] });

  // 4. What they sell.
  if (c.ladder.length) items.push({ q: `What does ${c.name} sell?`, a: [
    { text: `${c.ladder.length} offers were on their pages on ${read}, cheapest first: ` },
    ...list(c.ladder.slice(0, 6).map((l) => ({ text: `${l.name} (${l.price})`, href: l.url }))),
    { text: c.ladder.length > 6 ? `, and ${c.ladder.length - 6} more.` : '.' },
  ] });

  // 5. Anything free.
  items.push({ q: `Does ${c.name} offer anything for free?`, a: free.length
    ? [{ text: 'Yes: ' }, ...list(free.slice(0, 4).map((l) => ({ text: l.name, href: l.url }))), { text: '. Free offers are usually the first step of the funnel.' }]
    : [{ text: 'No free offer was found on their pages when we read them; their free content is the posts themselves.' }] });

  // 6. The cheapest paid step.
  if (paid.length) items.push({ q: `How much does ${c.name}’s first paid offer cost?`, a: [
    { text: 'The cheapest paid offer we found is ' }, { text: paid[0].name, href: paid[0].url }, { text: ` at ${paid[0].price}, as shown on ${read}.` },
    ...(paid.length > 1 ? [{ text: ` The most expensive listed is ${paid[paid.length - 1].name} (${paid[paid.length - 1].price}).` }] : []),
  ] });

  // 7. A community, when there is one.
  if (community) items.push({ q: `Does ${c.name} run a community?`, a: [
    { text: 'Yes: ' }, { text: community.name, href: community.url }, { text: ` (${community.price})${community.what ? `. ${community.what}` : '.'}` },
  ] });

  // 8. Where to find them.
  if (c.links.length) items.push({ q: `Where can I find ${c.name} online?`, a: [
    { text: 'Their own profiles: ' },
    ...list(c.links.map((l) => ({ text: `${l.kind}${l.handle ? ` ${l.handle}` : ''}`, href: l.url }))),
    { text: '.' },
  ] });

  // 9. Independence, always last.
  items.push({ q: `Is this page affiliated with ${c.name}?`, a: [
    { text: `No. This is Esy’s independent analysis of ${first}’s public pages, read on ${read}; ${c.name} hasn’t reviewed or endorsed it. Every line on the page says how we know it. Corrections or removal: ` },
    { text: 'zev@esy.com', href: 'mailto:zev@esy.com' }, { text: '.' },
  ] });

  return items;
}

/** The FAQ as plain text, for FAQPage structured data. */
export const faqText = (a: FaqPart[]) => a.map((p) => p.text).join('');
