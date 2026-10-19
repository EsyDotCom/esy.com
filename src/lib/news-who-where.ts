/* Who and where on a news post (WW2, picked 2026-10-19): what a post
 * published from Compose knows about who's involved and where it applies, as
 * api.esy.com returns it on the public post (`whoWhere`, kept values only;
 * app/services/news_who_where.py public_who_where). Esy owns the record; this
 * file only turns it into what the page shows and what search reads.
 *
 *   At a glance  gains Involved, Announced in, Applies in, Affects (the same
 *                four rows Compose shows in its editor and Preview)
 *   Details      a short table before Sources: rollout, dates, products, changes
 *   Dateline     "MADRID —" opens the story, as newspapers set it
 *   JSON-LD      about/mentions (with sameAs), dateline, contentLocation,
 *                spatialCoverage, audience, keywords, correction, dateModified
 */

export interface NewsWhoWhere {
  dateline: { city: string; country: string; code: string } | null;
  places: { name: string; level: 'city' | 'region' | 'country' | 'worldwide'; code: string }[];
  stakeholders: {
    name: string;
    kind: 'organization' | 'person' | 'government' | 'group';
    role: 'announcer' | 'partner' | 'investor' | 'customer' | 'regulator' | 'competitor' | 'affected';
    url: string;
    sameAs: string[];
    title: string;
  }[];
  /** Esy's fixed list of readers' groups (AFFECTS). */
  affects: string[];
  rollout: { status: 'announced' | 'beta' | 'rolling-out' | 'available' | 'paused' | 'ended'; from: string; who: string } | null;
  dates: { label: string; date: string }[];
  products: { name: string; company: string; url: string }[];
  /** ISO time, newest last as Esy stores them. */
  updates: { at: string; kind: 'update' | 'correction'; text: string }[];
}

const AFFECTS_NAME: Record<string, string> = {
  agencies: 'Agencies',
  'local-businesses': 'Local businesses',
  advertisers: 'Advertisers',
  'online-stores': 'Online stores',
  'b2b-marketing': 'B2B marketing teams',
  'in-house': 'In-house marketing teams',
  creators: 'Creators',
};
const ROLE_WORDS: Record<NewsWhoWhere['stakeholders'][number]['role'], string> = {
  announcer: 'announced it', partner: 'partner', investor: 'investor', customer: 'customer',
  regulator: 'regulator', competitor: 'competitor', affected: 'affected',
};
const ROLLOUT_WORDS: Record<NonNullable<NewsWhoWhere['rollout']>['status'], string> = {
  announced: 'Announced', beta: 'In beta', 'rolling-out': 'Rolling out', available: 'Available', paused: 'Paused', ended: 'Ended',
};

/** A post's who and where with every list present, or null when it says nothing. */
export function toWhoWhere(raw: unknown): NewsWhoWhere | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Partial<NewsWhoWhere>;
  const ww: NewsWhoWhere = {
    dateline: r.dateline?.city ? r.dateline : null,
    places: r.places ?? [], stakeholders: r.stakeholders ?? [], affects: r.affects ?? [],
    rollout: r.rollout ?? null, dates: r.dates ?? [], products: r.products ?? [], updates: r.updates ?? [],
  };
  const empty = !ww.dateline && !ww.rollout && [ww.places, ww.stakeholders, ww.affects, ww.dates, ww.products, ww.updates].every((x) => !x.length);
  return empty ? null : ww;
}

/** "Oct 19, 2026", "2031" or "October 2026". */
export function dateWords(d: string): string {
  const [y, m, day] = d.split('-').map(Number);
  if (!y || !/^\d{4}(-\d{2}(-\d{2})?)?/.test(d)) return d;
  if (!m) return String(y);
  const month = new Date(Date.UTC(y, m - 1, 1)).toLocaleString('en-US', { month: day ? 'short' : 'long', timeZone: 'UTC' });
  return day ? `${month} ${day}, ${y}` : `${month} ${y}`;
}

const named = (ww: NewsWhoWhere) => ww.stakeholders.filter((s) => s.kind !== 'group');
const audiences = (ww: NewsWhoWhere) => [
  ...ww.affects.map((a) => AFFECTS_NAME[a] ?? a),
  ...ww.stakeholders.filter((s) => s.kind === 'group').map((s) => s.name),
];

