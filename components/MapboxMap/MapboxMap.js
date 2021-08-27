import { useState } from 'react';
import { options } from 'preact';
import ReactMapGL, { WebMercatorViewport } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

// See https://github.com/preactjs/preact/issues/3211
options.debounceRendering = function (q) {
  q();
};

const getFitBounds = (bounds) => {
  const viewport = new WebMercatorViewport({
    width: 800,
    height: 600
  }).fitBounds(bounds, { padding: 20 });

  const { longitude, latitude, zoom } = viewport;
  return { longitude, latitude, zoom };
};

export default function MapboxMap({ children, bounds, options }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    ...options,
    ...getFitBounds(bounds)
  });

  return (
    <div className="h-full w-full z-0 hidden md:block">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/tanja-sb/ckr4smomm0rf717nzwi8x399q"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}>
        {children}
      </ReactMapGL>
    </div>
  );
}
