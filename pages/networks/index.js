import { useSelector, useDispatch } from 'react-redux';
import { useI18n } from 'next-localization';
import dynamic from 'next/dynamic';

import BottomSheet from '../../components/BottomSheet';
import Layout from '../../components/Layout';
import NetworkListItem from '../../components/NetworkListItem';
import SidebarList from '../../components/SidebarList';
import Main from '../../components/Main';
import Navigation from '../../components/Navigation';
import SEO from '../../components/SEO';
import Sidebar from '../../components/Sidebar';

import { fetcher } from '../../lib/hooks/useAPI';
import { getTranslations } from '../../lib/default';

const MapNetworks = dynamic(() => import('../../components/MapNetworks'));

const NetworksPage = () => {
  const networks = useSelector((state) => state.networks) || [];
  const navigation = useSelector((state) => state.navigation);
  const i18n = useI18n();
  const dispatch = useDispatch();

  return (
    <Layout>
      <SEO title={i18n.t('city.networks')} />

      <Main>
        <MapNetworks networks={networks} />
      </Main>

      <Sidebar>
        <Navigation items={navigation} />
        <BottomSheet>
          <SidebarList label={i18n.t('city.networks')}>
            {networks.map(({ name, slug, isActive }) => (
              <NetworkListItem
                key={`sidebar-${name}`}
                slug={slug}
                name={name}
                isActive={isActive}
                onClick={(event) => {
                  event.preventDefault();

                  dispatch({
                    type: 'SET_ACTIVE_NETWORK',
                    slug: slug
                  });
                }}
                onMouseEnter={() => {
                  dispatch({
                    type: 'SET_HIGHLIGHTED_NETWORK',
                    slug: slug
                  });
                }}
                onMouseLeave={() => {
                  dispatch({
                    type: 'SET_HIGHLIGHTED_NETWORK',
                    slug: null
                  });
                }}
              />
            ))}
          </SidebarList>
        </BottomSheet>
      </Sidebar>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  const lngDict = await getTranslations(locale);
  const { networks } = await fetcher(`
    query {
      networks(sort: "name") {
        name
        slug

        cities {
          name
          coordinates

          country {
            slug
          }
        }
      }
    }
  `);

  return {
    revalidate: 120,
    props: {
      lngDict,
      initialReduxState: {
        networks
      }
    }
  };
}

export default NetworksPage;
