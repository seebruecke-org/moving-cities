import { fetchAPI } from '@/lib/api';
import { getBlockFragments } from '@/lib/blocks';

export async function fetchApproachBySlug(locale, slug) {
  const data = await fetchAPI(
    `
    query ApproachBySlug($locale: String = "en", $slug: String) {
      approaches(where: { locale: $locale, slug: $slug }) {
        title
        slug

        summary {
          title
          content
        }

        city {
          name
          slug
          icon

          approaches {
            title
            slug

            city {
              name
            }

            categories {
              title
            }
          }
        }

        content {
          __typename
          ${getBlockFragments(['Section', 'Quote'])}
        }

        categories {
          title
          slug
        }

        related_approaches {
          title
          slug

          city {
            name
          }

          categories {
            title
          }
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

export async function fetchAllApproaches(locale, filter) {
  const { approaches } = await fetchAPI(
    `
    query AllApproaches($locale: String = "en", $slug: String) {
      approaches(where: { locale: $locale, categories: { slug: $slug } }) {
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
    { locale, slug: filter }
  );

  return approaches;
}

export async function fetchApproachCategories(locale) {
  const { approachCategories } = await fetchAPI(
    `
    query AllApproachCategories($locale: String = "en") {
      approachCategories(where: { locale: $locale }) {
        title
        slug
      }
    }`,
    { locale }
  );

  return approachCategories;
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

export async function fetchAllApproachCategoriesPaths(locale) {
  const { approachCategories } = await fetchAPI(
    `
    query ApproachCategoriesPaths($locale: String = "en") {
      approachCategories(where: { locale: $locale }) {
        slug
      }
    }`,
    { locale }
  );

  return approachCategories;
}
