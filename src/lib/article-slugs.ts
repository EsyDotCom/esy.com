import fs from "node:fs";
import path from "node:path";

// Server-only: articles share the root namespace with every top-level route.
// Next.js always prefers a static route (or a redirect) over the [slug] catch,
// so an article whose slug matches one — "about", "docs", "workflows" — would
// be silently shadowed: its URL would show that other page. It cuts both ways:
// adding a new top-level route later hides any article already using that
// slug. These helpers find such collisions so the build can warn and the
// sitemap can skip them.

// Root paths claimed outside src/app folders: redirects in next.config.mjs and
// public/_redirects, and rewrites. Keep in sync when adding a root redirect.
const CLAIMED_BY_REDIRECTS = [
  "agentic", "agents", "cities", "contact", "docs", "engineer", "guide", "cdn-proxy",
  "learn", "marketing-engineer", "prompt-library", "prompts", "research",
  "school", "templates",
];

let reserved: Set<string> | null = null;

/** Every single-segment root path an article slug must not use. */
export function reservedRootSegments(): Set<string> {
  if (reserved) return reserved;
  const names = new Set(CLAIMED_BY_REDIRECTS);
  // Top-level route folders. Dynamic ([x]), grouped ((x)) and private (_x)
  // folders don't claim a literal path, so they're skipped. At runtime on a
  // host without the source tree the read fails and only the static list
  // applies — the check matters at build, where the tree is present.
  try {
    const appDir = path.join(process.cwd(), "src/app");
    for (const entry of fs.readdirSync(appDir, { withFileTypes: true })) {
      if (entry.isDirectory() && !/^[[(_]/.test(entry.name)) names.add(entry.name);
    }
  } catch {
    // Source tree not present — fall back to the static list.
  }
  reserved = names;
  return names;
}

/** Slugs from `slugs` that would be shadowed by an existing root path. */
export function shadowedArticleSlugs(slugs: string[]): string[] {
  const taken = reservedRootSegments();
  return slugs.filter((slug) => taken.has(slug));
}
