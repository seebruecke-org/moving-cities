import { useState } from 'react';
import { options } from 'preact';
import ReactMapGL from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

// See https://github.com/preactjs/preact/issues/3211
options.debounceRendering = function (q) {
  q();
};

export default function MapboxMap() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <div className="h-full w-full z-0">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/tanja-sb/ckr4smomm0rf717nzwi8x399q"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      />
    </div>
  );
}
