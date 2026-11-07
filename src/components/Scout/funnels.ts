// Scout's funnel maps, as published on esy.com/scout (2026-11-07).
// Copied from the scout.esy.com repo (src/components/prototypes/funnel-data.ts, round 3, 2026-11-06),
// where each map is studied. n8n, Gamma and Clay were read from each company's own public pages on
// 2026-11-06, and every place carries its source; Nate Herk's map is drawn from his Scout file.
// Answers describe a funnel's shape, never "most people": we don't have anyone's traffic.
//
// The columns are places, not buyer stages:
//   Found  where people first come across them
//   Land   the first thing they do (a free plan, a trial, a free community, an email)
//   Pay    what they pay for, cheapest first

/** How we know a place or route: Scout's four marks. */
export type Basis = 'counted' | 'seen' | 'reading' | 'open';
export const BASIS: Record<Basis, { name: string; says: string }> = {
  counted: { name: 'Counted', says: 'Worked out from the videos and posts we captured.' },
  seen: { name: 'Seen', says: 'On a public page or profile, with the link.' },
  reading: { name: 'Esy’s reading', says: 'Our reading of the evidence. Check it.' },
  open: { name: 'Not checked', says: 'Needs a sign-up, or data only they have.' },
};

export type Col = 'found' | 'land' | 'pay';
export const COLS: { key: Col; label: string; sub: string }[] = [
  { key: 'found', label: 'Found', sub: 'Where people first come across them' },
  { key: 'land', label: 'Land', sub: 'The first thing people do' },
  { key: 'pay', label: 'Pay', sub: 'What people pay for, cheapest first' },
];

// `source` is the public page a place was read from (checked 2026-11-06 for n8n and Clay).
export type FNode = { id: string; col: Col; name: string; note: string; basis: Basis; figure?: string; source?: string };
// A link is a route people take. Forward links go right; one to an earlier column is the loop.
export type FLink = { from: string; to: string; basis: Basis; note?: string };

export type Funnel = {
  id: string; name: string; kind: 'company' | 'creator'; real: boolean; read?: string; avatarFrom?: string;
  title: string; answer: string;
  move: { text: string; path: string[]; loop?: boolean };
  trigger: string; between?: { text: string; basis: Basis };
  nodes: FNode[]; links: FLink[];
};

const n8n: Funnel = {
  id: 'n8n', name: 'n8n', kind: 'company', real: true, read: '2026-11-06',
  title: 'How n8n gets its customers',
  answer: 'n8n’s front door is its 14,000+ template pages and the creators who teach it. “Use for free” starts a 14-day cloud trial with no card, and plans are priced by workflow executions, from €20 a month billed yearly.',
  move: { text: 'Every template is its own page with a “Use for free” button that starts a cloud trial with that template, and creators who publish templates can earn 30% of referrals through n8n’s affiliate program.', path: ['templates', 'trial', 'cloud'], loop: true },
  trigger: 'Pay by monthly workflow executions',
  between: { text: 'Unless they upgrade, the trial is deleted after 14 days. Onboarding emails: not checked.', basis: 'seen' },
  nodes: [
    { id: 'templates', col: 'found', name: 'Template pages', figure: '14,005', note: 'Each template has its own page and a “Use for free” button; community creators publish many of them.', basis: 'seen', source: 'https://n8n.io/workflows/' },
    { id: 'creators', col: 'found', name: 'Creators and affiliates', figure: '30% for 12 mo', note: 'Creators such as Nate Herk teach n8n builds; its affiliate program pays 30% of referrals for 12 months, on n8n Cloud.', basis: 'seen', source: 'https://n8n.io/affiliates/' },
    { id: 'integrations', col: 'found', name: 'Integration pages', figure: '2,600+', note: 'One page per app it connects to (2,629 counted on the page).', basis: 'seen', source: 'https://n8n.io/integrations/' },
    { id: 'youtube', col: 'found', name: 'n8n on YouTube', figure: '252K', note: 'Its own channel, @n8n-io.', basis: 'seen', source: 'https://www.youtube.com/@n8n-io' },
    { id: 'forum', col: 'found', name: 'Community forum', note: 'The official forum, plus a Discord.', basis: 'seen', source: 'https://community.n8n.io/' },
    { id: 'search', col: 'found', name: 'Search, AI answers, ads', note: 'Not checked yet: what it ranks for, what AI assistants say about it, and the ad libraries.', basis: 'open' },
    { id: 'self', col: 'land', name: 'Host it yourself', figure: 'Free', note: 'The Community Edition, on GitHub.', basis: 'seen', source: 'https://n8n.io/pricing/' },
    { id: 'trial', col: 'land', name: 'Cloud trial', figure: '14 days', note: 'Pro features, up to 1,000 executions, no credit card.', basis: 'seen', source: 'https://docs.n8n.io/manage-cloud/cloud-free-trial' },
    { id: 'cloud', col: 'pay', name: 'Starter and Pro', figure: 'From €20/mo', note: 'Billed yearly: Starter €20 a month for 2.5K executions, Pro €50 for 10K.', basis: 'seen', source: 'https://n8n.io/pricing/' },
    { id: 'ent', col: 'pay', name: 'Business and Enterprise', figure: 'From €667/mo', note: 'Business is self-hosted, billed yearly; Enterprise is “Contact Sales”. Self-hosted Business and Enterprise need a licence key.', basis: 'seen', source: 'https://n8n.io/pricing/' },
  ],
  links: [
    { from: 'templates', to: 'trial', basis: 'seen', note: '“Use for free” offers a cloud sign-up with the template already in it.' },
    { from: 'templates', to: 'self', basis: 'seen', note: 'The same button also offers the self-hosting docs.' },
    { from: 'creators', to: 'trial', basis: 'seen', note: 'The affiliate program pays on n8n Cloud.' },
    { from: 'integrations', to: 'trial', basis: 'reading' },
    { from: 'youtube', to: 'trial', basis: 'reading' },
    { from: 'forum', to: 'self', basis: 'reading' },
    { from: 'search', to: 'trial', basis: 'open' },
    { from: 'trial', to: 'cloud', basis: 'seen', note: 'Upgrade, or the trial instance is deleted.' },
    { from: 'self', to: 'ent', basis: 'seen', note: 'Business and Enterprise features on your own server need a licence key.' },
    { from: 'trial', to: 'templates', basis: 'seen', note: 'Users publish templates: n8n reviews each one, and after three approvals a creator is verified and can sell paid ones.' },
  ],
};

