/* esy.com/terms, rewritten 2026-11-06 (DRAFT for Zev's review; not legal advice). Same design and
   voice as /privacy and /cookies. Zev's decisions (2026-11-06):
   - The party is ESY, LLC, a Delaware LLC; in Florida it's registered as ESY.COM LLC (ESY LLC was
     taken there). Dover is the postal address, as on /privacy.
   - Disputes stay as they were: Delaware law, 30 days of informal talks, then binding AAA arbitration.
   - Minimum age 16, matching the privacy policy.
   - Nothing is sold on esy.com yet, so there are no payment terms; clip.art and SEOPage are ESY LLC
     brands with their own terms (clip.art/terms; seopage.com has none yet).
   2026-11-07: Scout's section points to scout@esy.com and esy.com/scout/how-we-work/, and says what a
   Scout page is (analysis and opinion on the facts shown); esy.com has no affiliate links, so the
   links section says so.
   The June 2025 terms described "an AI-powered academic writing platform", a 7-day trial and
   auto-renewing subscriptions, and listed 24 sections with text for a handful. */

import type { Section } from './policy';

export const TERMS_UPDATED = 'November 7, 2026';

export const TERMS_PROMISE = 'The deal for using esy.com and the Esy apps, in plain words. Using them means you agree to it.';

export const TERMS_SHORT: { title: string; text: string }[] = [
  { title: 'Free to use', text: 'Nothing on esy.com costs money today. If that changes, you’ll see the price and terms before you pay.' },
  { title: '16 and over', text: 'You need to be at least 16 to use esy.com and the Esy apps.' },
  { title: 'Quote us, credit us', text: 'Share links and quote short parts with credit. Don’t copy whole pieces or scrape the site.' },
  { title: 'Guidance, not guarantees', text: 'We teach and analyse. We don’t promise rankings, revenue or results.' },
  { title: 'Scout is analysis', text: 'Independent analysis of public pages, dated and sourced. Not an endorsement, and it can go out of date.' },
  { title: 'Talk first, then arbitration', text: 'If something goes wrong, we talk for 30 days; if that fails, binding arbitration under Delaware law.' },
];

const CONTACT = 'zev@esy.com';

