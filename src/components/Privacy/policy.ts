/* esy.com's privacy policy, rewritten 2026-11-06 (DRAFT for Zev's review; not legal advice).
   One text, shared by every design take at /prototypes/privacy/. It replaces the July 2025 notice,
   which described the old Esy (student essays, app.esy.com settings) and listed 18 sections but only
   had text for 7. Everything here describes what esy.com and Esy actually run today:
   - Google Analytics and Google Tag Manager, behind the cookie notice (Consent Mode, denied by default);
   - Microsoft Clarity, described here as consent-based. NOTE: src/components/MicrosoftClarity.js loads
     it without checking consent today, so the code has to change before this text goes live;
   - The Marketing Engineer on Resend, with esy.com's own double opt-in (src/app/api/newsletter/subscribe);
   - Cloudflare Turnstile on the waitlist; Scout's analysis of public pages; affiliate links.
   Contact is zev@esy.com (Zev, 2026-11-06), the same address Scout gives for corrections and removals. */

export const UPDATED = 'November 6, 2026';
export const CONTACT = 'zev@esy.com';
export const COMPANY = { name: 'ESY, LLC', lines: ['8 The Green, STE B', 'Dover, DE 19901', 'United States'] };

/** The promise, in one breath: what the page opens with. */
export const PROMISE =
  'We collect as little as we can, we never sell it, and you can see it, fix it or delete it by writing to one person.';

/** The short version: six plain points every take can show before the full text. */
export const SHORT: { title: string; text: string }[] = [
  { title: 'We keep little', text: 'Mostly your email, if you give it to us, and how the site is used, if you allow cookies.' },
  { title: 'We never sell it', text: 'Not your email, not your activity. We share data only with the services that run esy.com for us.' },
  { title: 'Cookies are your call', text: 'Analytics run only after you say yes in the cookie notice, and you can change your mind anytime.' },
  { title: 'Emails are opt-in', text: 'You confirm before you get an issue, and every email has an unsubscribe link.' },
  { title: 'Creators can ask', text: 'Scout analyses public pages. Anyone in it can ask for a correction or removal.' },
  { title: 'One person to write to', text: `Questions, copies, corrections or deletion: ${CONTACT}.` },
];

/** What happens in each situation: the rows of the "what you do" take, and the facts behind the full text. */
export type Situation = { id: string; you: string; keep: string[]; why: string; helpers: string; howLong: string; stop: string };
export const SITUATIONS: Situation[] = [
  {
    id: 'read', you: 'You read esy.com',
    keep: ['Pages you visit, roughly where from (country or city), your device and browser', 'Clicks and scrolling, if you allow analytics cookies'],
    why: 'To see which pages help people, and to fix what’s broken.',
    helpers: 'Google Analytics and Google Tag Manager; Microsoft Clarity. Both only after you accept analytics cookies.',
    howLong: 'As long as those tools’ retention settings keep it.',
    stop: 'Choose essential cookies only in the cookie notice, or change your choice with Cookie settings on this page.',
  },
  {
    id: 'newsletter', you: 'You subscribe to The Marketing Engineer',
    keep: ['Your email address, and your first name if you give it', 'The page and box you signed up from, and the video that sent you there if any', 'Whether you’ve confirmed'],
    why: 'To send you the newsletter, and to learn which pages bring readers.',
    helpers: 'Resend, which stores the list and sends the email.',
    howLong: 'Until you unsubscribe or ask us to delete you.',
    stop: 'Use the unsubscribe link in any email, or write to us to be deleted entirely.',
  },
  {
    id: 'scout', you: 'You ask Scout to map a company',
    keep: ['Your email address', 'The company you asked about'],
    why: 'To send you the map. Asking also signs you up to The Marketing Engineer, which you confirm by email.',
    helpers: 'Resend.',
    howLong: 'Until the map is sent; your subscription, until you unsubscribe.',
    stop: 'Unsubscribe from any email, or write to us.',
  },
  {
    id: 'waitlist', you: 'You join a waitlist',
    keep: ['Your email address', 'A bot check result'],
    why: 'To tell you when it opens, and to keep bots off the list.',
    helpers: 'Cloudflare Turnstile for the bot check.',
    howLong: 'Until it opens and we’ve told you, or until you ask us to remove you.',
    stop: 'Write to us.',
  },
  {
    id: 'apps', you: 'You use an Esy app (Esy OS, Compose)',
    keep: ['Your account (name, email, sign-in)', 'What you create and upload, and how it was made', 'What you send to AI features'],
    why: 'To run the app you signed up for.',
    helpers: 'Our hosting and storage providers, and AI providers (such as Anthropic, OpenAI and Google) for AI features.',
    howLong: 'While your account is open, then as described in How long we keep it.',
    stop: 'Delete what you made in the app, or write to us to close your account.',
  },
  {
    id: 'creator', you: 'You’re a creator or company in Scout',
    keep: ['Your public name, profile photo and accounts', 'Public numbers about your posts, and your public offers and prices, with the day we read them'],
    why: 'Independent analysis of how creators and companies market themselves, published as commentary.',
    helpers: 'None beyond our hosting. We read only public pages and posts.',
    howLong: 'While the analysis is published; refreshed or retired as pages change.',
    stop: `Write to ${CONTACT} for a correction or removal, or to object.`,
  },
];

