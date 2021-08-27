import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';
import { toMapboxCoordinates } from '@/lib/coordinates';

export async function fetchAllNetworks(locale) {
  const { networks } = await fetchAPI(
    `
    query AllNetworks($locale: String = "en") {
      networks(where: { locale: $locale }) {
        name

        content {
          __typename
          ${getBlockFragments(['Richtext'])}
        }

        cities {
          name
          slug
          is_featured
          coordinates

          country {
            name
          }
        }
      }
    }`,
    { locale }
  );

  return networks.map(({ cities, ...network }) => ({
    cities: cities.map(({ coordinates, ...city }) => ({
      coordinates: toMapboxCoordinates(coordinates),
      ...city
    })),
    ...network
  }));
}

export async function fetchAllNetworkPaths(locale) {
  const { networks } = await fetchAPI(
    `
    query NetworkPaths($locale: String = "en") {
      networks(where: { locale: $locale }) {
        slug
      }
    }`,
    { locale }
  );

  return networks;
}
