import { point, featureCollection } from '@turf/helpers';
import bbox from '@turf/bbox';

export function toMapboxCoordinates(coordinates) {
  if (!coordinates) {
    return null;
  }

  const [lat, lng] = coordinates.split(',') || [null, null];

  return lat && lng && point([parseFloat(lng), parseFloat(lat)]);
}

export function getBounds(features = []) {
  if (features.length === 0) {
    return null;
  }

  const [minX, minY, maxX, maxY] = bbox(featureCollection(features));

  return [
    [minX, minY],
    [maxX, maxY]
  ];
}
