import { useTranslation } from 'next-i18next';

import CountryPreview from '@/components/CountryPreview';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

import { fetchAllCitiesByCountry } from '@/lib/cities';
import { getTranslations } from '@/lib/global';

export default function AllCitiesOverview({ countries }) {
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
        items={countries.map(({ name, cities }) => ({
          target: '/countries/france',
          title: name,
          subtitle: `${cities.length} cities`,
          data: { cities }
        }))}
      />

      <MapboxMap />
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
