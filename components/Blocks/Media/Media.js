import NextImage from 'next/image';

import Columns from '@/components/Columns';

import { buildCMSUrl } from '@/lib/api';

export default function Media({ media: { url, width, height, alternativeText, caption } }) {
  const props = {
    layout: 'responsive',
    src: buildCMSUrl(url),
    width,
    height,
    alt: alternativeText
  };

  return (
    <Columns className="my-6 md:my-20 max-w-8xl px-8 md:pl-10">
      <span />

      <figure>
        <NextImage {...props} />

        {caption && (
          <figcaption className="font-raptor text-s leading-none mt-4">{caption}</figcaption>
        )}
      </figure>
    </Columns>
  );
}
