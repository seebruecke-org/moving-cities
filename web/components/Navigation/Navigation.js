import Link from 'next/link';

import * as styles from './navigation.styles';

const Navigation = ({ items = [] }) => (
  <nav css={styles.navigation}>
    <div css={styles.inner}>
      {items.map(([ href, label ], index) => (
        <Link href={href}>
          <a css={[styles.item, index === 0 && styles.itemActive]}>
            {label}
          </a>
        </Link>
      ))}
    </div>
    </nav>
);

export default Navigation;
