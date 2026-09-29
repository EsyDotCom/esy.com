import YouTubeBanner from '@/components/LinkedInBanner/YouTubeBanner';

// The bare 2560×1440 channel art: what scripts/export-linkedin-banners.mjs
// screenshots into public/prototypes/linkedin-banner/youtube-desk.jpg.
export const metadata = { robots: { index: false, follow: false } };

export default function RawYouTubeBanner() {
  return (
    <div id="banner" style={{ width: 2560, height: 1440 }}>
      <YouTubeBanner />
    </div>
  );
}
