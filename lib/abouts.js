import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';
import { mapFEToStrapiLocale } from '@/lib/i18n';

export async function fetchAboutBySlug(client, slug, locale) {
  const normalizedSlug = slug?.[0] ?? 'about';

  const data = await fetchAPI(
    client,
    `
    query AboutsBySlug($locale: String = "en", $slug: String) {
      abouts(where: { locale: $locale, slug: $slug }) {
        title

        content {
          __typename

          ${getBlockFragments(['Intro', 'Section', 'Media', 'Follow', 'LogoGrid', 'Partner'])}
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
    { locale: mapFEToStrapiLocale(locale), slug: normalizedSlug }
  );

  if (!data) {
    return null;
  }

  const { abouts } = data;

  return abouts[0];
}

export async function fetchAllAbouts(client, locale, { active = null }) {
  const { abouts } = await fetchAPI(
    client,
    `
    query AboutsBySlug($locale: String = "en") {
      abouts(where: { locale: $locale }) {
        title
        slug
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return abouts.map(({ slug, ...about }) => ({
    ...about,
    active: slug === active || (slug === 'about' && !active),
    slug
  }));
}

export async function fetchAllAboutPaths(client, locale) {
  const { abouts } = await fetchAPI(
    client,
    `
    query AboutPaths($locale: String = "en") {
      abouts(where: { locale: $locale }) {
        slug
      }
    }`,
    { locale: mapFEToStrapiLocale(locale) }
  );

  return abouts;
}
