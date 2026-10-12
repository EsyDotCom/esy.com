import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { articlePath } from "@/lib/article-path";
import {
  hasSignature,
  readWebhookHeaders,
  secretsForPublication,
  verifyHmac,
} from "@/lib/verify-webhook";

type RevalidateBody = {
  /** Headless webhook (per-publication Connect). */
  publication?: string;
  slug?: string;
  action?: "publish" | "unpublish" | "test";
  categories?: string[];
  /** What was published: "news-post" for AI Marketing News. Informational. */
  kind?: string;
};

// Publications esy.com shows. The article publications render the same way
// (homepage Latest + /articles/<slug>/ articles), so a publish/unpublish on
// either revalidates the same routes. `agentic` and `engineer` are retired
// (2026-10-12); articles are browsed under /topics. `news` is AI Marketing
// News (/news), whose posts are published from Compose
// (src/lib/published-news.ts).
const KNOWN_PUBLICATIONS = new Set(["esy-research", "esy-learn", "news"]);

/**
 * Legacy Bearer / x-revalidate-secret check. Kept as a fallback during the HMAC
 * rollout so in-flight Bearer deliveries never break.
 */
function hasValidBearer(request: NextRequest): boolean {
  const secret = process.env.ESY_REVALIDATE_SECRET;
  if (!secret) return false;

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const headerSecret = request.headers.get("x-revalidate-secret");
  // Support a comma-separated list so one endpoint can serve multiple publications.
  const accepted = new Set(secret.split(",").map((s) => s.trim()).filter(Boolean));
  return (bearer != null && accepted.has(bearer)) || (headerSecret != null && accepted.has(headerSecret));
}

export async function POST(request: NextRequest) {
  // Read the raw body ONCE: HMAC must hash the exact bytes Esy signed, so we
  // parse JSON from this string rather than calling request.json().
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Could not read body." }, { status: 400 });
  }

  let body: RevalidateBody;
  try {
    body = JSON.parse(rawBody) as RevalidateBody;
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  // Accept BOTH auth schemes during the HMAC rollout:
  //   • signature headers present → verify HMAC against the publication's secret
  //   • otherwise → fall back to the legacy Bearer/x-revalidate-secret check
  const headers = readWebhookHeaders((name) => request.headers.get(name));
  if (hasSignature(headers)) {
    const secrets = secretsForPublication(body.publication);
    const result = verifyHmac(rawBody, headers, secrets);
    if (!result.ok) {
      return NextResponse.json({ error: `Unauthorized: ${result.reason}` }, { status: 401 });
    }
  } else if (!hasValidBearer(request)) {
    if (!process.env.ESY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "No webhook secret configured (set ESY_REVALIDATE_SECRET or a per-publication secret)." },
        { status: 500 },
      );
    }
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const publication = body.publication?.trim();
  const slug = body.slug?.trim();
  if (!publication || !KNOWN_PUBLICATIONS.has(publication) || !slug) {
    // Derive the list from the set so a newly wired publication never leaves a
    // stale name in the error a Connect panel shows the operator.
    const known = [...KNOWN_PUBLICATIONS]
      .map((s) => `"${s}"`)
      .join(" | ");
    return NextResponse.json(
      { error: `Expected body with slug and a known publication (${known}).` },
      { status: 400 },
    );
  }

  // AI Marketing News: a news post was published or unpublished in Compose.
  // Purge the news list's cached API read, then every page that shows posts:
  // the /news layout covers /news, each post and story page and their share
  // images; the homepage carries the news column; the feeds and sitemaps list
  // posts. A post's story page can change with it, so no single path is enough.
  if (publication === "news") {
    revalidateTag("published-news");
    revalidateTag("published-news:news");
    revalidatePath("/news", "layout");
    const paths = ["/", "/news-sitemap.xml", "/news/rss.xml", "/sitemap.xml"];
    paths.forEach((path) => revalidatePath(path));

    return NextResponse.json({
      revalidated: true,
      action: body.action ?? "publish",
      publication,
      slug,
      categories: body.categories ?? [],
      // "/news" stands for the whole /news layout (every post and story page).
      paths: ["/news", ...paths],
    });
  }

  // Refresh both the tagged API fetch (keyed by publication slug) and the concrete
  // routes that can hold rendered HTML/metadata for this article.
  revalidateTag("published-articles");
  revalidateTag(`published-articles:${publication}`);

  // The homepage lists the latest articles; the article itself lives at /articles/<slug>/.
  const paths = ["/", articlePath(slug), "/sitemap.xml"];
  paths.forEach((path) => revalidatePath(path));
  // Topic hubs list articles too; refresh the index and every hub under it.
  revalidatePath("/topics", "layout");

  return NextResponse.json({
    revalidated: true,
    action: body.action ?? "publish",
    publication,
    slug,
    categories: body.categories ?? [],
    paths,
  });
}
