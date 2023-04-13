import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';
import { toMapboxCoordinates, getBounds } from '@/lib/coordinates';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchAllNetworks(client, locale, { active = null }) {
  const { cities, networks } = await fetchAPI(
    client,
    `
    query AllNetworks($locale: I18NLocaleCode) {
      cities(locale: $locale) {
        data {
          id
          
          attributes {
            name
            slug
            is_featured
            coordinates
    
            country {
              data {
                attributes {
                  name
                }
              }
            }
    
            networks {
              data {
                id
              }
            }
          }
        }
      }
    
      networks(locale: $locale, sort: "name") {
        data {
          id
          
          attributes {
            name
            slug
    
            content {
              __typename
              ${getBlockFragments(['Richtext'])}
            }
    
            cities {
              data {
                id
              }
            }
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  const networksWithActive = networks
    .filter(({ cities }) => cities.length > 0)
    .map(({ slug, ...network }, index) => ({
      ...network,
      slug,
      active: active ? active === slug : index === 0
    }));

  const citiesWithCoordinates = cities
    .filter(({ networks }) => networks.length > 0)
    .map(({ coordinates, ...city }) => ({
      coordinates: toMapboxCoordinates(coordinates),
      ...city
    }));

  const activeNetworkCities =
    networksWithActive.find(({ active }) => active)?.cities.map(({ id }) => id) ?? [];

  const bounds = getBounds(
    citiesWithCoordinates
      .filter(({ id }) => activeNetworkCities.includes(id))
      .map(({ coordinates }) => coordinates)
  );

  return {
    bounds,
    networks: networksWithActive,
    cities: citiesWithCoordinates
  };
}

export async function fetchNetworksBySlug(locale, slug) {
  const { networks } = await fetchAPI(
    `
    query AllNetworksBySlug($locale: I18NLocaleCode, $slug: String) {
      networks(locale: $locale, where: { slug: $slug }) {
        data {
          attributes {
            name
            slug
    
            content {
              __typename
              ${getBlockFragments(['Richtext'])}
            }
    
            cities {
              data {
                attributes {
                  name
                  slug
                  is_featured
                  coordinates
        
                  country {
                    data {
                      attributes {
                        name
                      }
                    }
                  }
                }
              }
            }
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
    query NetworkPaths($locale: I18NLocaleCode) {
      networks(locale: $locale) {
        data {
          attributes {
            slug
            locale
          }
        }
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
    query CountryPaths($locale: I18NLocaleCode) {
      countries(locale: $locale) {
        data {
          attributes {
            slug
            locale
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return countries;
}
