/* Education hero F · Studio: a magazine cover in the first person.
 *
 * Dark navy. Zev's headshot, large, in a jade-ringed circle on the right, so
 * the face is the first thing seen and the words beside it are his. Under the
 * signup, the proof: the two businesses the systems run on, in their own
 * wordmarks, and the newest real article.
 *
 * `phone` picks the layout under 960px only; desktop is the same for all:
 *   photo   — the big circle above the copy (F as shipped; the signup can fall below the fold)
 *   avatar  — a 64px photo inline with "Hi, I'm Zev." (G)
 *   profile — a profile row: 112px photo, name and role, then the copy (H)
 *   after   — copy and signup first, the big circle under the form (I) */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ClipArtWordmark from '@/components/NewsletterHome/ClipArtWordmark';
import SeoPageWordmark from '@/components/NewsletterHome/SeoPageWordmark';
import ComposeWordmark, { type ComposeMarkStyle } from '@/components/NewsletterHome/ComposeWordmark';
import type { Lesson, ResolvedDesk } from './desks';
import { EduSignup } from './shared';

export type StudioPhoneLayout = 'photo' | 'avatar' | 'profile' | 'after';

type StudioProps = {
  desks: ResolvedDesk[]; latest?: Lesson | null; phone?: StudioPhoneLayout;
  /** Compose's mark as a third app in "The systems run" (/prototypes/home-compose/). */
  composeMark?: ComposeMarkStyle;
};

export default function EduStudio({ latest, phone = 'photo', composeMark }: StudioProps) {
  return (
    <section className={`eh eh-studio eh-studio--phone-${phone}`} id="subscribe">
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
          {/* Phone-only identity row for the avatar and profile layouts: the
              face shrinks to sit beside the greeting, so the signup stays on
              the first screen. Hidden on desktop and in the other layouts. */}
          <div className="eh-studio-me">
            <span className="eh-studio-me-photo">
              <Image src="/images/zev-uhuru.png" alt="" width={224} height={224} />
            </span>
            <span className="eh-studio-me-text">
              <span className="eh-studio-hello">Hi, I&apos;m Zev.</span>
              <span className="eh-studio-me-role">Marketing engineer · runs clip.art and SEOPage</span>
            </span>
          </div>

          <p className="eh-studio-hello eh-studio-hello--main">Hi, I&apos;m Zev.</p>
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
            {composeMark && (
              <a href="https://compose.esy.com" target="_blank" rel="noopener noreferrer" aria-label="Esy Compose">
                <ComposeWordmark mark={composeMark} className="eh-studio-compose" />
              </a>
            )}
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

/* The phone-layout prototypes (round 3), as components the prototype route can map to. */
export const EduStudioAvatar = (props: StudioProps) => <EduStudio {...props} phone="avatar" />;
export const EduStudioProfile = (props: StudioProps) => <EduStudio {...props} phone="profile" />;
export const EduStudioAfter = (props: StudioProps) => <EduStudio {...props} phone="after" />;
