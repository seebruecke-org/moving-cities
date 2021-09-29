import { useTranslation } from 'next-i18next';
import { Marker } from 'react-map-gl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import BackTo from '@/components/BackTo';
import CountryPreview from '@/components/CountryPreview';
import FloatingCta from '@/components/FloatingCta';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

import { createClient } from '@/lib/api';
import { fetchAllCitiesByCountry, fetchCounts } from '@/lib/cities';
import { getBounds } from '@/lib/coordinates';
import { getTranslations } from '@/lib/global';
import { fetchAllCountryPaths } from '@/lib/networks';
import useMapReducer from '@/lib/stores/map';

export default function AllCitiesOverview({ countries, counts, bounds: defaultBounds }) {
  const { t } = useTranslation();
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const { query } = useRouter();
  const isSingleView = !!query?.slug?.[0];
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState(defaultBounds);
  const [{ activeThread }, dispatch] = useMapReducer();

  function countryIsActive(country) {
    if (activeThread) {
      return activeThread.id === country.id;
    }

    return true;
  }

  useEffect(() => {
    const markers = countries
      .filter(countryIsActive)
      .flatMap(({ cities }) => {
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
                className="text-red-300 hover:text-black hover:cursor-pointer z-10 hover:z-20 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="currentColor" />
                </svg>

                <span className="text-center font-raptor font-bold hidden group-hover:block text-xs absolute top-full left-2/4 -translate-x-2/4 leading-none">
                  {name}
                </span>
              </Marker>
            );
          }
        );
      });

    setMarkers(markers);

    if (activeThread?.id) {
      const bounds = getBounds(
        countries
          .filter(countryIsActive)
          .flatMap(({ cities }) => cities.map(({ coordinates }) => coordinates))
      );

      setBounds(bounds);
    }
  }, [activeThread]);

  return (
    <div className="flex flex-col md:flex-row md:h-full w-full">
      <SEO title={tCity('allCities')} />

      {isSingleView && (
        <BackTo title={tCity('allCities')} uri={`/${tSlugs('cities')}`} className="md:hidden" />
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
        items={countries.map(({ name, cities, slug, ...country }) => {
          const target = `/${tSlugs('cities')}/${slug}`;

          return {
            ...country,
            target,
            title: name,
            subtitle: tCity('countryThreadSubtitle', { count: cities.length }),
            data: { cities, target }
          };
        })}
      />

      {markers && <MapboxMap bounds={bounds}>{markers}</MapboxMap>}

      <FloatingCta target={`/${tSlugs('map_cta')}`} label={t('addCity')} />
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const client = createClient();
  const countries = await Promise.all(
    locales.map(async (locale) => await fetchAllCountryPaths(client, locale))
  );

  const paths = countries.flat().map(({ slug }) => ({
    params: { slug: [slug] }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale, params: { slug } }) {
  const translations = await getTranslations(locale, ['city']);
  const client = createClient();
  const { countries, bounds } = await fetchAllCitiesByCountry(client, locale, { active: slug?.[0] });
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
