// ───────────────────────────────────────────────────────────────────────────
// The skills on esy.com/skills, as data (2026-10-06 prototypes, /skills/a…c).
// Shaped like a skill folder: a name (the slash command), a description (what
// the agent reads to decide when to use it), files, and what it made. Every
// take reads this one module, so counts agree across the page.
//
// Real: `prototyping` (Zev's skill, ~/.claude/skills/prototyping, written
// 2026-10-06; it built these pages and os.esy.com's outreach prototypes).
// Samples: every other skill, marked `status: 'sample'` and labelled on the
// page. Install commands for the public repo are samples until it exists.
// ───────────────────────────────────────────────────────────────────────────

export type Job = 'research' | 'pages' | 'outreach' | 'creative' | 'video' | 'build';

export const JOBS: { key: Job; label: string; line: string }[] = [
  { key: 'research', label: 'Research', line: 'Know the market before you make anything.' },
  { key: 'pages', label: 'Pages & SEO', line: 'Pages that answer what people search.' },
  { key: 'outreach', label: 'Outreach', line: 'Reach the right person, honestly.' },
  { key: 'creative', label: 'Creative', line: 'Ads and images in your brand’s rules.' },
  { key: 'video', label: 'Video', line: 'Thumbnails, cuts and scripts that get watched.' },
  { key: 'build', label: 'Build', line: 'Prototype, review and ship the work.' },
];

export type SkillFile = { path: string; lines: number; what: string };

export type Skill = {
  slug: string;
  command: string;
  name: string;
  job: Job;
  status: 'live' | 'sample';
  /** What you get, in the customer's words. */
  makes: string;
  /** The frontmatter description: what the agent reads to decide. */
  description: string;
  /** Something you'd say that makes the agent reach for it. */
  ask: string;
  /** What it produced when asked. */
  result: string;
  files: SkillFile[];
  updated: string;
};

