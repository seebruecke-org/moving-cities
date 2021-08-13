import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import SEO from '@/components/SEO';

const CityPreview = dynamic(() => import('@/components/CityPreview'));
const FloatingTabs = dynamic(() => import('@/components/FloatingTabs'));
const Intro = dynamic(() => import('@/components/Intro'));
const MapboxMap = dynamic(() => import('@/components/MapboxMap'));
const ThreadList = dynamic(() => import('@/components/ThreadList'));

import { fetchFeaturedCities } from '@/lib/cities';
import { getTranslations } from '@/lib/global';

export default function HomePage({ cities }) {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const { t } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <>
      <SEO title={null} />

      {isIntroVisible ? (
        <Intro onClose={() => setIsIntroVisible(false)} />
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
                tooltip: t('allCitiesIntro'),
              },

              {
                target: `/${tSlugs('networks')}`,
                label: t('networks'),
                tooltip: t('networksIntro'),
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
                approaches: approaches.map(({ title, slug: approachSlug }) => ({
                  title,
                  uri: `/${slug}/${approachSlug}`
                })),
                ...city
              }
            }))}
          />

          <MapboxMap />
        </div>
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['city', 'intro', 'approaches']);
  const cities = await fetchFeaturedCities(locale);

  return {
    revalidate: 60,
    props: {
      ...translations,
      cities
    }
  };
}
