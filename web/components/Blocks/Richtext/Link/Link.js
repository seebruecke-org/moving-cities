import NextLink from 'next/link';

import * as styles from './link.styles';

export default function Link({ children, ...props }) {
  return (
    <NextLink {...props}>
      <a css={styles.a}>{children}</a>
    </NextLink>
  );
}
