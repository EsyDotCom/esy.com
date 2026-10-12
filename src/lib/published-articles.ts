import {
  agenticVideos,
  type AgenticVideo,
} from "@/data/agentic-videos";

// Published articles = static registry (checked into git) + live entries
// published from Compose via api.esy.com. The API serves the exact registry
// shape, so the two sources interleave with no adaptation.
//
// Cache model is event-driven (Substack-style): the publish/unpublish webhook
// purges the `published-articles` tags via api.esy.com, so a change is reflected
// within ~1s. The 1-hour revalidate is only a backstop if a webhook is ever
// missed — not the primary freshness mechanism. Critically, a transient API
// error is NEVER cached as an article-less page (see fetchPublished vs the
// build-only fallback in fetchPublishedSafe).

const API_URL = process.env.ESY_API_URL ?? "https://api.esy.com";

// Backstop only; on-demand tag revalidation is the real trigger.
const REVALIDATE_SECONDS = 3600;

// A build must not hang on a wedged API, and one blip shouldn't fail a deploy.
const FETCH_TIMEOUT_MS = 8000;
const FETCH_ATTEMPTS = 2;
const RETRY_BACKOFF_MS = 400;

type ApiArticle = AgenticVideo; // the public API response mirrors this shape

// Carries the HTTP status so the retry layer can tell a transient 5xx from a
// 404 that will never succeed no matter how many times we ask.
class PublishedFetchError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "PublishedFetchError";
  }
}

// Static builds and local dev can fall back to the git registry when the API is
// down. Production ISR must still throw so Next keeps the last-good cache
// instead of baking in an empty list.
//
// ESY_BUILD_PHASE is set explicitly by the build script because NEXT_PHASE is
// NOT reliable here: Next sets it while loading config, but page rendering
// happens in worker processes that don't consistently inherit it. Relying on it
// alone meant a cold build could skip this fallback and abort the deploy on a
// transient API error — intermittent, and hidden whenever a warm .next cache
// meant the pages weren't re-rendered at all.
function mayFallbackToRegistryOnly(): boolean {
  return (
    process.env.ESY_BUILD_PHASE === "1" ||
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NODE_ENV === "development"
  );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Bound the wait without touching fetch's options: passing an AbortSignal to a
// Next-cached fetch can opt the request out of the data cache, which would break
// the webhook tag purging this module depends on.
//
// The losing side of the race MUST keep a handler attached — an unhandled late
// rejection is precisely the failure mode this hardening exists to remove.
function withTimeout<T>(work: Promise<T>, ms: number, label: string): Promise<T> {
  work.catch(() => {});
  let timer: ReturnType<typeof setTimeout>;
  const expiry = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new PublishedFetchError(`${label}: timed out after ${ms}ms`)), ms);
  });
  return Promise.race([work, expiry]).finally(() => clearTimeout(timer));
}

// Retry only what a retry can fix: network failures, timeouts, and 5xx. A 4xx
// means the publication is missing or private, and asking again won't change it.
function isRetryable(err: unknown): boolean {
  if (!(err instanceof PublishedFetchError)) return true; // network/transport
  return err.status === undefined || err.status >= 500;
}

// Headless reads: each esy.com section is a Publication. We read its published
// documents from the publication-scoped public endpoint (no `kind` axis — the
// Publication is the destination). The cache tag is keyed by publication slug so
// the publish/unpublish webhook can purge exactly this section.
async function fetchPublished(publicationSlug: string): Promise<ApiArticle[]> {
  const res = await fetch(`${API_URL}/v1/publications/public/${publicationSlug}/articles`, {
    next: {
      revalidate: REVALIDATE_SECONDS,
      tags: ["published-articles", `published-articles:${publicationSlug}`],
    },
  });
  // Throw — do NOT return [] — on a bad response. Returning an empty list here
  // would let Next cache an article-less render on a transient API blip (e.g. an
  // api.esy.com redeploy), silently dropping every published article until the
  // cache expired. By throwing, an in-flight ISR regeneration is discarded and
  // Next keeps serving the last-good render; only a cold cache + dead API errors.
  // A 404 here means the publication is missing/not public: thrown like any
  // error, and fetchPublishedSafe then renders without that one publication
  // rather than failing the whole page.
  if (!res.ok) {
    throw new PublishedFetchError(
      `published-articles ${publicationSlug}: HTTP ${res.status}`,
      res.status,
    );
  }
  const body = await res.json();
  return (body.items ?? []) as ApiArticle[];
}