/** The rows At a glance gains: Involved, Announced in, Applies in, Affects. */
export function glanceRows(ww: NewsWhoWhere | null | undefined): [string, string][] {
  if (!ww) return [];
  const rows: [string, string][] = [];
  if (named(ww).length) rows.push(['Involved', named(ww).map((s) => `${s.name} (${ROLE_WORDS[s.role]})`).join(', ')]);
  if (ww.dateline) rows.push(['Announced in', `${ww.dateline.city}${ww.dateline.country ? `, ${ww.dateline.country}` : ''}`]);
  if (ww.places.length) rows.push(['Applies in', ww.places.map((p) => p.name).join(', ')]);
  if (audiences(ww).length) rows.push(['Affects', audiences(ww).join(', ')]);
  return rows;
}

/** The Details table before Sources: only what the post has. */
export function detailRows(ww: NewsWhoWhere | null | undefined): [string, string][] {
  if (!ww) return [];
  const rows: [string, string][] = [];
  const r = ww.rollout;
  if (r) rows.push(['Rollout', `${ROLLOUT_WORDS[r.status]}${r.from ? ` from ${dateWords(r.from)}` : ''}${r.who ? `. ${r.who}` : ''}`]);
  ww.dates.forEach((d) => rows.push([d.label || 'Date', dateWords(d.date)]));
  if (ww.products.length) rows.push(['Products named', ww.products.map((p) => p.name).join(', ')]);
  ww.updates.forEach((u) => rows.push([u.kind === 'correction' ? 'Correction' : 'Update', `${dateWords(u.at.slice(0, 10))}: ${u.text}`]));
  return rows;
}

/** The newest update or correction, for the line under the byline. */
export const latestChange = (ww: NewsWhoWhere | null | undefined) =>
  ww?.updates.length ? [...ww.updates].sort((a, b) => b.at.localeCompare(a.at))[0] : null;

const SCHEMA_TYPE = { organization: 'Organization', person: 'Person', government: 'GovernmentOrganization' } as const;

/** What search reads from it: the fields postJsonLd adds to the NewsArticle. */
export function whoWhereJsonLd(ww: NewsWhoWhere | null | undefined, topic: string): Record<string, unknown> {
  if (!ww) return {};
  const entity = (s: NewsWhoWhere['stakeholders'][number]) => ({
    '@type': SCHEMA_TYPE[s.kind as keyof typeof SCHEMA_TYPE] ?? 'Organization',
    name: s.name,
    ...(s.url ? { url: s.url } : {}),
    ...(s.sameAs.length ? { sameAs: s.sameAs } : {}),
    ...(s.kind === 'person' && s.title ? { jobTitle: s.title } : {}),
  });
  const people = named(ww);
  const announcers = people.filter((s) => s.role === 'announcer');
  const others = [
    ...people.filter((s) => s.role !== 'announcer').map(entity),
    ...ww.products.map((p) => ({ '@type': 'Product', name: p.name, ...(p.url ? { url: p.url } : {}) })),
  ];
  const corrections = ww.updates.filter((u) => u.kind === 'correction');
  const latest = latestChange(ww);
  const d = ww.dateline;
  return {
    ...(latest ? { dateModified: latest.at } : {}),
    ...(d ? {
      dateline: `${d.city.toUpperCase()}${d.country ? `, ${d.country}` : ''}`,
      contentLocation: {
        '@type': 'Place', name: `${d.city}${d.country ? `, ${d.country}` : ''}`,
        address: { '@type': 'PostalAddress', addressLocality: d.city, ...(d.code ? { addressCountry: d.code } : {}) },
      },
    } : {}),
    ...(ww.places.length ? {
      spatialCoverage: ww.places.map((p) => (p.level === 'worldwide'
        ? { '@type': 'Place', name: 'Worldwide' }
        : { '@type': p.level === 'country' ? 'Country' : 'Place', name: p.name, ...(p.code ? { identifier: p.code } : {}) })),
    } : {}),
    ...(announcers.length ? { about: announcers.map(entity) } : {}),
    ...(others.length ? { mentions: others } : {}),
    ...(audiences(ww).length ? { audience: audiences(ww).map((a) => ({ '@type': 'Audience', audienceType: a })) } : {}),
    keywords: [...new Set([topic, ...people.map((s) => s.name), ...ww.places.map((p) => p.name), ...(d ? [d.city] : []), ...ww.products.map((p) => p.name)].filter(Boolean))].join(', '),
    ...(corrections.length ? { correction: corrections.map((c) => ({ '@type': 'CorrectionComment', text: c.text, datePublished: c.at })) } : {}),
  };
}
