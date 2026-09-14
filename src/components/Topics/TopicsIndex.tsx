/* /topics/: every subject The Marketing Engineer covers, with how many
 * articles each holds. The way into the archive once the homepage's Latest
 * list has moved on.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { AgenticVideo } from "@/data/agentic-videos";
import { TOPICS, articlesForTopic, topicHref } from "@/data/topics";
import LightHeader from "@/components/LightHeader/LightHeader";
import { nlSerif } from "@/components/NewsletterHome/serif";
import WeeklyEmailBand from "@/components/NewsletterHome/WeeklyEmailBand";
import "@/components/NewsletterHome/NewsletterHome.css";
import "./Topics.css";

export default function TopicsIndex({ articles }: { articles: AgenticVideo[] }) {
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader />

      <section className="tp-hero">
        <div className="nl-container">
          <p className="nl-eyebrow">The Marketing Engineer</p>
          <h1 className="tp-title">Topics</h1>
          <p className="tp-desc">
            Every article, grouped by subject. Pick a topic to see everything
            written on it, newest first.
          </p>
        </div>
      </section>

      <section className="nl-section nl-section--alt" aria-label="All topics">
        <div className="nl-container">
          <ul className="tp-index-grid">
            {TOPICS.map((topic) => {
              const count = articlesForTopic(articles, topic).length;
              return (
                <li key={topic.slug}>
                  <Link href={topicHref(topic.slug)} className="tp-index-card">
                    <span className="tp-index-name">{topic.name}</span>
                    <span className="tp-index-desc">{topic.description}</span>
                    <span className="tp-index-count">
                      {count} {count === 1 ? "article" : "articles"}
                      <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <WeeklyEmailBand />
    </div>
  );
}
