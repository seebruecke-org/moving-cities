import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic';

import SEO from '@/components/SEO';

const CityPreview = dynamic(() => import('@/components/CityPreview'));
const FloatingCta = dynamic(() => import('@/components/FloatingCta'));
const FloatingTabs = dynamic(() => import('@/components/FloatingTabs'));
const Intro = dynamic(() => import('@/components/Intro'));
const MapboxMap = dynamic(() => import('@/components/MapboxMap'));
const ThreadList = dynamic(() => import('@/components/ThreadList'));

import { createClient } from '@/lib/api';
import { fetchFeaturedCities, fetchCounts } from '@/lib/cities';
import { getBounds } from '@/lib/coordinates';
import { getTranslations } from '@/lib/global';
import { fetchIntro } from '@/lib/intro';
import useMapReducer from '@/lib/stores/map';

function CityMarker({ id, longitude, latitude, coordinates, name }) {
  return (
    <Marker
      key={`marker-${id}`}
      longitude={longitude}
      latitude={latitude}
      onClick={() => {
        dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: { id, coordinates } });
      }}
      className="group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        width="40"
        height="40"
        fill="none"
        className="group cursor-pointer"
      >
        <circle
          cx="20"
          cy="20"
          r="17"
          stroke="currentColor"
          stroke-dasharray="4 2"
          stroke-width="6"
          className="text-red-300 group-hover:text-black"
        />
      </svg>

      <span className="text-center font-raptor font-bold hidden group-hover:block text-s absolute top-full left-2/4 -translate-x-2/4 leading-none">
        {name}
      </span>
    </Marker>
  );
}

export default function HomePage({ cities, intro, routeHasChanged, counts }) {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const { t } = useTranslation();
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const [{ activeThread }, dispatch] = useMapReducer();
  const mapProps = {};

  if (activeThread) {
    const [longitude, latitude] = activeThread.coordinates.geometry.coordinates;

    mapProps.options = {
      latitude,
      longitude,
      zoom: 14
    };
  } else {
    mapProps.bounds = getBounds(cities.map(({ coordinates }) => coordinates));
  }

  const markers = activeThread
    ? null
    : cities.map(({ coordinates, id, name }) => {
        const [longitude, latitude] = coordinates?.geometry?.coordinates;

        return (
          <CityMarker
            id={id}
            latitude={latitude}
            longitude={longitude}
            coordinates={coordinates}
            name={name}
          />
        );
      });

  return (
    <>
      <SEO title={null} description={intro} metadata={intro?.metadata} />

      {isIntroVisible && !routeHasChanged ? (
        <Intro onClose={() => setIsIntroVisible(false)} {...intro} {...counts} />
      ) : (
        <div className="flex flex-col md:flex-row md:h-full w-full">
          <FloatingTabs
            items={[
              {
                target: '/',
                label: tCity('featuredCities'),
                tooltip: tCity('featuredCitiesIntro', {
                  count: counts.featuredCitiesCount,
                  count_total: counts.citiesCount
                }),
                active: true,
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
                count: counts.networksCount
              }
            ]}
          />

          <ThreadList
            pane={CityPreview}
            onAfterOpen={({ id, coordinates }) => {
              dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: { id, coordinates } });
            }}
            onAfterClose={() => {
              dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: null });
            }}
            items={cities.map(({ id, name, subtitle, slug, approaches, summary, ...city }) => ({
              ...city,
              id,
              title: name,
              subtitle,
              target: `/${slug}`,
              active: activeThread?.id === id,
              data: {
                title: name,
                subtitle,
                uri: `/${slug}`,
                approaches: approaches.map(({ slug: approachSlug, ...approach }) => ({
                  uri: `/${slug}/${approachSlug}`,
                  ...approach
                })),
                summary,
                icon: city.icon
              }
            }))}
          />

          <MapboxMap {...mapProps}>{markers}</MapboxMap>

          <FloatingCta target={`/${tSlugs('map_cta')}`} label={t('addCity')} />
        </div>
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['city', 'intro', 'approaches']);
  const client = createClient();
  const data = await fetchIntro(client, locale);
  const cities = await fetchFeaturedCities(client, locale);
  const counts = await fetchCounts(client, locale);

  return {
    revalidate: 30,
    props: {
      ...translations,
      ...data,
      cities,
      counts
    }
  };
}
