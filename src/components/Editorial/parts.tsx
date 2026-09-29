/* Pieces the editorial layouts share: the real example pieces, looked up by
 * slug so a renamed article never shows a stale title. */
import Link from 'next/link';
import type { AgenticVideo } from '@/data/agentic-videos';
import { articlePath } from '@/lib/article-path';

export type EditorialProps = { articles: AgenticVideo[] };

export function examplesFor(slugs: string[], articles: AgenticVideo[]): AgenticVideo[] {
  return slugs.map((s) => articles.find((a) => a.slug === s)).filter((a): a is AgenticVideo => !!a);
}

/** Example pieces as a plain list of links. */
export function Examples({ slugs, articles, className = '' }: { slugs: string[]; articles: AgenticVideo[]; className?: string }) {
  return (
    <ul className={`ed-examples ${className}`}>
      {examplesFor(slugs, articles).map((a) => (
        <li key={a.slug}>
          <Link href={articlePath(a.slug)}>{a.title}</Link>
        </li>
      ))}
    </ul>
  );
}
