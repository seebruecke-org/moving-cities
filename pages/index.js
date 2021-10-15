import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Marker } from 'react-map-gl';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

import FloatingTabs from '@/components/FloatingTabs';
import ThreadList from '@/components/ThreadList';
import SEO from '@/components/SEO';

const CityPreview = dynamic(() => import('@/components/CityPreview'));
const FloatingCta = dynamic(() => import('@/components/FloatingCta'));
const Intro = dynamic(() => import('@/components/Intro'));
const MapboxMap = dynamic(() => import('@/components/MapboxMap'), { ssr: false });

import { createClient } from '@/lib/api';
import { fetchFeaturedCities, fetchCounts } from '@/lib/cities';
import { getTranslations } from '@/lib/global';
import { useWindowSize } from '@/lib/hooks';
import { fetchIntro } from '@/lib/intro';
import { renderMap } from '@/lib/map';
import { fetchMenu } from '@/lib/menu';
import useMapReducer from '@/lib/stores/map';

function CityMarker({ id, name, ...props }) {
  return (
    <Marker key={`marker-${id}`} className="group" offsetLeft={-20} offsetTop={-20} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        width="40"
        height="40"
        fill="none"
        className="cursor-pointer text-pink-300 hover:text-black"
      >
        <circle
          cx="20"
          cy="20"
          r="17"
          stroke="currentColor"
          stroke-dasharray="4 2"
          stroke-width="6"
        />
      </svg>

      <span className="text-center font-raptor font-bold hidden group-hover:block text-s absolute top-full left-2/4 -translate-x-2/4 leading-none">
        {name}
      </span>
    </Marker>
  );
}

export default function HomePage({ cities, intro, routeHasChanged, counts, bounds }) {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const { t } = useTranslation();
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const [{ activeThread }, dispatch] = useMapReducer();
  const [mapInteraction, setMapInteraction] = useState(false);
  const { width: windowWidth } = useWindowSize();
  const [mapProps, setMapProps] = useState({
    bounds
  });
  const navItems = useMemo(() => {
    return cities.map(({ id, name, subtitle, slug, approaches, summary, ...city }) => ({
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
    }));
  }, [activeThread]);

  const markers = useMemo(() => {
    // don't show markers on the map, once a city was selected
    if (activeThread) {
      return null;
    }

    return cities.map(({ coordinates, id, name }) => {
      const [longitude, latitude] = coordinates?.geometry?.coordinates;

      return (
        <CityMarker
          id={id}
          latitude={latitude}
          longitude={longitude}
          name={name}
          onClick={() => {
            dispatch({ type: 'THREAD_ITEM_ACTIVATE', payload: { id, coordinates } });
          }}
        />
      );
    });
  }, [activeThread]);

  useEffect(() => {
    if (activeThread) {
      const [longitude, latitude] = activeThread.coordinates.geometry.coordinates;

      setMapProps({
        options: {
          latitude,
          longitude,
          zoom: 12
        }
      });
    } else {
      setMapProps({ bounds });
    }
  }, [activeThread?.id]);

  return (
    <>
      <SEO title={null} description={intro} metadata={intro?.metadata} />

      {isIntroVisible && !routeHasChanged ? (
        <Intro onClose={() => setIsIntroVisible(false)} {...intro} {...counts} />
      ) : (
        <div className="flex flex-col md:flex-row md:h-full w-full">
          <FloatingTabs
            className={clsx(!!activeThread && 'hidden xl:block')}
            tooltipHidden={!!activeThread || mapInteraction}
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
            items={navItems}
          />

          {renderMap(windowWidth) && (
            <>
              <MapboxMap
                {...mapProps}
                onInteraction={() => {
                  setMapInteraction(true);
                }}
              >
                {markers}
              </MapboxMap>

              <FloatingCta target={`/${tSlugs('map_cta')}`} label={t('addCity')} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['city', 'intro', 'approaches']);
  const client = createClient();
  const data = await fetchIntro(client, locale);
  const { cities, bounds } = await fetchFeaturedCities(client, locale);
  const counts = await fetchCounts(client, locale);
  const menu = await fetchMenu(client, locale);

  return {
    revalidate: 120,
    props: {
      ...translations,
      ...data,
      menu,
      cities,
      bounds,
      counts
    }
  };
}
