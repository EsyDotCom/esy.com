/* Zev's take (2026-10-12): the signed commentary on a news post, right under
 * "Why it matters" (fact) and set apart from it (opinion), so a reader can
 * always tell the two apart. The API sends it as a small markdown subset:
 * paragraphs, [links](url), **bold** and *italic*. Anything else renders as
 * plain text, and links go only to http(s) or this site. */

import Link from 'next/link';
import type { NewsPost } from '@/data/news';

// Links, then bold, then italic: the only marks a take carries.
const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
const unescape = (t: string) => t.replace(/\\([\\*_[\]])/g, '$1');

/** A link inside the take: our own pages navigate in-site; others open as plain links. */
function TakeLink({ href, children }: { href: string; children: string }) {
  const own = href.match(/^https:\/\/(?:www\.)?esy\.com(\/.*)$/)?.[1] ?? (href.startsWith('/') ? href : null);
  if (own) return <Link href={own}>{children}</Link>;
  if (!/^https?:\/\//.test(href)) return <>{children}</>;
  return <a href={href} rel="noopener">{children}</a>;
}

function paragraph(md: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of md.matchAll(INLINE)) {
    if (m.index! > last) out.push(unescape(md.slice(last, m.index)));
    if (m[1] !== undefined) out.push(<TakeLink key={m.index} href={m[2]}>{unescape(m[1])}</TakeLink>);
    else if (m[3] !== undefined) out.push(<b key={m.index}>{unescape(m[3])}</b>);
    else out.push(<i key={m.index}>{unescape(m[4])}</i>);
    last = m.index! + m[0].length;
  }
  out.push(unescape(md.slice(last)));
  return out;
}

export function ZevTake({ post, sample = false }: { post: Pick<NewsPost, 'take'>; sample?: boolean }) {
  if (!post.take?.trim()) return null;
  return (
    <aside className="np-take" aria-labelledby="np-take">
      <header className="np-take-head">
        {/* His headshot is zoomed to his face site-wide (globals.css), so it sits in a round mask like every byline. */}
        <span className="np-take-avatar zev-byline-avatar">
          {/* eslint-disable-next-line @next/next/no-img-element -- his byline photo, as /about uses */}
          <img src="/images/zev-uhuru-sweater-3.webp" alt="" width={40} height={40} />
        </span>
        <span>
          <b id="np-take">Zev’s take</b>
          <span className="np-take-role">Commentary{sample ? ' · sample text for the prototype' : ''}</span>
        </span>
      </header>
      {post.take.split(/\n{2,}/).filter((p) => p.trim()).map((p, i) => <p key={i}>{paragraph(p)}</p>)}
    </aside>
  );
}
