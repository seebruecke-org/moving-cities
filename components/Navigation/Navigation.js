import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import Link from 'next/link';

import * as styles from './navigation.styles';

const Item = ({ href, children }) => {
  const { asPath } = useRouter();
  const isActive =
    asPath === href ||
    (href !== '/' && asPath.startsWith(href)) ||
    (href === '/' && asPath.startsWith('/cities'));

  return (
    <Link href={href}>
      <a css={styles.item}>
        <svg
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          css={[styles.icon, isActive && styles.iconActive]}>
          <circle cx="16.5" cy="16.5" r="15.5" stroke="black" strokeWidth="2" />
          <circle cx="16.5" cy="16.5" r="12.5" fill="white" />
        </svg>
        {children}
      </a>
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
};

export default Navigation;
