import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';
import { toMapboxCoordinates } from '@/lib/coordinates';

export async function fetchFeaturedCities(locale) {
  const { cities } = await fetchAPI(
    `
    query FeaturedCities($locale: String = "en") {
      cities(where: { locale: $locale, is_featured: true }) {
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
    { locale }
  );

  return cities.map(({ coordinates, ...city }) => ({
    coordinates: toMapboxCoordinates(coordinates),
    ...city
  }));
}

export async function fetchAllCitiesByCountry(locale, { active = null }) {
  const { countries } = await fetchAPI(
    `
    query AllCitiesByCountry($locale: String = "en") {
      countries(where: { locale: $locale }) {
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
    { locale }
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

export async function fetchAllCitiesByCountrySlug(locale, slug) {
  const { countries } = await fetchAPI(
    `
    query AllCitiesByCountrySlug($locale: String = "en", $slug: String) {
      countries(where: { locale: $locale, slug: $slug }) {
        name

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
    { locale, slug }
  );

  if (!countries) {
    return null;
  }

  return countries[0];
}

export async function fetchCityBySlug(slug, locale) {
  const data = await fetchAPI(
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
      }
    }`,
    { locale, slug }
  );

  if (!data) {
    return null;
  }

  const { cities } = data;

  return cities[0];
}

export async function fetchApproaches(locale, slug) {
  const data = await fetchAPI(
    `
    query ApproachesBySlug($locale: String = "en", $slug: String) {
      cities(where: { locale: $locale, slug: $slug }) {
        approaches {
          title
          slug
        }
      }
    }`,
    { locale, slug }
  );

  if (!data) {
    return null;
  }

  const { cities } = data;

  return cities[0];
}

export async function fetchAllCityPaths(locale) {
  const { cities } = await fetchAPI(
    `
    query FeaturedCityPaths($locale: String = "en") {
      cities(where: { locale: $locale, is_featured: true }) {
        slug
      }
    }`,
    { locale }
  );

  return cities;
}

export async function fetchNextCity(slug, locale) {
  const { cities } = await fetchAPI(
    `
    query AllCities($locale: String = "en") {
      cities(where: { locale: $locale, is_featured: true }) {
        id
        slug
      }
    }`,
    { locale }
  );

  const currentCityIndex = cities.findIndex((city) => city.slug === slug);
  const nextCity = cities[currentCityIndex + 1] || null;

  if (!nextCity) {
    return null;
  }

  const { city } = await fetchAPI(
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

export async function fetchCounts(locale) {
  const counts = await fetchAPI(
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
