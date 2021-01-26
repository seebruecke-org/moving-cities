import NextImage from 'next/image';

import * as styles from './image.styles';

export default function Image({ media, caption }) {
  if (!media) {
    return null;
  }

  const { alternativeText, url, height, width } = media;

  return (
    <figure css={styles.container}>
      <NextImage
        src={`${process.env.IMAGE_BASE}${url}`}
        alt={alternativeText}
        width={width}
        height={height}
      />

      {caption && <figcaption css={styles.figcaption}>{caption}</figcaption>}
    </figure>
  );
}
