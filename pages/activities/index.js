import { useSelector } from 'react-redux';
import { useI18n } from 'next-localization';

import Layout from '../../components/Layout';

import ActivitiesFilter from '../../components/ActivitiesFilter';
import ActivitiesList, { FRAGMENT as ACTIVITIES_FRAGMENT } from '../../components/ActivitiesList';
import BottomSheet from '../../components/BottomSheet';
import Main from '../../components/Main';
import Navigation from '../../components/Navigation';
import SEO from '../../components/SEO';
import Sidebar from '../../components/Sidebar';

import { fetcher } from '../../lib/hooks/useAPI';
import { getTranslations } from '../../lib/default';

const ActivitiesPage = () => {
  const activities = useSelector((state) => state.activities);
  const navigation = useSelector((state) => state.navigation);
  const i18n = useI18n();

  return (
    <Layout>
      <SEO title="Activities" />

      <Main>
        <ActivitiesList activities={activities} />
      </Main>

      <Sidebar>
        <Navigation items={navigation} />
        <BottomSheet>
          <ActivitiesFilter
            filters={[
              i18n.t('filter.access_social_rights'),
              i18n.t('filter.improvement_resident_security'),
              i18n.t('filter.reception_refugees'),
              i18n.t('filter.political_participation'),
              i18n.t('filter.intercultural_inclusion'),
              i18n.t('filter.structural_capacities')
            ]}
          />
        </BottomSheet>
      </Sidebar>
    </Layout>
  );
};

export async function getStaticProps({ query = [], locale }) {
  const lngDict = await getTranslations(locale);
  const { activities } = await fetcher(`
    query {
      ${ACTIVITIES_FRAGMENT}
    }
  `);

  const activeFilter = Object.keys(query);
  const filteredActivities =
    activeFilter.length > 0
      ? activities.filter((activity) => {
          return activeFilter.every((filter) => !!activity[filter]);
        })
      : activities;

  return {
    revalidate: 120,
    props: {
      lngDict,
      initialReduxState: {
        activities: filteredActivities || []
      }
    }
  };
}

export default ActivitiesPage;
