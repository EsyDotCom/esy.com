// Whether a piece may appear in search results and the sitemaps: the
// `searchIndexing` setting api.esy.com carries on every article, news post and
// issue (api.esy.com #589). Esy owns it (API-001): Compose sets it, and esy.com
// obeys it here. A hidden piece is still live: it keeps its page, its place in
// its section's list, the homepage and RSS. Only search engines are told to
// leave it out (a noindex robots tag, and no entry in either sitemap).

export type SearchIndexing = 'index' | 'noindex';

/** True unless Esy said "noindex". Registry pieces in git carry no setting, so they keep their behaviour. */
export function inSearch(item: { searchIndexing?: SearchIndexing }): boolean {
  return item.searchIndexing !== 'noindex';
}

/** An issue is in search only when it came from Esy (`real`) and isn't hidden:
    the registry's issues are samples and stay out. */
export function issueInSearch(issue: { real?: boolean; searchIndexing?: SearchIndexing }): boolean {
  return Boolean(issue.real) && inSearch(issue);
}
