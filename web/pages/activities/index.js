import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';

import ActivitiesList, { FRAGMENT as ACTIVITIES_FRAGMENT } from '../../components/ActivitiesList';
import ActivityListItem from '../../components/ActivityListItem';
import BottomSheet from '../../components/BottomSheet';
import SidebarList from '../../components/SidebarList';
import Main from '../../components/Main';
import Navigation from '../../components/Navigation';
import Sidebar from '../../components/Sidebar';

import { fetcher } from '../../lib/hooks/useAPI';

const FILTERS = [
  'access_social_rights',
  'improvement_resident_security',
  'reception_refugees',
  'political_participation',
  'intercultural_inclusion',
  'structural_capacities'
];

const ActivitiesPage = () => {
  const activities = useSelector((state) => state.activities);
  const navigation = useSelector((state) => state.navigation);
  const router = useRouter();

  return (
    <Layout>
      <Main>
        <ActivitiesList activities={activities} />
      </Main>

      <Sidebar>
        <Navigation items={navigation} />
        <BottomSheet>
          <form method="get">
            <SidebarList label="Filter By">
              {FILTERS.map((filter) => (
                <ActivityListItem name={filter} checked={!!router.query[filter]} />
              ))}
            </SidebarList>

            <button type="submit">Filter Activities</button>
          </form>
        </BottomSheet>
      </Sidebar>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
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
    props: {
      initialReduxState: {
        activities: filteredActivities || []
      }
    }
  };
}

export default ActivitiesPage;
