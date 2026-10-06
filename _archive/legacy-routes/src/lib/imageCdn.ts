// Lightweight image CDN helper with Cloudflare Images support.
// 
// Goals:
// - Keep local `/public` image paths working in dev and before migration
// - Allow opting into Cloudflare Images via env + mapping
// - Make it easy to gradually move specific images (e.g., OG hero images)
//
// Usage:
//   import { cdnImageSrc } from '@/lib/imageCdn';
//   <Image src={cdnImageSrc('/og/the-word-essay.png')} ... />
//
// Configuration:
// - Set NEXT_PUBLIC_IMAGE_CDN_PROVIDER=cloudflare to enable mapping
// - Fill in CLOUDFLARE_IMAGE_MAP entries with your Cloudflare Image URLs

const CLOUD_PROVIDER = process.env.NEXT_PUBLIC_IMAGE_CDN_PROVIDER;

// Map original local paths → Cloudflare Images URLs.
// NOTE: These are placeholders; update the values after uploading to Cloudflare.
const CLOUDFLARE_IMAGE_MAP: Record<string, string> = {
  // Homepage curated gallery / OG heroes
  // '/og/the-word-essay.png': 'https://imagedelivery.net/YOUR_HASH/the-word-essay-id/public',
  // '/og/the-origin-of-toy.png': 'https://imagedelivery.net/YOUR_HASH/the-origin-of-toy-id/public',
  // '/og/the-history-of-languages.png': 'https://imagedelivery.net/YOUR_HASH/the-history-of-languages-id/public',
  // '/og/how-money-is-created.png': 'https://imagedelivery.net/YOUR_HASH/how-money-is-created-id/public',
};

export function cdnImageSrc(src: string): string {
  if (CLOUD_PROVIDER === 'cloudflare') {
    const mapped = CLOUDFLARE_IMAGE_MAP[src];
    if (mapped) return mapped;
  }

  // Default: return the original src so local /public assets keep working.
  return src;
}













