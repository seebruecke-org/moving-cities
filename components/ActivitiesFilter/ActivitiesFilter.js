import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';

import ActivityListItem from './ActivityListItem';
import SidebarList from '../SidebarList';

import * as styles from './activitiesFilter.styles';

export default function ActivitiesFilter({ filters = [] }) {
  const router = useRouter();
  const i18n = useI18n();

  return (
    <form method="get" css={styles.form}>
      <SidebarList label={i18n.t('filter.activities.by')}>
        {filters.map((filter) => (
          <ActivityListItem
            key={`activity-filter-${filter}`}
            name={filter}
            label={i18n.t(`filter.${filter}`)}
            defaultChecked={!!router.query[filter]}
          />
        ))}

        <footer css={styles.footer}>
          <button type="submit" css={styles.button}>
            {i18n.t('filter.activities.title')}
          </button>
        </footer>
      </SidebarList>
    </form>
  );
}