export const TERMS: Section[] = [
  {
    id: 'agreement', title: 'This agreement',
    short: 'A contract between you and ESY, LLC. Using our services means you accept it.',
    body: [
      'These terms are an agreement between you and ESY, LLC, a Delaware limited liability company (registered to do business in Florida as ESY.COM LLC). They cover esy.com and its pages (including AI Marketing News, articles, courses and Scout), The Marketing Engineer newsletter, and the Esy apps you sign in to, such as Esy OS and Compose (together, “the Services”).',
      'ESY, LLC also runs clip.art and SEOPage. Each has its own terms on its own site, and those apply there.',
      'By using the Services you agree to these terms, our privacy policy and our cookie policy. If you don’t agree, please don’t use them.',
    ],
  },
  {
    id: 'who', title: 'Who can use the Services',
    short: 'Anyone 16 or over who can agree to a contract.',
    body: [
      'You must be at least 16. If you use the Services for a company, you confirm you’re allowed to accept these terms for it, and “you” includes that company.',
    ],
  },
  {
    id: 'content', title: 'Our content, and what you can do with it',
    short: 'It’s ours. Read it, share it, quote short parts with credit.',
    body: [
      'Our articles, newsletters, courses, Scout analyses, designs, software and brand (including the Esy name and logo) belong to ESY, LLC or the people who licensed them to us. You may:',
      { list: [
        'Read, watch and use them for yourself or inside your own business',
        'Share links to them',
        'Quote short parts, with credit to Esy and a link',
      ] },
      'You may not republish whole pieces, sell or resell them, remove our credits, or copy the Services in bulk (by scraping or otherwise), including to build a database or train an AI model, without our written permission.',
    ],
  },
  {
    id: 'scout', title: 'Scout',
    short: 'Independent analysis of public pages. Dated, sourced, and sometimes out of date.',
    body: [
      'Scout analyses how creators and companies market themselves, using only what they’ve made public. Every line says how we know it and when we read it, and a creator’s game plan is our opinion based on the facts shown beside it. Pages change and we can be wrong: audience counts and prices are as shown on the date given, not today. Scout isn’t affiliated with or endorsed by anyone it covers, no one pays to be in it, and it isn’t business, financial or legal advice.',
      'Spotted something wrong, or want a photo or page removed? Write to scout@esy.com. How Scout works, and its corrections log, are at esy.com/scout/how-we-work/.',
    ],
  },
  {
    id: 'guidance', title: 'Guidance, not guarantees',
    short: 'We teach methods. Your results depend on far more than us.',
    body: [
      'What we publish is education and opinion. We don’t promise that following it will get you rankings in search, mentions in AI answers, customers, revenue or any other result. Use your own judgement, and get professional advice where you need it.',
    ],
  },
  {
    id: 'ai', title: 'AI features',
    short: 'AI can be wrong. Check what it gives you before you rely on it.',
    body: [
      'Some features use AI to write, summarise or make images. AI output can be inaccurate, incomplete or similar to what others receive. Review it before you rely on it or publish it; you’re responsible for how you use it and for respecting other people’s rights. Subject to these terms and the law, you may use the output you generate.',
    ],
  },
  {
    id: 'accounts', title: 'Accounts',
    short: 'Keep your details accurate and your login to yourself.',
    body: [
      'If you have an account in an Esy app, keep your details accurate, keep your login secure, and tell us at once if you think someone else has used it. You’re responsible for what happens under your account. Some apps are early access: features may change or disappear.',
    ],
  },
  {
    id: 'yours', title: 'Your content',
    short: 'What you make stays yours. You let us host and process it to run the apps.',
    body: [
      'You keep ownership of what you create or upload in the Esy apps. You give us permission to store, process and display it only as needed to run the Services for you, including sending it to the AI providers described in our privacy policy. You confirm you have the rights to what you upload. We may remove content that breaks these terms.',
    ],
  },
  {
    id: 'rules', title: 'Things you must not do',
    short: 'Nothing illegal, harmful, deceptive or abusive.',
    body: [
      'When using the Services, don’t:',
      { list: [
        'Break the law or anyone’s rights',
        'Scrape, crawl or copy the Services in bulk without permission',
        'Get around security, rate limits or access controls, or test our systems for weaknesses without permission',
        'Upload malware or anything meant to disrupt the Services',
        'Harass, impersonate or mislead anyone, or use the Services to send spam',
        'Copy, reverse-engineer or resell the Esy apps, or use them to build a competing product',
      ] },
    ],
  },
  {
    id: 'links', title: 'Links',
    short: 'Other sites have their own terms. We don’t use affiliate links.',
    body: [
      'We link to other companies’ sites and products. Their terms and privacy policies apply there, and we’re not responsible for them. We don’t use affiliate or sponsored links, and no one pays us to link to them.',
    ],
  },
  {
    id: 'paid', title: 'Paid services',
    short: 'None on esy.com today.',
    body: [
      'Nothing on esy.com or in the Esy apps is sold today. If we start charging for something, we’ll show you the price and the terms that apply before you pay, and those terms will be part of this agreement.',
    ],
  },
  {
    id: 'feedback', title: 'Feedback',
    short: 'Ideas you send us, we may use.',
    body: ['If you send us suggestions or ideas, we may use them without paying you or owing you anything.'],
  },
  {
    id: 'ending', title: 'Changes and ending',
    short: 'We may change or stop a service. Either of us can end this.',
    body: [
      'We may change, pause or stop any part of the Services. You can stop using them at any time. We may suspend or end your access if you break these terms or put the Services or other people at risk. The sections on our content, your content, disclaimers, liability, disputes and the general terms keep applying after that.',
    ],
  },
  {
    id: 'disclaimers', title: 'Disclaimers',
    short: 'The Services come as they are.',
    body: [
      'The Services are provided “as is” and “as available”. To the fullest extent the law allows, we make no promises or warranties about them, express or implied, including that they’ll be accurate, uninterrupted, error-free, fit for a particular purpose or free of infringement.',
    ],
  },
  {
    id: 'liability', title: 'Limits on our liability',
    short: 'If something goes wrong, what we owe you is limited.',
    body: [
      'To the fullest extent the law allows, ESY, LLC won’t be liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, revenue, data or goodwill, arising from the Services or these terms. Our total liability for any claim is limited to the greater of what you paid us for the Services in the 12 months before the claim, or $100.',
      'Some places don’t allow these limits; where that’s so, they apply as far as the law permits.',
    ],
  },
  {
    id: 'indemnity', title: 'Your responsibility to us',
    short: 'If your misuse leads to a claim against us, you cover it.',
    body: [
      'You’ll defend and compensate ESY, LLC for claims, losses and reasonable legal costs that come from your content, your misuse of the Services, or your breaking these terms or the law.',
    ],
  },
  {
    id: 'disputes', title: 'Disputes',
    short: 'Talk first for 30 days; then binding arbitration under Delaware law.',
    body: [
      `If you have a dispute with us, write to ${CONTACT} first and describe it. We’ll both try to settle it informally for at least 30 days.`,
      'If that fails, the dispute will be resolved by binding arbitration administered by the American Arbitration Association under its rules. This means you give up the right to sue in court and to a jury trial.',
      'These terms are governed by the laws of the State of Delaware, without regard to its conflict-of-law rules.',
    ],
  },
  {
    id: 'changes', title: 'Changes to these terms',
    short: 'We’ll date every change and tell you about big ones.',
    body: [
      'When we change these terms, we update the date at the top. If a change is significant, we’ll tell newsletter subscribers and account holders before it takes effect. Using the Services after that means you accept the new terms.',
    ],
  },
  {
    id: 'general', title: 'The rest',
    short: 'The usual legal housekeeping.',
    body: [
      'These terms, with our privacy and cookie policies, are the whole agreement between us about the Services. If a part is found unenforceable, the rest still applies. Not enforcing a term isn’t a waiver of it. You can’t transfer this agreement without our consent; we may transfer it as part of a merger or sale of the business. Nobody else has rights under it.',
    ],
  },
  {
    id: 'contact', title: 'Contact',
    short: `${CONTACT}, or by post.`,
    body: [`Questions about these terms: write to ${CONTACT}, or by post:`, { address: true }],
  },
];
