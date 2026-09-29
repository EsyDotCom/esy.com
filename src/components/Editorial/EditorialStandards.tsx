/* /editorial-standards/: how The Marketing Engineer decides what to publish,
 * where it goes (news or an article), and how pieces are kept right
 * (2026-09-29). Public, because readers and search engines look for a
 * publication's standards, and written plainly enough to be Zev's own
 * refresher. The examples are real published pieces, looked up by slug, so a
 * renamed article never shows a stale title.
 */
import Link from 'next/link';
import type { AgenticVideo } from '@/data/agentic-videos';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import WeeklyEmailBand from '@/components/NewsletterHome/WeeklyEmailBand';
import { articlePath } from '@/lib/article-path';
import { toNavArticles } from '@/lib/nav-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import './Editorial.css';

export const STANDARDS_UPDATED = '2026-09-29';

// Real pieces, sorted by the six-month test.
const NEWS_EXAMPLES = ['claude-fable-5-first-impressions', 'chatgpt-images-2-vs-nano-banana-2'];
const ARTICLE_EXAMPLES = [
  'how-we-made-our-explainer-video-in-code',
  'building-multi-agent-workflows-claude-code',
  'cursor-workflow-patterns-production',
  'generate-clip-art-asset-walkthrough',
];

// The page's sections, for the contents list and the anchors.
const SECTIONS = [
  ['what-we-publish', 'What we publish'],
  ['six-month-test', 'The six-month test'],
  ['news-or-article', 'News or article'],
  ['examples', 'Examples'],
  ['grey-area', 'The grey area'],
  ['news-post', 'How a news post is built'],
  ['article', 'How an article is built'],
  ['how-they-connect', 'How they connect'],
  ['accuracy', 'Accuracy and sources'],
  ['corrections', 'Corrections and updates'],
  ['ai', 'How we use AI'],
  ['our-products', 'Our own products'],
  ['style', 'Style'],
] as const;

