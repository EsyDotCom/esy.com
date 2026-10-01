import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { eventLabel, findPost, findStory, liveStories, postsInStory, publishedPosts } from '@/data/news';

// The share image for every AI Marketing News post and story: the same fact card as
// the page's cover (components/News/FactCard.tsx), at 1200×630. Logos are the
// companies' official SVGs, embedded unchanged.

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'AI Marketing News fact card';

export function generateStaticParams() {
  return [...publishedPosts().map((p) => ({ slug: p.slug })), ...liveStories().map((s) => ({ slug: s.slug }))];
}

const NAVY = '#0A2540';
const JADE = '#00D4AA';

async function asset(path: string) {
  return readFile(join(process.cwd(), 'public', path));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(slug);
  const story = post ? findStory(post.story) : findStory(slug);
  if (!story) return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: NAVY }} />, size);

  const title = post ? post.card.title : story.name;
  const kicker = post ? story.name : 'The story';
  const list = postsInStory(story.slug);
  const facts = post ? post.card.facts : [`${list.length} ${list.length === 1 ? 'post' : 'posts'}`, `Latest news ${eventLabel(list[0]?.eventDate ?? '2026-09')}`];
  const date = post ? `${eventLabel(post.eventDate)}${post.eventDate.length > 7 ? ', ' : ' '}${post.eventDate.slice(0, 4)}` : story.line;

  const [sans, serif, logo] = await Promise.all([
    asset('fonts/noto-sans-regular.ttf'),
    asset('fonts/cormorant-garamond-700-normal.ttf'),
    story.company.logo ? asset(story.company.logo.onDark.replace(/^\//, '')) : Promise.resolve(null),
  ]);
  const logoSrc = logo ? `data:image/svg+xml;base64,${logo.toString('base64')}` : null;

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '66px 72px', background: `linear-gradient(150deg, #061527 0%, ${NAVY} 60%, #0F3460 100%)`, color: '#fff', fontFamily: 'NotoSans' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {logoSrc ? (
            <img src={logoSrc} height={50} alt="" style={{ height: 50 }} />
          ) : (
            <div style={{ fontSize: 54, fontWeight: 700 }}>{story.company.name}</div>
          )}
          <div style={{ display: 'flex', padding: '10px 24px', borderRadius: 999, border: `2px solid ${JADE}`, color: JADE, fontSize: 24, letterSpacing: 3 }}>AI NEWS</div>
        </div>
        <div style={{ display: 'flex', marginTop: 'auto', color: JADE, fontSize: 28, letterSpacing: 3 }}>{kicker.toUpperCase()}</div>
        <div style={{ display: 'flex', margin: '12px 0 34px', fontFamily: 'Cormorant', fontSize: 88, lineHeight: 1.02 }}>{title}</div>
        <div style={{ display: 'flex', gap: 16 }}>
          {facts.map((f) => (
            <div key={f} style={{ display: 'flex', padding: '12px 24px', borderRadius: 14, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.16)', fontSize: 30 }}>{f}</div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 44, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.18)', fontSize: 26, color: 'rgba(255,255,255,0.72)' }}>
          <div style={{ display: 'flex' }}>{date}</div>
          <div style={{ display: 'flex' }}>esy.com/news</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'NotoSans', data: sans, weight: 400, style: 'normal' },
        { name: 'Cormorant', data: serif, weight: 700, style: 'normal' },
      ],
    },
  );
}
