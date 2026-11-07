'use client';
/* esy.com/marketing-engineer, three directions (2026-11-07, /prototypes/marketing-engineer/).
 * Zev: an SEO page that owns "marketing engineer" and feeds The Marketing Engineer newsletter;
 * really high quality, on brand, Mason used creatively, email forms working. Same words in each
 * (content.ts), three different shapes:
 *   A · Eight Arms  navy. Mason holds a job in every arm; pick an arm and the page says what the
 *                   system does and what you still do. The whole page reads as one octopus at work.
 *   B · The Entry   white. The page is a dictionary entry for the term, with Mason (the vinyl toy)
 *                   as Fig. 1 and an anatomy plate of his eight arms. Built for the definition snippet.
 *   C · One Day     night. Mason at his desk, then a sample day of the system scrolling past a sticky
 *                   clock, the person's few minutes lit. It shows the job instead of defining it.
 * Round 2:
 *   D · One Day II  C with Zev's fixes: the question as the headline, the eight jobs and skills as a
 *                   section, the photo held to its real width, night to the end, a researched FAQ.
 * Round 3, D with its jobs section told three simpler ways (MeJobs.tsx): E · Spotlight, F · Sentence,
 * G · Roll call.
 * Every signup posts to the real list (double opt-in) tagged with its box and the prototype path. */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { MasonJobs } from './MasonJobs';
import { JobsSection, type JobsTake } from './MeJobs';
import { MeSignup } from './MeSignup';
import { relFor } from '@/lib/outbound';
import { DAY, DEFINITION, FAQ, FAQ_D, JOBS, linkParts, plain, NEWSLETTER, PROOF, SHIFT, SHORT, SKILLS, STEPS, WHY_NOW, type JobId } from './content';
import './me.css';

export type MeTake = 'arms' | 'entry' | 'day' | 'day2' | `day2-${JobsTake}`;

// ── Shared parts, skinned per take by the wrapper's class ────────────────────────────────

function Faq({ items = FAQ }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="me-faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary><span>{f.q}</span><Plus size={18} aria-hidden="true" /></summary>
          {/* Sources are links in the answer itself, opening in a new tab. The site rule (lib/outbound):
              followed only to ESY's own properties, nofollow everywhere else. */}
          <p>{linkParts(f.a).map((p, i) => (p.href
            ? <a key={i} href={p.href} target="_blank" rel={relFor(p.href, { newTab: true })}>{p.text}</a>
            : <span key={i}>{p.text}</span>))}</p>
        </details>
      ))}
    </div>
  );
}

