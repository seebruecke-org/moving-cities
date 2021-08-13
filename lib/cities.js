import { fetchAPI } from "@/lib/api";

export async function fetchFeaturedCities(locale) {
  const { cities } = await fetchAPI(`
    query FeaturedCities($locale: String = "en") {
      cities(where: { locale: $locale, is_featured: true }) {
        name
        subtitle
        slug

        approaches {
          title
        }
      }
    }`,
    { locale }
  );

  return cities;
}

export async function fetchAllCitiesByCountry(locale) {
  const { countries } = await fetchAPI(`
    query AllCitiesByCountry($locale: String = "en") {
      countries(where: { locale: $locale }) {
        name

        cities {
          name
        }
      }
    }`,
    { locale }
  );

  return countries;
}

export async function fetchCityBySlug(slug, locale) {
  console.log(slug);

  const data = await fetchAPI(`
    query CityBySlug($locale: String = "en", $slug: String) {
      cities(where: { locale: $locale, slug: $slug }) {
        name
        slug
        subtitle

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
  const { cities } = await fetchAPI(`
    query FeaturedCityPaths($locale: String = "en") {
      cities(where: { locale: $locale, is_featured: true }) {
        slug
      }
    }`,
    { locale }
  );

  return cities;
}
