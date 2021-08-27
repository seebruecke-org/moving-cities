import { useTranslation } from 'next-i18next';
import { Marker } from 'react-map-gl';

import CountryPreview from '@/components/CountryPreview';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

import { fetchAllCitiesByCountry } from '@/lib/cities';
import { getBounds } from '@/lib/coordinates';
import { getTranslations } from '@/lib/global';

export default function AllCitiesOverview({ countries }) {
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');

  const bounds = getBounds(
    countries.map(({ cities }) => cities.map(({ coordinates }) => coordinates)).flat()
  );
  const markers = countries
    .map(({ cities }) => {
      return cities.map(
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
                fill="none">
                <circle cx="8" cy="8" r="8" fill="#F55511" />
              </svg>
            </Marker>
          );
        }
      );
    })
    .flat();

  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <SEO title={tCity('allCities')} />

      <FloatingTabs
        items={[
          {
            target: '/',
            label: tCity('featuredCities'),
            tooltip: tCity('featuredCitiesIntro')
          },

          {
            target: `/${tSlugs('cities')}`,
            label: tCity('allCities'),
            tooltip: tCity('allCitiesIntro'),
            active: true
          },

          {
            target: `/${tSlugs('networks')}`,
            label: tCity('networks'),
            tooltip: tCity('networksIntro')
          }
        ]}
      />

      <ThreadList
        pane={CountryPreview}
        items={countries.map(({ name, cities, slug }) => ({
          target: `/${tSlugs('cities')}/${slug}`,
          title: name,
          subtitle: `${cities.length} cities`,
          data: { cities }
        }))}
      />

      <MapboxMap bounds={bounds}>{markers}</MapboxMap>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['city']);
  const countries = await fetchAllCitiesByCountry(locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      countries
    }
  };
}
