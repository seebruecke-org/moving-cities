import { fetchAPI } from "@/lib/api";

export async function fetchFeaturedCities(locale) {
  const { cities } = await fetchAPI(`
    query FeaturedCities($locale: String = "en") {
      cities(where: { locale: $locale, is_featured: true }) {
        name
        subtitle

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
