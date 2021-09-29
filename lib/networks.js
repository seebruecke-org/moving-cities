import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';
import { toMapboxCoordinates } from '@/lib/coordinates';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchAllNetworks(client, locale, { active = null }) {
  const { cities, networks } = await fetchAPI(
    client,
    `
    query AllNetworks($locale: String = "en") {
      cities(where: { locale: $locale }) {
        id
        name
        slug
        is_featured
        coordinates

        country {
          name
        }

        networks {
          id
        }
      }

      networks(where: { locale: $locale }, sort: "name") {
        name
        slug
        id

        content {
          __typename
          ${getBlockFragments(['Richtext'])}
        }

        cities {
          id
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return {
    networks: networks
      .filter(({ cities }) => cities.length > 0)
      .map(({ slug, ...network }) => ({
        ...network,
        slug,
        active: slug ? active === slug : index === 0
      })),

    cities: cities
      .filter(({ networks }) => networks.length > 0)
      .map(({ coordinates, ...city }) => ({
        coordinates: toMapboxCoordinates(coordinates),
        ...city
      }))
  };
}

export async function fetchNetworksBySlug(locale, slug) {
  const { networks } = await fetchAPI(
    `
    query AllNetworksBySlug($locale: String = "en", $slug: String) {
      networks(where: { locale: $locale, slug: $slug }) {
        name
        slug

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
    { locale: mapFEToStrapiLocale(locale), slug }
  );

  if (!networks) {
    return null;
  }

  return networks[0];
}

export async function fetchAllNetworkPaths(client, locale) {
  const { networks } = await fetchAPI(
    client,
    `
    query NetworkPaths($locale: String = "en") {
      networks(where: { locale: $locale }) {
        slug
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return networks;
}

export async function fetchAllCountryPaths(client, locale) {
  const { countries } = await fetchAPI(
    client,
    `
    query CountryPaths($locale: String = "en") {
      countries(where: { locale: $locale }) {
        slug
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return countries;
}
