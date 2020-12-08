import Link from 'next/link';

import * as styles from './navigationSecondary.styles';

const NavigationSecondary = () => <nav css={styles.container}>
  <Link href="/about">
    <a css={styles.about}>
      About
    </a>
  </Link>

  <Link href="/contact">
    <a css={styles.item}>
      Contact
    </a>
  </Link>

  <Link href="/imprint">
    <a css={styles.item}>
      Imprint
    </a>
  </Link>
</nav>;

export default NavigationSecondary;
