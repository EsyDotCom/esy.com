import NewsletterSignup from "./NewsletterSignup";

// The closing ask on every publication page (the homepage and the topic hubs):
// a navy band with the weekly email signup. One component so the offer reads
// the same everywhere.
/** The page's last ask. `offer="course"` makes the hero's offer again (the free
 *  email course, which leads into the weekly email), so a page asks for one
 *  thing top and bottom (/prototypes/home-focus/). Same list either way. */
export default function WeeklyEmailBand({ offer = 'weekly' }: { offer?: 'weekly' | 'course' }) {
  const course = offer === 'course';
  return (
    <section className="nl-final" aria-labelledby="nl-final-title">
      <div className="nl-container nl-final-inner">
        <h2 className="nl-final-title" id="nl-final-title">{course ? 'Start the free email course.' : 'Get the weekly email.'}</h2>
        <p className="nl-lede nl-lede--onDark nl-lede--center">
          {course
            ? 'Lessons arrive as they’re published, then The Marketing Engineer every week. Unsubscribe whenever you like.'
            : <>The week&apos;s best tutorials, guides, and news in one email. Unsubscribe whenever you like.</>}
        </p>
        <NewsletterSignup form="email-band" tone="dark" {...(course ? { cta: 'Start the course', note: 'Free · one system a week after the course' } : {})} />
      </div>
    </section>
  );
}
