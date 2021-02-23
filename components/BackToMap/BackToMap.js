import Link from 'next/link';

import * as styles from './backToMap.styles';

export default function BackToMap({ url }) {
  return (
    <Link href={url}>
      <a css={styles.link}>Back to map</a>
    </Link>
  );
}
