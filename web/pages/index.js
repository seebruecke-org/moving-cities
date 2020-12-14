import { useWindowSize } from 'react-use';

import Layout from '../components/Layout';

import BottomSheet from '../components/BottomSheet';
import CityListItem from '../components/CityListItem';
import SidebarList from '../components/SidebarList';
import Main from '../components/Main';
import Map from '../components/Map';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import styles from '../components/Layout/reset.styles';

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
  ['/networks', 'Networks'],
  ['/activities', 'Activities']
];

const HomePage = () => {
  const { width: windowWidth } = useWindowSize();

  return (
    <Layout>
      <Main>
        <Map />
      </Main>
      <Sidebar>
        <Navigation items={NAVIGATION_ITEMS} />
        <BottomSheet>
          <SidebarList label="City profiles">
            {CITIES.map(city => <CityListItem {...city} />)}
          </SidebarList>
        </BottomSheet>
      </Sidebar>
    </Layout>
  );
}

export default HomePage;
