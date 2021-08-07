import { useTranslation } from 'next-i18next';

import CityPreview from '@/components/CityPreview';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

import { getTranslations } from '@/lib/global';

export default function AllNetworksOverview() {
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <SEO title="All networks" />

      <FloatingTabs
        items={[
          {
            target: '/',
            label: tCity('featuredCities')
          },

          {
            target: `/${tSlugs('cities')}`,
            label: tCity('allCities')
          },

          {
            target: `/${tSlugs('networks')}`,
            label: tCity('networks'),
            active: true
          }
        ]}
      />

      <ThreadList
        pane={CityPreview}
        items={[
          {
            target: '/what',
            title: 'Amsterdam',
            subtitle: 'Groundbreaking player in migration policies',
            data: {
              title: 'Amsterdam',
              subtitle: 'Groundbreaking player in migration policies',
              uri: '/amsterdam'
            }
          },

          {
            target: '/what',
            title: 'Amsterdam',
            subtitle: 'Groundbreaking player in migration policies ',
            data: {
              title: 'Amsterdam',
              subtitle: 'Groundbreaking player in migration policies',
              uri: '/amsterdam'
            }
          },

          {
            target: '/what',
            title: 'Amsterdam',
            subtitle: 'Groundbreaking player in migration policies ',
            data: {
              title: 'Amsterdam',
              subtitle: 'Groundbreaking player in migration policies',
              uri: '/amsterdam'
            }
          },

          {
            target: '/what',
            title: 'Amsterdam',
            subtitle: 'Groundbreaking player in migration policies ',
            data: {
              title: 'Amsterdam',
              subtitle: 'Groundbreaking player in migration policies',
              uri: '/amsterdam'
            }
          }
        ]}
      />

      <MapboxMap />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['city']);

  return {
    revalidate: 60,
    props: {
      ...translations
    }
  };
}
