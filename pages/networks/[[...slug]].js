import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Marker } from 'react-map-gl';
import clsx from 'clsx';

import BackTo from '@/components/BackTo';
import FloatingCta from '@/components/FloatingCta';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import NetworkPreview from '@/components/NetworkPreview';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

import { getBounds } from '@/lib/coordinates';
import { getTranslations } from '@/lib/global';
import { fetchAllNetworks, fetchAllNetworkPaths } from '@/lib/networks';
import { fetchCounts } from '@/lib/cities';

export default function NetworkPage({ networks, counts }) {
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');
  const { t } = useTranslation('networks');
  const { query } = useRouter();

  const bounds = getBounds(
    networks.map(({ cities }) => cities.map(({ coordinates }) => coordinates)).flat()
  );
  const markers = networks
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
      <SEO title={t('allNetworks')} />

      {query?.slug && (
        <BackTo title={t('allNetworks')} uri={`/${tSlugs('networks')}`} className="md:hidden" />
      )}

      <FloatingTabs
        className={clsx(query?.slug && 'hidden md:block')}
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
            count: counts.citiesCount
          },

          {
            target: `/${tSlugs('networks')}`,
            label: tCity('networks'),
            tooltip: tCity('networksIntro'),
            active: true,
            count: counts.networksCount
          }
        ]}
      />

      <ThreadList
        pane={NetworkPreview}
        items={networks.map(({ name, content, cities, slug, active, ...network }) => ({
          ...network,
          target: `/${tSlugs('networks')}/${slug}`,
          title: name,
          active,
          subtitle: cities.reduce((acc, city) => {
            const { country } = city;

            acc = `${acc} ${country?.name}`;

            return acc;
          }, ''),
          data: {
            title: name,
            content,
            featuredCities: cities.filter(({ is_featured }) => is_featured),
            cities: cities.filter(({ is_featured }) => !is_featured)
          }
        }))}
      />

      <MapboxMap bounds={bounds}>{markers}</MapboxMap>

      <FloatingCta target={`/${tSlugs('map_cta')}`} label={tCity('addCity')} />
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const networks = await Promise.all(
    locales.map(async (locale) => await fetchAllNetworkPaths(locale))
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
  const networks = await fetchAllNetworks(locale, { active: slug?.[0] });
  const counts = await fetchCounts(locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      networks,
      counts
    }
  };
}
