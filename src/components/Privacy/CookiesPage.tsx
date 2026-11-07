'use client';

/* esy.com/cookies (2026-11-06), in /privacy's design (P1 "The short version"): the promise and short
   points first, then what esy.com stores as tables by kind, then the plain notes, with a contents
   list and Cookie settings that follow you. Text in cookies.ts. */

import Link from 'next/link';
import { Cookie, Mail, ShieldCheck } from 'lucide-react';
import { COOKIES_PROMISE, COOKIES_SHORT, COOKIES_UPDATED, GROUPS, NOTES } from './cookies';
import { COMPANY, CONTACT, openCookieSettings } from './policy';
import './privacy.css';

const CONTENTS = [{ id: 'stored', title: 'What we store' }, ...NOTES.map((n) => ({ id: n.id, title: n.title }))];

export function CookiesPage() {
  return (
    <div className="pv pv--short">
      <header className="pv-head">
        <p className="pv-kicker">Cookie policy</p>
        <h1 className="pv-h1">Cookies, in plain words</h1>
        <p className="pv-promise">{COOKIES_PROMISE}</p>
        <p className="pv-meta"><span>Updated {COOKIES_UPDATED}</span><span>{COMPANY.name}</span></p>
      </header>

      <section className="pv-short" aria-labelledby="ck-short-h">
        <h2 id="ck-short-h" className="pv-h2">The short version</h2>
        <ol className="pv-short-grid">
          {COOKIES_SHORT.map((x, i) => <li key={x.title}><span className="pv-n">{i + 1}</span><b>{x.title}</b><p>{x.text}</p></li>)}
        </ol>
      </section>

      <div className="pv-doc">
        <nav className="pv-toc" aria-label="Sections">
          <p className="pv-toc-h">On this page</p>
          <ol>{CONTENTS.map((s, i) => <li key={s.id}><a href={`#${s.id}`}><span>{i + 1}</span>{s.title}</a></li>)}</ol>
          <div className="pv-choices is-compact">
            <p className="pv-choices-h"><ShieldCheck size={16} aria-hidden="true" />Your choices</p>
            <button type="button" className="pv-btn" onClick={openCookieSettings}><Cookie size={15} aria-hidden="true" />Cookie settings</button>
            <a className="pv-btn pv-btn--ghost" href={`mailto:${CONTACT}?subject=Cookies`}><Mail size={15} aria-hidden="true" />Ask a question</a>
          </div>
        </nav>

        <article className="pv-article">
          <section id="stored" className="pv-sec">
            <h2 className="pv-h2"><span className="pv-sec-n">1</span>What we store</h2>
            <p className="pv-answer">Three essentials on your device; analytics only with your yes.</p>
            {GROUPS.map((g) => (
              <div key={g.id} className="ck-group">
                <h3>{g.title}</h3>
                <p className="ck-when">{g.when}</p>
                {/* A table on wide screens; each row reads as a small card on a phone. */}
                <table className="ck-table">
                  <thead><tr><th>Name</th><th>Set by</th><th>What it does</th><th>How long</th></tr></thead>
                  <tbody>
                    {g.rows.map((r) => (
                      <tr key={r.name}>
                        <td data-l="Name"><code>{r.name}</code><small>{r.where}</small></td>
                        <td data-l="Set by">{r.who}</td>
                        <td data-l="What it does">{r.what}</td>
                        <td data-l="How long">{r.howLong}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {g.vendor && <p className="ck-vendor">Lifetimes are the vendors’ published defaults and can change; see <a href={g.vendor.href} target="_blank" rel="noreferrer">Google’s</a> and <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/cookie-list" target="_blank" rel="noreferrer">Microsoft’s</a> lists.</p>}
              </div>
            ))}
          </section>
          {NOTES.map((n, i) => (
            <section key={n.id} id={n.id} className="pv-sec">
              <h2 className="pv-h2"><span className="pv-sec-n">{i + 2}</span>{n.title}</h2>
              <p className="pv-answer">{n.short}</p>
              {n.body.map((b) => <p key={b.slice(0, 24)}>{b}</p>)}
              {n.id === 'changes' && <p><Link href="/privacy/">Read the privacy policy</Link></p>}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
