import { useRouter } from 'next/router';
import Link from 'next/link';

import * as styles from './navigation.styles';

const Item = ({ href, children }) => {
  const { asPath } = useRouter();

  return (
    <Link href={href}>
      <a css={[styles.item, asPath === href && styles.itemActive]}>
        {children}
      </a>
    </Link>
  );
}

const Navigation = ({ items = [] }) => (
  <nav css={styles.navigation}>
    <div css={styles.inner}>
      {items.map(([ href, label ]) => (
        <Item href={href}>
          {label}
        </Item>
      ))}
    </div>
  </nav>
);

export default Navigation;
