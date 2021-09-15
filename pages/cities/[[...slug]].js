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

import { fetchAllCitiesByCountry, fetchCounts } from '@/lib/cities';
import { getBounds } from '@/lib/coordinates';
import { getTranslations } from '@/lib/global';
import { fetchAllCountryPaths } from '@/lib/networks';

export default function AllCitiesOverview({ countries, counts }) {
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const { query } = useRouter();
  const isSingleView = !!query?.slug?.[0];
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);

  function countryIsActive(country) {
    if (activeCountry) {
      return activeCountry.id === country.id;
    }

    return true;
  }

  useEffect(() => {
    const markers = countries
      .filter(countryIsActive)
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
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#F55511" />
                </svg>
              </Marker>
            );
          }
        );
      })
      .flat();

    const bounds = getBounds(
      countries
        .filter(countryIsActive)
        .map(({ cities }) => cities.map(({ coordinates }) => coordinates))
        .flat()
    );

    setBounds(bounds);
    setMarkers(markers);
  }, [activeCountry]);

  return (
    <div className="flex flex-col md:flex-row md:h-full">
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
            tooltip: tCity('featuredCitiesIntro'),
            count: counts.featuredCitiesCount
          },

          {
            target: `/${tSlugs('cities')}`,
            label: tCity('allCities'),
            tooltip: tCity('allCitiesIntro'),
            active: true,
            count: counts.citiesCount
          },

          {
            target: `/${tSlugs('networks')}`,
            label: tCity('networks'),
            tooltip: tCity('networksIntro'),
            count: counts.networksCount
          }
        ]}
      />

      <ThreadList
        pane={CountryPreview}
        onAfterOpen={(country) => {
          setActiveCountry(country);
        }}
        onAfterClose={() => {
          setActiveCountry(null);
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

      <FloatingCta target={`/${tSlugs('map_cta')}`} label={tCity('addCity')} />
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const countries = await Promise.all(
    locales.map(async (locale) => await fetchAllCountryPaths(locale))
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
  const countries = await fetchAllCitiesByCountry(locale, { active: slug?.[0] });
  const counts = await fetchCounts(locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      countries,
      counts
    }
  };
}
