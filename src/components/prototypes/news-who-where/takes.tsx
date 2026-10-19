/* Who and where on a news post, the reader's side (2026-10-19). Each take is
 * the real post page (NewsPostPage, with SH4's share bar and rail) on one
 * story, Salesforce in Spain, and pairs with a Compose take:
 *
 *   R1 · A who-and-where box   (WW1 · On the page)   a section after At a glance
 *   R2 · In At a glance        (WW2 · In the dock)   extra rows, and a Details
 *                                                    table before Sources
 *   R3 · Linked names          (WW3 · Tag in text)   names in the text link to a
 *                                                    page per company; "In this
 *                                                    post" before Sources
 *   R3b · A company's page     (WW3)                 every post naming Salesforce
 *
 * Every take ends with "What search reads", a prototype-only panel of the
 * NewsArticle structured data the post would carry.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight, Building2, CalendarDays, Globe2, MapPin, Users } from 'lucide-react';
import { NewsPostPage } from '@/components/News/News';
import { ShareBar, ShareRail } from '@/components/News/Share';
import { postPath, type NewsData } from '@/data/news';
import { COMPANY_POSTS, OWN_POST_URL, POST, ROLE_WORDS, STORY, WHO_WHERE } from './sample';
import './news-who-where.css';

const W = WHO_WHERE;
const COMPANY_HREF = '/prototypes/news-who-where/company/';

/** The page's news: the real published news, with this sample post and its story in it. */
export const withSample = (news: NewsData): NewsData => ({ posts: [POST, ...news.posts], stories: [STORY, ...news.stories] });

const share = { url: `https://esy.com${postPath(POST.slug)}?src=proto-ww`, title: POST.headline };

/** The structured data, with the who-and-where fields (extends postJsonLd in News.tsx). */
function jsonLd(linked = false) {
  const org = W.stakeholders[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: POST.headline,
    datePublished: POST.publishedAt,
    dateModified: W.updates[0].at,
    dateline: `${W.dateline.city.toUpperCase()}, ${W.dateline.country}`,
    contentLocation: { '@type': 'Place', name: `${W.dateline.city}, ${W.dateline.country}`, address: { '@type': 'PostalAddress', addressLocality: W.dateline.city, addressCountry: W.dateline.code } },
    spatialCoverage: W.places.map((p) => ({ '@type': p.level === 'country' ? 'Country' : 'Place', name: p.name, ...(p.code ? { identifier: p.code } : {}) })),
    about: [{ '@type': 'Organization', name: org.name, url: org.url, sameAs: org.sameAs, ...(linked ? { '@id': `https://esy.com/news/companies/${org.slug}/#org` } : {}) }],
    audience: W.affects.map((a) => ({ '@type': 'Audience', audienceType: a })),
    isBasedOn: OWN_POST_URL,
    keywords: ['AI Marketing Tools', 'Salesforce', 'Spain', 'EMEA South', 'Madrid'].join(', '),
    articleSection: 'AI Marketing News',
  };
}

function SearchReads({ linked = false }: { linked?: boolean }) {
  return (
    <details className="nww-ld">
      <summary>What search reads <span>Prototype: the NewsArticle structured data this post would carry</span></summary>
      <pre>{JSON.stringify(jsonLd(linked), null, 2)}</pre>
    </details>
  );
}

/** "MADRID —", as newspapers open a story. */
const Dateline = () => <span className="nww-dateline">{W.dateline.city.toUpperCase()} — </span>;

/** The body with the dateline, and names linked when `link` is on. */
function Body({ link = false }: { link?: boolean }) {
  const linkify = (text: string): ReactNode => {
    if (!link) return text;
    const parts = text.split(/(Salesforce)/);
    return parts.map((p, i) => (p === 'Salesforce' ? <Link key={i} href={COMPANY_HREF} className="nww-name">Salesforce</Link> : p));
  };
  return <div className="np-body">{POST.body.map((p, i) => <p key={p}>{i === 0 && <Dateline />}{linkify(p)}</p>)}</div>;
}

/** The update line under the byline: the date it changed, and what changed. */
function Updated() {
  const u = W.updates[0];
  return <p className="nww-updated"><b>Updated {u.label}:</b> {u.text} <span>(sample)</span></p>;
}

/* ── R1 · A who-and-where box ── */

function WhoWhereBox() {
  const org = W.stakeholders[0];
  return (
    <section className="npi-facts nww-box" aria-labelledby="nww-h">
      <h2 id="nww-h">Who and where</h2>
      <dl>
        <div><Building2 size={18} aria-hidden="true" /><dt>Involved</dt><dd><a href={org.url} target="_blank" rel="noopener noreferrer">{org.name}</a>, {ROLE_WORDS[org.role]}</dd></div>
        <div><MapPin size={18} aria-hidden="true" /><dt>Announced in</dt><dd>{W.dateline.city}, {W.dateline.country}</dd></div>
        <div><Globe2 size={18} aria-hidden="true" /><dt>Applies in</dt><dd>{W.places.map((p) => p.name).join(', ')}</dd></div>
        <div><Users size={18} aria-hidden="true" /><dt>Affects</dt><dd>{W.affects.join(', ')}</dd></div>
        {W.dates.map((d) => <div key={d.label}><CalendarDays size={18} aria-hidden="true" /><dt>{d.label}</dt><dd>{d.date}</dd></div>)}
      </dl>
    </section>
  );
}