export const SKILLS: Skill[] = [
  {
    slug: 'prototyping', command: '/prototyping', name: 'Prototyping', job: 'build', status: 'live',
    makes: 'Three working versions of a page, built from your real code, with a picker to flip between them.',
    description: 'Builds clickable product prototypes the way Zev compares directions — several working takes of one page or feature, built from the product’s real code and styles, fed labelled sample data, and switched with a floating picker that scales to a modal when the takes pile up. Use whenever the user asks for prototypes, protos, directions, takes, variants, options, mockups, explorations or “a few versions” of a page…',
    ask: 'Give me a few versions of the outreach page in /agency.',
    result: 'Six working takes in os.esy.com’s own look, sample data in one file, a picker at the foot, checked in a browser before it reported back. It also built this page.',
    files: [
      { path: 'SKILL.md', lines: 76, what: 'The workflow: find the repo’s convention, plan three takes, sample data, build, picker, verify, report.' },
      { path: 'references/picker.md', lines: 102, what: 'The floating picker and its “+” modal, in React and plain HTML.' },
      { path: 'references/conventions.md', lines: 27, what: 'How each of our repos does prototypes, so it follows the house rules.' },
    ],
    updated: 'Oct 6, 2026',
  },
  {
    slug: 'researching-markets', command: '/researching-markets', name: 'Researching markets', job: 'research', status: 'sample',
    makes: 'A research brief where every claim links to its source and conflicts are flagged, not hidden.',
    description: 'Researches a market, competitor or audience across reputable sources and writes a cited brief. Use before planning content, pages or campaigns, or when the user asks what the market looks like.',
    ask: 'What do roofers in Texas actually search for after a hailstorm?',
    result: 'A 2-page brief with 14 sources, three search patterns ranked by volume, and two claims marked as vendor numbers.',
    files: [{ path: 'SKILL.md', lines: 90, what: 'How to split the question, which sources count, how to label weak ones.' }, { path: 'references/sources.md', lines: 60, what: 'Source tiers: official, analyst, press, vendor.' }],
    updated: 'Coming',
  },
  {
    slug: 'writing-service-pages', command: '/writing-service-pages', name: 'Writing service pages', job: 'pages', status: 'sample',
    makes: 'Service-area pages built from a business’s own reviews and services, one town at a time.',
    description: 'Writes local service-area pages from a business’s reviews, services and towns served. Use when the user wants pages for a local business, “near me” searches, or town-by-town landing pages.',
    ask: 'Make Bluebonnet Roofing a page for Georgetown.',
    result: 'A Georgetown page quoting four real reviews, with the services they mention and the questions people ask locally.',
    files: [{ path: 'SKILL.md', lines: 110, what: 'Page sections, review rules, what never to invent.' }, { path: 'references/page-framework.md', lines: 80, what: 'The section-by-section page framework.' }],
    updated: 'Coming',
  },
  {
    slug: 'finding-decision-makers', command: '/finding-decision-makers', name: 'Finding decision-makers', job: 'outreach', status: 'sample',
    makes: 'Who decides at a company, how to reach them, and where each fact came from. Never a guessed address.',
    description: 'Finds the people who decide at a target company and a lawful way to reach each, recording the source of every fact. Use when building a prospect list, preparing outreach, or researching a hiring manager.',
    ask: 'Who should I write to at Trinity Peak Roofing?',
    result: 'The owner and office manager, both from the team page, one address checked, the source and date beside each.',
    files: [{ path: 'SKILL.md', lines: 120, what: 'The finding order, verification, and the rules: no pattern guessing, LinkedIn by hand only.' }, { path: 'references/legal.md', lines: 70, what: 'CAN-SPAM, GDPR notices and what can be stored.' }],
    updated: 'Coming',
  },
  {
    slug: 'writing-cold-emails', command: '/writing-cold-emails', name: 'Writing cold emails', job: 'outreach', status: 'sample',
    makes: 'First emails under 100 words, every personal line tied to a source, waiting for your sign-off.',
    description: 'Drafts short first-touch and follow-up emails where every personal claim cites a stored fact. Use when the user wants outreach, a cold email, a follow-up, or a note to a hiring manager.',
    ask: 'Draft a first note to Dana at Ridgeline about storm pages.',
    result: 'Four sentences, two facts with their sources, an unsubscribe line and your postal address in the footer.',
    files: [{ path: 'SKILL.md', lines: 85, what: 'Length, the why-you / why-now / why-us check, follow-up timing.' }],
    updated: 'Coming',
  },
  {
    slug: 'making-ad-variants', command: '/making-ad-variants', name: 'Making ad variants', job: 'creative', status: 'sample',
    makes: 'Ad creative in your brand’s rules, three angles each, checked at the size people scroll past.',
    description: 'Generates ad images and copy variants from a brand’s rules and a campaign angle, and checks each at feed size. Use when the user wants ads, social creative or campaign variants.',
    ask: 'Three Instagram ads for the fall pages offer.',
    result: 'Nine images (three angles × three crops), each beside the rule it follows and how it reads at 375px.',
    files: [{ path: 'SKILL.md', lines: 95, what: 'Angles, crops, brand checks.' }, { path: 'references/brand-rules.md', lines: 50, what: 'Where to find and apply house rules.' }],
    updated: 'Coming',
  },
  {
    slug: 'checking-thumbnails', command: '/checking-thumbnails', name: 'Checking thumbnails', job: 'video', status: 'sample',
    makes: 'YouTube thumbnails compared at the size people actually see them, with the winner explained.',
    description: 'Makes and compares video thumbnails at real feed sizes. Use when the user is choosing or making a YouTube thumbnail.',
    ask: 'Which of these three thumbnails reads best?',
    result: 'Each shown at 168px, 246px and full size, with the one whose words survive the smallest size picked.',
    files: [{ path: 'SKILL.md', lines: 60, what: 'The sizes, what to check, how to explain the pick.' }],
    updated: 'Coming',
  },
  {
    slug: 'writing-pull-requests', command: '/writing-pull-requests', name: 'Writing pull requests', job: 'build', status: 'sample',
    makes: 'Pull requests a first-week engineer can follow: an outcome title, five sections, risks and rollback.',
    description: 'Writes pull request titles and bodies that teach: outcome title, what and why, how it works, how it was verified, risk and rollback. Use when opening or editing a PR.',
    ask: 'Write the PR for this branch.',
    result: 'An outcome title, five sections in plain words, and the checks that ran, with their output.',
    files: [{ path: 'SKILL.md', lines: 70, what: 'The five sections and the voice rule.' }],
    updated: 'Coming',
  },
];

// ── The path (A): one marketing job per chapter ─────────────────────────────

export const CHAPTERS: { n: number; title: string; idea: string; skills: string[] }[] = [
  { n: 1, title: 'What a skill is', idea: 'A skill is a folder of instructions your agent keeps on a shelf. It reads only the label until a job fits, then opens the folder. That’s why you can have dozens without slowing anything down.', skills: [] },
  { n: 2, title: 'Research before you make', idea: 'Most bad marketing starts with a guess. Ask for the market first, with sources, and decide what to make from that.', skills: ['researching-markets'] },
  { n: 3, title: 'Pages from proof', idea: 'A page earns its place when it answers a real search with the business’s own evidence: reviews, services, towns.', skills: ['writing-service-pages'] },
  { n: 4, title: 'Outreach that respects people', idea: 'Find who decides, reach them in a way you could defend, and say something true about them. Agents research; you sign off.', skills: ['finding-decision-makers', 'writing-cold-emails'] },
  { n: 5, title: 'Creative at volume', idea: 'Variants are cheap now. The work is the rules they follow and checking them where people actually see them.', skills: ['making-ad-variants', 'checking-thumbnails'] },
  { n: 6, title: 'Prototype, then ship', idea: 'Compare directions by using them, not by looking at pictures, then ship with a PR anyone can follow.', skills: ['prototyping', 'writing-pull-requests'] },
  { n: 7, title: 'Write your own', idea: 'When you’ve explained the same thing to an agent twice, it’s a skill. Name it, say when to use it, keep it short.', skills: [] },
];

// ── How it works: three steps, from the open Agent Skills format ────────────

