/* Footer prototypes (/prototypes/footer/<variant>/, 2026-09-29): where films
 * go now that there are films, with creatives to follow. Each variant is the
 * live light footer's own markup and classes (Home/footer.tsx, globals.css),
 * so only the structure differs:
 *
 *   yours    — A: today's footer plus a Films column (titles, All films);
 *              the From Esy row keeps the apps.
 *   by-kind  — B: columns by what they hold: Learn, Films, Powered by Esy (OS,
 *              clip.art, SEOPage), Company; the brand line becomes the
 *              publication's; the From Esy row goes.
 *   shelves  — C: compact columns, and the bottom band becomes two shelves:
 *              Films as small posters, Apps as their wordmarks.
 *
 * ConditionalFooter renders one of these in the footer's slot on the
 * prototype pages, over the same factory scene. */
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/Logo';
import ClipArtWordmark from '@/components/NewsletterHome/ClipArtWordmark';
import SeoPageWordmark from '@/components/NewsletterHome/SeoPageWordmark';
import { FILMS, filmHref } from '@/data/films';
import './FooterProto.css';

export type FooterVariantKey = 'yours' | 'by-kind' | 'shelves';
export const FOOTER_VARIANTS: FooterVariantKey[] = ['yours', 'by-kind', 'shelves'];

type FooterLink = { href: string; text: string; note?: string; external?: boolean };

/** A column in the live footer's markup; a link can carry a small note under it (a film's runtime). */
function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      <div className="footer-links">
        {links.map((l) => (
          <a
            key={l.href + l.text}
            href={l.href}
            className={`footer-link ${l.note ? 'fp-link--noted' : ''}`}
            {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {l.text}
            {l.note && <span className="fp-note">{l.note}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}

/** The brand block: the wordmark lockup, a line, the socials. `line` is what changes. */
function Brand({ line }: { line: React.ReactNode }) {
  return (
    <div className="footer-brand">
      <div className="footer-logo">
        <Logo href="" wordmarkOnly wordmarkFont="blackops" theme="light" />
        <span aria-hidden="true" className="fp-lockup-rule" />
        <span className="fp-lockup-os">OS</span>
      </div>
      <p className="footer-desc fp-desc">{line}</p>
      <div className="footer-socials">
        <a href="https://www.youtube.com/@EsyDotCom" target="_blank" rel="noreferrer" className="social-link" aria-label="YouTube">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="fp-social-icon">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/zevuhuru/" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="fp-social-icon">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// The columns every variant shares, as they are today.
const LEARN: FooterLink[] = [
  { href: '/newsletter/', text: 'The Marketing Engineer' },
  { href: '/topics/', text: 'Topics' },
  { href: '/courses/', text: 'Courses' },
  { href: '/docs', text: 'Docs' },
];
const COMPANY: FooterLink[] = [
  { href: '/about/', text: 'About' },
  { href: 'mailto:zev@esy.com', text: 'Contact' },
  { href: '/privacy/', text: 'Privacy' },
  { href: '/terms/', text: 'Terms' },
];

/** Every film by title, newest first, with its runtime-and-kind note, then All films. */
const filmLinks = (withNotes: boolean): FooterLink[] => [
  ...FILMS.map((f) => ({ href: filmHref(f), text: f.title, note: withNotes ? f.kind : undefined })),
  { href: '/films/', text: 'All films →' },
];

const TODAY_LINE = (
  <>
    <strong>Put marketing production on autopilot.</strong>
    <br />
    Build, review and scale marketing with AI.
  </>
);
const PUBLICATION_LINE = (
  <>
    <strong>The Marketing Engineer.</strong>
    <br />
    Learn to build the AI systems that run marketing, and watch what they make.
  </>
);

function Bottom() {
  return (
    <div className="footer-bottom">
      <p>&copy; 2024-2026 ESY, LLC. All rights reserved.</p>
    </div>
  );
}

/* ── A · Yours ── */
function Yours() {
  return (
    <>
      <div className="footer-content fp-cols-5">
        <Brand line={TODAY_LINE} />
        <Column title="Product" links={[{ href: 'https://os.esy.com', text: 'OS' }]} />
        <Column title="Learn" links={LEARN} />
        <Column title="Films" links={filmLinks(false)} />
        <Column title="Company" links={COMPANY} />
      </div>
      <div className="footer-extended">
        <h4>From Esy</h4>
        <div className="footer-extended-links">
          <a href="https://clip.art" target="_blank" rel="noreferrer" className="footer-link">Clip.Art</a>
          <a href="https://seo.page" target="_blank" rel="noreferrer" className="footer-link">seo.page</a>
        </div>
      </div>
      <Bottom />
    </>
  );
}

/* ── B · By kind ── */
function ByKind() {
  return (
    <>
      <div className="footer-content fp-cols-5">
        <Brand line={PUBLICATION_LINE} />
        <Column title="Learn" links={LEARN} />
        <Column title="Films" links={filmLinks(true)} />
        {/* Everything that runs on Esy, the OS first: one column, one kind of thing. */}
        <Column
          title="Powered by Esy"
          links={[
            { href: 'https://os.esy.com', text: 'Esy OS', note: 'The platform' },
            { href: 'https://clip.art', text: 'clip.art', note: 'Clip art library', external: true },
            { href: 'https://seo.page', text: 'SEOPage', note: 'AI-ready landing pages', external: true },
          ]}
        />
        <Column title="Company" links={COMPANY} />
      </div>
      <Bottom />
    </>
  );
}

/* ── C · Shelves ── */
function Shelves() {
  return (
    <>
      <div className="footer-content">
        <Brand line={PUBLICATION_LINE} />
        <Column title="Product" links={[{ href: 'https://os.esy.com', text: 'OS' }]} />
        <Column title="Learn" links={LEARN} />
        <Column title="Company" links={COMPANY} />
      </div>

      {/* The work, as shelves: films as posters, apps as their wordmarks. Creatives become a third shelf. */}
      <div className="footer-extended fp-shelves">
        <div className="fp-shelf">
          <h4>
            Films <Link href="/films/" className="fp-shelf-all">All films →</Link>
          </h4>
          <ul className="fp-posters">
            {FILMS.map((f) => (
              <li key={f.slug}>
                <a href={filmHref(f)} className="fp-poster">
                  <Image src={f.poster} alt={f.posterAlt} width={96} height={144} />
                  <span className="fp-poster-text">
                    <span className="fp-poster-title">{f.title}</span>
                    <span className="fp-poster-meta">{f.meta}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="fp-shelf">
          <h4>Apps powered by Esy</h4>
          <div className="fp-apps">
            <a href="https://clip.art" target="_blank" rel="noreferrer" className="fp-app" aria-label="clip.art">
              <ClipArtWordmark className="fp-app-clipart" />
            </a>
            <a href="https://seo.page" target="_blank" rel="noreferrer" className="fp-app" aria-label="SEOPage">
              <SeoPageWordmark weight="light" className="fp-app-seopage" />
            </a>
          </div>
        </div>
      </div>
      <Bottom />
    </>
  );
}

/** One footer direction, in the live footer's light shell. */
export default function FooterVariant({ variant }: { variant: FooterVariantKey }) {
  return (
    <footer className="footer footer--light fp">
      {variant === 'yours' ? <Yours /> : variant === 'by-kind' ? <ByKind /> : <Shelves />}
    </footer>
  );
}
