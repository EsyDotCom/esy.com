/* The editorial standards, as content every layout shares (2026-09-29).
 * /prototypes/editorial/ renders three designs over exactly these words, so
 * the comparison is about design, not copy. Four of these are commitments
 * Zev confirms before they go live: corrections, AI use, our own products,
 * and the pace line in "How a news post is built".
 */
import Link from 'next/link';

export const STANDARDS_UPDATED = '2026-09-29';

export const updatedLabel = () =>
  new Date(`${STANDARDS_UPDATED}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

export const INTRO =
  'How we decide what to publish, where it goes, and how we keep it right. Written for readers, and for us whenever we need a refresher.';

/** The two kinds of piece, each with its home. */
export const KINDS = {
  news: {
    name: 'News',
    href: '/news/',
    url: 'esy.com/news',
    blurb:
      'Short, fast takes on something that just happened in AI and marketing (a release, an update, a pricing change), and what it means for the people who build marketing systems.',
  },
  article: {
    name: 'Articles',
    href: '/engineer/',
    url: 'esy.com/engineer',
    blurb: 'Tutorials, builds and walkthroughs that teach something lasting. They go out in the weekly email.',
  },
} as const;

export const SIX_MONTH_TEST = {
  question: 'Would this piece still be worth reading, unchanged, in six months?',
  no: 'It’s news.',
  yes: 'It’s an article.',
};

/** News versus article, row by row: [label, news, article]. */
export const COMPARISON: [string, string, string][] = [
  ['Starts from', 'Something that happened out there: a release, an update, a pricing change', 'Something we built, tested or figured out'],
  ['Answers', 'What changed, and does it matter to me?', 'How do I build or do this?'],
  ['Shelf life', 'Weeks. Dated and pinned to a version.', 'Months or years. Updated in place.'],
  ['Speed', 'Within one or two days of the event', 'When it’s done right'],
  ['Shape', '500 to 900 words in three parts', 'As long as the build needs: steps, video, results'],
  ['Headline', 'Needs a version or date to make sense', 'Makes sense without one'],
];

// Real pieces, sorted by the six-month test (titles are looked up at render).
export const NEWS_EXAMPLES = ['claude-fable-5-first-impressions', 'chatgpt-images-2-vs-nano-banana-2'];
export const ARTICLE_EXAMPLES = [
  'how-we-made-our-explainer-video-in-code',
  'building-multi-agent-workflows-claude-code',
  'cursor-workflow-patterns-production',
  'generate-clip-art-asset-walkthrough',
];

/** The three parts every news post has, in order. */
export const NEWS_PARTS: [string, string][] = [
  ['What happened', 'The facts, with the version, the date, and a link to the primary source.'],
  [
    'Why it matters for marketers',
    'Our angle: what it changes for people who build marketing systems. Without this part it’s a rewrite of the announcement, and we don’t publish those.',
  ],
  ['What to do', 'The next step, with links to the article or topic that goes deeper.'],
];

export interface Principle {
  id: string;
  title: string;
  body: React.ReactNode;
}

/** Everything after the news-or-article call, in reading order. */
export const PRINCIPLES: Principle[] = [
  {
    id: 'grey-area',
    title: 'The grey area',
    body: (
      <>
        <p>A hands-on take on something new can be either; it depends how deep it goes.</p>
        <ul>
          <li><b>News:</b> a quick first test right after a release. &ldquo;I tried it on my workflow, and here&apos;s what I saw.&rdquo;</li>
          <li><b>Article:</b> a thorough evaluation weeks later. &ldquo;How it changed our SEO audits: the setup and the results.&rdquo;</li>
        </ul>
        <p>Still unsure? If the headline needs a version number to make sense, it&apos;s news.</p>
      </>
    ),
  },
  {
    id: 'news-post',
    title: 'How a news post is built',
    body: (
      <>
        <ol>
          {NEWS_PARTS.map(([t, d]) => (
            <li key={t}><b>{t}.</b> {d}</li>
          ))}
        </ol>
        <p>We publish at a pace we can keep: two good news posts a week beats seven thin ones.</p>
      </>
    ),
  },
  {
    id: 'article',
    title: 'How an article is built',
    body: (
      <ul>
        <li>It starts from something we actually built, ran or tested, not from a press release.</li>
        <li>It shows the work: the setup, the steps, the result, and what broke along the way.</li>
        <li>It stays current: when a tool changes, we update it in place and show the date, instead of publishing a new one.</li>
      </ul>
    ),
  },
  {
    id: 'how-they-connect',
    title: 'How they connect',
    body: (
      <>
        <p>News brings readers in. Articles are what they stay for.</p>
        <ul>
          <li>Every news post ends with links to the articles and the topic that go deeper.</li>
          <li>When a story keeps mattering, we write the article and link it from the news post.</li>
          <li>In the weekly email, an article leads and the week&apos;s news follows as a short roundup.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'accuracy',
    title: 'Accuracy and sources',
    body: (
      <ul>
        <li>Facts come from primary sources: release notes, documentation, pricing pages, and our own runs.</li>
        <li>Every number is checked against its source, and every news post names the version and the date.</li>
        <li>When we tested something ourselves, we say what we tested it on and how.</li>
      </ul>
    ),
  },
  {
    id: 'corrections',
    title: 'Corrections and updates',
    body: (
      <p>
        When we get something wrong, we fix it and note at the end what changed and when. We don&apos;t quietly
        rewrite. Updates that aren&apos;t corrections show an &ldquo;Updated&rdquo; date. Spotted a mistake? Email{' '}
        <a href="mailto:zev@esy.com">zev@esy.com</a>.
      </p>
    ),
  },
  {
    id: 'ai',
    title: 'How we use AI',
    body: (
      <p>
        We write about AI tools, and we use them: for research, first drafts and images, mostly through Esy&apos;s own
        workflows and Claude. A person reviews, tests and signs off every piece, and AI images say so in their captions.
      </p>
    ),
  },
  {
    id: 'our-products',
    title: 'Our own products',
    body: (
      <p>
        Esy, clip.art and SEOPage are ours. When a piece is about one of them, or uses one as the example, we say so. We
        don&apos;t take payment to cover a product or to rank it.
      </p>
    ),
  },
  {
    id: 'style',
    title: 'Style',
    body: (
      <ul>
        <li>Plain words. Say what a tool does and what it did for us, without hype.</li>
        <li>Write for the reader: what they can do after reading.</li>
        <li>American spelling, and one idea per sentence where we can.</li>
      </ul>
    ),
  },
];

/** A link to a kind's home, e.g. "esy.com/news". */
export function KindLink({ kind, className = '' }: { kind: keyof typeof KINDS; className?: string }) {
  return (
    <Link href={KINDS[kind].href} className={className}>
      {KINDS[kind].url}
    </Link>
  );
}
