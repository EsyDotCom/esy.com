/* esy.com/marketing-engineer, the words (2026-11-07, /prototypes/marketing-engineer/).
 * One module for all three takes, so they say the same thing in different shapes.
 * The page answers "what is a marketing engineer?" for search, in Zev's voice (first person,
 * no name), and ends in The Marketing Engineer's signup. Rules it keeps: describe what we do,
 * never state opinions as laws; no outcome or income promises ("so one person can do a team's
 * work" is what the systems are for, not a result); the AI Marketing News pipeline is real,
 * the sample day in take C is labelled a sample. */

export type JobId = 'research' | 'write' | 'check' | 'publish' | 'newsletter' | 'social' | 'search' | 'outreach';

export interface Job {
  id: JobId;
  /** The arm's label: one word. */
  name: string;
  /** What the system does, one line. */
  system: string;
  /** What the person still does, a few words. */
  you: string;
  /** The job as a verb phrase, for take F's sentence ("Mason researches, writes…"). */
  verb: string;
}

export const TERM = 'marketing engineer';

/** The one-sentence answer, written to be quoted (featured snippet). */
export const DEFINITION =
  'A marketing engineer builds the systems that do marketing work: research, writing, checking, publishing and measuring run on their own, and a person signs off on what goes out.';

/** The short version, for big type. */
export const SHORT = 'Someone who builds the system, not the post.';

/** Why the job exists now, in my voice. */
export const WHY_NOW =
  'AI agents can research, draft and check now, so the hard part of marketing moved. It’s less about making each piece and more about building what makes every piece, and checking it. That’s an engineering job, and it’s the one I do.';

/** Eight jobs, one per arm. Each pairs what the system does with what the person keeps. */
export const JOBS: Job[] = [
  { id: 'research', name: 'Research', system: 'Finds the primary sources behind the week’s story.', you: 'Pick the story', verb: 'researches' },
  { id: 'write', name: 'Write', system: 'Drafts in your voice, from those sources only.', you: 'Set the voice once', verb: 'writes' },
  { id: 'check', name: 'Check', system: 'Reads every claim against its source and flags the rest.', you: 'Read the flags', verb: 'checks' },
  { id: 'publish', name: 'Publish', system: 'Puts it on the site with its page, links and image.', you: 'Press publish', verb: 'publishes' },
  { id: 'newsletter', name: 'Newsletter', system: 'Turns the week’s best work into an issue.', you: 'Approve the issue', verb: 'sends the newsletter' },
  { id: 'social', name: 'Social', system: 'Cuts a post for each channel from the same piece.', you: 'Choose what ships', verb: 'posts' },
  { id: 'search', name: 'Search', system: 'Reads Search Console, GA4 and Bing and says what to make next.', you: 'Decide what’s next', verb: 'reads the search data' },
  { id: 'outreach', name: 'Outreach', system: 'Finds who should see it and drafts the note.', you: 'Send or skip', verb: 'reaches out' },
];

/** Same work, a different unit. Phrased as how I see it, not as a rule about marketers. */
export const SHIFT: { from: string; to: string }[] = [
  { from: 'Writes the post', to: 'Builds what writes every post' },
  { from: 'Runs a campaign', to: 'Runs a system that ships every week' },
  { from: 'Checks the work by hand', to: 'Builds the check in' },
  { from: 'Learns another tool', to: 'Connects the tools' },
  { from: 'Grows by hiring', to: 'Grows by adding an arm' },
];

/** How to start: four steps, the way I did it. */
export const STEPS: { title: string; body: string }[] = [
  { title: 'Pick one job you repeat every week', body: 'A newsletter, the week’s posts, a report. Something with a deadline and a shape.' },
  { title: 'Write down exactly how you do it', body: 'The sources you trust, the steps in order, and what “good” looks like. That page is the system’s first draft.' },
  { title: 'Hand the steps to agents, with a check', body: 'Claude Code, an agent per step, and one whose only job is to check the others against the sources.' },
  { title: 'Keep yourself on the last step', body: 'Read it, approve it, measure it. When it runs without you fixing it, add the next job.' },
];

/** The real example: how AI Marketing News is made in Compose, every day. */
export const PROOF = {
  title: 'How AI Marketing News is made',
  where: 'esy.com/news',
  href: '/news/',
  lede: 'Every story on AI Marketing News goes through the same four hands. Three of them are agents.',
  hands: [
    { who: 'Researcher', does: 'finds the primary source' },
    { who: 'Writer', does: 'drafts in the publication’s voice' },
    { who: 'Fact-checker', does: 'reads every claim against the source' },
    { who: 'You', does: 'read it and decide' },
  ],
};