function Steps() {
  return (
    <ol className="me-steps">
      {STEPS.map((s, i) => (
        <li key={s.title}>
          <span className="me-step-n" aria-hidden="true">{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

const jobOf = (id: JobId) => JOBS.find((j) => j.id === id)!;

// Fades a section's children up the first time it enters the viewport.
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIn(true); io.disconnect(); } }, { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

// ── A · Eight Arms ───────────────────────────────────────────────────────────────────────

function Arms() {
  const [lit, setLit] = useState<JobId>('research');
  const job = jobOf(lit);
  const [shiftRef, shiftIn] = useReveal<HTMLOListElement>();
  return (
    <div className="me me--arms">
      <section className="ma-hero">
        <div className="me-wrap ma-hero-in">
          <div className="ma-hero-text">
            <p className="me-kicker">Marketing engineer <i>noun</i></p>
            <h1 className="ma-h1">What is a marketing engineer?</h1>
            <p className="ma-short">{SHORT}</p>
            <p className="ma-def">{DEFINITION}</p>
            <MeSignup form="me-arms-hero" tone="dark" />
          </div>
          <div className="ma-stage">
            <MasonJobs lit={lit} onPick={setLit} />
            <div className="ma-readout" aria-live="polite" key={lit}>
              <p className="ma-readout-job">{job.name}</p>
              <p className="ma-readout-sys"><b>The system</b>{job.system}</p>
              <p className="ma-readout-you"><b>You</b>{job.you}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ma-why">
        <div className="me-wrap">
          <p className="me-kicker">Why it’s a job now</p>
          <blockquote>{WHY_NOW}</blockquote>
        </div>
      </section>

      <section className="ma-shift">
        <div className="me-wrap">
          <h2 className="me-h2">Same work. <em>A different unit.</em></h2>
          <ol ref={shiftRef} className={`ma-shift-list ${shiftIn ? 'is-in' : ''}`}>
            {SHIFT.map((s, i) => (
              <li key={s.from} style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="ma-from">{s.from}</span>
                <ArrowRight size={18} aria-hidden="true" />
                <span className="ma-to">{s.to}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ma-proof">
        <div className="me-wrap">
          <div className="ma-proof-head">
            <p className="me-kicker">A real one</p>
            <h2 className="me-h2">{PROOF.title}</h2>
            <p className="me-lede">{PROOF.lede}</p>
          </div>
          <ol className="ma-pipe">
            {PROOF.hands.map((h, i) => (
              <li key={h.who} className={h.who === 'You' ? 'is-you' : ''} style={{ '--i': i } as CSSProperties}>
                <span className="ma-pipe-dot" aria-hidden="true" />
                <b>{h.who}</b>
                <span>{h.does}</span>
              </li>
            ))}
          </ol>
          <a className="me-link" href={PROOF.href}>Read it at {PROOF.where} <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="ma-start">
        <div className="me-wrap">
          <h2 className="me-h2">How to become one</h2>
          <Steps />
          <ul className="ma-skills">
            {SKILLS.map((s) => <li key={s.name}><b>{s.name}</b><span>{s.says}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="ma-faq">
        <div className="me-wrap me-wrap--narrow">
          <h2 className="me-h2">Questions</h2>
          <Faq />
        </div>
      </section>

      <section className="ma-end">
        <div className="me-wrap ma-end-in">
          <div>
            <p className="me-kicker">{NEWSLETTER.name}</p>
            <h2 className="me-h2">Grow another arm <em>every week.</em></h2>
            <p className="me-lede">{NEWSLETTER.pitch}</p>
            <MeSignup form="me-arms-end" tone="dark" cta="Subscribe" />
          </div>
          <div className="ma-end-art">
            <Image src="/brand/kit/mason-at-rest.webp" alt="Mason, Esy’s octopus, resting on a stack of parcels at a desk at night" width={1536} height={864} sizes="(max-width: 900px) 100vw, 560px" />
          </div>
        </div>
      </section>
    </div>
  );
}

// ── B · The Entry ────────────────────────────────────────────────────────────────────────

function Entry() {
  const [lit, setLit] = useState<JobId>('research');
  return (
    <div className="me me--entry">
      <section className="mb-hero">
        <div className="me-wrap mb-hero-in">
          <div className="mb-entry">
            <p className="mb-crumb">Esy · Definitions</p>
            <h1 className="mb-h1">marketing engineer</h1>
            <p className="mb-say"><span>/ˈmɑːr·kɪ·tɪŋ ˌen·dʒɪˈnɪər/</span><i>noun</i></p>
            <ol className="mb-senses">
              <li>{DEFINITION}</li>
              <li><i>informal</i> {SHORT} One person with the reach of a team.</li>
            </ol>
            <p className="mb-see">See also <a href="#mb-anatomy">anatomy</a> · <a href="#mb-become">how to become one</a> · <a href="#mb-faq">marketing operations</a></p>
            <div className="mb-subscribe">
              <p><b>{NEWSLETTER.name}</b> {NEWSLETTER.pitch}</p>
              <MeSignup form="me-entry-hero" cta="Subscribe" />
            </div>
          </div>
          <figure className="mb-fig">
            <div className="mb-fig-plate">
              <Image src="/brand/kit/mason-studio.webp" alt="Mason, Esy’s octopus, as a vinyl toy" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 480px" priority />
            </div>
            <figcaption><b>Fig. 1</b> Mason, Esy’s octopus. One mind, eight arms that each work on their own.</figcaption>
          </figure>
        </div>
      </section>

      <section className="mb-anatomy" id="mb-anatomy">
        <div className="me-wrap">
          <div className="mb-sec-head">
            <span className="mb-sec-n">§1</span>
            <h2 className="me-h2">Anatomy</h2>
            <p className="me-lede">Eight jobs, one system. Each arm works on its own; a person keeps the decision.</p>
          </div>
          <div className="mb-anatomy-in">
            <div className="mb-plate"><MasonJobs lit={lit} onPick={setLit} /></div>
            <ol className="mb-legend">
              {JOBS.map((j, i) => (
                <li key={j.id} className={lit === j.id ? 'is-lit' : ''} onMouseEnter={() => setLit(j.id)}>
                  <span className="mb-legend-n">{String(i + 1).padStart(2, '0')}</span>
                  <div><b>{j.name}</b><span>{j.system}</span><em>You: {j.you.toLowerCase()}</em></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-usage">
        <div className="me-wrap mb-two">
          <div className="mb-sec-head">
            <span className="mb-sec-n">§2</span>
            <h2 className="me-h2">Compared with a marketer</h2>
            <p className="me-lede">{WHY_NOW}</p>
          </div>
          <ul className="mb-pairs">
            {SHIFT.map((s) => (
              <li key={s.from}><s>{s.from}</s><span>{s.to}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-become" id="mb-become">
        <div className="me-wrap">
          <div className="mb-sec-head">
            <span className="mb-sec-n">§3</span>
            <h2 className="me-h2">How to become one</h2>
          </div>
          <Steps />
          <aside className="mb-cite">
            <p className="mb-cite-label">Example</p>
            <p className="mb-cite-text">{PROOF.lede} {PROOF.hands.map((h) => `${h.who}: ${h.does}`).join('. ')}.</p>
            <a className="me-link" href={PROOF.href}>{PROOF.title}, at {PROOF.where} <ArrowUpRight size={14} aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      <section className="mb-faq" id="mb-faq">
        <div className="me-wrap mb-two">
          <div className="mb-sec-head">
            <span className="mb-sec-n">§4</span>
            <h2 className="me-h2">Questions</h2>
          </div>
          <Faq />
        </div>
      </section>

      <section className="mb-end">
        <div className="me-wrap">
          <div className="mb-end-card">
            <div className="mb-end-strip" aria-hidden="true">
              <Image src="/brand/kit/mason-turnaround.webp" alt="" width={1536} height={380} sizes="(max-width: 900px) 100vw, 1000px" />
            </div>
            <div className="mb-end-body">
              <h2 className="me-h2">Learn the job <em>one system at a time.</em></h2>
              <p className="me-lede">{NEWSLETTER.pitch}</p>
              <MeSignup form="me-entry-end" tone="dark" cta="Subscribe" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── C · One Day ──────────────────────────────────────────────────────────────────────────

const YOUR_PART = DAY.filter((d) => d.job === 'you').length;

// D (round 2) is C with Zev's four fixes: the question is the headline, the eight jobs and the
// skills get their own section, the photo never stretches past its real width, and the page stays
// night to the end. Its FAQ is the researched one (FAQ_D).
function Day({ v2 = false, jobs, forms }: { v2?: boolean; jobs?: JobsTake; forms?: { hero: string; end: string } }) {
  const [at, setAt] = useState(0);
  const [lit, setLit] = useState<JobId>('research');
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  // The row crossing the middle of the screen sets the clock and lights Mason's arm.
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setAt(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: '-48% 0px -48% 0px' },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const now = DAY[at];
  return (
    <div className={`me me--day ${v2 ? 'is-v2' : ''}`} style={v2 ? ({ '--dawn': at / (DAY.length - 1) } as CSSProperties) : undefined}>
      <section className={`mc-hero ${v2 ? 'is-v2' : ''}`}>
        {/* D keeps the photo at or under its real 1536px width, fading into the night at the sides. */}
        <div className="mc-hero-media" aria-hidden="true">
          <Image className="mc-hero-img" src="/brand/kit/mason-at-rest.webp" alt="" width={1536} height={864} sizes="(min-width: 1536px) 1536px, 100vw" priority />
        </div>
        <div className="me-wrap mc-hero-in">
          {v2 ? (
            <>
              <h1 className="mc-q">What is a marketing engineer?</h1>
              <p className="mc-h1" aria-hidden="false">The day <em>starts with the work done.</em></p>
            </>
          ) : (
            <>
              <p className="me-kicker">What is a marketing engineer?</p>
              <h1 className="mc-h1">The marketing engineer’s day <em>starts with the work done.</em></h1>
            </>
          )}
          <p className="mc-def">{DEFINITION}</p>
          <MeSignup form={forms?.hero ?? (v2 ? 'me-d-hero' : 'me-day-hero')} tone="dark" />
        </div>
        <a className="mc-scroll" href="#mc-day">A day in the system <ArrowRight size={14} aria-hidden="true" /></a>
      </section>

      <section className="mc-day" id="mc-day">
        <div className="me-wrap mc-day-in">
          <div className="mc-clock-col">
            <div className="mc-clock">
              <p className="mc-clock-label">A sample day</p>
              <p className="mc-clock-t" key={now.t + at}>{now.t}</p>
              <p className={`mc-clock-who ${now.job === 'you' ? 'is-you' : ''}`}>{now.job === 'you' ? 'You' : jobOf(now.job).name}</p>
              <div className="mc-clock-mason"><MasonJobs lit={now.job === 'you' ? undefined : now.job} labels={false} /></div>
              <p className="mc-clock-note">Shaped like how AI Marketing News is made. Times are a sample.</p>
            </div>
          </div>
          <ol className="mc-log">
            {DAY.map((d, i) => (
              <li
                key={`${d.t}-${i}`}
                ref={(el) => { rows.current[i] = el; }}
                data-i={i}
                className={`${d.job === 'you' ? 'is-you' : ''} ${i === at ? 'is-now' : ''}`}
              >
                <span className="mc-log-t">{d.t}</span>
                <div>
                  <b>{d.job === 'you' ? 'You' : jobOf(d.job).name}</b>
                  <p>{d.what}</p>
                </div>
              </li>
            ))}
            <li className="mc-log-sum">
              <span className="mc-log-t">Total</span>
              <div><b>Your part: {YOUR_PART} decisions.</b><p>Everything else ran on its own, and nothing went out without you.</p></div>
            </li>
          </ol>
        </div>
      </section>

      {/* D: the night lifts into morning as the day ends, so the light sections arrive softly. */}
      {v2 && <div className="mc-seam mc-seam--dawn" aria-hidden="true" />}

      {/* Round 3 swaps D's jobs section for one of three simpler ones (MeJobs.tsx). */}
      {v2 && jobs && <JobsSection take={jobs} />}

      {v2 && !jobs && (
        <section className="mc-jobs">
          <div className="me-wrap">
            <div className="mc-jobs-head">
              <p className="me-kicker">What a marketing engineer does</p>
              <h2 className="me-h2">Eight jobs, <em>one system.</em></h2>
              <p className="me-lede">Each arm does one job on its own. Pick one to see what the system does and what you still decide.</p>
            </div>
            <div className="mc-jobs-in">
              <div className="ma-stage mc-jobs-stage"><MasonJobs lit={lit} onPick={setLit} /></div>
              <div className="mc-jobs-side">
                <div className="ma-readout" aria-live="polite" key={lit}>
                  <p className="ma-readout-job">{jobOf(lit).name}</p>
                  <p className="ma-readout-sys"><b>The system</b>{jobOf(lit).system}</p>
                  <p className="ma-readout-you"><b>You</b>{jobOf(lit).you}</p>
                </div>
                <p className="mc-jobs-label">The skills it takes</p>
                <ul className="mc-skills">
                  {SKILLS.map((k) => <li key={k.name}><b>{k.name}</b><span>{k.says}</span></li>)}
                </ul>
                <div className="mc-proof">
                  <p className="mc-jobs-label">A real one: {PROOF.title}</p>
                  <ol>{PROOF.hands.map((h) => <li key={h.who} className={h.who === 'You' ? 'is-you' : ''}><b>{h.who}</b><span>{h.does}</span></li>)}</ol>
                  <a className="me-link" href={PROOF.href}>Read it at {PROOF.where} <ArrowUpRight size={14} aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mc-what">
        <div className="me-wrap mc-what-in">
          <div>
            <h2 className="me-h2">So, what is a marketing engineer?</h2>
            <p className="mc-big">{SHORT}</p>
            <p className="me-lede">{WHY_NOW}</p>
          </div>
          <ul className="mc-shift">
            {SHIFT.map((s) => <li key={s.from}><span>{s.from}</span><b>{s.to}</b></li>)}
          </ul>
        </div>
      </section>

      <section className="mc-start">
        <div className="me-wrap">
          <h2 className="me-h2">How to become one</h2>
          <Steps />
        </div>
      </section>

      <section className="mc-faq">
        <div className="me-wrap me-wrap--narrow">
          <h2 className="me-h2">{v2 ? 'Questions people ask' : 'Questions'}</h2>
          <Faq items={v2 ? FAQ_D : FAQ} />
        </div>
        {/* D marks its questions up for search (FAQPage), from the same list the page shows. */}
        {v2 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_D.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })) }) }}
          />
        )}
      </section>

      {v2 && <div className="mc-seam mc-seam--dusk" aria-hidden="true" />}

      {v2 ? (
        // Zev preferred A's closing signup, so D and round 3 end on it (A's markup, its own box name).
        <section className="ma-end">
          <div className="me-wrap ma-end-in">
            <div>
              <p className="me-kicker">{NEWSLETTER.name}</p>
              <h2 className="me-h2">Grow another arm <em>every week.</em></h2>
              <p className="me-lede">{NEWSLETTER.pitch}</p>
              <MeSignup form={forms?.end ?? 'me-d-end'} tone="dark" cta="Subscribe" />
            </div>
            <div className="ma-end-art">
              <Image src="/brand/kit/mason-at-rest.webp" alt="Mason, Esy’s octopus, resting on a stack of parcels at a desk at night" width={1536} height={864} sizes="(max-width: 900px) 100vw, 560px" />
            </div>
          </div>
        </section>
      ) : (
      <section className="mc-end">
        <div className="me-wrap mc-end-in">
          <div className="mc-end-art">
            <Image src="/brand/kit/mason-studio.webp" alt="Mason, Esy’s octopus, as a vinyl toy" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 520px" />
          </div>
          <div>
            <p className="me-kicker">{NEWSLETTER.name}</p>
            <h2 className="me-h2">Build tomorrow’s day <em>this week.</em></h2>
            <p className="me-lede">{NEWSLETTER.pitch}</p>
            <MeSignup form="me-day-end" cta="Subscribe" />
          </div>
        </div>
      </section>
      )}
    </div>
  );
}

/** The live page, esy.com/marketing-engineer (2026-11-07): D · One Day II with F's sentence for the
 *  jobs, its own signup box names so live signups never mix with the prototype's. */
export function MarketingEngineerPage() {
  return <Day v2 jobs="sentence" forms={{ hero: 'marketing-engineer-hero', end: 'marketing-engineer-end' }} />;
}

export function MarketingEngineerTake({ take }: { take: MeTake }) {
  if (take === 'entry') return <Entry />;
  if (take === 'day') return <Day />;
  if (take === 'day2') return <Day v2 />;
  if (take.startsWith('day2-')) return <Day v2 jobs={take.slice(5) as JobsTake} />;
  return <Arms />;
}
