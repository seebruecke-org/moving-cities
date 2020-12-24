import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';

import Layout from '../components/Layout';

import BottomSheet from '../components/BottomSheet';
import CityListItem from '../components/CityListItem';
import Main from '../components/Main';
import MapCityMarker from '../components/MapCityMarker';
import MapCityPopup from '../components/MapCityPopup';
import MapIntro from '../components/MapIntro';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import SidebarList from '../components/SidebarList';

import { fetcher } from '../lib/hooks/useAPI';
import { convertStrapiToMapbox } from '../lib/coordiantes';
import useCookie from '../lib/hooks/useCookie';

const Map = dynamic(() => import('../components/Map'));

const COOKIE_NAME = 'intro_shown';

const HomePage = () => {
  const cities = useSelector((state) => state.cities);
  const activeCity = useSelector((state) => state.cities.find(({ isActive }) => isActive === true));
  const navigation = useSelector((state) => state.navigation);
  const dispatch = useDispatch();
  const { cookie, setCookie } = useCookie(COOKIE_NAME);
  let center = [13.3999443502352, 52.52117780229074];
  let zoom = [5];

  if (activeCity) {
    center = convertStrapiToMapbox(activeCity.coordinates);
    zoom = [8];
  }

  return (
    <Layout>
      <Main>
        <Map center={center} zoom={zoom} flyToOptions={{ speed: 1.2 }}>
          {cities &&
            cities.map((city) => (
              <MapCityMarker
                {...city}
                onClick={() =>
                  dispatch({
                    type: 'SET_ACTIVE_CITY',
                    slug: city.slug
                  })
                }
              />
            ))}

          {activeCity && <MapCityPopup {...activeCity} />}
        </Map>
      </Main>

      <Sidebar>
        <Navigation items={navigation} />
        <BottomSheet>
          <SidebarList label="City profiles">
            {cities &&
              cities.map((city) => (
                <CityListItem
                  {...city}
                  onClick={(event) => {
                    event.preventDefault();

                    dispatch({
                      type: 'SET_ACTIVE_CITY',
                      slug: city.slug
                    });
                  }}
                />
              ))}
          </SidebarList>
        </BottomSheet>
      </Sidebar>

      {!cookie && <MapIntro onClose={() => setCookie(false)} />}
    </Layout>
  );
};

export async function getServerSideProps() {
  const { cities } = await fetcher(`
    query {
      cities {
        name
        intro
        slug
        coordinates

        country {
          slug
        }
      }
    }
  `);

  return {
    props: {
      initialReduxState: {
        cities
      }
    }
  };
}

export default HomePage;
