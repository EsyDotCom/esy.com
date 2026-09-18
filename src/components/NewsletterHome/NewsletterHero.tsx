/* The Marketing Engineer masthead: name, promise, one action.
 *
 * Lifted out of NewsletterHomePage (2026-09-18) so the publication's front
 * page can live at /engineer while the homepage hero makes room for Esy OS.
 * Styles stay in NewsletterHome.css (the `.nl` scope). */

import NewsletterSignup from './NewsletterSignup';

export default function NewsletterHero() {
  return (
    <section className="nl-hero" id="subscribe">
      <div className="nl-container nl-hero-inner">
        <p className="nl-kicker">By Esy</p>
        <h1 className="nl-masthead">The Marketing Engineer</h1>
        {/* The promise speaks to the reader, not the author: what they walk
            away able to do. (Author-first predecessor, for reverting: "I
            build systems that turn marketing data into actions, explain how
            they work, and show you the results.") */}
        <p className="nl-promise">
          Turn your marketing data into action, with AI systems <span className="nl-promise-accent">you can build yourself</span>.
        </p>
        <NewsletterSignup />
      </div>
    </section>
  );
}
