import { useEffect, useState, useRef } from 'react';
import { options } from 'preact';
import ReactMapGL, { WebMercatorViewport } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

// See https://github.com/preactjs/preact/issues/3211
options.debounceRendering = function (q) {
  q();
};

const getFitBounds = (bounds, map) => {
  if (!bounds || !map) {
    return {};
  }

  const { offsetHeight: height, offsetWidth: width } = map.getContainer();
  const padding = Math.min(height, height) * 0.05;
  const { longitude, latitude, zoom } = new WebMercatorViewport({
    width,
    height
  }).fitBounds(bounds, { padding });

  return { longitude, latitude, zoom };
};

export default function MapboxMap({ children, bounds, options }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%'
  });

  useEffect(() => {

    if (mapRef?.current) {
      setMap(mapRef.current.getMap());
    }

    setViewport((state) => ({ ...state, ...getFitBounds(bounds, map), ...options }));
  }, [mapRef, map, JSON.stringify({ options, bounds })]);

  return (
    <div className="h-full w-full flex-shrink flex-grow-0 z-0 hidden md:flex md:h-screen overflow-x-hidden">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/tanja-sb/ckr4smomm0rf717nzwi8x399q"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        ref={mapRef}
      >
        {children}
      </ReactMapGL>
    </div>
  );
}
