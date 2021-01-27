import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import Link from 'next/link';

import * as styles from './navigation.styles';

const Item = ({ href, children }) => {
  const { asPath } = useRouter();
  const isActive = asPath === href || (href !== '/' && asPath.startsWith(href));

  return (
    <Link href={href}>
      <a css={[styles.item, isActive && styles.itemActive]}>{children}</a>
    </Link>
  );
};

const Navigation = ({ items = [] }) => {
  const i18n = useI18n();

  return (
    <nav css={styles.navigation}>
      <div css={styles.inner}>
        {items.map(([href, label]) => (
          <Item href={`/${i18n.t(href)}`} key={`navigation-${label}`}>
            {i18n.t(label)}
          </Item>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
