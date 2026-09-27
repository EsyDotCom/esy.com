/* Education hero D · Face Split: the promise beside the person who keeps it.
 *
 * The classic creator-newsletter hero: copy and the signup on the left, a
 * large portrait on the right with two small cards floating on it: who Zev is
 * and what he runs, and the newest real article. A face next to a signup
 * reads as "a person will write to you", which is the whole offer. */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Lesson, ResolvedDesk } from './desks';
import { ChannelLine, EduSignup } from './shared';

export default function EduFaceSplit({ latest }: { desks: ResolvedDesk[]; latest?: Lesson | null }) {
  return (
    <section className="eh eh-face" id="subscribe">
      <div className="nl-container eh-split">
        {/* ── Left: the category, the promise, the ask ──────────────────── */}
        <div className="eh-split-copy">
          <p className="eh-kicker">The Marketing Engineer · Free weekly email</p>
          <h1 className="eh-h1 eh-h1--left">
            Learn to build the AI systems that <em>run marketing</em>.
          </h1>
          <p className="eh-sub eh-sub--left">
            Every week I take one system I run in production (SEO, agents, AI coding tools) and show you how it&apos;s
            built, what it costs, and what it did.
          </p>
          <EduSignup />
          <ChannelLine />
        </div>

        {/* ── Right: the person, with who he is and what's new ─────────── */}
        <figure className="eh-face-figure">
          <div className="eh-face-ring">
            <div className="eh-face-photo">
              <Image src="/images/zev-uhuru.png" alt="Zev Uhuru" fill sizes="(max-width: 960px) 70vw, 420px" priority />
            </div>
          </div>

          <figcaption className="eh-face-card eh-face-card--who">
            <b>Zev Uhuru</b>
            <span>Marketing engineer. Runs clip.art and SEOPage on the systems he writes about.</span>
          </figcaption>

          {latest?.href && (
            <Link href={latest.href} className="eh-face-card eh-face-card--latest">
              <span className="eh-face-card-label">Latest issue</span>
              <b>{latest.title}</b>
              <span className="eh-face-card-meta">
                {latest.meta} <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            </Link>
          )}
        </figure>
      </div>
    </section>
  );
}
