import { useSelector } from 'react-redux';

import Layout from '../../components/Layout';

import BottomSheet from '../../components/BottomSheet';
import NetworkListItem from '../../components/NetworkListItem';
import SidebarList from '../../components/SidebarList';
import Main from '../../components/Main';
import Map, { Layer } from '../../components/Map';
import Navigation from '../../components/Navigation';
import SEO from '../../components/SEO';
import Sidebar from '../../components/Sidebar';

import { fetcher } from '../../lib/hooks/useAPI';

const NetworksPage = () => {
  const networks = useSelector((state) => state.networks);
  const navigation = useSelector((state) => state.navigation);

  return (
    <Layout>
      <SEO title="City Networks" />

      <Main>
        <Map>
          <Layer type="symbol" id="marker" />
        </Map>
      </Main>

      <Sidebar>
        <Navigation items={navigation} />
        <BottomSheet>
          <SidebarList label="City Networks">
            {networks && networks.map((network) => <NetworkListItem {...network} />)}
          </SidebarList>
        </BottomSheet>
      </Sidebar>
    </Layout>
  );
};

export async function getServerSideProps() {
  const { networks } = await fetcher(`
    query {
      networks(sort: "name") {
        name
        slug
      }
    }
  `);

  return {
    props: {
      initialReduxState: {
        networks
      }
    }
  };
}

export default NetworksPage;
