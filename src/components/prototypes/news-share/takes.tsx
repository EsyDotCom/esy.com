// Sharing and "Add as a preferred source" on an AI Marketing News post
// (2026-10-19). Three takes on the real post page (NewsPostPage), each a
// different place for the share links and Google's preferred-source badge:
//   SH1 · Footer bar   — after the article: Share + icons on the left, the badge
//                        on the right, on a navy band (Zev's reference).
//   SH2 · Top + bottom — a compact row under the byline (link, X, LinkedIn) and
//                        a paper card after the article with one line of why.
//   SH3 · Sticky rail  — a slim rail beside the column while reading; on a
//                        phone a bottom bar with Share (the device's sheet);
//                        the badge after the article and a one-time nudge for /news.

import type { NewsPost, NewsData } from '@/data/news';
import { NewsPostPage } from '@/components/News/News';
import { NativeShare, PreferredSourceBadge, PreferredSourceCard, PreferredSourceNudge, ShareRow } from './parts';
import type { ShareTarget } from './share';
import './news-share.css';

type Props = { post: NewsPost; news: NewsData; target: ShareTarget };

export function TakeFooter({ post, news, target }: Props) {
  return (
    <NewsPostPage
      post={post}
      news={news}
      slots={{
        afterArticle: (
          <div className="nsh-band" data-take="sh1">
            <ShareRow target={target} tag="proto-sh1" />
            <PreferredSourceBadge theme="dark" />
          </div>
        ),
      }}
    />
  );
}

export function TakeTopBottom({ post, news, target }: Props) {
  return (
    <NewsPostPage
      post={post}
      news={news}
      slots={{
        underByline: (
          <div className="nsh-top" data-take="sh2">
            <ShareRow target={target} tag="proto-sh2" only={['x', 'linkedin']} label={false} />
          </div>
        ),
        afterArticle: (
          <div className="nsh-foot" data-take="sh2">
            <ShareRow target={target} tag="proto-sh2" />
            <PreferredSourceCard />
          </div>
        ),
      }}
    />
  );
}

export function TakeRail({ post, news, target }: Props) {
  return (
    <>
      <div className="nsh-nudge-demo">
        <p className="nsh-demo-label">On /news, once per browser:</p>
        <PreferredSourceNudge />
      </div>
      <NewsPostPage
        post={post}
        news={news}
        slots={{
          beside: (
            <div className="nsh-rail" data-take="sh3">
              <ShareRow target={target} tag="proto-sh3" vertical label={false} />
            </div>
          ),
          afterArticle: <PreferredSourceCard />,
        }}
      />
      <div className="nsh-phonebar nsh-proto" data-take="sh3">
        <NativeShare target={target} tag="proto-sh3" />
      </div>
    </>
  );
}
