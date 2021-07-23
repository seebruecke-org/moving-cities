import CityPreview from '@/components/CityPreview';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import ThreadList from '@/components/ThreadList';

export default function AllNetworksOverview() {
  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <FloatingTabs
        items={[
          {
            target: '/',
            label: 'Featured Cities'
          },

          {
            target: '/cities',
            label: 'All Cities'
          },

          {
            target: '/networks',
            label: 'Netzwerke',
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
  return {
    revalidate: 60,
    props: {}
  };
}