const gamma: Funnel = {
  id: 'gamma', name: 'Gamma', kind: 'company', real: true, read: '2026-11-06',
  title: 'How Gamma gets its customers',
  answer: 'Gamma’s free decks carry a “Made with Gamma” badge wherever they’re shared or exported. Signing up is free, with 400 credits that don’t refresh, and paying, from $9 a month billed yearly, removes the badge and adds monthly credits.',
  move: { text: 'Every deck a free user shares or exports carries the “Made with Gamma” badge, so each free user shows Gamma to everyone they send a deck to.', path: ['badge', 'free', 'plus'], loop: true },
  trigger: 'Pay when the 400 credits run out, or to remove the badge',
  nodes: [
    { id: 'badge', col: 'found', name: 'Decks people share', note: 'Free decks show the “Made with Gamma” badge on shared links and on PDF, PowerPoint and PNG exports; viewers need no account.', basis: 'seen', source: 'https://help.gamma.app/en/articles/11047226-how-do-collaboration-and-sharing-settings-work-in-gamma' },
    { id: 'referrals', col: 'found', name: 'Referrals', figure: '200 credits each', note: 'Free users earn 200 credits for each person they refer, up to 2,000.', basis: 'seen', source: 'https://help.gamma.app/en/articles/7834324-how-do-credits-work-in-gamma' },
    { id: 'affiliates', col: 'found', name: 'Affiliates', figure: '25% first year', note: 'An affiliate program, on PartnerStack, paying 25% of first-year revenue.', basis: 'seen', source: 'https://help.gamma.app/en/articles/11048092-how-do-i-join-the-gamma-affiliate-program' },
    { id: 'templates', col: 'found', name: 'Template gallery', figure: '100+', note: 'Free templates in about 20 categories.', basis: 'seen', source: 'https://gamma.app/templates' },
    { id: 'search', col: 'found', name: 'Search, AI answers, ads', note: 'Not checked yet.', basis: 'open' },
    { id: 'free', col: 'land', name: 'Free plan', figure: '400 credits', note: '400 credits at sign-up that don’t refresh; no credit card.', basis: 'seen', source: 'https://gamma.app/pricing' },
    { id: 'plus', col: 'pay', name: 'Plus', figure: 'From $9/mo', note: 'Billed yearly ($12 monthly): 1,500 credits a month and no badge.', basis: 'seen', source: 'https://gamma.app/pricing' },
    { id: 'pro', col: 'pay', name: 'Pro', figure: 'From $18/mo', note: 'Billed yearly ($25 monthly): 4,000 credits a month, analytics and custom domains.', basis: 'seen', source: 'https://gamma.app/pricing' },
    { id: 'ultra', col: 'pay', name: 'Ultra', figure: 'From $90/mo', note: 'Billed yearly ($100 monthly): 20,000 credits a month and the newest models.', basis: 'seen', source: 'https://gamma.app/pricing' },
    { id: 'business', col: 'pay', name: 'Business and Enterprise', figure: '$40/seat/mo', note: 'Business is billed yearly, with single sign-on and shared credits; Enterprise is custom.', basis: 'seen', source: 'https://gamma.app/pricing' },
  ],
  links: [
    { from: 'badge', to: 'free', basis: 'reading', note: 'Viewers see the badge on every free deck; where it leads wasn’t checked.' },
    { from: 'referrals', to: 'free', basis: 'seen' },
    { from: 'affiliates', to: 'free', basis: 'reading' },
    { from: 'templates', to: 'free', basis: 'reading' },
    { from: 'search', to: 'free', basis: 'open' },
    { from: 'free', to: 'plus', basis: 'seen', note: 'Plus is the lowest plan that removes the badge.' },
    { from: 'free', to: 'pro', basis: 'seen' },
    { from: 'pro', to: 'ultra', basis: 'reading' },
    { from: 'pro', to: 'business', basis: 'reading' },
    { from: 'free', to: 'badge', basis: 'seen', note: 'Each deck a free user shares or exports carries the badge.' },
  ],
};

