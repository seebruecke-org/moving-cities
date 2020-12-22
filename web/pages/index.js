import { useSelector, useDispatch } from 'react-redux'

import Layout from '../components/Layout';

import BottomSheet from '../components/BottomSheet';
import CityListItem from '../components/CityListItem';
import SidebarList from '../components/SidebarList';
import Main from '../components/Main';
import Map, { Marker } from '../components/Map';
import MapIntro from '../components/MapIntro';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';

import { useCookie } from '../lib/hooks/useCookie';
import { fetcher } from '../lib/hooks/useAPI';

const COOKIE_NAME = 'intro_shown';

const HomePage = () => {
  const cities = useSelector((state) => state.cities)
  const navigation = useSelector((state) => state.navigation);
  const dispatch = useDispatch();
  const { cookie, setCookie } = useCookie(COOKIE_NAME);

  return (
    <Layout>
      <Main>
        <Map>
          {cities && cities.map(({ coordinates }, index) => {
            return (
              <Marker key={index} coordinates={coordinates.split(',')} />
            )
          })}
        </Map>
      </Main>

      <Sidebar>
        <Navigation items={navigation} />
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

      {!cookie && (
        <MapIntro onClose={() => setCookie(false)} />
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const { cities } = await fetcher(`
    query {
      cities {
        name
        slug
        coordinates
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
