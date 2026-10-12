# Writing AI News

How a post goes from "something happened" to live on esy.com/news. It's written for Zev, and for any agent asked to write, check or publish a news post. The public version of these rules is the editorial standards page (`/editorial-standards/`, words in `src/components/Editorial/content.tsx`). This file is the working playbook behind it.

## What AI News is for

Two jobs:

1. **Jump on trends for search.** When something breaks in AI and marketing (ads, SEO, social, creative, the tools marketers use), have a clear, accurate post up while people are searching for it. Each **story** has its own page (`/news/<story>/`), and that page is what ranks for the story's name.
2. **Keep the domain fresh.** A steady stream of dated posts, each linked from `/news` and listed in the sitemap.

It's news, not articles. Apply the six-month test: if the piece is still worth reading unchanged in six months, it's an article for `/articles/`, not a news post.

## The weekly rhythm (2026-10-12)

News every day, articles about twice a week, and one newsletter a week that teaches a system. Each feeds the next: the news finds the week's system, the articles build it, the issue teaches it.

| When | What | Who | Becomes |
|---|---|---|---|
| Every day | One news post | Zev writes it. AI agents can draft on a busy day; `writtenBy` on the post says which. | The issue's "This week in AI marketing" |
| About Tue and Thu | One article each: a piece of this week's system | Zev | The steps of the issue's tutorial |
| End of the week | The issue: a tutorial that builds one AI marketing system from the week's articles, then the week's news | Zev | `/newsletter/<slug>/`, the homepage, the email |

### Every day: the news post (about 30 minutes)

1. Pick the day's story (step 1 below). If nothing happened that's worth a post, write a short one or none. Never pad a story to fill the slot.
2. Write it (steps 2 to 4 below). Set `writtenBy: 'zev'` when you wrote it, `'agents'` when AI agents drafted it. The post says which.
3. Publish it (step 6 below), with `publishedAt` set to the full time.
4. Keep a running note of stories that could carry this week's system.

### Monday: pick the week's system

- One system a reader can build in an afternoon: a workflow, a skill, a setup. Prefer one that builds on something that just launched, so the news earns the attention and the tutorial keeps it.
- Split it into two parts, each of which stands on its own as an article.

### About Tuesday and Thursday: the two articles

- Each is one part of the system: the setup, a skill or prompt, or a teardown of a real run.
- Each passes the six-month test and stands alone in search ("How to set up X"). Show the real work: the steps, the result, what broke.
- They go up under `/articles/` like any article.

### End of the week: the issue

1. **Title it as the system:** "Build X that does Y", or the outcome it gets.
2. **Body:** the system step by step, each step linking the article that goes deeper; one thing to copy (a skill or a prompt); then "This week in AI marketing": three to five of the week's news posts, a line each, linked.
3. **Cover:** `node scripts/newsletter-mason-cover.mjs <n> "<what Mason is doing that shows the title>"`. It makes two takes of vinyl Mason acting out the title; pick one, rename it `<n>.webp`, and set the issue's `cover`. Keep the sentence plain: the cover should read as the title, not as a puzzle.
4. **Add it** to `src/components/NewsletterPage/issues.ts`, newest first. It shows on the homepage, on `/newsletter` and on its own page, with the cover as its share image.
5. **Send it** to subscribers.

### Every week: a five-minute check

- Seven news posts, two articles, one issue?
- Search Console: was the news sitemap read, and any errors?
- Which news posts brought newsletter signups? Write more like those.

### Known friction

Posts in the code (`src/data/news/index.ts`) need a PR and a deploy before they're live: one PR per post, merged the same day. Posts published from Compose skip that and are live about a second after they're approved (see "Publishing from Compose" below).

## Publishing from Compose

Posts can now be published from Compose through Esy's API (api.esy.com), as articles are. esy.com reads them from `GET /v1/publications/public/news/posts` and merges them with the registry (`getNews()` in `src/lib/published-news.ts`), so they show on `/news`, their own pages, their story's page, the homepage column, the RSS feed and both sitemaps.