// Build-time and local dev graceful degradation: api.esy.com can 502/500 or be
// unreachable, and `next dev` shouldn't require a local API process. Fall back
// to the git registry. At production ISR time we deliberately let the error
// propagate so Next serves the last-good cache instead of caching an empty list.
async function fetchPublishedSafe(publicationSlug: string): Promise<ApiArticle[]> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt++) {
    try {
      return await withTimeout(fetchPublished(publicationSlug), FETCH_TIMEOUT_MS, publicationSlug);
    } catch (err) {
      lastError = err;
      if (attempt < FETCH_ATTEMPTS && isRetryable(err)) {
        await sleep(RETRY_BACKOFF_MS * attempt);
        continue;
      }
      break;
    }
  }

  // A 4xx is a definite answer, not a blip: the publication is missing or
  // private, and no retry or later render will change that. Rethrowing it would
  // fail every regeneration of every page that reads the hub (the homepage,
  // /news, /about…) and freeze them at the last deploy, which is what happened
  // when the retired `agentic` publication was removed from the API. So that one publication
  // contributes nothing, loudly, and the other sections still render.
  if (lastError instanceof PublishedFetchError && lastError.status !== undefined && lastError.status >= 400 && lastError.status < 500) {
    console.error(
      `[published-articles] ${publicationSlug}: HTTP ${lastError.status}; the publication is missing or not public, so pages render without it.`,
    );
    return [];
  }

  if (mayFallbackToRegistryOnly()) {
    // Warn in builds too, not just dev: without this a degraded deploy ships a
    // registry-only page silently, and nobody finds out until an article is
    // missing from production.
    console.warn(
      `[published-articles] ${publicationSlug}: API unavailable after ${FETCH_ATTEMPTS} attempts — using static registry only.`,
      lastError,
    );
    return [];
  }
  throw lastError;
}

// Static registry entries win slug collisions: they're the curated, reviewed
// source of record; the API adds net-new articles.
function mergeBySlug<T extends { slug: string; publishedAt: string }>(
  registry: T[],
  api: T[],
): T[] {
  // Registry wins; the seen set also dedupes API-vs-API collisions, which can
  // happen now that two publications feed one list.
  const seen = new Set(registry.map((v) => v.slug));
  const merged = [...registry];
  for (const a of api) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    merged.push(a);
  }
  return merged.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

// The publications esy.com's articles come from: esy-research (deep dives,
// model and tool research) and esy-learn (tutorials). `agentic` and `engineer`
// are retired (2026-10-12): articles are browsed under /topics, and their
// publications no longer exist on the API. The static registry is curated
// research; net-new articles from any publication merge in by publish date.
const AGENTIC_PUBLICATIONS = ["esy-research", "esy-learn"];

export async function getAllAgenticArticles(): Promise<AgenticVideo[]> {
  // Fetch every publication in parallel; a failure in any one degrades to the
  // registry (build/dev) or throws (prod ISR) per fetchPublishedSafe.
  const perPublication = await Promise.all(
    AGENTIC_PUBLICATIONS.map((slug) => fetchPublishedSafe(slug)),
  );
  const api = perPublication.flat() as AgenticVideo[];
  return mergeBySlug(agenticVideos, api);
}

export async function findAgenticArticle(slug: string): Promise<AgenticVideo | undefined> {
  return (await getAllAgenticArticles()).find((v) => v.slug === slug);
}

// Related resolution against the merged list (registry helpers only see
// static entries).
export function relatedFrom<T extends { slug: string }>(
  all: T[],
  currentSlug: string,
  relatedSlugs: string[],
  limit = 3,
): T[] {
  const picked = relatedSlugs
    .map((slug) => all.find((v) => v.slug === slug))
    .filter((v): v is T => Boolean(v));
  const remaining = all.filter(
    (v) => v.slug !== currentSlug && !picked.some((p) => p.slug === v.slug),
  );
  return [...picked, ...remaining].slice(0, limit);
}
