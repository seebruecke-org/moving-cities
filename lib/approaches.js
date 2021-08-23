import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';

export async function fetchApproachBySlug(locale, slug) {
  const data = await fetchAPI(
    `
    query ApproachBySlug($locale: String = "en", $slug: String) {
      approaches(where: { locale: $locale, slug: $slug }) {
        title
        slug
        intro

        city {
          name
          slug
          icon
        }

        content {
          __typename
          ${getBlockFragments(['Section', 'Quote'])}
        }

        categories {
          title
        }
      }
    }`,
    { locale, slug }
  );

  if (!data) {
    return null;
  }

  const { approaches } = data;

  return approaches[0];
}

export async function fetchAllApproaches(locale) {
  const { approaches } = await fetchAPI(
    `
    query AllApproaches($locale: String = "en") {
      approaches(where: { locale: $locale }) {
        city {
          name
          slug
        }

        title
        slug

        categories {
          title
        }
      }
    }`,
    { locale }
  );

  return approaches;
}

export async function fetchApproachCategories(locale) {
  const { approchCategories } = await fetchAPI(
    `
    query AllApproachCategories($locale: String = "en") {
      approchCategories(where: { locale: $locale }) {
        title
        slug
      }
    }`,
    { locale }
  );

  return approchCategories;
}

export async function fetchAllApproachPaths(locale) {
  const { approaches } = await fetchAPI(
    `
    query ApproachPaths($locale: String = "en") {
      approaches(where: { locale: $locale }) {
        slug

        city {
          slug
        }
      }
    }`,
    { locale }
  );

  return approaches;
}
