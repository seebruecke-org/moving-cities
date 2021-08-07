import { useState } from 'react';
import dynamic from 'next/dynamic';

import CityPreview from '@/components/CityPreview';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import ThreadList from '@/components/ThreadList';

const Intro = dynamic(() => import('@/components/Intro'));

export default function HomePage() {
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  return (
    <>
      {isIntroVisible ? (
        <Intro onClose={() => setIsIntroVisible(false)} />
      ) : (
        <div className="flex flex-col md:flex-row md:h-full">
          <FloatingTabs
            items={[
              {
                target: '/',
                label: 'Featured Cities',
                active: true
              },

              {
                target: '/cities',
                label: 'All Cities'
              },

              {
                target: '/networks',
                label: 'Networks'
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
  return {
    revalidate: 60,
    props: {}
  };
}
