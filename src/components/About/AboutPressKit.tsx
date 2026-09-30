/* C · Press kit — /about for people who want to feature Zev: a quick-facts
 * panel beside the name and promise, a dated "Now" list, the short and long
 * bios with copy buttons, the headshot to download, and every link in one
 * place. Practical first; still in the publication's look.
 */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Download } from 'lucide-react';
import { BookACallButton } from '@/components/BookACallButton';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import CopyButton from './CopyButton';
import { BIO_LONG, BIO_SHORT, EMAIL, ETYMOLOGY, FACTS, NAME, NOW, NOW_DATE, PLACE, PORTRAIT, PROMISE, ROLE, SOCIALS, WORK } from './content';

export default function AboutPressKit() {
  return (
    <>
      {/* ══ Name, promise, and the facts at a glance ══ */}
      <section className="ab-kit-head">
        <div className="nl-container ab-kit-grid">
          <div>
            <p className="nl-eyebrow">About</p>
            <h1 className="ab-kit-name">{NAME}</h1>
            <p className="ab-kit-promise">{PROMISE}</p>
            <div className="ab-kit-actions">
              <a href={`mailto:${EMAIL}`} className="ab-kit-mail">{EMAIL}</a>
              <BookACallButton />
            </div>
          </div>
          <dl className="ab-kit-facts">
            <div><dt>Role</dt><dd>{ROLE}</dd></div>
            <div><dt>Based in</dt><dd>{PLACE}</dd></div>
            <div><dt>Writes</dt><dd><Link href="/engineer/">The Marketing Engineer</Link></dd></div>
            <div><dt>Builds</dt><dd><a href={WORK.os.href} target="_blank" rel="noopener noreferrer">Esy OS</a></dd></div>
            <div><dt>Runs</dt><dd>
              <a href={WORK.clipart.href} target="_blank" rel="noopener noreferrer">clip.art</a>,{' '}
              <a href={WORK.seopage.href} target="_blank" rel="noopener noreferrer">SEOPage</a>
            </dd></div>
            <div><dt>Before</dt><dd>fuboTV, Vroom</dd></div>
            {FACTS.slice(0, 1).map((f) => (
              <div key={f.label}><dt>Runs recorded</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══ Now ══ */}
      <section className="nl-section nl-section--alt" aria-labelledby="ab-now">
        <div className="nl-container ab-kit-two">
          <div>
            <p className="nl-eyebrow">Now · {NOW_DATE}</p>
            <h2 className="nl-title" id="ab-now">What I&apos;m working on</h2>
          </div>
          <ul className="ab-now">
            {NOW.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      </section>

      {/* ══ Bios, headshot, links ══ */}
      <section className="nl-section" aria-labelledby="ab-kit">
        <div className="nl-container">
          <p className="nl-eyebrow">Press kit</p>
          <h2 className="nl-title" id="ab-kit">Bios, headshot and links</h2>
          <div className="ab-kit-body">
            <div className="ab-bios">
              <div className="ab-bio">
                <div className="ab-bio-head"><b>Short bio</b><CopyButton text={BIO_SHORT} /></div>
                <p>{BIO_SHORT}</p>
              </div>
              <div className="ab-bio">
                <div className="ab-bio-head"><b>Long bio</b><CopyButton text={BIO_LONG.join('\n\n')} /></div>
                {BIO_LONG.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              </div>
              <p className="ab-kit-note">
                On the name: {ETYMOLOGY.text} <Link href={ETYMOLOGY.href}>Where it comes from</Link>.
              </p>
            </div>
            <aside className="ab-kit-side">
              <figure className="ab-headshot">
                <div className="ab-portrait ab-portrait--square">
                  <Image src={PORTRAIT} alt={NAME} fill sizes="280px" style={{ objectFit: 'cover' }} />
                </div>
                <a href={PORTRAIT} download="zev-uhuru.png" className="ab-copy">
                  <Download size={14} aria-hidden="true" /> Download headshot
                </a>
              </figure>
              <ul className="ab-links">
                {SOCIALS.map(({ label, href, handle, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon size={16} />
                      <span><b>{label}</b>{handle}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="ab-kit-note">
                How I publish: <Link href="/editorial-standards/">editorial standards</Link>
              </p>
            </aside>
          </div>
        </div>
      </section>

      <WeeklyEmailBand />
    </>
  );
}
