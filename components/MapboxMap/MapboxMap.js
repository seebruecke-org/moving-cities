import { useEffect, useState, useRef } from 'react';
import { options } from 'preact';
import ReactMapGL, { WebMercatorViewport } from 'react-map-gl';
import useResizeObserver from '@react-hook/resize-observer';

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
    width: Math.max(100, width),
    height: Math.max(100, height)
  }).fitBounds(bounds, { padding });

  return { longitude, latitude, zoom };
};

export default function MapboxMap({ children, bounds, options, ...props }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%'
  });

  // mapbox doesn't properly resize after the panel was closed
  // calling map.resize() doesn't have any effect, so we try to
  // reset the viewport size to the original relative size
  useResizeObserver(containerRef, () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      width: '100%',
      height: '100%'
    }));
  });

  useEffect(() => {
    if (mapRef?.current) {
      setMap(mapRef.current.getMap());
    }

    setViewport((state) => ({ ...state, ...getFitBounds(bounds, map), ...options }));
  }, [mapRef, map, JSON.stringify({ options, bounds })]);

  return (
    <div
      className="h-full w-full flex-shrink flex-grow-0 z-0 hidden md:flex md:h-screen overflow-x-hidden"
      ref={containerRef}
    >
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/seebruecke/cku6wyt7c1u0i18r0104wv141"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        ref={mapRef}
        {...props}
      >
        {children}
      </ReactMapGL>
    </div>
  );
}
