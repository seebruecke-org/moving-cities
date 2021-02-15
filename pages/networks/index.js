import { useSelector } from 'react-redux';
import { useI18n } from 'next-localization';
import dynamic from 'next/dynamic';

import Layout from '../../components/Layout';

import BottomSheet from '../../components/BottomSheet';
import NetworkListItem from '../../components/NetworkListItem';
import SidebarList from '../../components/SidebarList';
import Main from '../../components/Main';
import Navigation from '../../components/Navigation';
import SEO from '../../components/SEO';
import Sidebar from '../../components/Sidebar';

import { fetcher } from '../../lib/hooks/useAPI';
import { getTranslations } from '../../lib/default';

const Map = dynamic(() => import('../../components/Map'));

const NetworksPage = () => {
  const networks = useSelector((state) => state.networks);
  const navigation = useSelector((state) => state.navigation);
  const i18n = useI18n();

  return (
    <Layout>
      <SEO title={i18n.t('city.networks')} />

      <Main>
        <Map></Map>
      </Main>

      <Sidebar>
        <Navigation items={navigation} />
        <BottomSheet>
          <SidebarList label={i18n.t('city.networks')}>
            {networks && networks.map((network) => <NetworkListItem {...network} />)}
          </SidebarList>
        </BottomSheet>
      </Sidebar>
    </Layout>
  );
};

export async function getServerSideProps({ locale }) {
  const lngDict = await getTranslations(locale);
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
      lngDict,
      initialReduxState: {
        networks
      }
    }
  };
}

export default NetworksPage;
