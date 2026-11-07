/* esy.com/cookies, rewritten 2026-11-06 to match what the site actually stores (an inventory of the
   code: src/lib/cookieConsent.js, src/hooks/useNewsletterSubscribe.js, the theme toggles, and the
   analytics loaders in src/app/layout.js). The old page listed a Django CSRF cookie, "writing
   preferences" and "academic research suggestions", none of which esy.com uses, and printed today's
   date as its "last updated". Third-party lifetimes are the vendors' own published defaults and can
   change; the vendors' pages are linked. Same voice and design as /privacy (policy.ts). */

export const COOKIES_UPDATED = 'November 6, 2026';

export const COOKIES_PROMISE = 'Essential storage keeps esy.com working. Everything else waits for your yes.';

export const COOKIES_SHORT: { title: string; text: string }[] = [
  { title: 'Very little by default', text: 'Without your OK we only remember your cookie choice, your theme, and which link brought you here for this visit.' },
  { title: 'Analytics are opt-in', text: 'Google Analytics and Microsoft Clarity load only after you accept analytics cookies.' },
  { title: 'Change it anytime', text: 'Cookie settings on this page brings the choice back. Your browser can clear everything too.' },
];

export type Row = { name: string; who: string; what: string; howLong: string; where: string };
export type Group = { id: string; title: string; when: string; rows: Row[]; vendor?: { label: string; href: string } };

export const GROUPS: Group[] = [
  {
    id: 'essential', title: 'Essential', when: 'Always on. They keep the site working and never leave your device.',
    rows: [
      { name: 'esy-cookie-consent', who: 'esy.com', what: 'Remembers your cookie choice, so we don’t ask on every page.', howLong: 'Until you change it or clear your browser', where: 'Local storage' },
      { name: 'esy-src', who: 'esy.com', what: 'Remembers the link tag that brought you here (?src=…), so a newsletter sign-up in the same visit records where it came from.', howLong: 'Until you close the tab', where: 'Session storage' },
      { name: 'theme-… and ph-theme', who: 'esy.com', what: 'Remembers light or dark mode on the pages that offer a switch.', howLong: 'Until you clear your browser', where: 'Local storage' },
    ],
  },
  {
    id: 'analytics', title: 'Analytics', when: 'Only after you accept analytics cookies.',
    vendor: { label: 'Google’s and Microsoft’s cookie pages', href: 'https://support.google.com/analytics/answer/11397207' },
    rows: [
      { name: '_ga', who: 'Google Analytics', what: 'Tells one visitor’s visits apart from another’s, without knowing who you are.', howLong: '2 years', where: 'Cookie on esy.com' },
      { name: '_ga_<id>', who: 'Google Analytics', what: 'Keeps track of the current visit.', howLong: '2 years', where: 'Cookie on esy.com' },
      { name: '_clck', who: 'Microsoft Clarity', what: 'Recognises a returning visitor in Clarity.', howLong: '1 year', where: 'Cookie on esy.com' },
      { name: '_clsk', who: 'Microsoft Clarity', what: 'Joins the pages of one visit into a single session.', howLong: '1 day', where: 'Cookie on esy.com' },
      { name: 'CLID, MUID', who: 'Microsoft', what: 'Identify the browser to Clarity across Microsoft’s sites.', howLong: '1 year', where: 'Cookies on clarity.ms and Microsoft domains' },
    ],
  },
];

export type Note = { id: string; title: string; short: string; body: string[] };

export const NOTES: Note[] = [
  {
    id: 'what', title: 'What cookies are',
    short: 'Small notes a site leaves in your browser.',
    body: ['Cookies, and the browser’s local and session storage, are small pieces of text a site saves in your browser so it can remember something between pages or visits. Some are set by the site you’re on; others by services it uses, like an analytics tool.'],
  },
  {
    id: 'videos', title: 'Videos we embed',
    short: 'YouTube, in its privacy-enhanced mode where we can.',
    body: ['Most videos on esy.com use YouTube’s privacy-enhanced mode (youtube-nocookie.com), which doesn’t store anything until you press play. A few pages still use the standard YouTube player, which can set YouTube’s own cookies when the video loads. Google’s privacy policy covers those.'],
  },
  {
    id: 'links', title: 'Links to other sites',
    short: 'Once you click away, the other site’s cookies apply.',
    body: ['Some pages link to other companies’ products, and some of those are affiliate links. When you click one, that company may set its own cookies on its own site to credit us for the visit. Their cookie and privacy policies apply there.'],
  },
  {
    id: 'bots', title: 'Bot checks',
    short: 'Our waitlist checks that you’re a person.',
    body: ['The waitlist form uses Cloudflare Turnstile to tell people from bots. It runs in your browser while you fill the form; Cloudflare’s privacy policy covers what it uses.'],
  },
  {
    id: 'choices', title: 'Your choices',
    short: 'Cookie settings on this page, your browser, or Google’s opt-out.',
    body: [
      'Use Cookie settings on this page to see the choice again and change it. You can also clear or block cookies and site storage in your browser’s settings; esy.com keeps working without analytics.',
      'To opt out of Google Analytics on every site, Google offers a browser add-on at tools.google.com/dlpage/gaoptout.',
    ],
  },
  {
    id: 'changes', title: 'Changes and contact',
    short: 'We date every change. Questions go to one person.',
    body: ['When what esy.com stores changes, we update this page and its date. For questions, write to zev@esy.com. How we handle personal information more broadly is in our privacy policy.'],
  },
];
