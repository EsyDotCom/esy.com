/* Video article B · Theater: the video centred in a dark room.
 *
 * A navy opening like the image-led cover: topic, title, summary and byline
 * in white, then the player centred beneath with plenty of dark space around
 * it, a spotlight glow behind and a thin jade ring, like a screen in a
 * cinema. The transcript sits under the room, on the light page. */

import { Byline, TopicKicker } from '@/components/ArticleImage/shared';
import FramedVideo from './FramedVideo';
import { VideoArticleRest, videoDetail, type VideoArticle } from './shared';

export default function VideoTheater(props: VideoArticle) {
  const { article, minutes, topic, segments } = props;
  return (
    <article className="ai av av-theater">
      <FramedVideo
        frame="theater"
        playbackId={article.muxPlaybackId}
        title={article.title}
        thumbnailUrl={article.thumbnailUrl}
        durationSeconds={article.durationSeconds}
        segments={segments}
        transcriptText={props.transcriptText}
        header={
          <header className="av-theater-head">
            <TopicKicker topic={topic} onDark />
            <h1 className="ai-title ai-title--onDark">{article.title}</h1>
            {article.description && <p className="ai-dek ai-dek--onDark">{article.description}</p>}
            <Byline publishedAt={article.publishedAt} minutes={minutes} detail={videoDetail(article.durationSeconds)} onDark />
          </header>
        }
      />
      <VideoArticleRest {...props} rootClass="av-theater" />
    </article>
  );
}
