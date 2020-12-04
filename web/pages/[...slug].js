import Layout from '../components/Layout';

import ActivitiesList from '../components/ActivitiesList';
import BottomSheet from '../components/BottomSheet';
import Main from '../components/Main';
import Map from '../components/Map';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';

const NAVIGATION_ITEMS = [
  ['/', 'Cities'],
  ['/networks', 'Networks'],
  ['/activities', 'Activities']
];

const ACITIVIES_ITEMS = [
  {
    city: "Amsterdam",
    title: "Migrant power - stimulation for the city"
  },

  {
    city: "Barcelona",
    title: "Inter-sector co-operation – the key to successful integration in the areas of migrational policies"
  },

  {
    city: "Seville",
    title: "Inter-sector co-operation – the key to successful integration"
  },

  {
    city: "Amsterdam",
    title: "Migrant power - stimulation for the city"
  },

  {
    city: "Barcelona",
    title: "Inter-sector co-operation – the key to successful integration in the areas of migrational policies"
  },

  {
    city: "Seville",
    title: "Inter-sector co-operation – the key to successful integration"
  },

  {
    city: "Amsterdam",
    title: "Migrant power - stimulation for the city"
  },

  {
    city: "Barcelona",
    title: "Inter-sector co-operation – the key to successful integration in the areas of migrational policies"
  },

  {
    city: "Seville",
    title: "Inter-sector co-operation – the key to successful integration"
  },

  {
    city: "Amsterdam",
    title: "Migrant power - stimulation for the city"
  },

  {
    city: "Barcelona",
    title: "Inter-sector co-operation – the key to successful integration in the areas of migrational policies"
  },

  {
    city: "Seville",
    title: "Inter-sector co-operation – the key to successful integration"
  }
];

const Page = ({ pageType }) => {
  return <Layout>
    <Main>
      {pageType === 'networks' && (
        <Map />
      )}

      {pageType === 'activities' && (
        <ActivitiesList activities={ACITIVIES_ITEMS} />
      )}
    </Main>
    <Sidebar>
      <Navigation items={NAVIGATION_ITEMS} />
      <BottomSheet>

      </BottomSheet>
    </Sidebar>
  </Layout>;
};

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      '/en/networks',
      '/en/activities'
    ]
  };
}

export async function getStaticProps({ locale, params: { slug }}) {
  return {
    props: {
      pageType: slug[0]
    }
  }
}

export default Page;
