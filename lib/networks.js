import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';

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

          country {
            name
          }
        }
      }
    }`,
    { locale }
  );

  return networks;
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
