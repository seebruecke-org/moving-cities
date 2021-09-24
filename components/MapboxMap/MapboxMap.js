import { useEffect, useState, useLayoutEffect, useRef } from 'react';
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

  const viewport = new WebMercatorViewport({
    width,
    height
  }).fitBounds(bounds, { padding: 100 });

  const { longitude, latitude, zoom } = viewport;
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
    setViewport((state) => ({ ...state, ...getFitBounds(bounds, map), ...options }));

    if (mapRef?.current) {
      setMap(mapRef.current.getMap());
    }
  }, [options, bounds]);

  return (
    <div className="h-full w-full z-0 hidden md:block">
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
