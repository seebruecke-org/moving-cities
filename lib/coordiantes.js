import { point, featureCollection } from '@turf/helpers';
import bbox from '@turf/bbox';
import center from '@turf/center';

function getPoints(cities) {
  return cities.map(({ coordinates }) => point(coordinates));
}

export const convertStrapiToMapbox = (coordinates) => {
  const latLong = coordinates.split(',');
  const lat = parseFloat(latLong[1]);
  const long = parseFloat(latLong[0]);

  return [lat, long];
};

export const getCitiesCenter = (cities) => {
  const features = featureCollection(getPoints(cities));

  return center(features);
};

export const getMapBounds = (cities) => {
  const features = featureCollection(getPoints(cities));
  const [minX, minY, maxX, maxY] = bbox(features);

  return [
    [minX, minY],
    [maxX, maxY]
  ];
};
