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

import { fetchFeaturedCities } from '@/lib/cities';
import { getBounds } from '@/lib/coordinates';
import { getTranslations } from '@/lib/global';
import { fetchIntro } from '@/lib/intro';

export default function HomePage({ cities, intro }) {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const { t } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const bounds = getBounds(cities.map(({ coordinates }) => coordinates));
  const markers = cities.map(
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
            viewBox="0 0 40 40"
            width="40"
            height="40"
            fill="none">
            <circle
              cx="20"
              cy="20"
              r="17"
              stroke="#F55511"
              stroke-dasharray="4 2"
              stroke-width="6"
            />
          </svg>
        </Marker>
      );
    }
  );

  return (
    <>
      <SEO title={null} description={intro} />

      {isIntroVisible ? (
        <Intro onClose={() => setIsIntroVisible(false)} {...intro} />
      ) : (
        <div className="flex flex-col md:flex-row md:h-full">
          <FloatingTabs
            items={[
              {
                target: '/',
                label: t('featuredCities'),
                tooltip: t('featuredCitiesIntro'),
                active: true
              },

              {
                target: `/${tSlugs('cities')}`,
                label: t('allCities'),
                tooltip: t('allCitiesIntro')
              },

              {
                target: `/${tSlugs('networks')}`,
                label: t('networks'),
                tooltip: t('networksIntro')
              }
            ]}
          />

          <ThreadList
            pane={CityPreview}
            items={cities.map(({ name, subtitle, slug, approaches, ...city }) => ({
              title: name,
              subtitle,
              target: `/${slug}`,
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

          <MapboxMap bounds={bounds}>{markers}</MapboxMap>
        </div>
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['city', 'intro', 'approaches']);
  const intro = await fetchIntro(locale);
  const cities = await fetchFeaturedCities(locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      intro,
      cities
    }
  };
}
