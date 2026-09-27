/* Sample issues of the weekly email, for hero C (The Issue). They are
 * written the way a real issue should read (one build walked through, a few
 * links worth the time, one tool note), and the hero labels them as samples.
 *
 * Only one of the three mentions SEOPage, and only because its build is
 * about finding pages worth making. That is the editorial rule the site runs on:
 * the product appears when it really is the answer. */

import type { DeskKey } from './desks';

export interface SampleIssue {
  id: string;
  desk: DeskKey;
  subject: string;
  preheader: string;
  lead: {
    title: string;
    paragraphs: string[];
    /** A closing line that points at the product, only when it fits. */
    productNote?: string;
  };
  links: { label: string; why: string }[];
  toolNote: { tool: string; note: string };
}

export const SAMPLE_ISSUES: SampleIssue[] = [
  {
    id: 'search-console',
    desk: 'grow',
    subject: 'The pages you should build are already in Search Console',
    preheader: 'An agent that reads your queries and returns a build list.',
    lead: {
      title: 'Finding pages worth building, with an agent and your own search data',
      paragraphs: [
        'Search Console tells you which searches already show your site but never land a click. Those are pages you almost rank for, and nobody reads the export.',
        'This week I built an agent that pulls 90 days of queries, groups them by what the searcher wants, and returns a ranked list of pages to build, each with the evidence behind it.',
      ],
      productNote: 'This is the workflow I’m building into SEOPage.',
    },
    links: [
      { label: 'How AI search picks which pages to cite', why: 'Why a page that answers one question beats a page that answers ten.' },
      { label: 'Search Console’s API limits, in plain terms', why: 'What you can pull, how far back, and what gets sampled.' },
    ],
    toolNote: { tool: 'Claude Code', note: 'Run the grouping step as a subagent, so the main agent keeps the ranking context.' },
  },
  {
    id: 'claude-clay',
    desk: 'build',
    subject: 'Claude inside Clay, without the copy-paste',
    preheader: 'Enrichment columns that write the first line for you.',
    lead: {
      title: 'Connecting Claude to Clay for enrichment that reads like a person wrote it',
      paragraphs: [
        'Clay is great at finding facts about a company. It is worse at turning those facts into a sentence a buyer would read.',
        'Here is the setup I use: Clay gathers the facts, Claude writes one line from them against a style guide, and a second pass throws out anything generic before it reaches the sheet.',
      ],
    },
    links: [
      { label: 'Prompt caching for long style guides', why: 'Cuts the cost of every row once the guide is cached.' },
      { label: 'n8n vs. Clay for scheduled enrichment', why: 'When the job leaves the spreadsheet.' },
    ],
    toolNote: { tool: 'Clay', note: 'Keep the fact columns and the writing column separate, so you can rerun one without the other.' },
  },
  {
    id: 'evals',
    desk: 'operate',
    subject: 'Your AI content needs a second reader',
    preheader: 'A tiny eval that catches slop before it ships.',
    lead: {
      title: 'Evals for marketing output: catch the slop before it ships',
      paragraphs: [
        'Every AI draft has a tell: the same five openers, the same three adjectives, the claim nobody can source.',
        'I wrote a small eval that scores each draft on those tells and sends the worst ones back for a rewrite, then shows a person only the drafts it wasn’t sure about.',
      ],
    },
    links: [
      { label: 'Writing a rubric a model can actually apply', why: 'Short, specific, and scored one criterion at a time.' },
      { label: 'What a rewrite really costs', why: 'Tokens per fix, and when it’s cheaper to regenerate.' },
    ],
    toolNote: { tool: 'Claude Fable 5', note: 'A good judge for tone. Use a cheaper model for the checklist items.' },
  },
];
