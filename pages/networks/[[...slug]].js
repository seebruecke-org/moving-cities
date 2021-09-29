import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Marker } from 'react-map-gl';
import { useState, useEffect, useMemo } from 'react';
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

export default function NetworkPage({
  networks,
  cities: defaultCities,
  counts,
  bounds: defaultBounds
}) {
  const { t } = useTranslation();
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const { t: tNetworks } = useTranslation('networks');
  const { query } = useRouter();
  const [{ activeThread }, dispatch] = useMapReducer({
    activeThread: { id: networks.find(({ active }) => active)?.id }
  });
  const [{ bounds, markers }, setMapState] = useState({ markers: [], bounds: null });
  const isSingleView = !!query?.slug?.[0];

  const navItems = useMemo(
    () =>
      networks.map(({ name, content, cities, slug, ...network }) => {
        const fullCities = cities.map(({ id }) =>
          defaultCities.find((defaultCity) => defaultCity.id === id)
        );

        return {
          ...network,
          target: `/${tSlugs('networks')}/${slug}`,
          title: name,
          subtitle: fullCities
            .map(({ country }) => country?.name)
            .filter(Boolean)
            // remove duplicates
            .filter((item, pos, self) => self.indexOf(item) == pos)
            .join(', '),
          data: {
            title: name,
            content,
            featuredCities: fullCities.filter(({ is_featured }) => is_featured),
            cities: fullCities.filter(({ is_featured }) => !is_featured)
          }
        };
      }),
    [activeThread, networks]
  );

  useEffect(() => {
    const activeNetworkCities = activeThread
      ? networks.find(({ id }) => id === activeThread.id)?.cities?.map(({ id }) => id) ?? []
      : [];

    const cities = defaultCities.map((city) => ({
      ...city,
      // mark all cities of the active network active
      active: activeNetworkCities.includes(city.id)
    }));

    const markers = cities.map(
      ({
        coordinates: {
          geometry: { coordinates }
        },
        active,
        name,
        id
      }) => {
        const [longitude, latitude] = coordinates;
        const size = active ? 12 : 1;

        return (
          <Marker
            key={`city-marker-${id}`}
            longitude={longitude}
            latitude={latitude}
            className={clsx(
              'hover:cursor-pointer group',
              active
                ? 'text-pink-300 hover:text-black z-20'
                : 'text-black hover:text-pink-300 z-10 hover:z-20'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${size * 2} ${size * 2}`}
              width={size * 2}
              height={size * 2}
              fill="none"
              className="opacity-60"
            >
              <circle cx={size} cy={size} r={size} fill="currentcolor" />
            </svg>

            <span className="text-center text-black font-raptor font-bold hidden group-hover:block text-xs absolute top-full left-2/4 -translate-x-2/4 leading-none">
              {name}
            </span>
          </Marker>
        );
      }
    );

    let bounds = defaultBounds;

    if (activeThread) {
      bounds = getBounds(
        cities.filter(({ active }) => active).map(({ coordinates }) => coordinates)
      );
    }

    // the map needs a little time to re-paint itself due to the overlay
    // size change, that might happen
    setTimeout(() => {
      setMapState({
        markers,
        bounds
      });
    }, 100);
  }, [activeThread]);

  return (
    <div className="flex flex-col md:flex-row md:h-full w-full">
      <SEO title={tNetworks('allNetworks')} />

      {isSingleView && (
        <BackTo
          title={tNetworks('allNetworks')}
          uri={`/${tSlugs('networks')}`}
          className="md:hidden"
        />
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
        allowAllClosed={false}
        pane={NetworkPreview}
        onAfterOpen={(network) => {
          dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: { id: network.id } });
        }}
        onAfterClose={() => {
          dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: null });
        }}
        items={navItems}
      />

      <MapboxMap bounds={bounds}>{markers}</MapboxMap>

      <FloatingCta target={`/${tSlugs('map_cta')}`} label={t('addCity')} />
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
  const { cities, networks } = await fetchAllNetworks(client, locale, { active: slug?.[0] });
  const counts = await fetchCounts(client, locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      cities,
      networks,
      counts
    }
  };
}
