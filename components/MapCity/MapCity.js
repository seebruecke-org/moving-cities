import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';

import Map from '../Map';
import MapCityMarker from '../MapCityMarker';
import MapCityPopup from '../MapCityPopup';

import { hasProfile } from '../../lib/city';
import { convertStrapiToMapbox, getMapBounds } from '../../lib/coordiantes';

export default function MapCity({ cities, ...props }) {
  const dispatch = useDispatch();
  const activeCity = cities.find(({ isActive }) => isActive === true);
  const [mapZoom, setMapZoom] = useState(null);
  const groupedCities = cities.reduce(
    (acc, city) => {
      const cityHasProfile = hasProfile(city);

      if (cityHasProfile) {
        acc[1].push(city);
      } else {
        acc[0].push(city);
      }

      return acc;
    },
    [[], []]
  );
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

    onZoomEnd(map) {
      setMapZoom(map.getZoom());
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
      {groupedCities.map((cities) => {
        return cities.map((city) => (
          <MapCityMarker
            coordinates={city.coordinates}
            key={`map-city-${city.slug}`}
            hasProfile={hasProfile(city)}
            name={city.name}
            zoom={mapZoom}
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
        ));
      })}

      {activeCity && <MapCityPopup {...activeCity} />}
    </Map>
  );
}
