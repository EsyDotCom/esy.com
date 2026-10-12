/* The next two issues of The Marketing Engineer, as cover subjects for
   /prototypes/newsletter-topic-cover/ (2026-10-11). Covers stop showing Zev and
   carry the issue's topic instead, in Esy's look. Only the cover header is
   shown: the titles and deks are drafts, and the issues aren't written yet.

   Facts, from the companies' own announcements:
   - Muse: Meta's personal AI agent, launched 2026-09-08. "For tasks that take
     more time, Muse keeps working after people close the app, and comes back
     when something changes or when it needs approval."
     (about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)
   - Dots: OpenAI's always-on agents, launched at DevDay on 2026-09-29. "Start
     with your primary dot, give it a name, and make it your own … over time,
     we envision teams of Dots working together on your behalf."
   - Clay + Claude Code (round 2, 2026-10-11): a tutorial issue, using Claude
     Code to build and run a Clay table. Clay's brand is claymation (its site
     art is handmade clay); Claude's is its warm orange. The title is a draft.

   How the products look, for the covers (press coverage of the launches):
   Dots' default character is a green bean with two diamond eyes, and others
   include a yellow pear in glasses and a bow tie and a blue cloud in a beret;
   Muse's mascot, Jolly, is cream and fuzzy with beady eyes and rosy cheeks. */

export type TopicId = 'muse' | 'dots' | 'clay';

export interface TopicIssue {
  id: TopicId;
  n: number;
  date: string; // YYYY-MM-DD, the planned send date
  title: string;
  dek: string;
  minutes: number;
  /** The one idea the cover has to carry, in a sentence. */
  idea: string;
}

export const TOPIC_ISSUES: TopicIssue[] = [
  {
    id: 'muse',
    n: 4,
    date: '2026-10-15',
    title: 'Meta Muse, set up for AI marketing',
    dek: 'Meta’s new agent keeps working after you close the app and comes back when it needs your OK. How I set it up, and what it changes for AI marketing.',
    minutes: 9,
    idea: 'It keeps working without you, then comes back for your OK.',
  },
  {
    id: 'dots',
    n: 5,
    date: '2026-10-22',
    title: 'OpenAI’s Dots and the always-on marketing team',
    dek: 'Dots work in the background and connect to thousands of apps. What a team of them changes for AI marketing.',
    minutes: 9,
    idea: 'Small agents that go off and do the work, then a team of them.',
  },
  {
    id: 'clay',
    n: 6,
    date: '2026-10-29',
    title: 'Clay and Claude Code: a lead list that builds itself',
    dek: 'A step-by-step tutorial: Claude Code sets up and runs a Clay table for your next campaign, from a raw list to leads worth writing to.',
    minutes: 12,
    idea: 'Raw lists go in, finished leads come out.',
  },
];

/** The topics a take is drawn for: round 1 drew Muse and Dots; round 2 adds Clay. */
export const ROUND_ONE_TOPICS: TopicId[] = ['muse', 'dots'];

/** The issue's name on the page's toggle. */
export const TOPIC_NAMES: Record<TopicId, string> = { muse: 'Meta Muse', dots: 'OpenAI Dots', clay: 'Clay + Claude Code' };

export const findTopic = (id?: string) => TOPIC_ISSUES.find((t) => t.id === id) ?? TOPIC_ISSUES[0];

export const dateLabel = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
