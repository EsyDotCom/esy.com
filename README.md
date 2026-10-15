# esy.com

**[esy.com](https://esy.com) is Esy's public face**: a publication about AI marketing, written by Zev ("Marketing engineer"). It's where YouTube viewers come next: they read the articles and the week's news, take the courses, and sign up for **The Marketing Engineer**, the weekly newsletter.

**Who it's for:** Morgan, the owner of a small agency (2–15 people) that already has clients and is rebuilding its delivery on AI systems for search and outreach. Every page teaches something anyone can follow, but the payoff is aimed at Morgan: clients, delivery and margin. (Decided 2026-10-14; see [docs/org/DECISIONS-2026-10-14.md](docs/org/DECISIONS-2026-10-14.md).)

**What it isn't:**
- **The app.** os.esy.com is where the business is run.
- **The API.** api.esy.com holds every record.
- **A door for the verticals' buyers.** A roofer looking for SEO is sent to seopage.com, never here.

---

## Where it fits

```
                 api.esy.com — every record, every workflow run
                                     ▲
     ┌──────────────┬────────────────┼─────────────────┬──────────────┐
  os.esy.com    compose.esy.com   esy.com (this)    seopage.com     clip.art
  where the     where we write    the audience:     a vertical's    a vertical's
  business      news, articles,   YouTube hub,      door (local     door
  is run        newsletter issues newsletter, news, service
                                  courses           businesses)
```

| Surface | Repo | Its job |
|---|---|---|
| [esy.com](https://esy.com) | `esy/client/esy.com` (this repo) | The publication: the newsletter, news, articles, courses |
| [os.esy.com](https://os.esy.com) | `esy/client/os.esy.com` | The room where the business is run (`/agency`: Clients, Work, Outreach, Search, Inbox) |
| compose.esy.com | `esy/client/compose.esy.com` | Writing: news posts, articles and issues, from writing templates and ICPs |
| api.esy.com | `esy/server/api.esy.com` | The record and the engine. esy.com reads its published articles and news from here |
| [docs.esy.com](https://docs.esy.com) | `esy/client/docs` | Product docs (`esy.com/docs` only redirects there) |

The full map, with who signs in where and where each record lives, is [docs/org/ARCHITECTURE.md](docs/org/ARCHITECTURE.md). It's a copy; org.esy `architecture/ARCHITECTURE.md` is the original.

---

## The site, page by page

### The publication

| Page | What it is | Code |
|---|---|---|
| [`/`](https://esy.com/) | The homepage: Zev at his desk (hero), the newsletter, the latest issue, the news column, the courses | `src/app/page.js` → `components/NewsletterHome/` |
| [`/newsletter`](https://esy.com/newsletter/) | The Marketing Engineer: signup, the latest issue's cover, every issue | `src/app/newsletter/` → `components/NewsletterPage/Live.tsx` |
| [`/newsletter/<slug>`](https://esy.com/newsletter/find-what-to-build/) | One issue: **L5 · Receipts first** (since 2026-10-15) | `IssueRound2.tsx` (layout), `issues.ts` (issues) |
| [`/news`](https://esy.com/news/) | **AI Marketing News**: a news post every day, grouped by story, with RSS and a Google News sitemap | `src/app/news/` → `components/News/`, posts in `src/data/news/` |
| [`/news/<slug>`](https://esy.com/news/) | One news post | `components/NewsPost/` |
| [`/articles/<slug>`](https://esy.com/topics/) | One article (image or video). `/articles` itself redirects to `/topics` | `src/app/articles/[slug]/`, `lib/published-articles.ts` |
| [`/topics`](https://esy.com/topics/) | Every article, browsed by topic | `components/TopicsProto/` (T3 · Explorer) |
| [`/courses`](https://esy.com/courses/) | The courses, starting with *How to Use Claude Code* | `components/CoursesIndex/`, data in `lib/learn/mockData` |
| [`/courses/<course>/<lesson>`](https://esy.com/courses/how-to-use-claude-code/) | A course page and its lessons (Mux video, transcript, Zev as instructor) | `components/CourseDetail/`, `components/LessonPage/` |
| [`/skills`](https://esy.com/skills/) | AI skills we publish, with a chat simulator that shows what each one does | `components/SkillsHub/` |
| [`/tools`](https://esy.com/tools/) | AI Marketing Tools: the tools we use, sorted by job | `components/ToolsProto/` (K8 · Orbit) |

### Pages that bring people in

| Page | What it is |
|---|---|
| [`/invite`](https://esy.com/invite/) | Where YouTube sends people to join the newsletter |
| [`/seo`](https://esy.com/seo/) | The homepage with an SEO hero ("SEO isn't dead. It runs on AI now.") for SEO traffic |
| [`/waitlist`](https://esy.com/waitlist/) | The waitlist for Esy |

### About Esy and Zev

| Page | What it is |
|---|---|
| [`/about`](https://esy.com/about/) | Zev's career in five chapters, and what he makes (facts in `components/About/content.tsx`) |
| [`/brand`](https://esy.com/brand/) | The brand kit: logo, colours, vinyl material (canon: [docs/brand/VISUAL_LANGUAGE.md](docs/brand/VISUAL_LANGUAGE.md)) |
| [`/mason`](https://esy.com/mason/) | OctoMason™, "Mason" in copy: the mascot, who appears on every cover |
| [`/editorial-standards`](https://esy.com/editorial-standards/) | How we check facts and date posts |
| [`/films`](https://esy.com/films/) | Esy Films |

### Older sections (still served, not the focus)

| Page | Status |
|---|---|
| [`/ai-agents`](https://esy.com/ai-agents/) | A reference guide to agents and workflows, from before the AI marketing focus |
| `/workflows`, `/glossary` | From the essay days. The essay workflows and writing glossary terms redirect elsewhere, and the glossary relaunch is on hold |
| `/essays`, `/visual-essays`, `/clip-art` … | Retired: they answer **410 Gone** (list in `src/lib/retired-routes.ts`) |
| `/engineer/*`, `/school`, `/learn/*`, `/research/*` | Permanent redirects to the current pages (`next.config.mjs`) |

### Legal and plumbing

- [`/privacy`](https://esy.com/privacy/), [`/terms`](https://esy.com/terms/), [`/cookies`](https://esy.com/cookies/).
- `/api/newsletter/*`: subscribe, confirm and name (Beehiiv).
- `/api/revalidate`: Esy's webhook. It refreshes a page about a second after something is published from Compose.
- `/api/waitlist/*`: waitlist signups.
- `/sitemap.xml`, `/news-sitemap.xml`, `/robots.txt`.

---

## How content gets here

| Content | Written in | Lands in | Read this first |
|---|---|---|---|
| **News posts** (daily) | Compose, or `src/data/news/index.ts` | `/news`, the homepage column, RSS, both sitemaps | [docs/news/README.md](docs/news/README.md): facts are checked against the company's own announcement, real publish dates, logos only as the company's own files |
| **Articles** (about Tue and Thu) | Compose → api.esy.com | `/articles/<slug>`, `/topics` | `lib/published-articles.ts`: the registry in git plus Compose's articles, refreshed by the webhook |
| **Newsletter issues** (weekly) | Compose, from Esy's **"Newsletter issue"** template (`esy-issue` v2) | `/newsletter/<slug>`, the homepage, the email | [docs/news/README.md](docs/news/README.md) → "End of the week: the issue" |
| **Covers** | `scripts/newsletter-mason-cover.mjs` | Every issue and article | Vinyl Mason doing the work in the title; esy brand top centre |

**An issue has up to nine parts**, matching the `esy-issue` v2 template:
1. The lead
2. The system: steps saying who runs each one
3. What it did for us
4. Sell it to your clients
5. **The weekly skill**
6. This week in AI marketing
7. Reads
8. The scoreboard
9. Next

The page shows only the parts an issue has. The sample issues on the live site are labelled as samples until real ones replace them.

---

## Prototypes

Every new page or direction starts as **three working takes** at [`/prototypes/<slug>/<variant>`](https://esy.com/prototypes/). They are built on the real components, use labelled sample data, and have a picker at the bottom. A take that's picked ships to the real URL as its own page, and the takes stay as the record.

- **Registry:** `src/components/prototypes/registry.ts` (slug, rounds, variants, which one went live).
- **The story of each one** (what we tried, what shipped): [docs/prototypes/README.md](docs/prototypes/README.md).
- Prototypes never send, charge or subscribe. Their signups are fake, and their links carry a `proto-` source tag.

---

## Working in this repo

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # the gate before any PR
```

- **Local env:** run with `BEEHIIV_API_KEY= BEEHIIV_PUBLICATION_ID=` blank, so local signups never reach the real list.
- **`prebuild` syncs the workflow catalog from api.esy.com** and rewrites `src/data/workflow-catalog.json` and `src/data/workflow-contracts/`. Don't commit those changes with unrelated work.
- **Direct push or PR:** a one-line copy fix can go straight to `main`. Anything touching routes, components, navigation, data shapes or SEO goes through a PR, with screenshots for UI. The shared workflow is in `../os.esy.com/docs/DEPLOYMENT_WORKFLOW.md`.
- **Deploy:** Vercel builds every push. `main` is production.
- **Rules for agents** working here: [CLAUDE.md](CLAUDE.md).

## Docs worth knowing

| Doc | What's in it |
|---|---|
| [docs/org/](docs/org/) | How Esy fits together, and the audience decisions |
| [docs/news/README.md](docs/news/README.md) | The newsroom: the daily post, the two articles, the weekly issue |
| [docs/prototypes/README.md](docs/prototypes/README.md) | Every prototype, its takes, and what shipped |
| [docs/brand/](docs/brand/) | Visual language (vinyl), YouTube thumbnails, the Esy definition |
| [docs/seo/](docs/seo/) | Titles, descriptions, URL naming |
| [docs/strategy/](docs/strategy/) | Growth strategy and strategy sessions |
| [docs/README.md](docs/README.md) | The index of everything else in `docs/` |
