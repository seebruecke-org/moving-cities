import { useSelector, useDispatch } from 'react-redux'

import Layout from '../components/Layout';

import BottomSheet from '../components/BottomSheet';
import CityListItem from '../components/CityListItem';
import SidebarList from '../components/SidebarList';
import Main from '../components/Main';
import Map, { Layer, Feature } from '../components/Map';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';

import { fetcher } from '../lib/hooks/useAPI';

const NAVIGATION_ITEMS = [
  ['/', 'Cities'],
  ['/networks', 'Networks'],
  ['/activities', 'Activities']
];

const HomePage = () => {
  const cities = useSelector((state) => state.cities)
  const dispatch = useDispatch()

  return (
    <Layout>
      <Main>
        <Map>
          <Layer
            type="symbol"
            id="marker">

            {cities && cities.map(({ coordinates }, index) => {
              return (
                <Feature key={index} coordinates={coordinates.split(',')} />
              )
            })}
          </Layer>
        </Map>
      </Main>

      <Sidebar>
        <Navigation items={NAVIGATION_ITEMS} />
        <BottomSheet>
          <SidebarList label="City profiles">
            {cities && cities.map(city => <CityListItem {...city} onClick={(event) => {
              event.preventDefault();
              
              dispatch({
                type: 'SET_ACTIVE_CITY',
                slug: city.slug
              });

            }} />)}
          </SidebarList>
        </BottomSheet>
      </Sidebar>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { cities } = await fetcher(`
    query {
      cities {
        name: Name
        slug: Slug
        coordinates: Coordinates
      }
    }
  `);

  return {
    props: {
      initialReduxState: {
        cities
      }
    }
  }
}

export default HomePage;
