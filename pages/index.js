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
import { hasProfile } from '../lib/city';
import { useState } from 'react/cjs/react.development';

const Map = dynamic(() => import('../components/Map'));

const COOKIE_NAME = 'intro_shown';

const HomePage = () => {
  const { cities, navigation } = useSelector((state) => ({
    cities: state.cities,
    navigation: state.navigation
  }));
  const [filter, setFilter] = useState('filter_solidarity_based');
  const dispatch = useDispatch();
  const { cookie, setCookie } = useCookie(COOKIE_NAME);
  const fitBounds = useCallback(getMapBounds(cities), [cities]);
  const i18n = useI18n();

  const citiesAcceptMoreRefugees = cities.filter(
    ({ accepts_more_refugees }) => !!accepts_more_refugees
  );
  const activeCities =
    (filter === 'filter_solidarity_based' ? cities : citiesAcceptMoreRefugees) || [];
  const activeCity = activeCities.find(({ isActive }) => isActive === true);

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
    },

    onClick() {
      dispatch({
        type: 'SET_ACTIVE_CITY',
        slug: null
      });
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
          <Checkbox
            name="filter_solidarity_based"
            checked={filter === 'filter_solidarity_based'}
            onChange={({ target }) => {
              if (target.checked) {
                setFilter('filter_solidarity_based');
              }
            }}>
            {cities.length} {i18n.t('filter.solidarity_based')}
          </Checkbox>

          <Checkbox
            name="filter_accepts_more_refugees"
            checked={filter === 'filter_accepts_more_refugees'}
            onChange={({ target }) => {
              if (target.checked) {
                setFilter('filter_accepts_more_refugees');
              }
            }}>
            {citiesAcceptMoreRefugees.length} {i18n.t('filter.accepts_more_refugees')}
          </Checkbox>
        </MapFilterOverlay>

        <Map {...mapProps}>
          {activeCities.map((city) => (
            <MapCityMarker
              {...city}
              key={`map-${city.name}`}
              hasProfile={hasProfile(city)}
              onClick={() =>
                dispatch({
                  type: 'SET_ACTIVE_CITY',
                  slug: city.slug
                })
              }
              onMouseEnter={() => {
                dispatch({
                  type: 'SET_HIGHLIGHTED_CITY',
                  slug: city.slug
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: 'SET_HIGHLIGHTED_CITY',
                  slug: null
                });
              }}
            />
          ))}

          {activeCity && <MapCityPopup {...activeCity} />}
        </Map>
      </Main>

      <Sidebar>
        <Navigation items={navigation} />
        <BottomSheet>
          <SidebarList label={i18n.t('city.profiles')}>
            {activeCities
              .filter(hasProfile)
              .map(({ slug, isActive, isHighlighted, country, name }) => (
                <CityListItem
                  slug={slug}
                  isActive={isActive}
                  isHighlighted={isHighlighted}
                  country={country}
                  name={name}
                  key={`sidebar-${name}`}
                  onClick={(event) => {
                    event.preventDefault();

                    dispatch({
                      type: 'SET_ACTIVE_CITY',
                      slug: slug
                    });
                  }}
                  onMouseEnter={() => {
                    dispatch({
                      type: 'SET_HIGHLIGHTED_CITY',
                      slug: slug
                    });
                  }}
                  onMouseLeave={() => {
                    dispatch({
                      type: 'SET_HIGHLIGHTED_CITY',
                      slug: null
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

        intro_long {
          __typename
        }

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