- **Live in about a second.** Publishing or unpublishing sends a signed webhook to `/api/revalidate` with `publication: "news"`, which refreshes every page that lists posts. The hourly refresh is only a backstop.
- **The registry wins a clash while posts move over.** If a Compose post has the same slug as a published post in `src/data/news/index.ts`, the registry's post shows. A Compose post whose slug is a story's slug, or whose story's slug is a post's slug, is skipped with a warning in the logs.
- **New stories come with the post.** A Compose post can name a story the registry doesn't have; esy.com builds it from the post (name, line, company), with the company's name in type and no logo. Logos are still added by hand in `COMPANY`, under the rules in step 5.
- **`writtenBy` comes from Esy's `origin`.** A post written in a Compose session is `written`, shown as written by Zev; one drafted through an API key is `drafted`, shown as drafted by AI agents. The byline stays "By Zev Uhuru" for now.
- **The webhook secret** is `ESY_REVALIDATE_SECRET_NEWS` in esy.com's hosting env: the same value as the `news` publication's webhook secret in Esy. The shared `ESY_REVALIDATE_SECRET` still works as a fallback.
- **The same rules apply.** Every fact is checked against the company's own page, posts carry their real publish time, and Zev approves every post before it goes up, whichever way it's published.

## Where things live

| What | Where |
|---|---|
| Posts and stories in the code | `src/data/news/index.ts` |
| Posts published from Compose, merged with the registry | `src/lib/published-news.ts`; refreshed by `src/app/api/revalidate/route.ts` |
| The pages | `src/components/News/News.tsx`; routes in `src/app/news/` |
| The cover and share image (the fact card) | `src/components/News/FactCard.tsx`, `src/app/news/[slug]/opengraph-image.tsx` |
| Company logos, with where each came from | `public/images/news/logos/`, listed in `COMPANY` in the data file |
| The prototypes it shipped from | `/prototypes/news/` (P) and `/prototypes/news-post/` (I) |

## Writing a post, step by step

### 1. Pick the story

Every post belongs to a story, named after the thing people search for: the release or the product ("Meta Muse", "Google AI Max"), never a theme ("AI agents").

- **The story exists already:** reuse its `slug`.
- **It's new:** add it to `NEWS_STORIES` with a one-line `line` and its `company`.
- **Slugs:** post and story slugs share `/news/<slug>/`, so they must differ. The data file fails the build if they don't.
- **Rows on /news:** a story gets a row there once it has two published posts. Until then, its post still appears under "Every post".

### 2. Check every fact against the company's own page

This is the step that decides whether the post ships.

- **Read the primary source:** the company's own announcement, release notes, docs or pricing page. Check every number, date, price, country and name against it.
- **If the company's page can't be read or doesn't say it,** don't state it as fact. Either leave it out, or keep the post as a `draft` with a `held` note saying what's missing.
- **Trade press (MediaPost, Search Engine Journal…)** can back up a post only as **reporting**. Say who reported it ("MediaPost reported, citing Search Engine Journal") and mark the source `secondary: true`.
- **A company's claim is written as theirs:** "Meta says nothing publishes without your approval", not "nothing publishes without your approval".

When the September posts were checked, this is what changed:
- **Corrected:** ElevenLabs' latency (v4 Turbo is ~150 ms, not ~100 ms) and its free tier (not in their announcement); the Search Console date (Sep 24, not Sep 26); how long the spam update runs (Google's page gives no end date); HubSpot's product name (no "2.0").
- **Held as drafts:** five posts that rested on a blog, or on OpenAI pages that block automated reads.

### 3. Write it in our own words

- **No quotes, and no copying other outlets' sentences.** Short facts are fine, said our way.
- **Plain words,** one idea per sentence, and American spelling.
- **No labels.** No "Breaking", "Explainer" and so on. The dates say when things happened.

### 4. Fill in the fields

