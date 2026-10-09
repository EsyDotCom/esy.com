import withMDX from '@next/mdx';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function netlifyRedirectsFromFile() {
  const redirectsPath = path.join(__dirname, 'public/_redirects');
  if (!fs.existsSync(redirectsPath)) return [];

  return fs
    .readFileSync(redirectsPath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [source, destination, status = '301'] = line.split(/\s+/);
      return {
        source,
        destination,
        permanent: status === '301',
      };
    });
}

function dedupeRedirects(redirects) {
  const seen = new Set();
  return redirects.filter((redirect) => {
    if (seen.has(redirect.source)) return false;
    seen.add(redirect.source);
    return true;
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Pre-existing react/no-unescaped-entities warnings across many essays.
    // These don't affect runtime and will be cleaned up separately.
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com', 'upload.wikimedia.org', 'images.metmuseum.org', 'images.esy.com', 'images.clip.art'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  // Keep the independently deployed guide mounted under esy.com. Netlify used
  // a forced 200 proxy here; beforeFiles gives Vercel the same precedence.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/guide',
          destination: 'https://esy-guide.netlify.app',
        },
        {
          source: '/guide/:path*',
          destination: 'https://esy-guide.netlify.app/:path*',
        },
      ],
      afterFiles: [{
        source: '/cdn-proxy/:path*',
        destination: 'https://images.esy.com/:path*',
      }],
    };
  },
  // Permanent redirects for renamed and retired paths
  async redirects() {
    return dedupeRedirects([
      // Agents Reference renamed to AI Agents (Jul 2026) — "agents" alone is
      // ambiguous as a search term; the book targets the "AI agents" head term.
      {
        source: '/agents',
        destination: '/ai-agents',
        permanent: true,
      },
      // The old overview chapter can't keep its slug (would stutter as
      // /ai-agents/ai-agents), so it needs a specific rule before the catch-all.
      {
        source: '/agents/ai-agents',
        destination: '/ai-agents/what-are-ai-agents',
        permanent: true,
      },
      {
        source: '/agents/:path*',
        destination: '/ai-agents/:path*',
        permanent: true,
      },
      // The films directions under review moved to /prototypes/films when
      // /films shipped (Sep 2026).
      { source: '/films/v/a', destination: '/prototypes/films/a-index/', permanent: true },
      { source: '/films/v/a/the-letter-with-no-address', destination: '/prototypes/films/a-film/', permanent: true },
      { source: '/films/v/b', destination: '/prototypes/films/b-index/', permanent: true },
      { source: '/films/v/b/the-letter-with-no-address', destination: '/prototypes/films/b-film/', permanent: true },
      // Prompt library retired (Jun 2026) — send old traffic to workflows
      {
        source: '/prompt-library',
        destination: '/workflows',
        permanent: true,
      },
      {
        source: '/prompt-library/:path*',
        destination: '/workflows',
        permanent: true,
      },
      {
        source: '/prompts',
        destination: '/workflows',
        permanent: true,
      },
      {
        source: '/prompts/:path*',
        destination: '/workflows',
        permanent: true,
      },
      // Templates renamed to Workflows (May 2026)
      {
        source: '/templates',
        destination: '/workflows',
        permanent: true,
      },
      {
        source: '/templates/:path*',
        destination: '/workflows/:path*',
        permanent: true,
      },
      // /contact retired (Jul 2026). The page was orphaned pre-launch marketing
      // — a waitlist, a "launching Q2 2025" promise, founding-member pricing —
      // and its form's submit handler only console.logged, so anything sent
      // through it was silently discarded. /about carries the real contact
      // paths: email and a booking link.
      {
        source: '/contact',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact/:path*',
        destination: '/about',
        permanent: true,
      },
      // Redirect spam traffic from /cities/* to root. This was a Netlify-only
      // production redirect, so keep it explicit for the Vercel cutover.
      {
        source: '/cities/:path*',
        destination: '/',
        permanent: true,
      },
      // Retired legacy SEO subtree /workflows/essay/* (captured "essay template"
      // back when /workflows was /templates). Superseded by /workflows/academic-essays.
      {
        source: '/workflows/essay',
        destination: '/workflows/academic-essays',
        permanent: true,
      },
      {
        source: '/workflows/essay/:path*',
        destination: '/workflows/academic-essays',
        permanent: true,
      },
      // Workflow detail slugs adopted the verb-first standard (generate-*) to
      // match the platform's canonical template ids (June 2026). Preserve the
      // pre-rename SEO URLs with permanent redirects to the new slugs.
      {
        source: '/workflows/argumentative-essay',
        destination: '/workflows/generate-essay-argumentative',
        permanent: true,
      },
      {
        source: '/workflows/analytical-essay',
        destination: '/workflows/generate-essay-analytical',
        permanent: true,
      },
      {
        source: '/workflows/expository-essay',
        destination: '/workflows/generate-essay-expository',
        permanent: true,
      },
      {
        source: '/workflows/narrative-essay',
        destination: '/workflows/generate-essay-narrative',
        permanent: true,
      },
      {
        source: '/workflows/research-paper',
        destination: '/workflows/generate-research-paper',
        permanent: true,
      },
      {
        source: '/workflows/college-application-essay',
        destination: '/workflows/generate-essay-college-application',
        permanent: true,
      },
      {
        source: '/workflows/research-infographic',
        destination: '/workflows/generate-research-infographic',
        permanent: true,
      },
      // Archived writing glossary terms → glossary index
      {
        source: '/glossary/thesis-statement',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/topic-sentence',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/argumentative-essay',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/body-paragraph',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/conclusion',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/introduction',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/hook',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/transition',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/evidence',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/citation',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/mla-format',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/apa-format',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/works-cited',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/plagiarism',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/paraphrase',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/quote',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/analysis',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/counterargument',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/outline',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/brainstorming',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/revision',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/proofreading',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/subject-verb-agreement',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/comma-splice',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/run-on-sentence',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/parallel-structure',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/active-voice',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/passive-voice',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/peer-review',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/research-question',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/bibliography',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/chicago-style',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/essay',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/grammar',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/punctuation',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/research',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/sentence-structure',
        destination: '/glossary',
        permanent: true,
      },
      {
        source: '/glossary/writing',
        destination: '/glossary',
        permanent: true,
      },
      // School renamed to Learn (June 2026), Learn + Research merged into
      // /agentic (Jul 2026), which became The Marketing Engineer (Sep 2026),
      // whose articles moved from /engineer/<slug>/ to /articles/<slug>/
      // (2026-10-09). People browse articles by topic, so the old front pages
      // land on /topics. Every old address reaches its new home directly (Next
      // adds the trailing slash as a second, instant redirect).
      {
        source: '/engineer',
        destination: '/topics',
        permanent: true,
      },
      {
        source: '/engineer/:slug*',
        destination: '/articles/:slug*',
        permanent: true,
      },
      {
        source: '/articles',
        destination: '/topics',
        permanent: true,
      },
      {
        source: '/school',
        destination: '/topics',
        permanent: true,
      },
      {
        source: '/school/:path*',
        destination: '/articles/:path*',
        permanent: true,
      },
      // The retired /learn/articles subtree has no article equivalent, so fold it
      // into the topics with specific rules BEFORE the catch-all slug mapping.
      {
        source: '/learn',
        destination: '/topics',
        permanent: true,
      },
      {
        source: '/learn/articles',
        destination: '/topics',
        permanent: true,
      },
      {
        source: '/learn/articles/:path*',
        destination: '/topics',
        permanent: true,
      },
      {
        source: '/learn/:slug*',
        destination: '/articles/:slug*',
        permanent: true,
      },
      {
        source: '/research',
        destination: '/topics',
        permanent: true,
      },
      {
        source: '/research/:slug*',
        destination: '/articles/:slug*',
        permanent: true,
      },
      ...netlifyRedirectsFromFile(),
    ]);
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
})(nextConfig);
