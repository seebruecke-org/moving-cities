import { useRouter } from 'next/router';
import Link from 'next/link';

import theme from '../../lib/styles/theme';

import * as styles from './navigation.styles';

const Item = ({ href, type, children }) => {
  const { asPath } = useRouter();

  return (
    <Link href={href}>
      <a css={[styles.item, asPath === href && styles.itemActive, theme(type)]}>
        {children}
      </a>
    </Link>
  );
}

const Navigation = ({ items = [] }) => (
  <nav css={styles.navigation}>
    <div css={styles.inner}>
      {items.map(([ href, label ]) => (
        <Item href={href} type={label.toLowerCase()}>
          {label}
        </Item>
      ))}
    </div>
  </nav>
);

export default Navigation;