| Field | What goes in it |
|---|---|
| `headline` | The outcome, with the product's name. Aim for under 90 characters. |
| `dek` | One or two sentences: what happened. |
| `why` | One sentence of fact: who this changes things for, and how. Without it, a post is a rewrite of the announcement, and we don't publish those. Opinion goes in Zev's take, not here. |
| `body` | Two to four short paragraphs: the facts in full. |
| `facts` | "At a glance": four to seven `[label, value]` pairs. Labels like What, For, Where, Price, Connects, Control, Announced, Released, Get it pick their icon automatically. |
| `check` | One to three "what to check in your own setup" lines. |
| `faq` | Two to four questions people actually search ("Is Muse for Small Business free?"), each answered in a sentence or two. These are what Google and AI answers quote, and they're published as FAQ data. |
| `sources` | Every source, the company's own first. Each gets `publisher`, `title`, `url`, `date` and `supports` (what it backs up). |
| `chapter` | Two or three words for the story line: "Small businesses", "Enterprise Platform". |
| `card` | The fact card: a short `title` ("Muse for Small Business") and exactly three short `facts` ("15 tools connected", "US & Canada", "Free for most"). Keep each fact under about 25 characters so they fit on one line. |
| `eventDate` | When the news happened: `YYYY-MM-DD`, or `YYYY-MM` when only the month is known. |
| `publishedAt` | When the post goes up on esy.com, with the time and offset. Never earlier. |
| `writtenBy` | `'zev'` when Zev wrote it, `'agents'` when AI agents drafted it. The post says which. Never claim a tool drafted a post unless it did. |

### 5. The cover is automatic

The cover and the share image are the fact card, drawn from `card`, the story and the company. There's nothing to generate.

