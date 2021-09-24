import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Marker } from 'react-map-gl';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import BackTo from '@/components/BackTo';
import FloatingCta from '@/components/FloatingCta';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import NetworkPreview from '@/components/NetworkPreview';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

import { createClient } from '@/lib/api';
import { getBounds } from '@/lib/coordinates';
import { getTranslations } from '@/lib/global';
import { fetchAllNetworks, fetchAllNetworkPaths } from '@/lib/networks';
import { fetchCounts } from '@/lib/cities';
import useMapReducer from '@/lib/stores/map';

export default function NetworkPage({ networks, counts }) {
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const { t } = useTranslation('networks');
  const { query } = useRouter();
  const [{ activeThread }, dispatch] = useMapReducer({
    activeThread: { id: networks.find(({ active }) => active)?.id }
  });
  const [mapState, setMapState] = useState({ markers: [], bounds: null });
  const isSingleView = !!query?.slug?.[0];

  function networkIsActive(network) {
    if (activeThread) {
      return activeThread?.id === network.id;
    }

    return true;
  }

  useEffect(() => {
    const cities = networks
      .filter(networkIsActive)
      .map(({ cities }) => cities)
      .flat()
      .filter((city, index, self) => index === self.findIndex((t) => t.name === city.name));

    const geometries = cities
      .map(({ coordinates, name }) => ({ coordinates, name }));

    const markers = geometries.map(
      ({
        coordinates: {
          geometry: { coordinates }
        },
        name
      }) => {
        const [longitude, latitude] = coordinates;

        return (
          <Marker key={`marker-${name}`} longitude={longitude} latitude={latitude}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="none"
            >
              <circle cx="8" cy="8" r="8" fill="#F55511" />
            </svg>
          </Marker>
        );
      }
    );

    const bounds = getBounds(
      geometries
        .map(({ coordinates }) => coordinates)
        .flat()
    );

    setMapState({
      markers,
      bounds
    });
  }, [activeThread]);

  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <SEO title={t('allNetworks')} />

      {isSingleView && (
        <BackTo title={t('allNetworks')} uri={`/${tSlugs('networks')}`} className="md:hidden" />
      )}

      <FloatingTabs
        className={clsx(isSingleView && 'hidden md:block')}
        items={[
          {
            target: '/',
            label: tCity('featuredCities'),
            tooltip: tCity('featuredCitiesIntro', {
              count: counts.featuredCitiesCount,
              count_total: counts.citiesCount
            }),
            count: counts.featuredCitiesCount
          },

          {
            target: `/${tSlugs('cities')}`,
            label: tCity('allCities'),
            tooltip: tCity('allCitiesIntro', { count: counts.citiesCount }),
            count: counts.citiesCount
          },

          {
            target: `/${tSlugs('networks')}`,
            label: tCity('networks'),
            tooltip: tCity('networksIntro', { count: counts.networksCount }),
            active: true,
            count: counts.networksCount
          }
        ]}
      />

      <ThreadList
        pane={NetworkPreview}
        onAfterOpen={(network) => {
          dispatch({ type: 'THREAD_ITEM_ACTIVATE', paypload: { id: network.id } });
        }}
        onAfterClose={() => {
          dispatch({ type: 'THREAD_ITEM_ACTIVATE', paypload: null });
        }}
        items={networks.map(({ name, content, cities, slug, ...network }) => ({
          ...network,
          target: `/${tSlugs('networks')}/${slug}`,
          title: name,
          subtitle: cities
            .map(({ country }) => country?.name)
            .filter(Boolean)
            // remove duplicates
            .filter((item, pos, self) => self.indexOf(item) == pos)
            .join(', '),
          data: {
            title: name,
            content,
            featuredCities: cities.filter(({ is_featured }) => is_featured),
            cities: cities.filter(({ is_featured }) => !is_featured)
          }
        }))}
      />

      {mapState.markers && mapState.bounds && <MapboxMap bounds={mapState.bounds}>{mapState.markers}</MapboxMap>}

      <FloatingCta target={`/${tSlugs('map_cta')}`} label={tCity('addCity')} />
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const client = createClient();
  const networks = await Promise.all(
    locales.map(async (locale) => await fetchAllNetworkPaths(client, locale))
  );

  const paths = networks.flat().map(({ slug }) => ({
    params: { slug: [slug] }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, ['city', 'networks']);
  const client = createClient();
  const networks = await fetchAllNetworks(client, locale, { active: slug?.[0] });
  const counts = await fetchCounts(client, locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      networks,
      counts
    }
  };
}
