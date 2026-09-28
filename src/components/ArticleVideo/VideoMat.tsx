/* Video article C · Mat: the video hung like a framed print.
 *
 * A split opening on a quiet light ground: topic, title, summary and byline
 * on the left, and the player on the right set in a light mat, a white inner
 * border and a hairline shadow, the way a print is mounted on a wall. The
 * transcript sits under the opening. */

import { Byline, TopicKicker } from '@/components/ArticleImage/shared';
import FramedVideo from './FramedVideo';
import { VideoArticleRest, videoDetail, type VideoArticle } from './shared';

export default function VideoMat(props: VideoArticle) {
  const { article, minutes, topic, segments } = props;
  return (
    <article className="ai av av-mat">
      <FramedVideo
        frame="mat"
        playbackId={article.muxPlaybackId}
        title={article.title}
        thumbnailUrl={article.thumbnailUrl}
        durationSeconds={article.durationSeconds}
        segments={segments}
        transcriptText={props.transcriptText}
        side={
          <header className="av-mat-head">
            <TopicKicker topic={topic} />
            <h1 className="ai-title">{article.title}</h1>
            {article.description && <p className="ai-dek">{article.description}</p>}
            <Byline publishedAt={article.publishedAt} minutes={minutes} detail={videoDetail(article.durationSeconds)} />
          </header>
        }
      />
      <VideoArticleRest {...props} rootClass="av-mat" />
    </article>
  );
}
