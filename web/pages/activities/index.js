import { useSelector } from 'react-redux'

import Layout from '../../components/Layout';

import ActivitiesList from '../../components/ActivitiesList';
import BottomSheet from '../../components/BottomSheet';
import SidebarList from '../../components/SidebarList';
import Main from '../../components/Main';
import Navigation from '../../components/Navigation';
import Sidebar from '../../components/Sidebar';

import { FRAGMENT as ACTIVITIES_FRAGMENT } from '../../components/ActivitiesList';
import { fetcher } from '../../lib/hooks/useAPI';

const ActivitiesPage = () => {
  const activities = useSelector((state) => state.activities)
  const navigation = useSelector((state) => state.navigation);

  return (
    <Layout>
      <Main>
        <ActivitiesList activities={activities} />
      </Main>

      <Sidebar>
        <Navigation items={navigation} />
        <BottomSheet>
          <SidebarList label="Filter By">
            
          </SidebarList>
        </BottomSheet>
      </Sidebar>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { activities } = await fetcher(`
    query {
      ${ACTIVITIES_FRAGMENT}
    }
  `);

  return {
    props: {
      initialReduxState: {
        activities
      }
    }
  }
}

export default ActivitiesPage;
