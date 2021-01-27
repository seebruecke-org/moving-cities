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
          <ActivityListItem name={filter} checked={!!router.query[filter]} />
        ))}
      </SidebarList>

      <button type="submit">{i18n.t('filter.activities.title')}</button>
    </form>
  );
}
