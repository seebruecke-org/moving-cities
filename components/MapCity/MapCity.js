import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import Map from '../Map';
import MapCityMarker from '../MapCityMarker';
import MapCityPopup from '../MapCityPopup';

import { hasProfile } from '../../lib/city';
import { convertStrapiToMapbox, getMapBounds } from '../../lib/coordiantes';

export default function MapCity({ cities, ...props }) {
  const dispatch = useDispatch();
  const activeCity = cities.find(({ isActive }) => isActive === true);
  const mapProps = {
    ...props,
    fitBounds: useCallback(getMapBounds(cities), [cities]),
    fitBoundsOptions: {
      duration: 0,
      padding: 50
    },

    flyToOptions: {
      speed: 1.2
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
    <Map {...mapProps}>
      {cities.map((city) => (
        <MapCityMarker
          coordinates={city.coordinates}
          key={`map-city-${city.slug}`}
          hasProfile={hasProfile(city)}
          name={city.name}
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
  );
}
