import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useI18n } from 'next-localization';
import dynamic from 'next/dynamic';

import Layout from '../components/Layout';

import BottomSheet from '../components/BottomSheet';
import Checkbox from '../components/Checkbox';
import CityListItem from '../components/CityListItem';
import Main from '../components/Main';
import MapCityMarker from '../components/MapCityMarker';
import MapCityPopup from '../components/MapCityPopup';
import MapFilterOverlay from '../components/MapFilterOverlay';
import MapIntro from '../components/MapIntro';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';
import Sidebar from '../components/Sidebar';
import SidebarList from '../components/SidebarList';

import { fetcher } from '../lib/hooks/useAPI';
import { convertStrapiToMapbox, getMapBounds } from '../lib/coordiantes';
import useCookie from '../lib/hooks/useCookie';
import { getTranslations } from '../lib/default';

const Map = dynamic(() => import('../components/Map'));

const COOKIE_NAME = 'intro_shown';

const HomePage = () => {
  const { cities, navigation } = useSelector((state) => ({
    cities: state.cities,
    navigation: state.navigation
  }));
  const citiesAcceptMoreRefugees = cities.filter(
    ({ accepts_more_refugees }) => !!accepts_more_refugees
  );
  const activeCity = cities.find(({ isActive }) => isActive === true);
  const dispatch = useDispatch();
  const { cookie, setCookie } = useCookie(COOKIE_NAME);
  const fitBounds = useCallback(getMapBounds(cities), [cities]);
  const i18n = useI18n();

  const mapProps = {
    fitBounds,
    fitBoundsOptions: {
      duration: 0,
      padding: 50
    },
    flyToOptions: {
      speed: 1.2
    },

    onInfoOpen() {
      setCookie(null);
    }
  };

  if (activeCity) {
    mapProps.fitBounds = undefined;
    mapProps.center = convertStrapiToMapbox(activeCity.coordinates);
    mapProps.zoom = [8];
  }

  return (
    <Layout>
      <SEO title={null} />

      <Main>
        <MapFilterOverlay>
          <Checkbox checked={true}>
            {cities.length} {i18n.t('filter.solidarity_based')}
          </Checkbox>

          <Checkbox>
            {citiesAcceptMoreRefugees.length} {i18n.t('filter.accepts_more_refugees')}
          </Checkbox>
        </MapFilterOverlay>

        <Map {...mapProps}>
          {cities &&
            cities.map((city) => (
              <MapCityMarker
                {...city}
                key={`map-${city.name}`}
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
          <SidebarList label={i18n.t('city.profiles')}>
            {cities &&
              cities
                .filter(({ chapter_1, chapter_2, chapter_3, chapter_4 }) => {
                  const hasProfile = [chapter_1, chapter_2, chapter_3, chapter_4].reduce(
                    (acc, chapter) => {
                      if (chapter.length > 0) {
                        return true;
                      }

                      return acc;
                    },
                    false
                  );

                  return hasProfile;
                })
                .map((city) => (
                  <CityListItem
                    {...city}
                    key={`sidebar-${city.name}`}
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

      <MapIntro isOpen={!cookie} onClose={() => setCookie(true)}>
        <p>{i18n.t('intro.title')}</p>
        <p>{i18n.t('intro.description')}</p>
      </MapIntro>
    </Layout>
  );
};

export async function getServerSideProps({ locale }) {
  const lngDict = await getTranslations(locale);
  const { cities } = await fetcher(`
    query {
      cities(sort: "name") {
        name
        intro
        slug
        coordinates
        accepts_more_refugees

        chapter_1 {
          __typename
        }

        chapter_2 {
          __typename
        }

        chapter_3 {
          __typename
        }

        chapter_4 {
          __typename
        }

        country {
          slug
        }
      }
    }
  `);

  return {
    props: {
      lngDict,
      initialReduxState: {
        cities
      }
    }
  };
}

export default HomePage;
