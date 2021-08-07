import CountryPreview from '@/components/CountryPreview';
import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

export default function AllCitiesOverview() {
  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <SEO title="All cities" />

      <FloatingTabs
        items={[
          {
            target: '/',
            label: 'Featured Cities'
          },

          {
            target: '/cities',
            label: 'All Cities',
            active: true
          },

          {
            target: '/networks',
            label: 'Netzwerke'
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
  return {
    revalidate: 60,
    props: {}
  };
}
