import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic';

import SEO from '@/components/SEO';

const CityPreview = dynamic(() => import('@/components/CityPreview'));
const FloatingTabs = dynamic(() => import('@/components/FloatingTabs'));
const Intro = dynamic(() => import('@/components/Intro'));
const MapboxMap = dynamic(() => import('@/components/MapboxMap'));
const ThreadList = dynamic(() => import('@/components/ThreadList'));

import { fetchFeaturedCities, fetchCounts } from '@/lib/cities';
import { getBounds } from '@/lib/coordinates';
import { getTranslations } from '@/lib/global';
import { fetchIntro } from '@/lib/intro';
import { useStore } from '@/lib/store';

export default function HomePage({
  cities,
  intro,
  routeHasChanged,
  counts
}) {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const { t } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const mapProps = {};
  const { setActiveCity, setFocusedCity } = useStore();
  const activeCity = useStore((state) => state.activeCity);
  const focusedCity = useStore((state) => state.focusedCity);

  if (activeCity) {
    const [longitude, latitude] = activeCity.coordinates.geometry.coordinates;

    mapProps.options = {
      latitude,
      longitude,
      zoom: 8
    };
  } else {
    mapProps.bounds = getBounds(cities.map(({ coordinates }) => coordinates));
  }

  const markers = cities.map(
    ({
      coordinates: {
        geometry: { coordinates }
      },
      id,
      name
    }) => {
      const [longitude, latitude] = coordinates;

      return (
        <Marker
          key={`marker-${name}`}
          longitude={longitude}
          latitude={latitude}
          onClick={() => {
            setFocusedCity({ id });
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="40"
            height="40"
            fill="none"
            className="group cursor-pointer">
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
        </Marker>
      );
    }
  );

  return (
    <>
      <SEO title={null} description={intro} />

      {isIntroVisible && !routeHasChanged ? (
        <Intro
          onClose={() => setIsIntroVisible(false)}
          {...intro}
          {...counts}
        />
      ) : (
        <div className="flex flex-col md:flex-row md:h-full">
          <FloatingTabs
            items={[
              {
                target: '/',
                label: t('featuredCities'),
                tooltip: t('featuredCitiesIntro'),
                active: true,
                count: counts.featuredCitiesCount
              },

              {
                target: `/${tSlugs('cities')}`,
                label: t('allCities'),
                tooltip: t('allCitiesIntro'),
                count: counts.citiesCount
              },

              {
                target: `/${tSlugs('networks')}`,
                label: t('networks'),
                tooltip: t('networksIntro'),
                count: counts.networksCount
              }
            ]}
          />

          <ThreadList
            pane={CityPreview}
            onOpen={({ id, coordinates }) => {
              setActiveCity({ id, coordinates });
            }}
            onClose={() => {
              setActiveCity(null);
            }}
            items={cities.map(({ id, name, subtitle, slug, approaches, ...city }) => ({
              title: name,
              subtitle,
              target: `/${slug}`,
              active: focusedCity?.id === id,
              data: {
                title: name,
                subtitle,
                uri: `/${slug}`,
                approaches: approaches.map(({ slug: approachSlug, ...approach }) => ({
                  uri: `/${slug}/${approachSlug}`,
                  ...approach
                })),
                ...city
              }
            }))}
          />

          <MapboxMap {...mapProps}>{markers}</MapboxMap>
        </div>
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['city', 'intro', 'approaches']);
  const data = await fetchIntro(locale);
  const cities = await fetchFeaturedCities(locale);
  const counts = await fetchCounts(locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      ...data,
      cities,
      counts
    }
  };
}
