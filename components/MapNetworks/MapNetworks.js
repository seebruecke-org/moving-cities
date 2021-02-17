import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Map from '../Map';
import MapCityMarker from '../MapCityMarker';
import MapNetworkPopup from '../MapNetworkPopup';

import { getMapBounds } from '../../lib/coordiantes';

export default function MapNetworks({ networks }) {
  const dispatch = useDispatch();

  const activeNetwork = networks.find(({ isActive }) => isActive === true);
  const cities = networks.map(({ cities }) => cities, []).flat();
  const fitBounds = activeNetwork
    ? useCallback(getMapBounds(activeNetwork.cities), [activeNetwork.cities])
    : useCallback(getMapBounds(cities), [cities]);

  const mapProps = {
    fitBounds,
    fitBoundsOptions: {
      duration: 0,
      padding: 50
    },
    flyToOptions: {
      speed: 1.2
    },

    onClick() {
      dispatch({
        type: 'SET_ACTIVE_NETWORK',
        slug: null
      });
    }
  };

  return (
    <Map infoControl={false} {...mapProps}>
      {networks.map(({ cities, isHighlighted, isActive, ...network }) => {
        return cities.map(({ name, coordinates }) => {
          return (
            <MapCityMarker
              coordinates={coordinates}
              key={`map-city-${name}`}
              isActive={isActive}
              isHighlighted={isHighlighted}
              onClick={() => {
                dispatch({
                  type: 'SET_ACTIVE_NETWORK',
                  slug: network.slug
                });
              }}
            />
          );
        });
      })}

      {activeNetwork && <MapNetworkPopup {...activeNetwork} />}
    </Map>
  );
}
