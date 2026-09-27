/* Education hero F · Studio: a magazine cover in the first person.
 *
 * Dark navy. Zev's headshot, large, in a jade-ringed circle on the right, so
 * the face is the first thing seen and the words beside it are his. Under the
 * signup, the proof: the two businesses the systems run on, in their own
 * wordmarks, and the newest real article. */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ClipArtWordmark from '@/components/NewsletterHome/ClipArtWordmark';
import SeoPageWordmark from '@/components/NewsletterHome/SeoPageWordmark';
import type { Lesson, ResolvedDesk } from './desks';
import { EduSignup } from './shared';

export default function EduStudio({ latest }: { desks: ResolvedDesk[]; latest?: Lesson | null }) {
  return (
    <section className="eh eh-studio" id="subscribe">
      <div className="nl-container eh-studio-inner">
        {/* The portrait: zev-uhuru.png, the headshot used across the site. It
            is cropped to a circle on a white ground, so it's shown in a circle. */}
        <div className="eh-studio-photo">
          <div className="eh-studio-ring">
            <div className="eh-studio-circle">
              <Image src="/images/zev-uhuru.png" alt="Zev Uhuru" fill priority sizes="(max-width: 960px) 60vw, 460px" />
            </div>
          </div>
        </div>

        <div className="eh-studio-copy">
          <p className="eh-studio-hello">Hi, I&apos;m Zev.</p>
          <h1 className="eh-h1 eh-h1--left eh-h1--onDark">
            I build the AI systems that <em>run marketing</em>, and show you how.
          </h1>
          <p className="eh-sub eh-sub--left eh-sub--onDark">
            One email a week: the system I built, how it works, and what it did. SEO, agents, AI coding tools, and the
            integrations between them.
          </p>
          <EduSignup tone="dark" />

          {/* The proof: where the systems run, and the newest issue. */}
          <div className="eh-studio-proof">
            <span className="eh-studio-proof-label">The systems run</span>
            <a href="https://clip.art" target="_blank" rel="noopener noreferrer" aria-label="clip.art">
              <ClipArtWordmark className="eh-studio-clipart" />
            </a>
            <a href="https://seopage.com" target="_blank" rel="noopener noreferrer" aria-label="SEOPage" className="eh-studio-seopage">
              <SeoPageWordmark weight="light" />
            </a>
          </div>
          {latest?.href && (
            <Link href={latest.href} className="eh-studio-latest">
              <span>Latest</span> {latest.title} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