/** What the job draws on. Tools named are ones I use. */
export const SKILLS: { name: string; says: string }[] = [
  { name: 'Agents', says: 'Claude Code, prompts and the steps between them.' },
  { name: 'Data', says: 'Search Console, GA4 and Bing, read by the system.' },
  { name: 'Automation', says: 'n8n, Clay and APIs, so the steps connect.' },
  { name: 'Taste', says: 'Knowing what good looks like, and saying no.' },
  { name: 'Funnels', says: 'Where people find you, land, and pay.' },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Where does the term come from?',
    a: 'I didn’t invent it. “Marketing engineer” has been a job title in electronics for decades ([Texas Instruments, 1969](https://www.computerhistory.org/collections/catalog/102738104)). Its AI-era meaning comes from [Profound](https://www.tryprofound.com/blog/zero-click-san-francisco-2026-recap), which launched the role in April 2026, modeled on [Clay’s “GTM engineer”](https://clay.com/blog/gtm-engineering).',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'You need to think in systems and read what the system makes. Claude Code writes much of the code now; your job is to say exactly what it should do, test it, and know when the output is wrong.',
  },
  {
    q: 'Is it for agencies or in-house teams?',
    a: 'Both. If you run your own agency it lets you take on more clients without more people. In-house, it’s how one person keeps a brand publishing every week.',
  },
  {
    q: 'How is it different from a marketing automation specialist?',
    a: 'Automation moves things between tools on a schedule. A marketing engineer builds systems that make the work itself, with research, writing and checks, and keeps a person on the decision.',
  },
];

export const NEWSLETTER = {
  name: 'The Marketing Engineer',
  pitch: 'One AI marketing system a week: how I built it, what it did, and the skills to run it yourself. Plus the week’s AI marketing news.',
  fine: 'Free, weekly. Unsubscribe in one click.',
};

/** Take C's sample day, shaped like AI Marketing News's real one. Times are a sample. */
export const DAY: { t: string; job: JobId | 'you'; what: string }[] = [
  { t: '05:00', job: 'search', what: 'Yesterday’s clicks and searches pulled from Search Console, GA4 and Bing.' },
  { t: '05:20', job: 'research', what: 'Three stories found; each one traced to its primary source.' },
  { t: '05:55', job: 'write', what: 'Drafts written in the publication’s voice, from those sources only.' },
  { t: '06:30', job: 'check', what: 'Every claim read against its source. Two flagged.' },
  { t: '07:30', job: 'you', what: 'Coffee. Read the two flags, fix one line, approve.' },
  { t: '08:00', job: 'publish', what: 'Live on the site, with its page, links and image.' },
  { t: '09:00', job: 'social', what: 'A post cut for each channel, waiting in the queue.' },
  { t: '10:00', job: 'outreach', what: 'Five people who should see it, each with a drafted note.' },
  { t: '10:10', job: 'you', what: 'Send three notes, skip two.' },
  { t: '16:00', job: 'search', what: 'A page that lost clicks this week, with what to fix.' },
  { t: 'Fri', job: 'newsletter', what: 'The week’s best work, turned into an issue.' },
  { t: 'Fri', job: 'you', what: 'Read the issue. Send.' },
];

/* D's FAQ (2026-11-07), built from what people search (Ahrefs, US: "what is a marketing engineer",
 * "what does a marketing engineer do", "what company coined the marketing engineer role", salary,
 * skills, hiring, technical / product / sales-and-marketing engineer, content engineer) and from
 * research read the same day (notes kept outside the repo). Sources behind each answer:
 *   origin     computerhistory.org/collections/catalog/102738104 (TI, 1969); engineering.purdue.edu/ECE/Alums/OECE/1995/carter (Intel, 1981)
 *   Profound   tryprofound.com/blog/zero-click-san-francisco-2026-recap (launch Apr 8, 2026; post Apr 14);
 *              tryprofound.com/blog/profound-raises-96m-series-c (Feb 24, 2026)
 *   Clay       clay.com/blog/gtm-engineering ("Clay coined the term in 2023", Apr 21, 2026)
 *   postings   builtin.com/job/marketing-engineer/8896002 (Profound $135K–$200K); builtinnyc.com/job/growth-engineer/10227745
 *              (Harvey $136K–$204K); themuse.com/jobs/restaurant365/senior-growth-marketing-engineer ($130K–$160K);
 *              jobs.stripes.co … gwi-2 ("a portfolio of shipped builds")
 *   salary     payscale.com/research/US/Job=Marketing_Engineer/Salary (mixed title, n=14); bls.gov/ooh/sales/sales-engineers.htm ($124,900, May 2025)
 *   TME / PME  builtinaustin.com/job/technical-marketing-engineer/3840670 (Cisco Meraki); jobs.anitab.org NVIDIA TME;
 *              builtinaustin.com/job/product-marketing-engineer/9975381 (Texas Instruments)
 *   content    ahrefs.com/blog/what-is-content-engineering (20 job ads; 85% list AI content pipelines)
 *   hiring     marketingbrew.com/stories/profound/… (sponsored; promote from inside)
 * Pay and posting facts are dated "in 2026" on the page; refresh them when the page is refreshed. */
