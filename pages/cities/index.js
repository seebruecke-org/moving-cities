import { useTranslation } from 'next-i18next';

import CountryPreview from '@/components/CountryPreview';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

import { getTranslations } from '@/lib/global';

export default function AllCitiesOverview() {
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <SEO title={tCity('allCities')} />

      <FloatingTabs
        items={[
          {
            target: '/',
            label: tCity('featuredCities'),
            tooltip: '29 cities studied out of over 600 European cities that actively support solidarity based migration policies.',
            tooltip: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          },

          {
            target: `/${tSlugs('cities')}`,
            label: tCity('allCities'),
            active: true
          },

          {
            target: `/${tSlugs('networks')}`,
            label: tCity('networks')
          }
        ]}
      />

      <ThreadList
        pane={CountryPreview}
        items={[
          {
            target: '/countries/france',
            title: 'France',
            subtitle: '45 cities',
            data: {
              cities: ['Amay', 'Anderlecht']
            }
          },

          {
            target: '/countries/france',
            title: 'France',
            subtitle: '45 cities',
            data: {
              cities: ['Amay', 'Anderlecht']
            }
          },

          {
            target: '/countries/france',
            title: 'France',
            subtitle: '45 cities',
            data: {
              cities: ['Amay', 'Anderlecht']
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
