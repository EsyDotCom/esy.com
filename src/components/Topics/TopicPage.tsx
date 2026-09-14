/* One topic hub: /topics/<slug>/.
 *
 * The page that holds a subject's whole archive and links every article on it,
 * so the site reads to readers (and search engines) as an authority on the
 * subject, not a single post. Top to bottom: what the topic is, a few pinned
 * "start here" articles once there are enough to pick from, every article
 * newest first, related topics, and the weekly email.
 */

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { AgenticVideo } from "@/data/agentic-videos";
import { type Topic, TOPICS, findTopic, topicHref } from "@/data/topics";
import { articlePath } from "@/lib/article-path";
import { formatDate, formatMinutes, thumbnailFor } from "@/lib/article-format";
import LightHeader from "@/components/LightHeader/LightHeader";
import type { NavArticle } from "@/lib/nav-articles";
import { nlSerif } from "@/components/NewsletterHome/serif";
import WeeklyEmailBand from "@/components/NewsletterHome/WeeklyEmailBand";
import "@/components/NewsletterHome/NewsletterHome.css";
import "./Topics.css";

// "Start here" only earns its space once a topic has enough articles that the
// picks differ from the list below; with fewer, it would just repeat them.
const START_HERE_MIN_ARTICLES = 4;
const START_HERE_COUNT = 3;

// Pinned picks first (in the order the topic lists them), topped up with the
// newest articles not already chosen.
function pickStartHere(topic: Topic, articles: AgenticVideo[]): AgenticVideo[] {
  const pinned = (topic.startHere ?? [])
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is AgenticVideo => Boolean(a));
  const rest = articles.filter((a) => !pinned.includes(a));
  return [...pinned, ...rest].slice(0, START_HERE_COUNT);
}

export default function TopicPage({
  topic,
  articles,
  latest,
}: {
  topic: Topic;
  /** This topic's articles, newest first. */
  articles: AgenticVideo[];
  /** The publication's newest articles, for the header's Articles dropdown. */
  latest: NavArticle[];
}) {
  const startHere =
    articles.length >= START_HERE_MIN_ARTICLES ? pickStartHere(topic, articles) : [];
  const related = topic.related
    .map((slug) => findTopic(slug))
    .filter((t): t is Topic => Boolean(t));

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={latest} />

      {/* ══ The topic: name, what it covers, how much there is ══ */}
      <section className="tp-hero">
        <div className="nl-container">
          <Link href="/topics/" className="tp-crumb">
            <ArrowLeft size={14} aria-hidden="true" /> Topics
          </Link>
          <h1 className="tp-title">{topic.name}</h1>
          <p className="tp-desc">{topic.description}</p>
          <p className="tp-count">
            {articles.length} {articles.length === 1 ? "article" : "articles"}
          </p>
        </div>
      </section>

      {/* ══ Start here ══ */}
      {startHere.length > 0 && (
        <section className="nl-section nl-section--alt" aria-labelledby="tp-start-title">
          <div className="nl-container">
            <p className="nl-eyebrow" id="tp-start-title">Start here</p>
            <ul className="tp-cards">
              {startHere.map((a) => {
                const thumb = thumbnailFor(a);
                return (
                  <li key={a.slug}>
                    <Link href={articlePath(a.slug)} className="tp-card">
                      {thumb && (
                        <img className="tp-card-thumb" src={thumb} alt="" loading="lazy" width={480} height={270} />
                      )}
                      <span className="nl-meta">
                        {[a.categoryLabel, formatDate(a.publishedAt), formatMinutes(a.durationSeconds)]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                      <span className="tp-card-title">{a.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* ══ Every article on the topic, newest first ══ */}
      <section className="nl-section" aria-labelledby="tp-all-title">
        <div className="nl-container">
          <h2 className="nl-title" id="tp-all-title">All articles</h2>
          {articles.length > 0 ? (
            <ul className="nl-list">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link href={articlePath(a.slug)} className="nl-row">
                    <span className="nl-row-date">{formatDate(a.publishedAt)}</span>
                    <span className="nl-row-title">{a.title}</span>
                    <span className="nl-row-cat">{a.categoryLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="nl-lede">The first article on this topic is on its way.</p>
          )}
        </div>
      </section>

      {/* ══ Related topics ══ */}
      {related.length > 0 && (
        <section className="nl-section nl-section--alt tp-related" aria-labelledby="tp-related-title">
          <div className="nl-container">
            <p className="nl-eyebrow" id="tp-related-title">Related topics</p>
            <nav className="nl-topic-chips" aria-label="Related topics">
              {related.map((t) => (
                <Link key={t.slug} href={topicHref(t.slug)} className="nl-topic-chip">
                  {t.name}
                </Link>
              ))}
              <Link href="/topics/" className="nl-topic-chip nl-topic-chip--all">
                All {TOPICS.length} topics <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </section>
      )}

      <WeeklyEmailBand />
    </div>
  );
}
