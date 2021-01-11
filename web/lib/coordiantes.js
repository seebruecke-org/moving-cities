import { point, featureCollection } from '@turf/helpers';
import bbox from '@turf/bbox';

export const convertStrapiToMapbox = (coordinates) => {
  const latLong = coordinates.split(',');
  const lat = parseFloat(latLong[1]);
  const long = parseFloat(latLong[0]);

  return [lat, long];
};

export const getMapBounds = (cities) => {
  const points = cities
    .map(({ coordinates }) => convertStrapiToMapbox(coordinates))
    .map((latLong) => point(latLong));
  const features = featureCollection(points);
  const [minX, minY, maxX, maxY] = bbox(features);

  return [
    [minX, minY],
    [maxX, maxY]
  ];
};
