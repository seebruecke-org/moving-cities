import { useI18n } from 'next-localization';
import Link from 'next/link';

import * as styles from './navigationSecondary.styles';

const NavigationSecondary = ({ isOpen }) => {
  const i18n = useI18n();

  return (
    <nav css={[styles.container, isOpen && styles.containerIsOpen]}>
      <Link href={`/${i18n.t('about.slug')}`}>
        <a css={styles.about}>{i18n.t('about.title')}</a>
      </Link>

      <div css={styles.pagesContainer}>
        <Link href={`/${i18n.t('contact.slug')}`}>
          <a css={styles.item}>{i18n.t('contact.title')}</a>
        </Link>

        <Link href={`/${i18n.t('imprint.slug')}`}>
          <a css={styles.item}>{i18n.t('imprint.title')}</a>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationSecondary;
