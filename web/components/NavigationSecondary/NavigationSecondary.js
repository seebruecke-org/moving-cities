import Link from 'next/link';

import * as styles from './navigationSecondary.styles';

const NavigationSecondary = ({ isOpen }) => (
  <nav css={[styles.container, isOpen && styles.containerIsOpen]}>
    <Link href="/about">
      <a css={styles.about}>About</a>
    </Link>

    <Link href="/contact">
      <a css={styles.item}>Contact</a>
    </Link>

    <Link href="/imprint">
      <a css={styles.item}>Imprint</a>
    </Link>
  </nav>
);

export default NavigationSecondary;
