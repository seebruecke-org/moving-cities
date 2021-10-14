import { useTranslation } from 'next-i18next';
import { Marker } from 'react-map-gl';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

import BackTo from '@/components/BackTo';
import FloatingTabs from '@/components/FloatingTabs';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

const CountryPreview = dynamic(() => import('@/components/CountryPreview'));
const FloatingCta = dynamic(() => import('@/components/FloatingCta'));
const MapboxMap = dynamic(() => import('@/components/MapboxMap'), { ssr: false });

import { createClient } from '@/lib/api';
import { fetchAllCitiesByCountry, fetchCounts } from '@/lib/cities';
import { getBounds } from '@/lib/coordinates';
import { getTranslations } from '@/lib/global';
import { useWindowSize } from '@/lib/hooks';
import { mapStrapiToFELocale } from '@/lib/i18n';
import { renderMap } from '@/lib/map';
import { fetchAllCountryPaths } from '@/lib/networks';
import useMapReducer from '@/lib/stores/map';

export default function AllCitiesOverview({ countries, counts, bounds: defaultBounds }) {
  const { width: windowWidth } = useWindowSize();
  const { t } = useTranslation();
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const { query } = useRouter();
  const isSingleView = !!query?.slug?.[0];
  const [mapInteraction, setMapInteraction] = useState(false);
  const [{ activeThread }, dispatch] = useMapReducer();

  function countryIsActive(country) {
    if (activeThread) {
      return activeThread.id === country.id;
    }

    return true;
  }

  const navItems = countries.map(({ name, cities, slug, ...country }) => {
    const target = `/${tSlugs('cities')}/${slug}`;

    return {
      ...country,
      target,
      title: name,
      subtitle: tCity('countryThreadSubtitle', { count: cities.length }),
      data: { cities, target }
    };
  });

  const markers = useMemo(() => {
    return countries.filter(countryIsActive).flatMap(({ id: countryId, cities }) => {
      return cities.map(
        ({
          coordinates: {
            geometry: { coordinates }
          },
          name,
          id
        }) => {
          const [longitude, latitude] = coordinates;

          return (
            <Marker
              key={`marker-${id}`}
              longitude={longitude}
              latitude={latitude}
              className="text-pink-300 hover:text-black cursor-pointer z-10 hover:z-20 group"
              onClick={() => {
                dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: { id: countryId } });
              }}
              offsetLeft={-9}
              offsetTop={-9}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                width="18"
                height="18"
                fill="none"
                className="opacity-60"
              >
                <circle cx="9" cy="9" r="9" fill="currentColor" />
              </svg>

              <span className="text-center text-black font-raptor font-bold hidden group-hover:block text-xs absolute top-full left-2/4 -translate-x-2/4 leading-none">
                {name}
              </span>
            </Marker>
          );
        }
      );
    });
  }, [activeThread]);

  const bounds = useMemo(() => {
    if (activeThread?.id) {
      return getBounds(
        countries
          .filter(countryIsActive)
          .flatMap(({ cities }) => cities.map(({ coordinates }) => coordinates))
      );
    }

    return defaultBounds;
  }, [activeThread]);

  return (
    <div className="flex flex-col md:flex-row md:h-full w-full">
      <SEO title={tCity('allCities')} />

      {isSingleView && (
        <BackTo title={tCity('allCities')} uri={`/${tSlugs('cities')}`} className="md:hidden" />
      )}

      <FloatingTabs
        className={clsx(isSingleView && 'hidden lg:block')}
        tooltipHidden={!!activeThread || mapInteraction}
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
            active: true,
            count: counts.citiesCount
          },

          {
            target: `/${tSlugs('networks')}`,
            label: tCity('networks'),
            tooltip: tCity('networksIntro', { count: counts.networksCount }),
            count: counts.networksCount
          }
        ]}
      />

      <ThreadList
        pane={CountryPreview}
        onAfterOpen={(country) => {
          dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: { id: country.id } });
        }}
        onAfterClose={() => {
          dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: null });
        }}
        items={navItems}
      />

      {renderMap(windowWidth) && markers && (
        <MapboxMap
          bounds={bounds}
          onInteraction={() => {
            setMapInteraction(true);
          }}
        >
          {markers}
        </MapboxMap>
      )}

      <FloatingCta target={`/${tSlugs('map_cta')}`} label={t('addCity')} />
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const client = createClient();
  const countries = await Promise.all(
    locales.map(async (locale) => await fetchAllCountryPaths(client, locale))
  );

  const paths = countries.flat().map(({ slug, locale }) => ({
    params: { slug: [slug] },
    locale: mapStrapiToFELocale(locale)
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, ['city']);
  const client = createClient();
  const { countries, bounds } = await fetchAllCitiesByCountry(client, locale, {
    active: slug?.[0]
  });
  const counts = await fetchCounts(client, locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      countries,
      bounds,
      counts
    }
  };
}
