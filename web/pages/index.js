import Layout from '../components/Layout';

import BottomSheet from '../components/BottomSheet';
import CitiesList from '../components/CitiesList';
import Main from '../components/Main';
import Map from '../components/Map';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';

const CITIES = [
  {
    name: 'Berlin'
  },

  {
    name: 'Warsaw'
  },

  {
    name: 'Munich'
  },

  {
    name: 'Berlin'
  },

  {
    name: 'Warsaw'
  },

  {
    name: 'Munich'
  },

  {
    name: 'Berlin'
  },

  {
    name: 'Warsaw'
  },

  {
    name: 'Munich'
  },

  {
    name: 'Berlin'
  },

  {
    name: 'Warsaw'
  },

  {
    name: 'Munich'
  },

  {
    name: 'Berlin'
  },

  {
    name: 'Warsaw'
  },

  {
    name: 'Munich'
  },

  {
    name: 'Berlin'
  },

  {
    name: 'Warsaw'
  },

  {
    name: 'Munich'
  }
];

const NAVIGATION_ITEMS = [
  ['/', 'Cities'],
  ['/', 'Networks'],
  ['/', 'Activities']
];

const HomePage = () => (
  <Layout>
    <Main>
      <Map />
    </Main>
    <Sidebar>
      <Navigation items={NAVIGATION_ITEMS} />
      <BottomSheet>
        <CitiesList label="City profiles" cities={CITIES} />
      </BottomSheet>
    </Sidebar>
  </Layout>
);

export default HomePage;
