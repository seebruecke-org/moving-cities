import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import SEO from '@/components/SEO';

const CityPreview = dynamic(() => import('@/components/CityPreview'));
const FloatingTabs = dynamic(() => import('@/components/FloatingTabs'));
const Intro = dynamic(() => import('@/components/Intro'));
const MapboxMap = dynamic(() => import('@/components/MapboxMap'));
const ThreadList = dynamic(() => import('@/components/ThreadList'));

import { getTranslations } from '@/lib/global';

export default function HomePage() {
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
                active: true
              },

              {
                target: `/${tSlugs('cities')}`,
                label: t('allCities')
              },

              {
                target: `/${tSlugs('networks')}`,
                label: t('networks')
              }
            ]}
          />

          <ThreadList
            pane={CityPreview}
            items={[
              {
                target: '/palermo',
                title: 'Palermo',
                subtitle: 'The open-harbor city challenging European migration politics.',
                data: {
                  title: 'Palermo',
                  subtitle: 'The open-harbor city challenging European migration politics.',
                  uri: '/palermo',
                  approaches: [
                    {
                      title: 'The Charter of Palermo',
                      pillars: ['advocacy work', 'networking'],
                      uri: '/palermo/charter'
                    },

                    {
                      title: 'Open Harbors Policy',
                      pillars: ['advocacy work', 'networking'],
                      uri: '/palermo/open-harbors'
                    }
                  ]
                }
              },

              {
                target: '/palermo',
                title: 'Palermo',
                subtitle: 'The open-harbor city challenging European migration politics.',
                data: {
                  title: 'Palermo',
                  subtitle: 'The open-harbor city challenging European migration politics.',
                  uri: '/palermo',
                  approaches: [
                    {
                      title: 'The Charter of Palermo',
                      pillars: ['advocacy work', 'networking'],
                      uri: '/palermo/charter'
                    },

                    {
                      title: 'Open Harbors Policy',
                      pillars: ['advocacy work', 'networking'],
                      uri: '/palermo/open-harbors'
                    }
                  ]
                }
              }
            ]}
          />

          <MapboxMap />
        </div>
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['city', 'intro']);

  return {
    revalidate: 60,
    props: {
      ...translations
    }
  };
}
