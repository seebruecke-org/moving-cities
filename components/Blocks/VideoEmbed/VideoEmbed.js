import Columns from '@/components/Columns';
import { getVideoEmbedUrl } from '@/lib/videoEmbed';

export default function VideoEmbed({ url }) {
  return (
    <Columns className="my-6 md:my-20 max-w-8xl px-8 md:pl-10">
      <span />
      <figure>
        <iframe
          src={getVideoEmbedUrl(url)}
          frameBorder="0"
          allowFullScreen
          className="w-full aspect-video"
        />
      </figure>
    </Columns>
  );
}