const clay: Funnel = {
  id: 'clay', name: 'Clay', kind: 'company', real: true, read: '2026-11-06',
  title: 'How Clay gets its customers',
  answer: 'Clay grows through the people who build on it: 196 listed partner agencies, a 35K-member Slack, and, in Clay’s words, customers who post their builds on LinkedIn. People land on a free plan or in Clay University, and pay for actions and data credits from $54 a month, billed yearly.',
  move: { text: 'Clay turns its users into its distribution: partner agencies get a directory listing, co-marketing grants and 20% referral revenue, and Clay says some customers have gone on to start GTM agencies of their own.', path: ['agencies', 'free', 'launch'], loop: true },
  trigger: 'Pay for more actions and data credits',
  nodes: [
    { id: 'agencies', col: 'found', name: 'Solutions partners', figure: '196 listed', note: 'A public directory of partner agencies; partners get grants of $500 to $15,000 and 20% referral revenue.', basis: 'seen', source: 'https://www.clay.com/partners/solutions' },
    { id: 'linkedin', col: 'found', name: 'Builds posted on LinkedIn', note: 'Clay’s word: customers post what they build in Clay on LinkedIn, and viewers sign up.', basis: 'seen', source: 'https://www.clay.com/blog/behind-the-scenes-of-clays-marketing-and-growth' },
    { id: 'community', col: 'found', name: 'Community', figure: '35K in Slack', note: 'A Slack, a forum, Clay Clubs in 90+ cities and 250+ events a year.', basis: 'seen', source: 'https://www.clay.com/community' },
    { id: 'templates', col: 'found', name: 'Templates', figure: '~95', note: 'A public library of free Clay templates.', basis: 'seen', source: 'https://www.clay.com/templates' },
    { id: 'search', col: 'found', name: 'Search, AI answers, ads', note: 'Not checked yet.', basis: 'open' },
    { id: 'university', col: 'land', name: 'Clay University', figure: 'Free cohorts', note: '16 self-paced courses, and cohorts that are free to join by application.', basis: 'seen', source: 'https://university.clay.com' },
    { id: 'free', col: 'land', name: 'Free plan', figure: '500 actions/mo', note: '500 actions and 100 data credits a month, plus a 14-day trial of paid features.', basis: 'seen', source: 'https://www.clay.com/pricing' },
    { id: 'launch', col: 'pay', name: 'Launch', figure: 'From $54/mo', note: 'Billed yearly ($60 billed monthly): 15K actions and 3K data credits a month. Clay’s FAQ gives a different starting price.', basis: 'seen', source: 'https://www.clay.com/pricing' },
    { id: 'growth', col: 'pay', name: 'Growth', figure: 'From $185/mo', note: 'Billed yearly ($205 billed monthly): 40K actions and 6K data credits a month.', basis: 'seen', source: 'https://www.clay.com/pricing' },
    { id: 'ent', col: 'pay', name: 'Enterprise', figure: 'Custom', note: '“Get a demo”; an annual commitment.', basis: 'seen', source: 'https://www.clay.com/pricing' },
  ],
  links: [
    { from: 'agencies', to: 'free', basis: 'reading', note: 'Clients work in Clay alongside their agency.' },
    { from: 'linkedin', to: 'free', basis: 'seen', note: 'Clay’s word: viewers of posted builds sign up.' },
    { from: 'community', to: 'university', basis: 'seen', note: 'Cohorts ask you to join the Slack first.' },
    { from: 'templates', to: 'free', basis: 'reading' },
    { from: 'search', to: 'free', basis: 'open' },
    { from: 'university', to: 'free', basis: 'reading' },
    { from: 'free', to: 'launch', basis: 'seen' },
    { from: 'launch', to: 'growth', basis: 'reading' },
    { from: 'growth', to: 'ent', basis: 'reading' },
    { from: 'launch', to: 'agencies', basis: 'seen', note: 'Clay’s word: customers have started GTM agencies of their own, some past $1M a year.' },
  ],
};

