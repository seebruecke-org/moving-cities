import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';

export async function fetchAboutBySlug(slug, locale) {
  const normalizedSlug = slug?.[0] ?? 'about';

  const data = await fetchAPI(
    `
    query AboutsBySlug($locale: String = "en", $slug: String) {
      abouts(where: { locale: $locale, slug: $slug }) {
        title

        content {
          __typename

          ${getBlockFragments(['Intro', 'Section', 'Media'])}
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

export async function fetchAllAbouts(locale, { active = null }) {
  const { abouts } = await fetchAPI(
    `
    query AboutsBySlug($locale: String = "en") {
      abouts(where: { locale: $locale }) {
        title
        slug
      }
    }`,
    { locale }
  );

  return abouts.map(({ slug, ...about }) => ({
    ...about,
    active: slug === active,
    slug
  }));
}

export async function fetchAllAboutPaths(locale) {
  const { abouts } = await fetchAPI(
    `
    query AboutPaths($locale: String = "en") {
      abouts(where: { locale: $locale }) {
        slug
      }
    }`,
    { locale }
  );

  return abouts;
}
