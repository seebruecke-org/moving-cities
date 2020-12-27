import Link from 'next/link';

import * as styles from './navigationSecondary.styles';

const NavigationSecondary = ({ isOpen }) => (
  <nav css={[styles.container, isOpen && styles.containerIsOpen]}>
    <Link href="/about">
      <a css={styles.about}>About</a>
    </Link>

    <div css={styles.pagesContainer}>
      <Link href="/contact">
        <a css={styles.item}>Contact</a>
      </Link>

      <Link href="/imprint">
        <a css={styles.item}>Imprint</a>
      </Link>
    </div>
  </nav>
);

export default NavigationSecondary;