function ExampleList({ slugs, articles }: { slugs: string[]; articles: AgenticVideo[] }) {
  const found = slugs.map((s) => articles.find((a) => a.slug === s)).filter((a): a is AgenticVideo => !!a);
  return (
    <ul className="es-examples">
      {found.map((a) => (
        <li key={a.slug}>
          <Link href={articlePath(a.slug)}>{a.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function EditorialStandards({ articles }: { articles: AgenticVideo[] }) {
  const updated = new Date(`${STANDARDS_UPDATED}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />

      <section className="es-hero">
        <div className="nl-container">
          <p className="nl-eyebrow">The Marketing Engineer</p>
          <h1 className="es-title">Editorial standards</h1>
          <p className="es-lede">
            How we decide what to publish, where it goes, and how we keep it right. Written for readers, and for us
            whenever we need a refresher.
          </p>
          <p className="es-updated">Last updated {updated}</p>
        </div>
      </section>

      <div className="nl-container es-grid">
        {/* Contents: every section, in order. */}
        <nav className="es-toc" aria-label="On this page">
          <p className="es-toc-label">On this page</p>
          <ol>
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="es-body">
          <section id="what-we-publish">
            <h2>What we publish</h2>
            <p>The Marketing Engineer publishes two kinds of pieces:</p>
            <ul>
              <li>
                <b>News</b>: short, fast takes on something that just happened in AI and marketing (a release, an
                update, a pricing change), and what it means for the people who build marketing systems. They live
                at <Link href="/news/">esy.com/news</Link>.
              </li>
              <li>
                <b>Articles</b>: tutorials, builds and walkthroughs that teach something lasting. They live at{' '}
                <Link href="/engineer/">esy.com/engineer</Link> and go out in the weekly email.
              </li>
            </ul>
          </section>

          <section id="six-month-test">
            <h2>The six-month test</h2>
            <p className="es-callout">
              Would this piece still be worth reading, unchanged, in six months? <b>No</b>: it&apos;s news.{' '}
              <b>Yes</b>: it&apos;s an article.
            </p>
          </section>

          <section id="news-or-article">
            <h2>News or article</h2>
            <div className="es-table-wrap">
              <table className="es-table">
                <thead>
                  <tr>
                    <th scope="col" />
                    <th scope="col">News</th>
                    <th scope="col">Article</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Starts from</th>
                    <td>Something that happened out there: a release, an update, a pricing change</td>
                    <td>Something we built, tested or figured out</td>
                  </tr>
                  <tr>
                    <th scope="row">Answers</th>
                    <td>What changed, and does it matter to me?</td>
                    <td>How do I build or do this?</td>
                  </tr>
                  <tr>
                    <th scope="row">Shelf life</th>
                    <td>Weeks. Dated and pinned to a version.</td>
                    <td>Months or years. Updated in place.</td>
                  </tr>
                  <tr>
                    <th scope="row">Speed</th>
                    <td>Within one or two days of the event</td>
                    <td>When it&apos;s done right</td>
                  </tr>
                  <tr>
                    <th scope="row">Shape</th>
                    <td>500 to 900 words in three parts</td>
                    <td>As long as the build needs: steps, video, results</td>
                  </tr>
                  <tr>
                    <th scope="row">Headline</th>
                    <td>Needs a version or date to make sense</td>
                    <td>Makes sense without one</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="examples">
            <h2>Examples</h2>
            <div className="es-two">
              <div>
                <p className="es-kicker">News</p>
                <ExampleList slugs={NEWS_EXAMPLES} articles={articles} />
              </div>
              <div>
                <p className="es-kicker">Articles</p>
                <ExampleList slugs={ARTICLE_EXAMPLES} articles={articles} />
              </div>
            </div>
          </section>

          <section id="grey-area">
            <h2>The grey area</h2>
            <p>A hands-on take on something new can be either. The deciding question is how deep it goes.</p>
            <ul>
              <li>
                <b>News:</b> a quick first test right after a release. &ldquo;I tried it on my workflow, and here&apos;s
                what I saw.&rdquo;
              </li>
              <li>
                <b>Article:</b> a thorough evaluation weeks later. &ldquo;How it changed our SEO audits: the setup and
                the results.&rdquo;
              </li>
            </ul>
            <p>When it&apos;s still unclear, ask whether the headline needs a version number to make sense. If it does, it&apos;s news.</p>
          </section>

          <section id="news-post">
            <h2>How a news post is built</h2>
            <p>Every news post has the same three parts, in this order:</p>
            <ol>
              <li>
                <b>What happened.</b> The facts, with the version, the date, and a link to the primary source.
              </li>
              <li>
                <b>Why it matters for marketers.</b> Our angle: what it changes for people who build marketing systems.
                A news post without this part is a rewrite of the announcement, and we don&apos;t publish those.
              </li>
              <li>
                <b>What to do.</b> The next step, with links to the article or topic that goes deeper.
              </li>
            </ol>
            <p>
              We publish at a pace we can keep. Two good news posts a week beats seven thin ones, and the headline
              always says what the piece means for the reader, not only what was announced.
            </p>
          </section>

          <section id="article">
            <h2>How an article is built</h2>
            <ul>
              <li>It starts from something we actually built, ran or tested, not from a press release.</li>
              <li>It shows the work: the setup, the steps, the result, and what broke along the way.</li>
              <li>
                It stays current. When a tool changes, we update the article in place and show the date it was
                updated, instead of publishing a new one.
              </li>
            </ul>
          </section>

          <section id="how-they-connect">
            <h2>How they connect</h2>
            <p>News brings readers in. Articles are what they stay for.</p>
            <ul>
              <li>Every news post ends with links to the articles and the topic that go deeper.</li>
              <li>
                When a news story keeps mattering (people keep searching, we keep using the tool), we write the article
                and link it from the news post.
              </li>
              <li>In the weekly email, an article leads, and the week&apos;s news posts follow as a short roundup.</li>
            </ul>
          </section>

          <section id="accuracy">
            <h2>Accuracy and sources</h2>
            <ul>
              <li>Facts come from primary sources: release notes, documentation, pricing pages, and our own runs.</li>
              <li>Every number is checked against its source, and every news post names the version and the date.</li>
              <li>When we tested something ourselves, we say what we tested it on and how.</li>
            </ul>
          </section>

          <section id="corrections">
            <h2>Corrections and updates</h2>
            <p>
              When we get something wrong, we fix it and add a note at the end of the piece saying what changed and
              when. We don&apos;t quietly rewrite what a piece said. Updates that aren&apos;t corrections, like a new
              version of a tool, show an &ldquo;Updated&rdquo; date instead.
            </p>
            <p>
              Spotted a mistake? Email <a href="mailto:zev@esy.com">zev@esy.com</a>.
            </p>
          </section>

          <section id="ai">
            <h2>How we use AI</h2>
            <p>
              We write about AI tools, and we use them: for research, first drafts, and images, mostly through
              Esy&apos;s own workflows and Claude. Every piece is reviewed, tested and signed off by a person before it
              goes out, and images made with AI say so in their captions.
            </p>
          </section>

          <section id="our-products">
            <h2>Our own products</h2>
            <p>
              Esy, clip.art and SEOPage are ours. When a piece is about one of them, or uses one as the example, we say
              so. We don&apos;t take payment to cover a product or to rank it.
            </p>
          </section>

          <section id="style">
            <h2>Style</h2>
            <ul>
              <li>Plain words. Say what a tool does and what it did for us, without hype.</li>
              <li>Write for the reader: what they can do after reading, not what we wanted to say.</li>
              <li>American spelling, and one idea per sentence where we can.</li>
            </ul>
          </section>
        </article>
      </div>

      <WeeklyEmailBand />
    </div>
  );
}
