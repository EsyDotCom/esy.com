/* A · Letter — /engineer's masthead, then the story as a first-person note in
 * the publication's serif: what this is, who writes it, what runs on it, how
 * it's made, and how to reach me. Section numbers in the margin, the
 * portrait at the head of the note, the signup and the booking at the end.
 */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import { BookACallButton } from '@/components/BookACallButton';
import { EMAIL, ETYMOLOGY, NAME, PLACE, PORTRAIT, ROLE, SOCIALS, WORK } from './content';

export default function AboutLetter() {
  return (
    <>
      <section className="nl-hero">
        <div className="nl-container nl-hero-inner">
          <p className="nl-kicker">The Marketing Engineer</p>
          <h1 className="nl-masthead">About</h1>
          <p className="nl-promise">
            A letter from the person who writes it, <span className="nl-promise-accent">and what it runs on</span>.
          </p>
        </div>
      </section>

      <article className="ab-letter">
        {/* The head of the note: portrait, name, where. */}
        <header className="ab-letter-head">
          <div className="ab-portrait ab-portrait--md">
            <Image src={PORTRAIT} alt={NAME} fill sizes="120px" style={{ objectFit: 'cover' }} priority />
          </div>
          <div>
            <p className="ab-letter-name">{NAME}</p>
            <p className="ab-letter-role">{ROLE} · {PLACE}</p>
          </div>
        </header>

        <section className="ab-part">
          <span className="ab-part-n">01</span>
          <h2>What this is</h2>
          <p>
            The Marketing Engineer is a weekly email, a set of courses, and this site. It teaches one thing: how to build
            the AI systems that run marketing. Not prompts to copy, but systems you own, from the first draft to the
            thing that ships.
          </p>
        </section>

        <section className="ab-part">
          <span className="ab-part-n">02</span>
          <h2>Who writes it</h2>
          <p>
            I spent a decade shipping production web products, from fuboTV&apos;s streaming apps to Vroom&apos;s online
            car storefront. I learned how software gets built, tested and shipped at scale. Then I pointed that at
            marketing.
          </p>
        </section>

        <section className="ab-part">
          <span className="ab-part-n">03</span>
          <h2>What runs on it</h2>
          <p>Everything I teach, I run first. Two businesses run on Esy, the platform I build:</p>
          <ul className="ab-ledger">
            {[WORK.clipart, WORK.seopage, WORK.os].map((w) => (
              <li key={w.name}>
                <a href={w.href} target="_blank" rel="noopener noreferrer">
                  {w.name} <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <span>{w.line}</span>
              </li>
            ))}
          </ul>
          <blockquote className="ab-quote">The results in every article are the results those businesses actually got.</blockquote>
        </section>

        <section className="ab-part">
          <span className="ab-part-n">04</span>
          <h2>How it&apos;s made</h2>
          <p>
            Every piece starts from something I built or tested, and says so. How I decide what to publish, and how I
            fix what I get wrong, is written down in the{' '}
            <Link href="/editorial-standards/">editorial standards</Link>.
          </p>
          <p>
            And the name: Esy comes from <em>Synthesis Essay</em>, reversed into the
            acronym ESY. It&apos;s pronounced &ldquo;Eh-see.&rdquo;
          </p>
        </section>

        <section className="ab-part">
          <span className="ab-part-n">05</span>
          <h2>Get in touch</h2>
          <p>
            Email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, or book a call if you&apos;re building something like this.
          </p>
          <div className="ab-actions">
            <BookACallButton />
          </div>
          <ul className="ab-socials">
            {SOCIALS.map(({ label, href, handle, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon size={15} /> {handle}
                </a>
              </li>
            ))}
          </ul>
          <p className="ab-sign">— Zev</p>
        </section>

        <aside className="ab-letter-signup">
          <p className="ab-letter-signup-title">Get the weekly email</p>
          <NewsletterSignup form="about-letter" note="One email a week · unsubscribe anytime" />
        </aside>
      </article>
    </>
  );
}
