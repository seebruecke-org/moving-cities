import React from 'react';

import Layout from '../components/Layout';

import ActivitiesList from '../components/ActivitiesList';
import ActivityListItem from '../components/ActivityListItem';
import BottomSheet from '../components/BottomSheet';
import Main from '../components/Main';
import Map from '../components/Map';
import Navigation from '../components/Navigation';
import NetworkListItem from '../components/NetworkListItem';
import Sidebar from '../components/Sidebar';
import SidebarList from '../components/SidebarList';

const NAVIGATION_ITEMS = [
  ['/', 'Cities'],
  ['/networks', 'Networks'],
  ['/activities', 'Activities']
];

const NETWORK_ITEMS = [
  {
    title: 'European Healthy City Network'
  },

  {
    title: 'Swansea City of Sanctuary'
  },

  {
    title: 'Asylum Justice'
  },

  {
    title: 'Refugee Voice Wales'
  },

  {
    title: 'Swansea Asylum Seekers Support Group (SASS)'
  },

  {
    title: 'Swansea Humanitarian Aid Response Team (SHARP)'
  },

  {
    title: 'Welsh Refugee Council'
  },

  {
    title: 'Asylum Matters'
  },

  {
    title: 'European Healthy City Network'
  },

  {
    title: 'European Healthy City Network'
  },

  {
    title: 'Swansea City of Sanctuary'
  },

  {
    title: 'Asylum Justice'
  },

  {
    title: 'Refugee Voice Wales'
  },

  {
    title: 'Swansea Asylum Seekers Support Group (SASS)'
  },

  {
    title: 'Swansea Humanitarian Aid Response Team (SHARP)'
  },

  {
    title: 'Welsh Refugee Council'
  },

  {
    title: 'Asylum Matters'
  },

  {
    title: 'European Healthy City Network'
  }
];

const ACTIVITIES_FILTERS = [
  {
    title: 'Access to social rights'
  },

  {
    title: 'Improvement of residence security'
  },

  {
    title: 'Communal reception of refugees'
  },

  {
    title: 'Political participation of refugees/ migrants'
  },

  {
    title: 'Intercultural inclusion'
  },

  {
    title: 'Building structural capacities and resources'
  }
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
      {pageType !== 'activities' && (
        <Map />
      )}

      {pageType === 'activities' && (
        <ActivitiesList activities={ACITIVIES_ITEMS} />
      )}
    </Main>
    <Sidebar>
      <Navigation items={NAVIGATION_ITEMS} />
      <BottomSheet>
        <SidebarList label={pageType === 'networks' ? 'City Networks' : 'Filter By'}>
          {pageType === 'networks' && (
            <>
              {NETWORK_ITEMS.map(network => <NetworkListItem {...network} />)}
            </>
          )}

          {pageType === 'activities' && (
            <>
              {ACTIVITIES_FILTERS.map(filter => <ActivityListItem {...filter} />)}
            </>
          )}
        </SidebarList>
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
