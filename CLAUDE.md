# esy.com — Repo Context

Marketing and content site for the Esy brand. For Esy ecosystem context, see `../../CLAUDE.md`. For company-level context, see `../../../CLAUDE.md`.

## What This Repo Is

esy.com, Esy's public face: an AI marketing publication by Zev for Morgan, the owner of a small agency that already has clients (2026-10-14). The newsletter (The Marketing Engineer), AI Marketing News, articles, courses, skills and tools, and the YouTube hub. `README.md` maps every page, where its code lives and how content gets here.

## What This Repo Is NOT

- Not the app (that's os.esy.com, `client/os.esy.com/`; app.esy.com is legacy, superseded 2026-10-02)
- Not the API (that's `server/api.esy.com/`)
- Not a door for the verticals' buyers (a local service business goes to seopage.com)
- Not a generation tool: it teaches, and points to the courses and os.esy.com

## Deployment Workflow

Before pushing or deploying, read `../os.esy.com/docs/DEPLOYMENT_WORKFLOW.md`. This repo follows the shared Esy workflow: run `npm run lint` and `npm run build`, use PRs for public-route/SEO/publishing/API-contract/auth/deployment-risk changes, and keep `main` deployable.

### Direct push vs PR (this repo's quick rule)

Per the shared workflow's "When Direct Push To Main Is Allowed" section, this is a marketing/copy-heavy repo so the carve-out gets used often. The heuristic:

- **Direct push to `main`:** 1–2 line copy edits, typos, sentence rewrites, metadata/comment changes, tiny style tweaks with no behavior change. Run a build first if the change isn't trivially safe.
- **PR required:** anything that touches structure, routes, components, navigation behavior, data shape, image domains, or the artifact/workflow taxonomy. Also anything covered by the shared workflow's "Direct push is not acceptable for" list.

When in doubt, open the PR — agent overhead is cheap, broken `main` isn't.

## AI News (esy.com/news)

Before writing, checking or publishing anything in `src/data/news/` or `/news`, read `docs/news/README.md`. Every fact is checked against the company's own announcement (otherwise the post stays a draft), posts carry their real publish date, there are no labels, and company logos appear only as the companies' own files where their terms allow news use. Never generate a logo.

## Key Documentation (In This Repo)

- `../../../org-docs/brand/ESY_DEFINITION.md` (org.esy) — Canonical brand definition and product philosophy (moved out of this repo; `docs/brand/ESY_DEFINITION.md` is now a pointer stub)
- `docs/brand/VISUAL_LANGUAGE.md` — Esy's imagery (vinyl) and Mason's rules: OctoMason™ naming, his eight arms, which reference to show vs generate from, and checking every picture before it's used. Read it before making or editing any Mason image.
- `docs/org/` — How Esy fits together (copy of org.esy `architecture/ARCHITECTURE.md`) and who we write for: Morgan is the primary ICP, YouTube is the base (2026-10-14)
- `docs/news/README.md` — The newsroom: the daily news post, the two articles, and the weekly issue's nine parts (Esy's `esy-issue` template v2)
- `docs/prototypes/README.md` — Every prototype at `/prototypes/`, its takes, and which one shipped
- `docs/strategy/sessions/2026-04-12-engineer-first-rebrand-and-homepage-redesign.md` — The April engineer-first positioning, narrowed to Morgan by `docs/org/DECISIONS-2026-10-14.md`
- `docs/strategy/GROWTH_STRATEGY.md` — Growth and distribution strategy
