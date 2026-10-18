// Esy's profiles on each platform: the one list (2026-10-18). /brand#social
// links each platform's picture and banner to its live profile, and the About
// page's links come from here. Add a handle in one line when an account
// exists; a platform with no `href` shows as "Not set up yet".
// Handles from Zev; LinkedIn and Instagram block automated checks, so they're
// written exactly as given.

export type SocialPlatform =
  | 'x' | 'linkedin' | 'linkedin-personal' | 'youtube' | 'instagram' | 'threads' | 'tiktok'
  | 'facebook' | 'bluesky' | 'reddit' | 'pinterest' | 'github' | 'github-personal' | 'skool' | 'substack';

export interface SocialProfile {
  platform: SocialPlatform;
  name: string;
  handle?: string;
  href?: string;
  /** A short qualifier, e.g. "personal" or "via Instagram". */
  note?: string;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  { platform: 'youtube', name: 'YouTube', handle: '@EsyDotCom', href: 'https://www.youtube.com/@EsyDotCom' },
  { platform: 'x', name: 'X', handle: '@ESYdotcom', href: 'https://x.com/ESYdotcom' },
  { platform: 'linkedin', name: 'LinkedIn page', handle: '@ESYdotcom', href: 'https://www.linkedin.com/company/esydotcom' },
  { platform: 'linkedin-personal', name: 'LinkedIn', handle: 'Zev Uhuru', href: 'https://www.linkedin.com/in/zevuhuru/', note: 'personal' },
  { platform: 'instagram', name: 'Instagram', handle: '@ESYdotcom', href: 'https://www.instagram.com/esydotcom/' },
  { platform: 'threads', name: 'Threads', handle: '@ESYdotcom', href: 'https://www.threads.com/@esydotcom', note: 'via Instagram' },
  { platform: 'facebook', name: 'Facebook page', handle: '@ESYdotcom', href: 'https://www.facebook.com/ESYdotcom' },
  { platform: 'github', name: 'GitHub', handle: 'EsyDotCom', href: 'https://github.com/EsyDotCom' },
  { platform: 'github-personal', name: 'GitHub', handle: 'ZevUhuru', href: 'https://github.com/ZevUhuru', note: 'personal' },
  { platform: 'skool', name: 'Skool', handle: 'AI Marketing', href: 'https://www.skool.com/ai-marketing' },
  { platform: 'substack', name: 'Substack', handle: 'zev.esy.com', href: 'https://zev.esy.com' },
  { platform: 'tiktok', name: 'TikTok' },
  { platform: 'bluesky', name: 'Bluesky' },
  { platform: 'reddit', name: 'Reddit' },
  { platform: 'pinterest', name: 'Pinterest' },
];

/** The profile for a platform, if Esy has one. */
export const profileOf = (platform: SocialPlatform) => SOCIAL_PROFILES.find((p) => p.platform === platform);