/** Answers carry their sources inline as [text](url); the page renders them as links and the
 *  FAQPage markup gets the plain text. Shared by every take. */
export const FAQ_D: { q: string; a: string }[] = [
  {
    q: 'What is a marketing engineer?',
    a: 'A marketer who builds the systems that do the marketing: AI agents, automations and data pipelines that research, write, publish, follow up and report, with a person signing off on what goes out. [Profound](https://www.tryprofound.com/blog/zero-click-san-francisco-2026-recap), the company that launched the role in 2026, and its [job posting](https://builtin.com/job/marketing-engineer/8896002) describe the same thing: agents for the marketing work that repeats.',
  },
  {
    q: 'Where does the term come from?',
    a: 'Two places. As a title it’s old: in electronics it has meant an engineer who markets technical products for decades. [Texas Instruments hired marketing engineers in 1969](https://www.computerhistory.org/collections/catalog/102738104), and [Intel had product marketing engineers in 1981](https://engineering.purdue.edu/ECE/Alums/OECE/1995/carter). The AI-era meaning, a marketer who builds with AI, comes from [Profound](https://www.tryprofound.com/blog/profound-raises-96m-series-c), which named the role in February 2026.',
  },
  {
    q: 'What company coined the marketing engineer role?',
    a: '[Profound](https://www.tryprofound.com/), an AI search company, gave the title its AI-era meaning. It named the role in its [February 2026 funding post](https://www.tryprofound.com/blog/profound-raises-96m-series-c) and [announced its official launch at Zero Click on April 8, 2026](https://www.tryprofound.com/blog/zero-click-san-francisco-2026-recap), with a free course and a [job board](https://marketingengineer.jobs/). Profound says it [modeled the role on the GTM engineer](https://university.tryprofound.com/courses/marketing-engineering-concepts/modules/manifesto/lessons/the-rise-of-the-marketing-engineer), a title [Clay says it coined in 2023](https://clay.com/blog/gtm-engineering). The words themselves are older than both.',
  },
  {
    q: 'What does a marketing engineer do day to day?',
    a: 'Builds and runs the systems: agents that draft articles, posts and newsletters, follow up on leads and write the reports; the CRM, marketing automation and website wired together; tracking and attribution; experiments. That’s the work in postings from [Profound](https://builtin.com/job/marketing-engineer/8896002), [Harvey](https://www.builtinnyc.com/job/growth-engineer/10227745) and [Energy Aspects](https://jobs.summitpartners.com/companies/energy-aspects-2/jobs/92513626-marketing-engineer). And someone reads what the system makes before it goes out.',
  },
  {
    q: 'Is it a real job or a new name for an old one?',
    a: 'Both views are out there. [Profound](https://builtin.com/job/marketing-engineer/8896002), [Harvey](https://www.builtinnyc.com/job/growth-engineer/10227745) and [Restaurant365](https://www.themuse.com/jobs/restaurant365/senior-growth-marketing-engineer) posted the role in 2026 with real budgets, while [skeptics](https://amiamarketer.substack.com/p/is-everyone-an-engineer-now) say the engineering titles are a prestige grab and [others note](https://houtini.com/articles/what-is-a-marketing-engineer/) that vendors push the term. The work is real either way: marketers who build the system instead of doing each task by hand.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'You need to think in systems and read what the system makes. Claude Code and Cursor write much of the code now, but postings still ask for some Python or JavaScript, SQL and APIs ([Profound](https://builtin.com/job/marketing-engineer/8896002), [Energy Aspects](https://jobs.summitpartners.com/companies/energy-aspects-2/jobs/92513626-marketing-engineer)), so you can say exactly what the system should do, test it, and tell when it’s wrong.',
  },
  {
    q: 'What skills does a marketing engineer need?',
    a: 'Marketing judgment first, as [Profound’s founding marketing engineer puts it](https://nicklafferty.com/blog/marketing-engineer/). Then AI coding tools used daily, APIs and some SQL or Python, the CRM and automation tools (HubSpot, Salesforce, Marketo), workflow tools such as n8n, Clay or Zapier, and experiment design, the list [Harvey’s posting](https://www.builtinnyc.com/job/growth-engineer/10227745) asks for.',
  },
  {
    q: 'How do I become a marketing engineer?',
    a: 'Start with your own work. Pick one job you repeat every week, write down how you do it, and build the system that does it, with a check and you on the last step. Keep what you ship: employers such as [GWI](https://jobs.stripes.co/companies/gwi-2/jobs/87455019-marketing-engineer) ask for a portfolio of shipped builds, not a certificate. Profound runs a [free course](https://university.tryprofound.com/), and my newsletter is one system a week and how I built it.',
  },
  {
    q: 'How much does a marketing engineer make?',
    a: 'For the AI-era role, US postings in 2026 showed base pay of roughly $130,000 to $204,000: [Profound $135K–$200K](https://builtin.com/job/marketing-engineer/8896002), [Harvey $136K–$204K](https://www.builtinnyc.com/job/growth-engineer/10227745), [Restaurant365 $130K–$160K](https://www.themuse.com/jobs/restaurant365/senior-growth-marketing-engineer). Salary sites show lower averages, such as [Payscale’s $74.6K](https://www.payscale.com/research/US/Job=Marketing_Engineer/Salary), but that mixes in the older electronics title and rests on 14 profiles.',
  },
  {
    q: 'How do you hire a marketing engineer?',
    a: 'Look inside first: [Profound’s advice](https://www.marketingbrew.com/stories/profound/the-new-role-shaping-ai-powered-marketing) (in a sponsored piece) is to start with the marketer who already automates their own work. Then judge candidates on systems they have running, not past titles. Postings usually ask for four or more years in growth, marketing or GTM work, and many companies list on [marketingengineer.jobs](https://marketingengineer.jobs/).',
  },
  {
    q: 'How is a marketing engineer different from a GTM engineer?',
    a: '[GTM engineer](https://clay.com/blog/gtm-engineering) is the title Clay says it coined in 2023 for people who build revenue systems with AI, enrichment and automation, starting on the sales side. [Profound describes the marketing engineer](https://university.tryprofound.com/courses/marketing-engineering-concepts/modules/manifesto/lessons/the-rise-of-the-marketing-engineer) as the same kind of builder inside marketing: content, publishing, search, the newsletter.',
  },
  {
    q: 'How is it different from a growth engineer or marketing ops?',
    a: 'Growth engineers usually work in the product’s own code: onboarding, experiments, growth loops. Marketing ops keeps the existing tools and data clean and running. A marketing engineer builds new capability inside marketing ([Nick Lafferty](https://nicklafferty.com/blog/marketing-engineer/) draws the same lines). At a small company, one person often does all three.',
  },
  {
    q: 'What is a technical marketing engineer?',
    a: 'An older, different job, common at companies like [Cisco](https://builtinaustin.com/job/technical-marketing-engineer/3840670), [NVIDIA](https://jobs.anitab.org/companies/nvidia/jobs/87547968-technical-marketing-engineer) and NetApp: the product expert who builds demos and reference designs, writes white papers and trains the sales team. They market a technical product; they don’t build marketing systems.',
  },
  {
    q: 'What is a product marketing engineer?',
    a: 'Mostly a semiconductor title. At [Texas Instruments](https://www.builtinaustin.com/job/product-marketing-engineer/9975381), product marketing engineers own a product line’s roadmap, positioning and pricing, and the role usually asks for an electrical engineering degree.',
  },
  {
    q: 'What is a sales and marketing engineer?',
    a: 'An engineer who sells technical products and explains how they solve a customer’s problem. The [US Bureau of Labor Statistics](https://www.bls.gov/ooh/sales/sales-engineers.htm) counts them as sales engineers, with a median pay of $124,900 in May 2025.',
  },
  {
    q: 'What is a content engineer in marketing?',
    a: 'A marketing engineer focused on content: someone who builds the systems that research, draft, optimize, publish and measure it. In [Ahrefs’ review of 20 content engineer job ads](https://ahrefs.com/blog/what-is-content-engineering/), 85% asked for AI content pipelines.',
  },
  {
    q: 'Is it for agencies or in-house teams?',
    a: 'Both. If you run your own agency, it lets you take on more clients without more people. In-house, it’s how one person keeps a brand publishing every week.',
  },
];

/** "[text](url)" → parts, for rendering sourced answers; plain() gives the text for structured data. */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
export function linkParts(a: string): ({ text: string; href?: string })[] {
  const out: { text: string; href?: string }[] = [];
  let last = 0;
  for (const m of a.matchAll(LINK)) {
    if (m.index! > last) out.push({ text: a.slice(last, m.index) });
    out.push({ text: m[1], href: m[2] });
    last = m.index! + m[0].length;
  }
  if (last < a.length) out.push({ text: a.slice(last) });
  return out;
}
export const plain = (a: string) => a.replace(LINK, '$1');
