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
| Every day | One news post | Zev writes it. Compose can draft on a busy day; `writtenBy` on the post says which. | The issue's "This week in AI marketing" |
| About Tue and Thu | One article each: a piece of this week's system | Zev | The steps of the issue's tutorial |
| End of the week | The issue: a tutorial that builds one AI marketing system from the week's articles, then the week's news | Zev | `/newsletter/<slug>/`, the homepage, the email |

### Every day: the news post (about 30 minutes)

1. Pick the day's story (step 1 below). If nothing happened that's worth a post, write a short one or none. Never pad a story to fill the slot.
2. Write it (steps 2 to 4 below). Set `writtenBy: 'zev'` when you wrote it, `'compose'` when Compose drafted it. The post says which.
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

Posts live in the code (`src/data/news/index.ts`), so each one needs a PR and a deploy before it's live. One PR per post, merged the same day. The planned fix is serving posts from Esy's API, so a post is live the moment it's approved.

## Where things live

| What | Where |
|---|---|
| Posts and stories (the only file you edit to publish) | `src/data/news/index.ts` |
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
| `why` | Why it matters to someone who builds marketing systems. Without this, it's a rewrite of the announcement, and we don't publish those. |
| `body` | Two to four short paragraphs: the facts in full. |
| `facts` | "At a glance": four to seven `[label, value]` pairs. Labels like What, For, Where, Price, Connects, Control, Announced, Released, Get it pick their icon automatically. |
| `check` | One to three "what to check in your own setup" lines. |
| `faq` | Two to four questions people actually search ("Is Muse for Small Business free?"), each answered in a sentence or two. These are what Google and AI answers quote, and they're published as FAQ data. |
| `sources` | Every source, the company's own first. Each gets `publisher`, `title`, `url`, `date` and `supports` (what it backs up). |
| `chapter` | Two or three words for the story line: "Small businesses", "Enterprise Platform". |
| `card` | The fact card: a short `title` ("Muse for Small Business") and exactly three short `facts` ("15 tools connected", "US & Canada", "Free for most"). Keep each fact under about 25 characters so they fit on one line. |
| `eventDate` | When the news happened: `YYYY-MM-DD`, or `YYYY-MM` when only the month is known. |
| `publishedAt` | When the post goes up on esy.com, with the time and offset. Never earlier. |
| `writtenBy` | `'zev'` when Zev wrote it, `'compose'` when Compose drafted it. The post says which. |

### 5. The cover is automatic

The cover and the share image are the fact card, drawn from `card`, the story and the company. There's nothing to generate.

- **Company logos:** only the company's own logo file, unchanged, and only where its brand terms clearly allow news use.
  - Allowed so far: **Anthropic** and **ElevenLabs** (their press kits).
  - Name in type until cleared: **Meta** (its brand pages disagree on whether editorial use needs review), **Google** (logo use needs approval), **HubSpot** (logos need written permission), **OpenAI** (its brand page couldn't be checked).
- **Adding a logo:** download it from the company's press or brand page, save both the dark and light versions in `public/images/news/logos/`, and fill in `logo` on the company with `from` and `terms`.
- **Never have an AI model draw a logo,** and never use a company's press photos or product screenshots.

### 6. Publish

1. Set `status: 'published'` and `publishedAt` to now, with the time and offset (`2026-10-12T09:30:00-04:00`): Google News orders fresh stories by it. A later non-correction change sets `updatedAt` the same way.
2. Open a PR (routes and content are PR-only in this repo). Run `npm run lint` and `npm run build`.
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
- **How it was made:** every post's Sources note says it was researched and drafted in Compose and approved by Zev, and the editorial standards' "How we use AI" says the same. Google asks publishers to say how content is made.
- **Cadence:** news every day (the editorial standards say so, and so does the homepage's "Daily"). Google News weighs recency and a steady rhythm; see "The weekly rhythm" above.
