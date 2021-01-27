import { Global } from '@emotion/react';
import { useI18n } from 'next-localization';
import Link from 'next/link';

import { Popup } from '../Map';

import { convertStrapiToMapbox } from '../../lib/coordiantes';

import * as styles from './mapCityPopup.styles';

export default function MapCityPopup({
  name,
  intro,
  coordinates,
  slug,
  country: { slug: countrySlug }
}) {
  const i18n = useI18n();

  return (
    <Popup coordinates={convertStrapiToMapbox(coordinates)}>
      <Global styles={styles.resetPopup} />
      <div css={styles.container}>
        <h3 css={styles.title}>{name}</h3>

        {intro && <p css={styles.intro}>{intro}</p>}

        <Link href={`/${i18n.t('city.slug')}/${countrySlug}/${slug}`}>
          <a css={styles.cta}>{i18n.t('map.toCity')}</a>
        </Link>
      </div>
    </Popup>
  );
}