/** The full policy, in numbered sections. `short` is each section's plain one-line answer. */
export type Block = string | { list: string[] } | { situations: true } | { address: true };
export type Section = { id: string; title: string; short: string; body: Block[] };

export const SECTIONS: Section[] = [
  {
    id: 'who', title: 'Who we are',
    short: 'ESY, LLC runs esy.com, The Marketing Engineer, Scout and the Esy apps.',
    body: [
      'This policy covers esy.com and its pages (including AI Marketing News, courses and Scout), The Marketing Engineer newsletter, and the Esy apps you sign in to, such as Esy OS and Compose. “We” means ESY, LLC.',
      { address: true },
    ],
  },
  {
    id: 'collect', title: 'What we collect, and when',
    short: 'It depends on what you do. Here is each case.',
    body: [
      'We only collect what a situation needs. For each one: what we keep, why, who helps us, how long, and how to stop.',
      { situations: true },
      'We don’t ask for sensitive information (health, beliefs and the like), and we don’t buy information about you from anyone.',
    ],
  },
  {
    id: 'use', title: 'How we use it',
    short: 'To send what you asked for, run the site and apps, and improve them.',
    body: [
      { list: [
        'Send you the newsletter, maps and messages you asked for',
        'Run your account and the apps you use',
        'Understand which pages and issues help people, in aggregate',
        'Keep bots and abuse out',
        'Meet our legal obligations',
      ] },
      'We don’t use your information to make decisions about you that have legal or similar effects.',
    ],
  },
  {
    id: 'bases', title: 'Our legal bases',
    short: 'Your consent, our agreement with you, or a legitimate interest you can object to.',
    body: [
      'If you’re in the UK, the EU or a place with similar laws, we rely on:',
      { list: [
        'Consent: for analytics cookies and the newsletter. You can withdraw it anytime.',
        'Contract: to run an account or a service you signed up for.',
        'Legitimate interests: to keep the site secure, and to publish Scout’s analysis of public pages as commentary. You can object, and we’ll weigh it.',
        'Legal obligation: when the law requires us to keep or share something.',
      ] },
    ],
  },
  {
    id: 'share', title: 'Who we share it with',
    short: 'Only the services that run things for us. We never sell it.',
    body: [
      'We share information with service providers who act on our instructions:',
      { list: [
        'Resend: stores the newsletter list and sends our email',
        'Google (Analytics, Tag Manager) and Microsoft (Clarity): site analytics, with your consent',
        'Cloudflare: bot checks on forms',
        'Our hosting and storage providers',
        'AI providers, such as Anthropic, OpenAI and Google: only for AI features in the Esy apps',
      ] },
      'We may also share information if the law requires it, to protect people’s safety or our rights, or as part of a sale or merger of the business, in which case this policy keeps applying.',
      'We don’t sell your personal information, and we don’t share it for cross-site behavioural advertising.',
    ],
  },
  {
    id: 'cookies', title: 'Cookies',
    short: 'Essential cookies always; analytics only if you say yes.',
    body: [
      'Essential cookies keep the site working and remember your cookie choice. Analytics cookies (Google Analytics, Microsoft Clarity) load only after you accept them in the cookie notice. You can change your choice anytime with Cookie settings on this page, or in your browser.',
      'Some pages link to other companies’ products, and some of those links are affiliate links. When you click one, that company may set its own cookies to credit us for the visit. Their privacy policies cover what they collect.',
    ],
  },
  {
    id: 'scout', title: 'Scout and the people in it',
    short: 'We analyse public pages and posts, and remove or correct on request.',
    body: [
      'Scout publishes independent analysis of how creators and companies market themselves. It uses only what they’ve made public: names, profile photos, accounts, public numbers about their posts, and their offers and prices, each with the day we read it. It isn’t affiliated with or endorsed by anyone shown.',
      `If you’re in Scout, you can ask us to correct something, remove your photo or your page, or object to the analysis: write to ${CONTACT}.`,
    ],
  },
  {
    id: 'keep', title: 'How long we keep it',
    short: 'Only as long as we need it for the reason we collected it.',
    body: [
      'Newsletter details stay until you unsubscribe or ask us to delete them. Account data stays while your account is open; after you close it, we delete it or make it anonymous, unless the law requires us to keep something longer. Analytics data follows the retention set in those tools.',
    ],
  },
  {
    id: 'rights', title: 'Your rights',
    short: 'See it, fix it, delete it, take it with you, or object. Write to us.',
    body: [
      'Depending on where you live, you can ask us to:',
      { list: [
        'Give you a copy of your information',
        'Correct it',
        'Delete it',
        'Send it to you in a format you can take elsewhere',
        'Stop or limit using it, or object to how we use it',
        'Withdraw consent you gave',
      ] },
      `Write to ${CONTACT}. We’ll answer within 30 days, and we won’t treat you differently for asking. If you’re in the UK or EU and unhappy with our answer, you can complain to your data protection authority. California residents have the same rights under the CCPA; we don’t sell or share personal information as it defines those terms.`,
    ],
  },
  {
    id: 'transfers', title: 'Where it’s stored',
    short: 'In the United States, with the usual safeguards.',
    body: [
      'We’re based in the United States, and so are most of our providers. If you’re outside the US, your information is transferred there, under safeguards such as the European Commission’s standard contractual clauses where they’re required.',
    ],
  },
  {
    id: 'security', title: 'Keeping it safe',
    short: 'Encryption in transit, few people with access, and trusted providers.',
    body: [
      'We use encryption in transit, limit who can access information, and choose providers with strong security. No system is perfectly secure, so we’ll tell you promptly if a breach affects you.',
    ],
  },
  {
    id: 'children', title: 'Children',
    short: 'esy.com isn’t for children under 16.',
    body: [
      'Our services aren’t aimed at children under 16, and we don’t knowingly collect their information. If you think a child has given us information, write to us and we’ll delete it.',
    ],
  },
  {
    id: 'changes', title: 'Changes to this policy',
    short: 'We’ll date every change and tell subscribers about big ones.',
    body: [
      'When we change this policy, we update the date at the top. If a change matters to how we use your information, we’ll tell newsletter subscribers and account holders before it takes effect.',
    ],
  },
  {
    id: 'contact', title: 'Contact',
    short: `${CONTACT}, or by post.`,
    body: [`For anything about your information or this policy, write to ${CONTACT}, or by post:`, { address: true }],
  },
];

/** Reopen the cookie notice: it shows whenever no choice is stored. */
export function openCookieSettings() {
  try { localStorage.removeItem('esy-cookie-consent'); } catch { /* storage blocked: the notice shows anyway */ }
  window.location.reload();
}
