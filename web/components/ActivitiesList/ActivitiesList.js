import Link from 'next/link';

import * as styles from './activitiesList.styles';

const ActivitiesList = ({ activities = [] }) => (
  <ul css={styles.list}>
    {activities.map(({ title, cities: { name: cityName } }) => <li css={styles.item}>
      <Link href="/activities/">
        <a css={styles.link}>
          <span css={styles.linkContent}>
            {title}
          </span>
        </a>
      </Link>

      <small css={styles.cityName}>{cityName}</small>
    </li>)}
  </ul>
);

export default ActivitiesList;
