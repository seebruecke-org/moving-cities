import Link from 'next/link';

import * as styles from './activitiesList.styles';

const ActivitiesList = ({ activities = [] }) => (
  <ul css={styles.list}>
    {activities.map(({ city, title }) => <li css={styles.item}>
      <Link href="/activities/">
        <a css={styles.link}>
          <small>{city}:</small>
          {' '}
          {title}
        </a>
      </Link>
    </li>)}
  </ul>
);

export default ActivitiesList;