// Nate Herk: from his Scout file (game plan, routes and ladder, all as recorded there).
const nate: Funnel = {
  id: 'nate', name: 'Nate Herk', kind: 'creator', real: true, avatarFrom: 'nate',
  title: 'How Nate Herk gets his buyers',
  answer: 'Nate’s funnel runs from a daily YouTube tutorial to his free Skool, or a PDF for an email, and up to AIS+ at $129 a month.',
  move: { text: 'One free Skool sits in the middle of everything: every video points there, and AIS+ is the one paid step above it.', path: ['youtube', 'skool', 'ais'] },
  trigger: 'Upgrade for courses, weekly Q&As and events',
  nodes: [
    { id: 'youtube', col: 'found', name: 'YouTube tutorials', figure: '1.11M', note: 'A tutorial a day, plus 5- to 10-hour free courses.', basis: 'seen' },
    { id: 'x', col: 'found', name: 'Builds on X', figure: '37.6K', note: 'About 2.8 posts a day; the profile links only YouTube.', basis: 'counted' },
    { id: 'skool', col: 'land', name: 'Free Skool', figure: '479.8K', note: 'Templates, Claude Code skills, a 7-day challenge.', basis: 'seen' },
    { id: 'pdf', col: 'land', name: 'A PDF for an email', figure: 'Free', note: 'Link 1 on 4 of his 6 newest videos.', basis: 'seen' },
    { id: 'affiliate', col: 'pay', name: 'Affiliate links', figure: 'Paid by the tools', note: 'Glaido and Hostinger, on all 6 newest videos.', basis: 'seen' },
    { id: 'ais', col: 'pay', name: 'AIS+', figure: '$129/mo', note: 'Courses, weekly Q&As, three online conferences a year.', basis: 'seen' },
    { id: 'cert', col: 'pay', name: 'Certified AI Consultant', figure: '$1,000 deposit', note: '10 weeks, a graded portfolio and a live interview.', basis: 'seen' },
    { id: 'agency', col: 'pay', name: 'Uppit AI', figure: 'No prices shown', note: 'His agency: “Work with me” on his site.', basis: 'seen' },
  ],
  links: [
    { from: 'x', to: 'youtube', basis: 'seen', note: 'The only link in his X profile.' },
    { from: 'youtube', to: 'skool', basis: 'seen', note: 'On all 6 newest videos.' },
    { from: 'youtube', to: 'pdf', basis: 'seen', note: 'Link 1 on 4 of 6.' },
    { from: 'youtube', to: 'ais', basis: 'seen', note: 'On 4 of 6, right after the PDF.' },
    { from: 'youtube', to: 'affiliate', basis: 'seen' },
    { from: 'skool', to: 'ais', basis: 'reading', note: 'The paid tier sits above the free group.' },
    { from: 'ais', to: 'cert', basis: 'reading' },
    { from: 'youtube', to: 'agency', basis: 'reading' },
  ],
};

export const FUNNELS: Funnel[] = [n8n, gamma, clay, nate];

export const colIndex = (c: Col) => COLS.findIndex((x) => x.key === c);
export const nodeOf = (f: Funnel, id: string) => f.nodes.find((n) => n.id === id)!;
// A link back to an earlier column (or the same one from further right) is the loop.
export const isLoop = (f: Funnel, l: FLink) => colIndex(nodeOf(f, l.to).col) < colIndex(nodeOf(f, l.from).col);
export const onMove = (f: Funnel, l: FLink) => {
  const p = f.move.path;
  const i = p.indexOf(l.from);
  if (i >= 0 && p[i + 1] === l.to) return true;
  // The loop is part of the move when the move says so: from a step on the path back to its start.
  return !!f.move.loop && isLoop(f, l) && p.includes(l.from) && p.includes(l.to);
};
