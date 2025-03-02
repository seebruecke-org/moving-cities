import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Marker } from 'react-map-gl';
import { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

import BackTo from '@/components/BackTo';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

import { createClient } from '@/lib/api';
import { getBounds } from '@/lib/coordinates';
import { TAILWIND_MQ_MD } from '@/lib/constants';
import { getTranslations } from '@/lib/global';
import { useWindowSize } from '@/lib/hooks';
import { mapStrapiToFELocale } from '@/lib/i18n';
import { renderMap } from '@/lib/map';
import { fetchMenu } from '@/lib/menu';
import {
  fetchAllNetworks,
  fetchAllNetworkPaths,
  fetchNetworkLocalizationsBySlug
} from '@/lib/networks';
import { fetchCounts } from '@/lib/cities';
import useMapReducer from '@/lib/stores/map';
import { fetchFooter } from '@/lib/footer';

const NetworkPreview = dynamic(() => import('@/components/NetworkPreview'));
const FloatingCta = dynamic(() => import('@/components/FloatingCta'));
const MapboxMap = dynamic(() => import('@/components/MapboxMap'), { ssr: false });

export default function NetworkPage({
  networks,
  cities: defaultCities,
  counts,
  bounds: defaultBounds,
  menu
}) {
  const { t } = useTranslation();
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const { t: tNetworks } = useTranslation('networks');
  const { locale, query, defaultLocale } = useRouter();
  const { width: windowWidth } = useWindowSize();
  const [{ activeThread }, dispatch] = useMapReducer({
    activeThread: { id: networks.find(({ active }) => active)?.id }
  });
  const [{ bounds, markers }, setMapState] = useState({ markers: [], bounds: null });
  const isSingleView = !!query?.slug?.[0];

  const navItems = useMemo(
    () =>
      networks.map(({ name, content, cities, slug, active, ...network }) => {
        const fullCities = cities.map(({ id }) =>
          defaultCities.find((defaultCity) => defaultCity.id === id)
        );

        return {
          ...network,
          active: windowWidth <= TAILWIND_MQ_MD && !isSingleView ? false : active,
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
    [activeThread, windowWidth, isSingleView]
  );

  useEffect(() => {
    const activeNetworkCities = activeThread?.id
      ? networks.find(({ id }) => id === activeThread.id)?.cities?.map(({ id }) => id) ?? []
      : [];

    const cities = defaultCities.map((city) => ({
      ...city,
      // mark all cities of the active network active
      active: activeNetworkCities.includes(city.id)
    }));

    const markers = cities
      .filter(({ active }) => active)
      .map(
        ({
          coordinates: {
            geometry: { coordinates }
          },
          name,
          id
        }) => {
          const [longitude, latitude] = coordinates;
          const size = 12;

          return (
            <Marker
              key={`city-marker-${id}`}
              longitude={longitude}
              latitude={latitude}
              offsetLeft={(-1 * size) / 2}
              offsetTop={(-1 * size) / 2}
              className={clsx(
                'hover:cursor-pointer group text-pink-300 hover:text-black z-10 hover:z-20'
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

      <ThreadList
        allowAllClosed={false}
        pane={NetworkPreview}
        onAfterOpen={(network) => {
          dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: { id: network.id } });

          if (window.innerWidth > 768 && 'history' in window) {
            const { title, target } = network;
            const normalizedLocale = locale === defaultLocale ? '' : `/${locale}`;
            window.history.pushState(null, title, `${normalizedLocale}${target}`);
          }
        }}
        onAfterClose={() => {
          dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: null });
        }}
        items={navItems}
      />

      {renderMap(windowWidth) && <MapboxMap bounds={bounds}>{markers}</MapboxMap>}

      {menu?.cta && (
        <FloatingCta target={`/${tSlugs('about')}/${menu?.cta.slug}`} label={t('addCity')} />
      )}
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const client = createClient();
  const networks = await Promise.all(
    locales.map(async (locale) => await fetchAllNetworkPaths(client, locale))
  );

  const paths = networks.flat().map(({ slug, locale }) => ({
    params: { slug: [slug] },
    locale: mapStrapiToFELocale(locale)
  }));

  return {
    paths: [...paths, ...locales.map((locale) => ({ params: { slug: null }, locale }))],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, ['city', 'networks']);
  const client = createClient();
  const { cities, networks } = await fetchAllNetworks(client, locale, { active: slug?.[0] });
  const localizations = await fetchNetworkLocalizationsBySlug(client, slug?.[0], locale);
  const counts = await fetchCounts(client, locale);
  const menu = await fetchMenu(client, locale);
  const footer = await fetchFooter(client, locale);

  return {
    revalidate: 240,
    props: {
      ...translations,
      cities,
      networks,
      counts,
      menu,
      footer,
      localizations
    }
  };
}
