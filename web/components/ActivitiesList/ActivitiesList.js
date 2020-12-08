import Link from 'next/link';

import * as styles from './activitiesList.styles';

const ActivitiesList = ({ activities = [] }) => (
  <ul css={styles.list}>
    {activities.map(({ city, title }) => <li css={styles.item}>
      <Link href="/activities/">
        <a css={styles.link}>
          <span css={styles.linkContent}>
            {title}
          </span>
        </a>
      </Link>

      <small css={styles.cityName}>{city}</small>
    </li>)}
  </ul>
);

export default ActivitiesList;
