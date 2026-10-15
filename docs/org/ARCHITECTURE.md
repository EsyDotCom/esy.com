<!-- Copy of org.esy architecture/ARCHITECTURE.md (2026-10-14). org.esy is the canon: if the two disagree, org.esy wins. Change both in the same week. -->

# Esy's architecture: what each part does

**Status:** canon, 2026-10-14 (Zev). Supersedes the surface table in `apps/CLAUDE.md` and `esy/CLAUDE.md` where they disagree (those still list app.esy.com as current; it's discontinued).
**Scope:** every Esy surface and vertical, who signs in where, where each record lives, and who each audience is.
**Read with:** api.esy.com `docs/CLIENTS.md` (organizations, clients, brands), api.esy.com `docs/api-standards/` (API-001 to API-007), Compose `docs/plans/2026-10-12-newsroom-templates-publishing.md` §12 (who we write for).

Esy is a marketing agency and marketing software in one. ESY LLC runs its own brands and its agency clients on Esy, and every other organization gets the same structure.

## 1. The picture

```
                       api.esy.com: the record and the engine
   ┌─────────────────────────────────────────────────────────────────────┐
   │ Organization: ESY LLC  (an organization = Esy's customer)           │
   │  ├─ Your brands: esy.com, SEOPage, clip.art, micro.film …           │
   │  │     their workflows, templates, publications, one-off orders     │
   │  └─ Clients: Acme HVAC (sold through SEOPage, plan: …)              │
   │        ├─ contacts: the owner, who signs in                         │
   │        └─ project: acmehvac.com                                     │
   │              pages, runs, costs, connections (Search Console, GA4,  │
   │              Bing), approvals, messages                             │
   │  Outreach: prospects, campaigns · Library: ICPs, writing templates, │
   │  standards · Documents and publications · Costs and budgets         │
   └─────────────────────────────────────────────────────────────────────┘
        ▲                ▲                 ▲                    ▲
   vertical doors     os.esy.com       compose.esy.com       esy.com
   seopage.com        ESY LLC's room   where we write        the audience:
   clip.art …         (Zev, staff;     (news, articles,      YouTube hub,
   (each buyer,       later every      issues, SEOPage       newsletter,
    scoped to         organization)    articles)             courses, news
    their own)
```

## 2. The record: api.esy.com

Every record lives here and every piece of work runs here. The surfaces display it and ask for actions; none of them holds the only copy of anything (API-001: Esy owns, clients display).

| Record | What it is | Example |
|---|---|---|
| **Organization** | A business using Esy; Esy's customer | ESY LLC; later Morgan's agency |
| **Your brands** | Projects the organization owns, with no client | esy.com, SEOPage, clip.art, micro.film |
| **Client** | A business that pays the organization for ongoing work | Acme HVAC, on a SEOPage monthly plan |
| **Contact** | A person at a client; signs in only when invited | Acme's owner |
| **Project** | Where the work lives: a brand, or a client's site | acmehvac.com |
| **Connection** | Access a client granted to their data, stored on their project | Acme's Search Console, GA4, Bing |
| **Order** | A one-off purchase from a brand, kept in that brand's data | A single SEOPage page; a clip.art download |
| **Workflow, run, artifact, cost** | How work is done and what it made and cost | A page research run and the page |
| **Outreach** | Prospects, campaigns, sign-offs, sends | Roofers in Texas |
| **Library** | ICPs, writing templates, standards | Morgan (an ICP) |
| **Documents, publications** | What Compose writes and where it's published | A news post filed to AI Marketing News |

**The word rule** (from `CLIENTS.md`): a **customer** pays Esy; a **client** pays an organization. **The relationship decides the record:** a one-off purchase is an order in the brand's data; ongoing paid work on someone's own business makes them a Client (any monthly plan). A plan is a field on the client, not a different kind of thing.

## 3. The surfaces

| Surface | Who signs in | Its job | Never does |
|---|---|---|---|
| **api.esy.com** | Nobody directly (people through the apps, apps with keys) | Holds every record, runs every workflow, stores every connection, counts every cost | Show a screen |
| **os.esy.com** | Zev and staff (account managers); later every organization's members | The room where the business is run. `/agency`: Clients, Work, Outreach, Search and Rankings, Inbox, Data, in plain words. Every brand's and client's runs and costs | Face a client or a reader |
| **workbench.esy.com** (later) | Zev and engineers | Where workflows are built and debugged: the factory sections of os.esy.com move here | Run the business |
| **compose.esy.com** | Zev, writers | Writing: news posts, articles, newsletter issues, SEOPage articles, with templates, ICPs and outlines | Publish anywhere but through Esy |
| **esy.com** | Nobody (readers, viewers, subscribers) | The public face for the audience: the YouTube hub, The Marketing Engineer newsletter, courses (esy.com/courses), AI Marketing News, articles, the agency's own pages | Talk to a vertical's buyers |
| **docs.esy.com** | Nobody | Public product documentation | Marketing |
| **seopage.com** | A SEOPage client's owner, limited to their own client and site | The client's door: buy a page or a plan, give the brief, connect Search Console, GA4 and Bing, approve pages, read the monthly report, message support | Show anything about other clients, the agency's costs or Outreach |
| **clip.art** | Its buyers | A consumer brand: browse, download, generate; credits and subscriptions | Agency work |
| **micro.film, lazy.dev, SuperUpscale …** | Their users | Further verticals: each owns its experience; Esy owns the work | Fork Esy's records |
| ~~app.esy.com~~ | | **Discontinued** (2026-10-02); os.esy.com replaces it | |
| ~~factory.esy.com~~ | | **Legacy, to be deleted**; nothing moves from it | |

### A vertical's door, never a fork

A vertical (seopage.com, clip.art) is where its buyers sign in and see their own things. It is the "portal" `CLIENTS.md` planned for contacts, on the vertical's own site. The records, connections and work stay in Esy, so os.esy.com reads the same numbers the buyer sees. A vertical never keeps its own copy of a client, a connection or a page.

### One thread per client

A message from a client on seopage.com lands in that client's Inbox in os.esy.com. The plan decides who answers: on SEOPage, AI support on $999 a month, the account manager on $1,499. Nothing forks by plan.

### What os.esy.com shows

- **Clients:** managed clients one row each (the $1,499 ones with their account manager); self-serve clients as one roll-up (count, monthly revenue, pages made, any that need attention).
- **Your brands:** each brand's runs, costs and orders.
- **Outreach, Search, Work, Inbox:** across every client.

## 4. Who is reached where

| Audience | Who they are | Reached by | Their door | They pay for |
|---|---|---|---|---|
| **Morgan** (primary ICP) | Owner of a small agency (2–15 people) that already has clients | YouTube (the base), then the newsletter | esy.com: newsletter, courses; later the community and os.esy.com | Courses, setups to copy, os.esy.com, a call |
| **The in-house practitioner** (later) | A marketer learning to build AI systems for their job | The same | The same | Courses |
| **The portfolio builder** (later) | Someone running their own small digital products | The same | The same | Courses, cheap tools |
| **The local service business** | An HVAC company, a roofer, a plumber that needs to be found | Ads and outreach, never YouTube | seopage.com | A page, or $149, $999 or $1,499 a month |
| **clip.art buyers** | People who need clip art | Search | clip.art | Credits, subscriptions |

- esy.com never speaks to the local service business; seopage.com never speaks to Morgan.
- Each audience has its own ICP record in Esy's Library; a publication lists the ones it writes for (one primary, up to two secondaries, each live or later).

## 5. The proof loop

```
ESY LLC's clients and brands ──▶ os.esy.com ──▶ the newsletter's scoreboard,
(SEOPage clients, clip.art)       (real numbers,   "what it did for us",
                                   real costs)     YouTube deep dives ──▶ Morgan
```

The systems we teach are the systems we run. SEOPage's clients (found by our outreach, served by SEOPage) produce the numbers; os.esy.com holds them; the newsletter and YouTube show them. Clients are named only with permission (a case-study clause); prospects never are.

## 6. Every organization gets the same structure

Morgan's agency is an organization. Their clients are Clients, they work in os.esy.com, and their clients need a door like seopage.com, possibly SEOPage under Morgan's brand. Nothing in this architecture is special to ESY LLC.

## 7. Not built yet (2026-10-14)

- The client's owner signing in at seopage.com, limited to their own client (the portal, on SEOPage).
- Connections to Search Console, GA4 and Bing stored on a client's project.
- Messages from seopage.com into the client's Inbox in os.esy.com.
- The `CLIENTS.md` amendment: monthly SEOPage buyers are Clients sold through SEOPage, with a plan, and seopage.com is their portal (an api.esy.com PR, with Zev's go-ahead).
- seopage.com's self-serve `/intake` path still calls Anthropic directly in its code; anything that does moves onto an Esy workflow.
- A publication's ICPs (Compose plan §12.6).
