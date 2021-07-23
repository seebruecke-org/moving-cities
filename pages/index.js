import CityPreview from '@/components/CityPreview';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import ThreadList from '@/components/ThreadList';

export default function HomePage() {
  return (
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
            label: 'Netzwerke'
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
              uri: '/amsterdam',
              approaches: [
                {
                  title: 'TOP ‘Language, Orientation and Participation’ programme (2017-2018)',
                  pillars: ['Social Rights', 'Residence Security', 'Communal Reception'],
                  uri: '/amsterdam/top-programme'
                },

                {
                  title: 'TOP ‘Language, Orientation and Participation’ programme (2017-2018)',
                  pillars: ['Social Rights', 'Residence Security', 'Communal Reception'],
                  uri: '/amsterdam/top-programme'
                }
              ]
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
  return {
    revalidate: 60,
    props: {}
  };
}