- **Company logos:** only the company's own logo file, unchanged, and only where its brand terms clearly allow news use.
  - Allowed so far: **Anthropic** and **ElevenLabs** (their press kits).
  - Name in type until cleared: **Meta** (its brand pages disagree on whether editorial use needs review), **Google** (logo use needs approval), **HubSpot** (logos need written permission), **OpenAI** (its brand page couldn't be checked).
- **Adding a logo:** download it from the company's press or brand page, save both the dark and light versions in `public/images/news/logos/`, and fill in `logo` on the company with `from` and `terms`.
- **Never have an AI model draw a logo,** and never use a company's press photos or product screenshots.

### 6. Publish

1. Set `status: 'published'` and `publishedAt` to now, with the time and offset (`2026-10-12T09:30:00-04:00`): Google News orders fresh stories by it. A later non-correction change sets `updatedAt` the same way.
2. Open a PR (routes and content are PR-only in this repo). Run `npm run lint` and `npm run build`. (A post published from Compose skips this step; see "Publishing from Compose".)
3. After it deploys, open the post and its story page on esy.com, and check the share image at `/news/<post>/opengraph-image/`.

### 7. Corrections

If something's wrong, fix it and add a line to the post saying what changed and when. Never quietly rewrite. Anything that isn't a correction gets an "Updated" date.

## For agents

- Read this file first. Don't publish from memory or from news summaries.
- If a primary source can't be read (blocked, behind a login), leave the post as a `draft` with a `held` note. Don't fill the gap from trade press.
- Never change `publishedAt` to an earlier date, and never add labels.
- Don't add company logos without checking that company's brand terms, and never generate one.
- Show Zev every new post before it goes live: the byline is his.

## Google News (2026-10-12)

What makes a post eligible for Google News and Top Stories, and where each piece lives:

- **News sitemap:** `/news-sitemap.xml` (`src/app/news-sitemap.xml/route.ts`) lists posts from the last two days, the window Google News reads, and is named in robots.txt. Older posts stay in `/sitemap.xml`.
- **Structured data:** every post carries `NewsArticle` (`postJsonLd` in `src/components/News/News.tsx`): headline, full-time `datePublished`, `dateModified` (from `updatedAt`), author, the publisher with its logo (`/brand/logo/esy-wordmark.png`), sources as `isBasedOn` and `citation`.
- **Large images:** `/news` and every post set `max-image-preview:large`, so Discover and Top Stories can show the fact card big.
- **RSS:** `/news/rss.xml`, linked from `/news` and every post.
- **How it was made:** every post's Sources note says who wrote it (Zev, or AI agents with Zev's approval), and the editorial standards' "How we use AI" says the same. Google asks publishers to say how content is made.
- **Cadence:** news every day (the editorial standards say so, and so does the homepage's "Daily"). Google News weighs recency and a steady rhythm; see "The weekly rhythm" above.

## Zev's take (2026-10-12)

The part of a post that only Zev can write, and the main reason to read the news here rather than on the company's blog. Every post has one: a post can't publish without it.

- **What it is:** what he thinks the news means and what he'd do about it. For example: what he'd test this week, what he'd change in a setup, or who should ignore it. A prediction is fine if it's marked as one.
- **How it differs from "Why it matters":**

  | | Why it matters | Zev's take |
  |---|---|---|
  | What it is | Fact: who this changes things for, and how | Opinion: what he thinks and what he'd do |
  | Can it be checked? | Yes, against the source | No, it's judgment |
  | Length | One sentence | Two sentences to a paragraph or two |
  | Who writes it | Zev, or agents on a drafted post | Only Zev |

  They must not repeat each other. If the take starts with "This means…", that line belongs in "Why it matters".
- **Who writes it:** always Zev, in the first person. AI agents may draft every other part of a post, but never this one. A drafted post arrives with the take empty.
- **Length:** two sentences at least, and a paragraph or two is normal. Past about 250 words it's usually becoming an article: write the article and link it from the post.
- **Where it shows:** right under "Why it matters", near the top. It's signed and set apart, so a reader can tell opinion from fact. The order is headline, summary, why it matters, Zev's take, at a glance, the story, what to check, questions, sources.
- **In the API:** `take` on a news post (api.esy.com #579). The publish check needs at least two sentences.

## Search (2026-10-12)

The public rules are "Search" in the editorial standards. Behind them:

- **Headlines** carry the product's name and the outcome. They're what people type.
- **Stories and topics.** Every post goes to a story (`/news/<story>/`, named after the product people search for). Every article goes to its topics (`/topics/<topic>/`). Those pages are what rank for a subject, so each one gets its own written explainer; a page that's only a list is thin.
- **Coming with the topics build:** news and articles share seven topics (AI Advertising, AI Search & SEO, AI Social Media, AI Creative, AI Marketing Tools, AI Models, AI Agents & Workflows). Each topic page gathers both, and the AI marketing guide (`/ai-marketing/`) sits over all seven. Prototypes: `/prototypes/ai-topics/` and `/prototypes/ai-marketing/`.
- **Internal links:**
  - Every post links its story and topic, and anything deeper.
  - Topic pages link related topics and the guide.
  - The guide links every topic.
- **Questions:** real searches, answered in a sentence or two. They're published as FAQ data, and they're what AI answers quote.
- **Honest dates:**
  - `updatedAt` and a page's "Updated" date move only when its words or its list of posts change.
  - Never touch a date to look fresh. Google treats that as manipulation, and it's untrue.
- **Never:** near-duplicate posts, rewrites of other outlets, or pages generated in bulk from feeds. That is Google's "scaled content abuse", and it can sink the whole site.
- **Measure:** Search Console. Watch which pages show for which searches, which searches have no page yet, and whether the news sitemap is read.

## The upkeep schedule ("watering") (2026-10-12)

What keeps the stories, topics and the guide growing. Some of it happens on its own, some Esy drafts for Zev to approve, and some is Zev's judgment.

| When | What | How |
|---|---|---|
| Every day | A news post, filed to its story (and, with the topics build, its topic) | Zev writes it. The story page, topic page and the guide's "latest" lists update on publish. |
| About twice a week | An article, filed to its topics; good ones become a topic's "start here" pick | Zev |
| Weekly (Monday) | Rewrite the explainer of any topic that moved (3+ new posts since the last update, or an explainer older than 30 days), and update the guide's chapter for it | Esy drafts with every fact checked against a linked post; Zev approves in Compose. Until that workflow exists, Zev rereads the topic pages by hand. |
| Monthly | Gap review: thin topics, rising searches with no page (Search Console), and the next articles to write | Zev, from Compose's Topics screen once it exists |
| Every few months | Split a topic that has outgrown its page (around 40 posts), or merge two that overlap. Old addresses redirect. | Zev |

What's automatic and what isn't:
- **The lists are dynamic:** what's on a topic page, counts, "latest" lists, sitemaps and feeds.
- **The words need watering:** explainers, the guide's chapters, questions, and "start here" picks.
- **No AI-drafted words go live unapproved.**

The system that runs this is in the newsroom plan (compose.esy.com #39, "Keeping topics and the guide growing"):
- Topics and the guide become data in Esy and documents in Compose, not code in this repo.
- The morning budget's beats file each story to its topic.
- A weekly workflow drafts the refreshes.
