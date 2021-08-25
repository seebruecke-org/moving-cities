import { useTranslation } from 'next-i18next';

import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import NetworkPreview from '@/components/NetworkPreview';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

import { getTranslations } from '@/lib/global';
import { fetchAllNetworks, fetchAllNetworkPaths } from '@/lib/networks';

export default function AllNetworksOverview({ networks }) {
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <SEO title="All networks" />

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
            tooltip: tCity('allCitiesIntro')
          },

          {
            target: `/${tSlugs('networks')}`,
            label: tCity('networks'),
            tooltip: tCity('networksIntro'),
            active: true
          }
        ]}
      />

      <ThreadList
        pane={NetworkPreview}
        items={networks.map(({ name, content, cities, slug }) => ({
          target: `/${tSlugs('networks')}/${slug}`,
          title: name,
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

      <MapboxMap />
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

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['city', 'networks']);
  const networks = await fetchAllNetworks(locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      networks
    }
  };
}