export function TakeBox({ news }: { news: NewsData }) {
  return (
    <NewsPostPage post={POST} news={withSample(news)} sample
      slots={{ beside: <ShareRail {...share} />, afterArticle: <ShareBar {...share} />, underByline: <Updated />, afterFacts: <WhoWhereBox />, body: <Body />, beforeSources: <SearchReads /> }} />
  );
}

/* ── R2 · In At a glance, and a Details table ── */

function Details() {
  return (
    <section className="nww-details" aria-labelledby="nww-details">
      <h2 id="nww-details">Details</h2>
      <table>
        <tbody>
          <tr><th scope="row">Announced in</th><td>{W.dateline.city}, {W.dateline.country}</td></tr>
          <tr><th scope="row">Applies in</th><td>{W.places.map((p) => p.name).join(', ')}</td></tr>
          {W.dates.map((d) => <tr key={d.label}><th scope="row">{d.label}</th><td>{d.date}</td></tr>)}
          <tr><th scope="row">Rollout</th><td>Not a launch</td></tr>
          <tr><th scope="row">Products named</th><td>None in Salesforce’s post</td></tr>
          <tr><th scope="row">Changes</th><td>{W.updates.map((u) => <span key={u.at}>{u.label}: {u.text} <i>(sample)</i></span>)}</td></tr>
        </tbody>
      </table>
    </section>
  );
}

export function TakeGlance({ news }: { news: NewsData }) {
  const org = W.stakeholders[0];
  // The kept values join At a glance as rows; their labels pick icons there (FACT_ICON).
  const post = {
    ...POST,
    facts: [
      ...POST.facts,
      ['Led by', `${org.name} (${ROLE_WORDS[org.role]})`],
      ['Where', W.places.map((p) => p.name).join(', ')],
      ['For', W.affects.join(', ')],
    ] as [string, string][],
  };
  return (
    <NewsPostPage post={post} news={withSample(news)} sample
      slots={{ beside: <ShareRail {...share} />, afterArticle: <ShareBar {...share} />, underByline: <p className="nww-updated"><b>Updated October 20</b> <span>(sample; what changed is under Details)</span></p>, body: <Body />, beforeSources: <><Details /><SearchReads /></> }} />
  );
}

/* ── R3 · Linked names, and "In this post" ── */

function InThisPost() {
  const org = W.stakeholders[0];
  return (
    <section className="nww-inpost" aria-labelledby="nww-inpost">
      <h2 id="nww-inpost">In this post</h2>
      <ul>
        <li>
          <Link href={COMPANY_HREF}><b>{org.name}</b></Link> <span>{ROLE_WORDS[org.role]}</span>
          <Link href={COMPANY_HREF} className="nww-more">Every post on {org.name} →</Link>
        </li>
        <li><b>{W.dateline.city}, {W.dateline.country}</b> <span>where it was announced</span></li>
        <li><b>{W.places.map((p) => p.name).join(', ')}</b> <span>where it applies</span></li>
        <li><b>{W.affects.join(', ')}</b> <span>who it affects</span></li>
      </ul>
    </section>
  );
}

export function TakeLinked({ news }: { news: NewsData }) {
  return (
    <NewsPostPage post={POST} news={withSample(news)} sample
      slots={{ beside: <ShareRail {...share} />, afterArticle: <ShareBar {...share} />, underByline: <Updated />, body: <Body link />, beforeSources: <><InThisPost /><SearchReads linked /></> }} />
  );
}

/* ── R3b · A company's page ── */

export function TakeCompany() {
  const org = W.stakeholders[0];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${org.name} — AI Marketing News`,
    about: { '@type': 'Organization', '@id': `https://esy.com/news/companies/${org.slug}/#org`, name: org.name, url: org.url, sameAs: org.sameAs },
  };
  return (
    <section className="np nx-story">
      <div className="nl-container"><div className="npi-col nx-col">
        <p className="np-crumbs"><Link href="/news/">AI Marketing News</Link> <span aria-hidden="true">›</span> <span>Companies</span></p>
        <h1 className="np-title">{org.name}</h1>
        <p className="np-dek">Every AI Marketing News post that names {org.name}, and what it did in each.</p>
        <p className="nww-co-links">
          <a href={org.url} target="_blank" rel="noopener noreferrer">salesforce.com <ArrowUpRight size={13} aria-hidden="true" /></a>
          {' · '}<a href={org.sameAs[0]} target="_blank" rel="noopener noreferrer">Wikipedia <ArrowUpRight size={13} aria-hidden="true" /></a>
        </p>
        <ol className="nx-story-list">
          {COMPANY_POSTS.map((p) => (
            <li key={p.headline}>
              <time>{p.date}</time>
              <div>
                <h2>{p.href ? <Link href={p.href}>{p.headline}</Link> : p.headline}</h2>
                <p>{org.name}: {p.role.toLowerCase()}</p>
              </div>
            </li>
          ))}
        </ol>
        <details className="nww-ld">
          <summary>What search reads <span>Prototype: the page’s CollectionPage data, the same company id every post points at</span></summary>
          <pre>{JSON.stringify(ld, null, 2)}</pre>
        </details>
      </div></div>
    </section>
  );
}
