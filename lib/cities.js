import { fetchAPI } from '@/lib/api';
import { getBlockFragments, sideloadBlockData } from '@/lib/blocks';
import { toMapboxCoordinates } from '@/lib/coordinates';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchFeaturedCities(client, locale) {
  const { cities } = await fetchAPI(
    client,
    `
    query FeaturedCities($locale: String = "en") {
      cities(where: { locale: $locale, is_featured: true }, sort: "name") {
        id
        name
        subtitle
        slug
        icon
        coordinates

        summary {
          title
          content
        }

        approaches {
          title
          slug

          categories {
            title
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return cities.map(({ coordinates, ...city }) => ({
    coordinates: toMapboxCoordinates(coordinates),
    ...city
  }));
}

export async function fetchAllCitiesByCountry(client, locale, { active = null }) {
  const { countries } = await fetchAPI(
    client,
    `
    query AllCitiesByCountry($locale: String = "en") {
      countries(where: { locale: $locale }, sort: "name") {
        name
        slug
        id

        cities {
          id
          name
          coordinates

          networks {
            name
            slug
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return countries.map(({ cities, slug, ...country }) => ({
    slug,
    active: active == slug,
    cities: cities.map(({ coordinates, ...city }) => ({
      coordinates: toMapboxCoordinates(coordinates),
      ...city
    })),
    ...country
  }));
}

export async function fetchCityBySlug(client, slug, locale) {
  const data = await fetchAPI(
    client,
    `
    query CityBySlug($locale: String = "en", $slug: String) {
      cities(where: { locale: $locale, slug: $slug }) {
        name
        slug
        subtitle
        icon

        summary {
          title
          content
        }

        takeaways {
          content
        }

        report {
          title
          intro
          file {
            url
          }
        }

        content {
          __typename
          ${getBlockFragments(['Section', 'Quote', 'NetworksSummary', 'Media'])}
        }

        approaches {
          title
          slug

          categories {
            title
          }
        }

        country {
          name
          content {
            __typename
          ${getBlockFragments(['Richtext'])}
          }
        }

        metadata {
          title
          description
          image {
            url
          }
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale), slug }
  );

  if (!data || !data?.cities?.length) {
    return null;
  }

  const { cities } = data;
  const city = cities[0];

  city.content = await sideloadBlockData(client, city?.content, city, locale);

  return city;
}

export async function fetchApproaches(client, locale, slug) {
  const data = await fetchAPI(
    client,
    `
    query ApproachesBySlug($locale: String = "en", $slug: String) {
      cities(where: { locale: $locale, slug: $slug }) {
        approaches {
          title
          slug
        }
      }
    }`,
    { locale: mapFEToStrapiLocale(locale), slug }
  );

  if (!data) {
    return null;
  }

  const { cities } = data;

  return cities[0];
}

export async function fetchAllCityPaths(client, locale) {
  const { cities } = await fetchAPI(
    client,
    `
    query FeaturedCityPaths($locale: String = "en") {
      cities(where: { locale: $locale, is_featured: true }) {
        slug
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return cities;
}

export async function fetchNextCity(client, slug, locale) {
  const { cities } = await fetchAPI(
    client,
    `
    query AllCities($locale: String = "en") {
      cities(where: { locale: $locale, is_featured: true }) {
        id
        slug
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  const currentCityIndex = cities.findIndex((city) => city.slug === slug);
  const nextCity = cities[currentCityIndex + 1] || null;

  if (!nextCity) {
    return null;
  }

  const { city } = await fetchAPI(
    client,
    `
    query NextCities($id: ID!) {
      city(id: $id) {
        name
        subtitle
        slug
      }
    }`,
    { id: nextCity.id }
  );

  return city;
}

export async function fetchCounts(client, locale) {
  const counts = await fetchAPI(
    client,
    `
    query Counts {
      citiesCount
      featuredCitiesCount
      networksCount
      approachesCount
    }`
  );

  return counts;
}
