# Writing AI News

How a post goes from "something happened" to live on esy.com/news. It's written for Zev, and for any agent asked to write, check or publish a news post. The public version of these rules is the editorial standards page (`/editorial-standards/`, words in `src/components/Editorial/content.tsx`). This file is the working playbook behind it.

## What AI News is for

Two jobs:

1. **Jump on trends for search.** When something breaks in AI and marketing (ads, SEO, social, creative, the tools marketers use), have a clear, accurate post up while people are searching for it. Each **story** has its own page (`/news/<story>/`), and that page is what ranks for the story's name.
2. **Keep the domain fresh.** A steady stream of dated posts, each linked from `/news` and listed in the sitemap.

It's news, not articles. Apply the six-month test: if the piece is still worth reading unchanged in six months, it's an article for `/engineer/`, not a news post.

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
| `publishedAt` | The day the post goes up on esy.com. Never earlier. |

### 5. The cover is automatic

The cover and the share image are the fact card, drawn from `card`, the story and the company. There's nothing to generate.

- **Company logos:** only the company's own logo file, unchanged, and only where its brand terms clearly allow news use.
  - Allowed so far: **Anthropic** and **ElevenLabs** (their press kits).
  - Name in type until cleared: **Meta** (its brand pages disagree on whether editorial use needs review), **Google** (logo use needs approval), **HubSpot** (logos need written permission), **OpenAI** (its brand page couldn't be checked).
- **Adding a logo:** download it from the company's press or brand page, save both the dark and light versions in `public/images/news/logos/`, and fill in `logo` on the company with `from` and `terms`.
- **Never have an AI model draw a logo,** and never use a company's press photos or product screenshots.

### 6. Publish

1. Set `status: 'published'` and `publishedAt` to today.
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
