import { useRouter } from 'next/router';

import ActivityListItem from './ActivityListItem';
import SidebarList from '../SidebarList';

import * as styles from './activitiesFilter.styles';

export default function ActivitiesFilter({ filters = [] }) {
  const router = useRouter();

  return (
    <form method="get" css={styles.form}>
      <SidebarList label="Filter By">
        {filters.map((filter) => (
          <ActivityListItem name={filter} checked={!!router.query[filter]} />
        ))}
      </SidebarList>

      <button type="submit">Filter Activities</button>
    </form>
  );
}
