import NextImage from 'next/image';

import Columns from '@/components/Columns';

import { buildCMSUrl } from '@/lib/api';

export default function Media({ media: { url, width, height } }) {
  const props = {
    layout: 'responsive',
    src: buildCMSUrl(url),
    width,
    height
  };

  return (
    <Columns className="my-6 md:my-20 max-w-8xl px-8 md:pl-10">
      <span />

      <NextImage {...props} />
    </Columns>
  );
}
