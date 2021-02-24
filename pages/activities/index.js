import { useSelector } from 'react-redux';

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
              'access_social_rights',
              'improvement_resident_security',
              'reception_refugees',
              'political_participation',
              'intercultural_inclusion',
              'structural_capacities'
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
