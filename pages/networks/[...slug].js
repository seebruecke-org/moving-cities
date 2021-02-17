import { useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { useI18n } from 'next-localization';
import dynamic from 'next/dynamic';

import NetworkListItem from '../../components/NetworkListItem';
import Layout from '../../components/Layout';
import Main from '../../components/Main';
import MapOverlay from '../../components/MapOverlay';
import Navigation from '../../components/Navigation';
import NetworkProfile from '../../components/NetworkProfile';
import SEO from '../../components/SEO';
import Sidebar from '../../components/Sidebar';
import SidebarList from '../../components/SidebarList';

import { fetcher } from '../../lib/hooks/useAPI';
import { getTranslations } from '../../lib/default';

import { BLOCK_FRAGMENTS } from '../../components/Blocks';

const Map = dynamic(() => import('../../components/Map'));

export default function CityPage({ slug, network }) {
  const networks = useSelector((state) => state.networks);
  const navigation = useSelector((state) => state.navigation);
  const { width: windowWidth } = useWindowSize();
  const shouldShowNetworksList = windowWidth && windowWidth > 768;
  const i18n = useI18n();

  return (
    <Layout>
      <SEO title={network.name} />

      <Main>
        <Map />
        <MapOverlay>
          <NetworkProfile {...network} />
        </MapOverlay>
      </Main>

      <Sidebar>
        <Navigation items={navigation} />

        {shouldShowNetworksList && (
          <SidebarList label={i18n.t('city.networks')}>
            {networks.map((network) => (
              <NetworkListItem
                key={`network-list-${network.slug}`}
                isActive={slug === network.slug}
                name={network.name}
                slug={network.slug}
              />
            ))}
          </SidebarList>
        )}
      </Sidebar>
    </Layout>
  );
}

export async function getStaticProps({ locale, params: { slug } }) {
  const lngDict = await getTranslations(locale);
  const [networkSlug] = slug;

  const { network, networks } = await fetcher(`
    query {
      network: networks(where: { slug: "${networkSlug}" }) {
          name
          slug
          content {
            __typename
            ${BLOCK_FRAGMENTS}
          }
      }

      networks(sort: "name") {
        name
        slug
      }
    }
  `);

  return {
    revalidate: 120,
    props: {
      initialReduxState: {
        networks
      },
      lngDict,
      network: network[0]
    }
  };
}

export async function getStaticPaths() {
  const { networks } = await fetcher(`
        query {
            networks {
                slug
            }
        }
    `);

  const paths = networks.map(({ slug }) => ({
    params: {
      slug: [slug]
    }
  }));

  return {
    fallback: false,
    paths
  };
}
