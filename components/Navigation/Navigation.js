import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import Link from 'next/link';

import theme from '../../lib/styles/theme';

import * as styles from './navigation.styles';

const Item = ({ href, type, children }) => {
  const { asPath } = useRouter();

  return (
    <Link href={href}>
      <a css={[styles.item, asPath === href && styles.itemActive, theme(type)]}>{children}</a>
    </Link>
  );
};

const Navigation = ({ items = [] }) => {
  const i18n = useI18n();

  return (
    <nav css={styles.navigation}>
      <div css={styles.inner}>
        {items.map(([href, label]) => (
          <Item href={`/${i18n.t(href)}`} key={`navigation-${label}`} type={label.toLowerCase()}>
            {i18n.t(label)}
          </Item>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