export const HOW: { step: string; title: string; text: string }[] = [
  { step: '1', title: 'It reads the label', text: 'At the start, your agent loads only each skill’s name and description, a sentence or two each.' },
  { step: '2', title: 'It opens the folder when the job fits', text: 'Ask for something that matches a description and it reads that skill’s SKILL.md.' },
  { step: '3', title: 'It reads more only if it needs to', text: 'Reference files and scripts stay closed until the job calls for them.' },
];

export const AGENTS = ['Claude Code', 'Cursor', 'Codex', 'Copilot', 'Gemini CLI', 'VS Code'];

/** Install paths. The personal folder is real; the public repo command is a sample until it exists. */
export const INSTALL = {
  claude: { label: 'Claude Code', command: 'cp -r prototyping ~/.claude/skills/', note: 'Your skills folder works in every project' },
  any: { label: 'Any agent', command: 'npx skills add esy/skills', note: 'Sample: the public repo isn’t out yet' },
};

// ── The email course: the lesson is the email ───────────────────────────────

// Three lessons, built only on what exists today (/prototyping and your own
// skill). It grows as real marketing skills ship. Course signups join The
// Marketing Engineer's list at signup, said plainly in the fine print, and the
// last lesson hands off to the weekly issue.
export const COURSE = {
  name: 'The Skills Course',
  lessons: [
    'What a skill is, and install /prototyping',
    'Use it on a page you own',
    'Write your own skill',
  ],
  how: 'Each lesson is the email, with one thing to try. Click “Done” at the end and the next one comes right away; otherwise it arrives two days later.',
  // Honest while the lessons are being written: signing up joins the weekly
  // now, and the course follows. Back to "Three lessons, then The Marketing
  // Engineer weekly." once the course sequence is live in Beehiiv.
  fine: 'Joins The Marketing Engineer, weekly. The three lessons arrive as they’re published. Unsubscribe in one click.',
};

// ── The prototyping skill's SKILL.md, line by line, with what each part does (C) ──

export type SkillLine = { text: string; note?: { title: string; text: string } };
export const SKILL_MD: SkillLine[] = [
  { text: '---', note: { title: 'Frontmatter', text: 'The label on the folder. Everything between the two --- lines is read at startup; the rest waits.' } },
  { text: 'name: prototyping', note: { title: 'name', text: 'Becomes the slash command, /prototyping. Lowercase and hyphens, 64 characters at most.' } },
  { text: 'description: Builds clickable product prototypes the way Zev compares directions — several working takes…', note: { title: 'description', text: 'The most important line. Your agent decides whether to open the skill from this alone, so it says what the skill does and the words people use when they need it: prototypes, takes, variants, “a few versions”.' } },
  { text: '---' },
  { text: '# Prototyping' },
  { text: 'Directions are compared by using them, not by looking at pictures.', note: { title: 'The point of view', text: 'One sentence of philosophy up top. The agent already knows how to code; what it doesn’t know is how you like to work.' } },
  { text: '## Workflow' },
  { text: '- [ ] 1. Find the repo’s prototype convention…', note: { title: 'A checklist', text: 'Long jobs get a checklist the agent copies and ticks off, so it doesn’t skip a step on the way.' } },
  { text: '- [ ] 6. Verify: typecheck, lint, open every take in a browser…', note: { title: 'A feedback loop', text: 'Check, fix, check again. The single biggest lift in quality is making the agent look at its own work before it reports.' } },
  { text: '### 1. Find the convention first' },
  { text: 'If the repo has a convention, follow it exactly.', note: { title: 'Defaults with an escape hatch', text: 'Follow the house rules where they exist; a clear default where they don’t. One way, not five options.' } },
  { text: 'Known repos are in [references/conventions.md](references/conventions.md).', note: { title: 'Progressive disclosure', text: 'Details live in other files, linked one level deep. The agent opens them only when the job needs them, so the skill stays cheap to carry.' } },
  { text: '### 5. The picker' },
  { text: 'Implementation: [references/picker.md](references/picker.md).' },
  { text: '### 7. Record and report' },
  { text: 'Don’t commit or push unless asked.', note: { title: 'Guardrails', text: 'Say plainly what the agent must never do on its own. Short rules beat long warnings.' } },
];

// ── The headline, in one place (open question: AI Skills / AI Marketing Skills /
//    AI Marketing Engineer Skills). Searchers say "marketing"; the header
//    lockup already says "The Marketing Engineer", so the page inherits it. ──
export const HEADLINE = {
  title: 'AI Marketing Skills',
  kicker: 'Skills · The Marketing Engineer',
  promise: 'The skills our agency runs on, written down so your agent can use them too. Install one, then just ask for the work.',
};

// ── Derived ─────────────────────────────────────────────────────────────────

export const skill = (slug: string) => SKILLS.find((s) => s.slug === slug)!;
export const liveCount = SKILLS.filter((s) => s.status === 'live').length;
export const jobLabel = (j: Job) => JOBS.find((x) => x.key === j)!.label;
export const SAMPLE_NOTE = 'Prototyping is a real skill (it built this page); every other skill here is a sample showing how the hub grows. The course is being written; signing up joins The Marketing Engineer now.';
