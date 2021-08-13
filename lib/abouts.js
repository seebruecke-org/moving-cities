import { fetchAPI } from "@/lib/api";

export async function fetchAboutBySlug(slug, locale) {
  const normalizedSlug = slug?.[0] ?? '-';

  const data = await fetchAPI(`
    query AboutsBySlug($locale: String = "en", $slug: String) {
      abouts(where: { locale: $locale, slug: $slug }) {
        title

        content {
          __typename
        }
      }
    }`,
    { locale, slug: normalizedSlug }
  );

  if (!data) {
    return null;
  }

  const { abouts } = data;

  return abouts[0];
}

export async function fetchAllAbouts(locale) {
  const { abouts } = await fetchAPI(`
    query AboutsBySlug($locale: String = "en") {
      abouts(where: { locale: $locale }) {
        title
        slug
      }
    }`,
    { locale }
  );

  return abouts;
}

export async function fetchAllAboutPaths(locale) {
  const { abouts } = await fetchAPI(`
    query AboutPaths($locale: String = "en") {
      abouts(where: { locale: $locale }) {
        slug
      }
    }`,
    { locale }
  );

  return abouts;
}
