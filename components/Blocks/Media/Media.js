import NextImage from 'next/image';

import Columns from '@/components/Columns';

export default function Media({ media: { url, width, height } }) {
  const props = {
    layout: 'responsive',
    src: `http://localhost:1337${url}`,
    width,
    height
  };

  return (
    <Columns className="my-6 md:my-20 max-w-8xl pl-8 pr-8">
      <span />

      <NextImage {...props} />
    </Columns>
  );
}
