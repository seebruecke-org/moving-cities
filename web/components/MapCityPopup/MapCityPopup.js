import { Global } from '@emotion/react';
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
  return (
    <Popup coordinates={convertStrapiToMapbox(coordinates)}>
      <Global styles={styles.resetPopup} />
      <div css={styles.container}>
        <h3 css={styles.title}>{name}</h3>

        {intro && <p css={styles.intro}>{intro}</p>}

        <Link href={`/cities/${countrySlug}/${slug}`}>
          <a css={styles.cta}>Visit City Profile</a>
        </Link>
      </div>
    </Popup>
  );
}
