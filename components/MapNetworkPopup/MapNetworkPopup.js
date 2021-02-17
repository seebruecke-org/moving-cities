import { Global } from '@emotion/react';
import { useI18n } from 'next-localization';
import Link from 'next/link';

import { Popup } from '../Map';

import { getCitiesCenter } from '../../lib/coordiantes';

import * as styles from './mapNetworkPopup.styles';

export default function MapNetworkPopup({ name, cities, slug }) {
  const i18n = useI18n();
  const { geometry } = getCitiesCenter(cities);

  return (
    <Popup coordinates={geometry.coordinates}>
      <Global styles={styles.resetPopup} />
      <div css={styles.container}>
        <Link href={`/${i18n.t('network.slug')}/${slug}`}>
          <a css={styles.cta}>
            <h3 css={styles.title}>{name}</h3>

            <svg
              width="19"
              height="14"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              css={styles.icon}>
              <path stroke="currentColor" d="M11.47 12.7l6.18-6.18M11.7 1l6.17 6.17M16.94 6.79H0" />
            </svg>
          </a>
        </Link>
      </div>
    </Popup>
  );
}
