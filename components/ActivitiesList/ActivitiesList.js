import Link from 'next/link';

import * as styles from './activitiesList.styles';

const ActivitiesList = ({ activities = [] }) => (
  <ul css={styles.list}>
    {activities.map(
      ({
        title,
        city: {
          name: cityName,
          slug: citySlug,
          country: { slug: countrySlug }
        }
      }) => (
        <li css={styles.item}>
          <Link href={`/cities/${countrySlug}/${citySlug}#chapter-4`}>
            <a css={styles.link}>
              <span css={styles.linkContent}>{title}</span>

              <small css={styles.cityName}>{cityName}</small>
            </a>
          </Link>
        </li>
      )
    )}
  </ul>
);

export default ActivitiesList;
