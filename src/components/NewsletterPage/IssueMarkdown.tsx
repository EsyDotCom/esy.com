'use client';

/* The System written out (template v3, 2026-11-14): Esy stores it as Markdown,
   never HTML, and this draws it with a strict reader, the same marks Esy's
   email allows (issue_email.py): headings, paragraphs, lists, quotes, bold,
   italics, inline code and https links. Nothing else becomes a tag.

   Why not the article renderer (SchoolArticle/EnhancedMarkdownRenderer)? It
   turns raw HTML on (rehype-raw), which is right for our own articles and
   wrong for words that arrive over the API. Here react-markdown builds React
   elements (no innerHTML anywhere), and:
   - raw HTML is turned into plain text before rendering, so `<script>` reads
     as the characters "<script>", as in the email;
   - only the elements below are kept; anything else (images, tables, rules)
     is unwrapped to its text or dropped;
   - a link keeps its href only when it's https; otherwise its words show
     without a link. */

import Markdown, { type Components } from 'react-markdown';
import type { Parent, Root, RootContent } from 'mdast';
import { relFor } from '@/lib/outbound';

// The only elements the body may produce. Headings come out one level below
// the section's own heading (see `components`).
const ALLOWED = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'li', 'blockquote', 'strong', 'em', 'code', 'a', 'br'];

// Containers whose children are blocks: raw HTML sitting directly in one of
// these becomes a paragraph of text, so it still reads as a line of its own.
const BLOCK_PARENTS = new Set(['root', 'blockquote', 'listItem']);

/** A remark plugin: every raw HTML node becomes the text it is. */
function htmlAsText() {
  const walk = (node: Parent) => {
    node.children = node.children.map((child) => {
      if (child.type === 'html') {
        const text = { type: 'text' as const, value: child.value };
        return (BLOCK_PARENTS.has(node.type) ? { type: 'paragraph', children: [text] } : text) as RootContent;
      }
      if ('children' in child) walk(child as Parent);
      return child;
    }) as Parent['children'];
  };
  return (tree: Root) => walk(tree);
}

/** Only https links survive; anything else (http, javascript:, relative) is dropped. */
function httpsOnly(url: string): string {
  try {
    return new URL(url).protocol === 'https:' ? url : '';
  } catch {
    return '';
  }
}

// Body headings sit under The System's own heading (an h2), so ## and # read
// as h3, and ### and below as h4. A link without an https href is just its words.
const components: Components = {
  h1: ({ children }) => <h3>{children}</h3>,
  h2: ({ children }) => <h3>{children}</h3>,
  h3: ({ children }) => <h4>{children}</h4>,
  h4: ({ children }) => <h4>{children}</h4>,
  h5: ({ children }) => <h4>{children}</h4>,
  h6: ({ children }) => <h4>{children}</h4>,
  a: ({ href, children }) => (href ? <a href={href} rel={relFor(href)}>{children}</a> : <>{children}</>),
};

export function IssueMarkdown({ text, className = 'nlw-md' }: { text: string; className?: string }) {
  return (
    <div className={className}>
      <Markdown
        remarkPlugins={[htmlAsText]}
        allowedElements={ALLOWED}
        unwrapDisallowed
        urlTransform={httpsOnly}
        components={components}
      >
        {text}
      </Markdown>
    </div>
  );
}
