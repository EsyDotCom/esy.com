/* Video article A · Studio: the video in a navy panel on a light page.
 *
 * Topic, title, summary and byline in the reading column; then the player set
 * in a wide navy panel with generous padding, rounded corners and a soft jade
 * glow, so the video reads as a screen on a stage, not a black strip across
 * the page. The transcript sits under the panel. */

import { Byline, TopicKicker } from '@/components/ArticleImage/shared';
import FramedVideo from './FramedVideo';
import { VideoArticleRest, videoDetail, type VideoArticle } from './shared';

export default function VideoStudio(props: VideoArticle) {
  const { article, minutes, topic, segments } = props;
  return (
    <article className="ai av av-studio">
      <header className="ai-col av-head">
        <TopicKicker topic={topic} />
        <h1 className="ai-title">{article.title}</h1>
        {article.description && <p className="ai-dek">{article.description}</p>}
        <Byline publishedAt={article.publishedAt} minutes={minutes} detail={videoDetail(article.durationSeconds)} />
      </header>

      <div className="av-stage">
        <FramedVideo
          frame="studio"
          playbackId={article.muxPlaybackId}
          title={article.title}
          thumbnailUrl={article.thumbnailUrl}
          durationSeconds={article.durationSeconds}
          segments={segments}
          transcriptText={props.transcriptText}
        />
      </div>

      <VideoArticleRest {...props} rootClass="av-studio" />
    </article>
  );
}
