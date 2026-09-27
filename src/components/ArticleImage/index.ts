// Article pages for posts that lead with an image instead of a video
// (2026-09-27). Four directions (D merges B and C), clickable at /prototypes/article/; none is
// live yet. Each takes an ImageArticle (article.ts).
export { default as ArticleEditorial } from './ArticleEditorial';
export { default as ArticleCover } from './ArticleCover';
export { default as ArticleGuide } from './ArticleGuide';
// Round 2: B's cover with C's contents rail and body.
export { default as ArticleCoverGuide } from './ArticleCoverGuide';
// Round 3: D with the email bar under the cover, like the video articles.
export { ArticleCoverBar } from './ArticleCoverGuide';
export { longDate, readMinutes, splitSections } from './article';
export type { ArticleSection, ImageArticle, LeadImage } from './article';
